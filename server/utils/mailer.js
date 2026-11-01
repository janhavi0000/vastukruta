const nodemailer = require('nodemailer');

const sendEnquiryNotification = async (enquiry) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL } = process.env;

  const mailContent = `
========================================
NEW PROJECT ENQUIRY RECEIVED: VASTUKRUTA
========================================
Client Name:    ${enquiry.fullName}
Phone:          ${enquiry.phone}
Email:          ${enquiry.email}
Project Type:   ${enquiry.projectType}
Location:       ${enquiry.location}
Approx. Area:   ${enquiry.approxArea || 'Not specified'}
Budget:         ${enquiry.budget || 'Not specified'}
Submitted At:   ${new Date().toLocaleString()}

Description:
${enquiry.description}
========================================
`;

  // If SMTP is not configured, log to console gracefully
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log('[Mailer Notice] SMTP credentials not fully configured. Enquiry received and saved to database:');
    console.log(mailContent);
    return { success: true, mode: 'console' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Vastukruta Architecture Studio" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL || SMTP_USER,
      replyTo: enquiry.email,
      subject: `[New Enquiry] ${enquiry.projectType} - ${enquiry.fullName} (${enquiry.location})`,
      text: mailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #E5DED2; background-color: #F5F2EC; color: #292824;">
          <h2 style="font-family: Georgia, serif; border-bottom: 2px solid #A18F7A; padding-bottom: 12px; margin-top: 0; color: #242421;">VASTUKRUTA</h2>
          <p style="font-size: 14px; color: #77736B; margin-top: -8px;">Ar. Pranali Ghorpade — Architecture & Interior Design Studio</p>
          <h3 style="color: #292824;">New Project Enquiry</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; background-color: #ffffff; padding: 12px; border: 1px solid #E5DED2;">
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.fullName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Project Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.projectType}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.location}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Approx. Area:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.approxArea || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Budget:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enquiry.budget || 'N/A'}</td></tr>
          </table>
          <div style="margin-top: 16px; background-color: #ffffff; padding: 16px; border: 1px solid #E5DED2;">
            <h4 style="margin-top: 0; color: #292824;">Project Scope / Description:</h4>
            <p style="white-space: pre-wrap; color: #555;">${enquiry.description}</p>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 24px; text-align: center;">This enquiry was captured on the Vastukruta official website.</p>
        </div>
      `,
    });

    console.log('[Mailer] Notification email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Mailer Error] Failed to send email notification:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendEnquiryNotification };
