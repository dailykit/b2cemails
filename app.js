const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path'); // to deal with the file path
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const app = express();

//view engine  setup 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use('./public', express.static(path.join(__dirname, 'public')));

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: emailid,
      pass: password
   }
});

transporter.use('compile', hbs({
   viewEngine: {
      partialsDir: './views/layouts/',
      layoutsDir: './views/layouts/',
      defaultLayout: 'WelcomeMail.handlebars',//CookingExp.handlebars,CustomerRemainderEmail.handlebars,newRestaurant.handlebars,OrderConfirmation.handlebars,OrderOnTheWay.handlebars,restaurantsNearYou.handlebars,SocialMediaShoutout.handlebars,WelcomeMail.handlebars
   },
   viewPath: './views/layouts/'
}));


let users = [
   //recipents

]
for (var i = 0; i < users.length; i++) {
   let info = transporter.sendMail({
      from: '"RMK emails" <emailid>', // sender address
      to: users[i].email,
      subject: "Welcome to Dailykit",
      text: "",
      template: 'restaurantsNearYou',
      attachments: [
         {
            filename: 'intersection 11.jpg',
            path: __dirname + '/views/layouts/img/intersection 11.jpg',
            cid: 'intersection'
         },
         {
            filename: 'Group 175.jpg',
            path: __dirname + '/views/layouts/img/Group 175.jpg',
            cid: 'Group'
         },
         {
            filename: 'RMK.jpg',
            path: __dirname + '/views/layouts/img/RMK.png',
            cid: 'Restaurant'
         }
      ],
      context: {
         name: users[i].name
      }
   }, (err, info) => {
      if (err) {
         console.log(err);
      } else {
         console.log(info);
      }
   });
}
console.log("Message sent");

app.listen(3000, () => console.log("server started ...."));