const { encrypt, decrypt } = require("../enc/crypto.enc");
const { validationResult } = require("express-validator");
const qrcodeGen = require("../qrcode/gen.qrcode");
const model = require("../models/rtb.models");
const uuid = require("uuid");
const con = require("../mysql/db.mysql");
let tempMessageId;
let tempMessageBody;

function sendMessage(req, res) {
  let redir = "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    redir = "/";
  } else {
    let uniqueId = uuid.v4();
    let encryptedBody = encrypt(req.body.message);
    model.createMessage(uniqueId, encryptedBody.content, encryptedBody.iv);
    tempMessageId = uniqueId;
    tempMessageBody = req.body.message;
    redir = "/store";
  }
  res.redirect(redir);
}

async function sendMessageLanding(req, res) {
  const burnURL =
    "https://" + req.get("host") + req.originalUrl + "/" + tempMessageId;
  res.render("land.ejs", {
    burnLink: burnURL,
    burnQr: await qrcodeGen(burnURL),
  });
}

function getMessage(req, res) {
  const iosPreview = req
    .get("User-Agent")
    .includes("facebookexternalhit/1.1 Facebot Twitterbot/1.0");

  if (iosPreview) {
    res.render("iospreview.ejs");
  } else {
    let foundEncMessage = [];

    let sql = `SELECT messageEnc, messageIv FROM burntable WHERE messageId = "${req.params.id}";`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if (result.length === 0) {
        res.render("nomsg.ejs");
      }
      Object.keys(result).forEach(function (key) {
        let row = result[key];
        foundEncMessage.push({
          iv: row.messageIv,
          content: row.messageEnc,
        });
        res.render("msg.ejs", { burnMsg: decrypt(foundEncMessage[0]) });
        model.burnMessage(req.params.id);
      });
    });
  }
}

function sendIndex(req, res) {
  res.render("index.ejs");
}

module.exports = {
  sendMessage,
  sendMessageLanding,
  getMessage,
  sendIndex,
};
