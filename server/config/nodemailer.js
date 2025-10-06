import nodemailer from 'nodemailer'

// Create a transporter using Brevo SMTP with direct credentials
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: '96a92b001@smtp-brevo.com',
        pass: 'tmwaZypK7kzQ6JNR'
    }
});

// Verify the connection
transporter.verify(function(error, success) {
    if (error) {
        console.log('SMTP connection error:', error);
    } else {
        console.log('SMTP server is ready to take our messages');
    }
});

export default transporter;