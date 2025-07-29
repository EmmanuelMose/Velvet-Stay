// src/mailer.ts
import nodemailer from "nodemailer";
export const sendEmail = async (email, subject, message, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
            html: html,
        };
        const mailRes = await transporter.sendMail(mailOptions);
        console.log('Mail response:', mailRes.response);
        if (mailRes.accepted && mailRes.accepted.length > 0) {
            return 'Email sent successfully';
        }
        else if (mailRes.rejected && mailRes.rejected.length > 0) {
            return 'Email not sent';
        }
        else {
            return 'Email server error';
        }
    }
    catch (error) {
        console.error('Mailer error:', error.message);
        return `Error sending email: ${error.message}`;
    }
};
