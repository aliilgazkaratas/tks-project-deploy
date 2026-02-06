import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generic send email function
export const sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️ Email sent to ${options.to}`);
  } catch (error) {
    console.error(`❌ Email error: ${error.message}`);
    throw new Error('Email could not be sent');
  }
};

// Registration confirmation email
export const sendRegistrationConfirmation = async (userEmail, userName, eventName, eventDate, eventLocation) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: bold; color: #667eea; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Registration Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Great news! Your registration for <strong>${eventName}</strong> has been confirmed.</p>
          
          <div class="event-details">
            <h3>Event Details</h3>
            <div class="detail-row">
              <span class="detail-label">Event:</span> ${eventName}
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span> ${formattedDate}
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span> ${eventLocation}
            </div>
          </div>

          <p>We're excited to see you there! If you have any questions, feel free to reply to this email.</p>
          
          <a href="${process.env.CLIENT_URL}/profile" class="button">View My Profile</a>
        </div>
        <div class="footer">
          <p>© 2024 TKS Travel Society. All rights reserved.</p>
          <p>If you didn't register for this event, please contact us immediately.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: userEmail,
    subject: `Registration Confirmed: ${eventName}`,
    html
  });
};

// Waitlist notification email
export const sendWaitlistNotification = async (userEmail, userName, eventName, position) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .position { font-size: 48px; font-weight: bold; color: #f5576c; text-align: center; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 You're on the Waitlist</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Thank you for your interest in <strong>${eventName}</strong>!</p>
          <p>The event is currently at full capacity, but you've been added to the waitlist.</p>
          
          <div class="position">
            Position #${position}
          </div>

          <p>We'll notify you immediately if a spot opens up. Your payment will only be processed if you're moved from the waitlist to confirmed attendees.</p>
          
          <p>Thank you for your patience!</p>
        </div>
        <div class="footer">
          <p>© 2024 TKS Travel Society. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: userEmail,
    subject: `Waitlist Confirmation: ${eventName}`,
    html
  });
};

// Moved from waitlist email
export const sendWaitlistPromotion = async (userEmail, userName, eventName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #11998e; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎊 Great News!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>A spot has opened up for <strong>${eventName}</strong>!</p>
          <p>You've been moved from the waitlist to confirmed attendees. We'll process your payment shortly and send you a confirmation email.</p>
          
          <p>We can't wait to see you there!</p>
          
          <a href="${process.env.CLIENT_URL}/profile" class="button">View Event Details</a>
        </div>
        <div class="footer">
          <p>© 2024 TKS Travel Society. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: userEmail,
    subject: `You're In! ${eventName}`,
    html
  });
};

// HTML templates: Professional-looking emails with styling
// Reusable function: sendEmail used by all email types
// Error handling: Logs errors but doesn't crash server