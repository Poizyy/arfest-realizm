
import nodemailer from 'nodemailer';

export default async function sendEmail({ to, ticketId, barcodeURL }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"ArtFest ReaLizM" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Tiket ArtFest Anda',
    html: `<p>Terima kasih telah membeli tiket!</p>
           <p>ID Tiket: ${ticketId}</p>
           <img src="${barcodeURL}" alt="Barcode Tiket" />`,
  });

  console.log('Email sent:', info.messageId);
}
