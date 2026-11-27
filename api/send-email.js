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
      subject: `New Enquiry from ${name} (${institution || 'Business'})`,
      html: `
        <h3>New Enquiry on DASHRUDRA</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile/WhatsApp:</strong> ${mobile || 'N/A'}</p>
        <p><strong>Business / Organization:</strong> ${institution || 'N/A'}</p>
        <p><strong>Message / Challenge:</strong> ${message}</p>
      `,
    };

    const mailToClient = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting DASHRUDRA",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #071326; max-width: 600px; line-height: 1.6;">
          <h2 style="color: #10264A; margin-bottom: 8px;">Thank You for Connecting with DASHRUDRA</h2>
          <p style="color: #245B9E; font-size: 13px; letter-spacing: 1.5px; margin-top: 0; text-transform: uppercase;">Strategy. Insight. Impact.</p>
          <p>Dear ${name},</p>
          <p>We have received your enquiry. Our team is reviewing your requirements to explore how we can simplify your operations, automate repetitive workflows, and build practical solutions tailored to your business.</p>
          <p>We will be in touch with you shortly at <strong>${mobile || email}</strong>.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>DASHRUDRA Team</strong><br/><span style="color: #8293AA; font-size: 13px;">Less Repetition. More Possibilities.</span></p>
        </div>
      `,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToClient);

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ success: false, error: 'Failed to send emails.', details: error.message });
  }
}
