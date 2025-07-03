
import { google } from 'googleapis';

export default async function appendOrder(orderData) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Orders!A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [
          orderData.name,
          orderData.email,
          orderData.ticketId,
          orderData.status,
          orderData.barcodeURL,
        ],
      ],
    },
  });
}
