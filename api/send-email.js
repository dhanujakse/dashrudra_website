import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow CORS preflight and actual requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, institution, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Demo Request from ${name} (${institution})`,
      html: `
        <h3>New Demo Consultation Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Institution:</strong> ${institution}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    const mailToClient = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Consultation Request with DashRudhra",
      html: `
        <div style="font-family: Arial, sans-serif; color: #0B1F3A;">
          <h2>Thank You for Contacting DashRudhra!</h2>
          <p>Dear ${name},</p>
          <p>We have successfully received your request for a digital consultation. Our specialized engineering team is currently reviewing your institution's specific requirements.</p>
          <p>We will contact you shortly at <strong>${mobile}</strong> or via email to schedule your personalized live demo of the Hall Arrangement System and other digital solutions.</p>
          <br/>
          <p>We look forward to streamlining operations at <strong>${institution}</strong>.</p>
          <p>Best Regards,</p>
          <p><strong>The DashRudhra Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToClient);

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ success: false, error: 'Failed to send emails.' });
  }
}
