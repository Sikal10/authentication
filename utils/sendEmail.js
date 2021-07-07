import mailgun from "mailgun-js";

const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

const sendEmail = async (res, to, from, subject, content) => {
       const data = {
           from,
           to,
           subject,
           text: content
       }

    await mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(error)
    });

    res.status(200).json({message: "Email sent. Check your email!"});
};

export default sendEmail;