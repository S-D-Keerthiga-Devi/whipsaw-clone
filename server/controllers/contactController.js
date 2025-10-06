import nodemailer from "nodemailer";
import transporter from "../config/nodemailer.js";

export const submitContactForm = async (req, res) => {
  try {
    console.log("Contact form submission received:", req.body);
    const { name, email, message } = req.body;
    
    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
    }
    
    // HTML email template with styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .container {
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #000;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 5px 5px 0 0;
            margin-bottom: 20px;
          }
          .content {
            padding: 0 15px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
          .message {
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: 3px;
            padding: 15px;
            margin-top: 5px;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div>${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${email}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="message">${message.replace(/\\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Whipsaw website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send email
      const mailOptions = {
        from: process.env.SENDER_EMAIL || '"Whipsaw Contact" <contact@whipsaw.com>',
        to: process.env.SENDER_EMAIL || 'sdkeerthigadevi@gmail.com', // Your email to receive contact form submissions
        replyTo: email,
        subject: `Whipsaw Contact: ${name}`,
       html: htmlContent,
       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`  // Plain text fallback
     };
     
     try {
       const info = await transporter.sendMail(mailOptions);
       console.log('Message sent: %s', info.messageId);
       
       // Return success
       res.status(200).json({ 
         message: 'Message sent successfully'
       });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
};