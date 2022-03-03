var nodemailer = require("nodemailer");

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "israel.canul@gmail.com",
    pass: "bbpqoiumynsavgbe",
  },
});

var mensaje = "Solicitud de informacion \n\n";

var mailOptions = {
  from: "israel.canul@gmail.com",
  to: "israel.canul.onity@gmail.com",
  subject: "Solicitud de Informacion",
  text: mensaje,
};

const sendEmail = async (obj, res) => {
  var textMsg = mensaje;
  Object.keys(obj).map(function (id) {
    var nodo = obj[id];
    textMsg += id + ": " + nodo + "\n";
  });
  mailOptions.text = textMsg;
  // console.log(mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error en envio");
      console.log(error);
      res.send({ code: -1, error: error });
    } else {
      console.log("Email enviado: " + info.response);
      res.send({ code: 0, description: "Email enviado: " + info.response });
    }
  });
};

module.exports = sendEmail;
