const UserService = require('./user.services');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.registerController = function (req, res) {
  UserService.createUser(req.body).then(
    function (result) {
      res.send({
        message: 'User Created',
      });
    },
    function (error) {
      if (error) {
        res.status(409).send({
          message: 'User already exists',
        });
      } else {
        res.status(500).send();
      }
      console.log('It reached in rejection of controller');
    }
  );

  const output = `
    <p>You have Registered into HOLA!!</p>
    <h3>Registration Details</h3>
    <ul>  
      <li>Email: ${req.body.email}</li>
      <li>Password: ${req.body.password}</li>
    </ul>`;

  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'pooja.harugop@brillio.com', // generated ethereal user
      pass: 'Bri!!iouser2022', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Nodemailer Contact" <pooja.harugop@brillio.com>', // sender address
    to: 'shippubhushan@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Successfully Registered', // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', { msg: 'Email has been sent' });
  });
};

exports.login = function (req, res) {
  UserService.findUser(req.body).then(
    () => {
      // creating a jwt
      var payload = {
        email: req.body.email.toLowerCase(),
      };
      var token = jwt.sign(payload, 'mysecretkey');
      res.setHeader('Authorization', token);
      res.send({
        message: 'Login Successful',
      });
    },
    (error) => {
      if (error) {
        res.status(500).send({
          message: 'Invalid Credentails',
        });
      } else {
        res.status(500).send();
      }
    }
  );
};

exports.deleteAccount = function (req, res) {};

exports.forgotPassword = function (req, res) {
  UserService.findOne(req.body).then(
    function (result) {
      res.send({
        message: 'Please check your Email',
      });
      const output = `
    <p>Forgot your Password</p>
    <h3>Details :</h3>
    <ul>  
      <li>Email: ${result.email}</li>
      <li>Password: ${result.password}</li>
    </ul>`;

      let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'pooja.harugop@brillio.com', // generated ethereal user
          pass: 'Bri!!iouser2022', // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: '"Nodemailer Contact" <pooja.harugop@brillio.com>', // sender address
        to: result.email, // list of receivers
        subject: 'Forgot Your Password', // Subject line
        text: 'Forgot Your Password', // plain text body
        html: output, // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', { msg: 'Email has been sent' });
      });
    },
    function (error) {
      console.log('Error', error);
      if (error) {
        res.status(500).send({
          message: 'Email not found',
        });
      } else {
        res.status(500).send();
      }
    }
  );
};

// Ashu's code for

// exports.recoverPassword = (req,res)=>{
//   UserService.recoverPassword(req.body)
//   .once("NOT_FOUND", function(){
//       res.status(500).send({
//           message:"No Such Email Exists"
//       })
//   })
//   .once("MIl_GAYA", function(result){
//       CommonService.sendPassword(req.body.email,result.password).then(()=>{
//           res.send({
//               message:"Password Sent to your Email"
//           })
//       }).catch(()=>{
//           res.status(500).send()
//       })
//   })
//   .once("ERROR", ()=>{
//       res.status(500).send()
//   })
// }

exports.search = (req, res) => {
  console.log('Query is: ', req.query);
  UserService.searchUsers(req.query)
    .then((result) => {
      res.json({
        users: result,
      });
    })
    .catch(() => {
      res.status(500).send();
    });
};

exports.updateProfile = (req, res) => {
  UserService.updateProfile(req.body, function (error, data) {
    if (error) {
      res.status(500).send({
        message: 'Could not update Profile',
      });
    } else {
      res.status(204).send({
        user: data,
      });
    }
  });
};

exports.checkStatus = (req, res) => {
  console.log(req);
  var token = req.get('Authorization');
  try {
    var payload = jwt.verify(token, 'mysecretkey');
    if (payload) {
      res.send({
        messgae: 'Login status True',
      });
    }
  } catch (error) {
    res.status(500).send({
      messgae: 'Login status false',
    });
  }
};
