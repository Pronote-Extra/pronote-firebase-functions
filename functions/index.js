const functions = require("firebase-functions");
const admin = require('firebase-admin');
const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');
const cors = require('cors')({ origin: true });
const moment = require('moment-timezone');

exports.testTwitterAPI = functions.https.onRequest(async (req, res) => {
    let url = `https://twitter-trends-analyser.herokuapp.com/api/twittertrends`;
    let data = [];
    const db = getDatabase();
    await axios.post(url, {}, {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    }).then((res) => {
        data = res.data
        const ref = db.ref('data/twittertrends/JimCramer').update({
            stocksToBuy: data,
            date: moment().tz("Europe/Paris").format()
        });
    });
    res.send(data);
});
