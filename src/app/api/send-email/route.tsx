import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
import { PDFDocument, rgb } from 'pdf-lib';
import { Buffer } from 'buffer';
import dotenv from 'dotenv';

dotenv.config();

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  numberOfPeople: number;
  occasion: string;
  date: Date;
  time: string;
}

interface CartItem {
  comboName: string;
  comboPrice: number;
  quantity: number;
  totalPrice: number;
  category: string;
  dietType: string;
  addOns: Record<string, string[]>;
  selections: Record<string, string[]>;
}

export async function POST(request: Request) {
  try {
    const {
      userInfo,
      cartItems,
    }: { userInfo: UserInfo; cartItems: CartItem[] } = await request.json();

    console.log('User Info:', userInfo);
    console.log('Cart Items:', cartItems);

    function convertTo12HourTime(timeString: string): string {
      const [hours, minutes] = timeString.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    // Create Excel file
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cart');

    // Formatting headers
    const userHeader = worksheet.addRow([
      'Name',
      'Phone',
      'No. of People',
      'Occasion',
      'Event Date',
      'Event Time',
      'Address',
    ]);
    userHeader.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' },
      };
      cell.alignment = { horizontal: 'center' };
      cell.border = { bottom: { style: 'thin' } };
    });

    const eventDate = new Date(userInfo.date).toLocaleDateString('en-GB', {
      timeZone: 'Asia/Kolkata',
    });

    const time24HR = convertTo12HourTime(userInfo.time);

    worksheet.addRow([
      userInfo.name,
      Number(userInfo.phone),
      Number(userInfo.numberOfPeople),
      userInfo.occasion,
      eventDate,
      time24HR,
      userInfo.address,
    ]);

    worksheet.addRow([]);
    const headerRow = worksheet.addRow([
      'Item',
      'Combo Price',
      'Quantity',
      'Total Price',
      'Category',
      'Diet Type',
      'Add-Ons',
      'Selected Items',
    ]);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F81BD' },
      };
      cell.alignment = { horizontal: 'center' };
      cell.border = { bottom: { style: 'thin' } };
    });

    cartItems.forEach((item) => {
      const addOns = Object.values(item.addOns).flat();
      const selections = Object.values(item.selections).flat();
      const maxLength = Math.max(addOns.length, selections.length);
      for (let i = 0; i < maxLength; i++) {
        worksheet.addRow([
          i === 0 ? item.comboName : '',
          i === 0 ? item.comboPrice : '',
          i === 0 ? item.quantity : '',
          i === 0 ? item.totalPrice * item.quantity : '',
          i === 0 ? item.category : '',
          i === 0 ? item.dietType : '',
          addOns[i] || '',
          selections[i] || '',
        ]);
      }
      worksheet.addRow([]);
    });

    const excelBuffer = await workbook.xlsx.writeBuffer();

    // Create PDF file
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    page.drawText('Cart Details', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0.53, 0.71),
    });

    let yPosition = height - 80;
    page.drawText(`Name: ${userInfo.name}`, { x: 50, y: yPosition, size: 12 });
    yPosition -= 20;
    page.drawText(`No. of People: ${userInfo.numberOfPeople}`, {
      x: 50,
      y: yPosition,
      size: 12,
    });
    yPosition -= 20;
    page.drawText(`Occasion: ${userInfo.occasion}`, {
      x: 50,
      y: yPosition,
      size: 12,
    });
    yPosition -= 20;
    page.drawText(`Event Date: ${eventDate}`, {
      x: 50,
      y: yPosition,
      size: 12,
    });
    yPosition -= 20;
    page.drawText(`Event Time: ${time24HR}`, {
      x: 50,
      y: yPosition,
      size: 12,
    });

    yPosition -= 40;
    cartItems.forEach((item) => {
      page.drawText(`Diet Type: ${item.dietType}`, {
        x: 50,
        y: yPosition,
        size: 12,
      });
      yPosition -= 20;
      page.drawText(
        `Selected Items: ${Object.values(item.selections).flat().join(', ')}`,
        { x: 50, y: yPosition, size: 12 },
      );
      yPosition -= 20;
      page.drawText(
        `Add-Ons: ${Object.values(item.addOns).flat().join(', ')}`,
        { x: 50, y: yPosition, size: 12 },
      );
      yPosition -= 40;
    });

    const pdfBytes = await pdfDoc.save();
    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'shivansh.karan@gmail.com',
      subject: `${userInfo.name} - ${eventDate} - ${userInfo.occasion}`,
      text: `${userInfo.name} has placed on order on ${eventDate} for ${userInfo.occasion}`,
      attachments: [
        {
          filename: 'cart.xlsx',
          content: Buffer.from(excelBuffer),
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        {
          filename: 'cart.pdf',
          content: Buffer.from(pdfBytes),
          contentType: 'application/pdf',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
