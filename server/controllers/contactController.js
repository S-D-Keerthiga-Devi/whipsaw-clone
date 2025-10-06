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
          .message {
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: 3px;
            padding: 15px;
            margin: 15px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
          }
          .button {
            display: inline-block;
            background-color: #000;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Contacting Whipsaw</h2>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
            
            <div class="message">
              <p><strong>Your message:</strong></p>
              <p>${message.replace(/\\n/g, '<br>')}</p>
            </div>
            
            <p>If you have any additional questions or information to share, please don't hesitate to contact us again.</p>
            
            <p>Best regards,<br>The Whipsaw Team</p>
            
            <center><a href="https://whipsaw.com" class="button">Visit Our Website</a></center>
          </div>
          <div class="footer">
            <p>This is an automated response to your inquiry. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Send email
      const mailOptions = {
        from: process.env.SENDER_EMAIL || '"Whipsaw Contact" <contact@whipsaw.com>',
        to: email, // Send to the email entered in the form
        replyTo: process.env.SENDER_EMAIL || 'contact@whipsaw.com',
        subject: `Whipsaw Contact: Thank you for your message, ${name}`,
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