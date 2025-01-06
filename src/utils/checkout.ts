import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver'; // Install with `npm install file-saver`
import { CartItem } from '@/context/cartContext';

interface UserInfo {
  name: string;
  phone: string;
  address: string;
}

export const handleCheckout = async (
  userInfo: UserInfo,
  cartItems: CartItem[],
) => {
  console.log('User Info:', userInfo);
  console.log('Cart Items:', cartItems);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Cart');

  const userHeader = worksheet.addRow(['Name', 'Phone', 'Address']);

  worksheet.mergeCells(`C${userHeader.number}:G${userHeader.number}`);

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

  const addressRow = worksheet.addRow([
    userInfo.name,
    userInfo.phone,
    userInfo.address,
  ]);

  worksheet.mergeCells(`C${addressRow.number}:G${addressRow.number}`);
  worksheet.addRow([]);

  // Add current date and time in IST
  const date = new Date();
  const options = { timeZone: 'Asia/Kolkata', hour12: true };

  // Format date and time separately
  const currentDate = date.toLocaleDateString('en-GB', options);
  const currentTime = date.toLocaleTimeString('en-GB', options);

  // Add date and time headers
  const dateTimeHeaderRow = worksheet.addRow(['Date', '', 'Time']);
  worksheet.mergeCells(
    `A${dateTimeHeaderRow.number}:B${dateTimeHeaderRow.number}`,
  );
  worksheet.mergeCells(
    `C${dateTimeHeaderRow.number}:D${dateTimeHeaderRow.number}`,
  );

  dateTimeHeaderRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F81BD' },
    };
    cell.alignment = { horizontal: 'center' };
    cell.border = { bottom: { style: 'thin' } };
  });

  // Add date and time values
  const dateTimeValueRow = worksheet.addRow([currentDate, '', currentTime]);
  worksheet.mergeCells(
    `A${dateTimeValueRow.number}:B${dateTimeValueRow.number}`,
  );
  worksheet.mergeCells(
    `C${dateTimeValueRow.number}:D${dateTimeValueRow.number}`,
  );

  worksheet.addRow([]);

  const headerRow = worksheet.addRow([
    'Item',
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
      worksheet
        .addRow([
          i === 0 ? item.comboName : '',
          i === 0 ? item.quantity : '',
          i === 0 ? item.totalPrice * item.quantity : '',
          i === 0 ? item.category : '',
          i === 0 ? item.dietType : '',
          addOns[i] || '',
          selections[i] || '',
        ])
        .eachCell((cell, colNumber) => {
          if (colNumber === 2 || colNumber === 3) {
            cell.numFmt = '0.00';
          }
        });
    }
    worksheet.addRow([]);
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0,
  );
  worksheet.addRow(['Total Amount', '', totalAmount]).font = {
    bold: true,
  };

  worksheet.columns = [
    { width: 20 },
    { width: 15 },
    { width: 15 },
    { width: 20 },
    { width: 15 },
    { width: 30 },
    { width: 30 },
  ];

  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex > 2) {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center' };
      });
    }
  });

  // Save Excel as a Blob and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, 'cart.xlsx');
};
