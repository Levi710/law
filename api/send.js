import { Resend } from 'resend';

// Make sure to set RESEND_API_KEY in your environment variables or .env file!
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'samatvanyaya@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
