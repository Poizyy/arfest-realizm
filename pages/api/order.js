
import generateBarcode from '../../../lib/barcodeGenerator';
import appendOrder from '../../../lib/googleSheets';
import sendEmail from '../../../lib/emailSender';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, ticketType } = req.body;
    const ticketId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const barcodeURL = await generateBarcode(ticketId);
    await appendOrder({ name, email, ticketId, status: 'Pending', barcodeURL });
    await sendEmail({ to: email, ticketId, barcodeURL });
    res.status(200).json({ success: true, ticketId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
