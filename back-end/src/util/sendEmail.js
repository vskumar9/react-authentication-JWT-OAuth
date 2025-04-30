process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import sendgrid from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not defined.');
}

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, from, subject, text, html }) => {
    const msg = { to, from, subject, text, html };
    await sendgrid.send(msg);
};

// export default sendEmail;
