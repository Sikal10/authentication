import mailgun from "mailgun-js";

const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

const sendEmail = async (res, to, from, subject, content) => {
       const data = {
           from,
           to,
           subject,
           text: content
       }

   try {
       await mg.messages().send(data, function (error, body) {
           console.log(body);
           console.log(error)
       });
   } catch (err) {
       return res.status(500).json({message: "Something went wrong, could not process your request."})
   }
};

export default sendEmail;