// controllers/contactController.js
import nodemailer from "nodemailer";
import transporter from "../config/nodemailer.js";

export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.json({ success: false, message: 'Please provide name, email and message' });
    }

    try {
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
            from: `"Whipsaw Team" <${process.env.SENDER_EMAIL}>`,
            to: email,
            replyTo: process.env.SENDER_EMAIL,
            subject: `Whipsaw Contact: Thank you for your message, ${name}`,
            html: htmlContent,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };
        
        console.log("Attempting to send email...");
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.messageId);
        
        return res.json({ 
            success: true, 
            message: 'Message sent successfully'
        });
        
    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.json({ 
            success: false, 
            message: `Failed to send message: ${error.message}` 
        });
    }
};