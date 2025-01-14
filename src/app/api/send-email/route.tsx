import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';
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
    worksheet.addRow([
      userInfo.name,
      Number(userInfo.phone),
      Number(userInfo.numberOfPeople),
      userInfo.occasion,
      eventDate,
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

    const buffer = await workbook.xlsx.writeBuffer();

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
      subject: 'Cart Details',
      text: 'Please find the attached cart details.',
      attachments: [
        {
          filename: 'cart.xlsx',
          content: Buffer.from(buffer),
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
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
