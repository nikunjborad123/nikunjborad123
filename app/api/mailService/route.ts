import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email } = await req.json();
  // Create a Nodemailer transporter

  const html = `Dear ${name},

Thank you for reaching out. I have received your message and will get back to you as soon as possible.
  
Best regards,
Nikunj Borad`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Thank You for Contacting Me',
    text: html,
  };

  // Send email
  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: { response: string }) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }
  );

  return NextResponse.json({ message: 'email send successfully' });
}
