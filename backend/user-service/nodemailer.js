import nodemailer from "nodemailer";

let transporter;

if (!process.env.NODEMAILER_CLIENT_ID || !process.env.NODEMAILER_SECRET || !process.env.NODEMAILER_REFRESH_TOKEN) {
    console.log("Nodemailer startup skipped: Missing client ID and/or client secret");
} else {
    transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          clientId: process.env.NODEMAILER_CLIENT_ID,
          clientSecret: process.env.NODEMAILER_SECRET,
        },
      });

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
        console.info("Mailer error : ", error);
        } else {
        console.info("Nodemailer is ready to take our messages.");
        }
    });
}

export const sendResetPasswordEmail = async (email, password) => {
    if (transporter !== undefined) {
        try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"TIC3001 G05" <g05@peerprep.com>', // sender address
                to: email, // list of receivers
                subject: "TIC3001 G05 PeerPrep - Reset password", // Subject line
                text: `Hello ${email}, your new password is ${password}.`, // plain text body
                html: '<p>Hello <b>' + (email) + '</b>, <br><br> Your new password is ' + `${password}` +'.', // html text body
                auth: {
                    user: 'tic3001.peerprep@gmail.com',
                    refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
                },
            });
            console.info("Password to %s reset sent: %s", email, info.messageId);
            return true;
        } catch (error) {
            console.error("Failed to send email: ", error);
        }
    } else {
        console.log("Nodemailer not configured. Email not sent to :", email);
    }
    return false;
}