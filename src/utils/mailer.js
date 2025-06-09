import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

export const sendMail = async(to, subject, html) => {
    return transporter.sendMail({
        from : `"Task Manager" <${process.env.EMAIL_USER}>`,
        to,subject,html
    });
};