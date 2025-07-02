
import QRCode from 'qrcode';

export default async function generateBarcode(text) {
  try {
    const url = await QRCode.toDataURL(text);
    return url;
  } catch (err) {
    console.error(err);
  }
}
