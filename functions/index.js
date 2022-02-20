const functions = require("firebase-functions");
const admin = require('firebase-admin');
const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');
const cors = require('cors')({
    origin: true
});
const moment = require('moment-timezone');
const nodemailer = require("nodemailer");
const { localeData } = require("moment-timezone");

exports.pronoteAPI = functions.https.onRequest(async (req, res) => {
    let url = process.env.PRONOTE_API_LINK;
    let data = [];
    await axios.post(url, {}, {
        auth: {
            username: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    }).then((res) => {
        data = res.data
    });
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.EMAIl,
    //         pass: process.env.EMAIl_PASSWORD
    //     }
    // });
      
    // let mailOptions = {
    //     from: process.env.EMAIl,
    //     to: process.env.EMAIl,
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    // };
      
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    res.send(data);
});
