const functions = require("firebase-functions");
const admin = require('firebase-admin');
const qs = require('qs');
const dotenv = require('dotenv');
const cors = require('cors')({origin: true});
const moment = require('moment-timezone');
const nodemailer = require("nodemailer");
const { localeData } = require("moment-timezone");
const axios = require('axios');

exports.testPronoteAPI = functions.https.onRequest(async (req, res) => {
    let url = process.env.PRONOTE_API_LINK;
    let data = [];
    await axios.post(url, {}, {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    }).then((res) => {
        data = res.data;
        let transporter = nodemailer.createTransport({
            service: 'gmail',   
            auth: {
                user: process.env.EMAIL, // generated by Mailtrap
                pass: process.env.EMAIL_PASSWORD // generated by Mailtrap
            }
        });

        const mailOptions = {
            from: process.env.EMAIL, //Adding sender's email
            to: process.env.EMAIL, //Getting recipient's email by query string
            subject: 'Notification - Pronote (Reversed Engineered) 🛰', //Email subject
            html: `
            <body style=padding:10px;font-family:Gill Sans, sans-serif">
                <div style="font-family:Helvetica,sans-serif;display: flex;align-items: center;justify-content: center;flex-direction: column;height:200px;widht:100%;">
                    <p style="color:#000"><span style="color=#BB6464">${data[0]}</span></p>
                    <p style="color:#B8405E;font-size:3rem;font-family:Helvetica, sans-serif;"><span style="color=#BB6464"><b>${data[1]}</b></span></p>
                    <p style="color:#000"><b>Moyenne de classe: </b><span style="color=#BB6464">${data[2]} / 20</span></p>
                </div>
                Project: <a href="https://github.com/Pronote-Extra/Pronote-Extra">Pronote-Extra</a>
                Author: <a href="https://github.com/science-math-guy">Science-math-guy</a>
            </body>
            ` //Email content in HTML
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
            }
            console.log('Email sent successfully');
        });
    });
    res.send('Email sent successfully.');
});

exports.pronoteAPI = functions.pubsub.schedule('every 1 minutes').onRun(async(context) => {
    let url = process.env.PRONOTE_API_LINK;
    let data = [];
    await axios.post(url, {}, {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    }).then((res) => {
        data = res.data;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // generated by Mailtrap
                pass: process.env.EMAIL_PASSWORD // generated by Mailtrap
            }
        });

        const mailOptions = {
            from: process.env.EMAIL, //Adding sender's email
            to: process.env.EMAIL, //Getting recipient's email by query string
            subject: 'Notification - Pronote (Reversed Engineered)', //Email subject
            html: `
            <body style=padding:10px;font-family:Gill Sans, sans-serif">
                <div style="font-family:Helvetica,sans-serif;display: flex;align-items: center;justify-content: center;flex-direction: column;height:200px;widht:100%;">
                    <p style="color:#000"><span style="color=#BB6464">${data[0]}</span></p>
                    <p style="color:#B8405E;font-size:3rem;font-family:Helvetica, sans-serif;"><span style="color=#BB6464"><b>${data[1]}</b></span></p>
                    <p style="color:#000"><b>Moyenne de classe: </b><span style="color=#BB6464">${data[2]} / 20</span></p>
                </div>
                Project: <a href="https://github.com/Pronote-Extra/Pronote-Extra">Pronote-Extra</a>
                Author: <a href="https://github.com/science-math-guy">Science-math-guy</a>
            </body>
            ` //Email content in HTML
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
            }
            console.log('Email sent successfully');
        });
    });
    res.send(data);
});
