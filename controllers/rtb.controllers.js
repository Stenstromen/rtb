const { encrypt, decrypt } = require("../enc/crypto.enc");
const qrcodeGen = require("../qrcode/gen.qrcode");
const model = require("../models/rtb.models");
const uuid = require("uuid");
let tempMessageId;
let tempMessageBody;

function sendMessage(req, res) {
  let uniqueId = uuid.v4();
  let encryptedBody = encrypt(req.body.message);
  model.burnMessage.push({
    msgID: uniqueId,
    msgBody: encryptedBody.content,
    msgIv: encryptedBody.iv,
  });
  tempMessageId = uniqueId;
  tempMessageBody = req.body.message;
  res.redirect("/store");
}

async function sendMessageLanding(req, res) {
  const burnURL =
    req.protocol +
    "://" +
    req.get("host") +
    req.originalUrl +
    "/" +
    tempMessageId;
  res.render("land.ejs", {
    burnLink: burnURL,
    burnQr: await qrcodeGen(burnURL),
  });
}

function getMessage(req, res) {
  const foundMessage = model.burnMessage.find(
    (msg) => msg.msgID === req.params.id
  );

  if (foundMessage?.msgID) {
    let foundEncMessage = [];
    foundEncMessage.push({
      iv: foundMessage.msgIv,
      content: foundMessage.msgBody,
    });
    res.render("msg.ejs", { burnMsg: decrypt(foundEncMessage[0]) });
    foundMessage.msgID = "";
    foundMessage.msgBody = "";
  } else {
    res.render("nomsg.ejs");
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
