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

       res.status(200).json({message: "Email sent. Check your email!"});
   } catch (err) {
       console.log(err);
       res.status(500).json({message: "Email could not be sent."})
   }
};

export default sendEmail;