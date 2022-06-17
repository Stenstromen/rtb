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

function sendMessageLanding(req, res) {
  const burnURL =
    req.protocol +
    "://" +
    req.get("host") +
    req.originalUrl +
    "/" +
    tempMessageId;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(model.printLandHeader 
    + burnURL 
    + model.printLandFooter);
  qrcodeGen(burnURL);
}

function getMessage(req, res) {
  let responseMsg;
  const foundMessage = model.burnMessage.find(
    (msg) => msg.msgID === req.params.id
  );

  if (foundMessage?.msgID) {
    let foundEncMessage = [];
    foundEncMessage.push({
      iv: foundMessage.msgIv,
      content: foundMessage.msgBody,
    });
    responseMsg =
      model.printMsgHeader + decrypt(foundEncMessage[0]) + model.printMsgFooter;
    foundMessage.msgID = "";
    foundMessage.msgBody = "";
  } else {
    responseMsg = model.printNoMsg;
  }
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(responseMsg);
}

function sendIndex(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(model.printIndexHeader + model.printIndexFooter);
}

function sendReadme(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(model.printReadme);
}

module.exports = {
  sendMessage,
  sendMessageLanding,
  getMessage,
  sendIndex,
  sendReadme,
};
