const nodemailer = require("nodemailer");


const sendMail = async (req, res) => {
        let testAccount = await nodemailer.createTestAccount();
        //    connect with ethereal smtp
        let transporter = await nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                auth: {
                        user: 'leta45@ethereal.email',
                        pass: 'JdTXpEeau2jMquGecw'
                    },
        });

        let info = await transporter.sendMail({
                from: '"Amey Joshi" <ameyjoshi20@vit.edu>', // sender address
                to: "Amey Joshi, ameyjoshi2001rj@gmail.com", // list of receivers
                subject: "Welcome Aboard! ✔", // Subject line
                text: "Its Great to have you on board with us !,kindly wait for further steps! Thank you! 😊", // plain text body
                html: "<b>Welcome Aboard!</b>", // html body
        })
        console.log("Message sent: %s", info.messageId);

        res.json(info);
};

module.exports = sendMail;