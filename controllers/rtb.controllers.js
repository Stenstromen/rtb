const model = require("../models/rtb.models");
const uuid = require("uuid");
let tempMessageId;
let tempMessageBody;

function sendMessage(req, res) {
  let uniqueId = uuid.v4();
  model.burnMessage.push({
    msgID: uniqueId,
    msgBody: req.body.message,
  });
  tempMessageId = uniqueId;
  tempMessageBody = req.body.message;
  res.json(model.burnMessage);
}

function getMessage(req, res) {
  const foundMessage = model.burnMessage.find(
    (msg) => msg.msgID === req.params.id
  );
  const tempMessage = foundMessage.msgBody;
  res.end(tempMessage);
  foundMessage.msgID = "";
  foundMessage.msgBody = "";
}

function sendIndex(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(model.printIndex);
}

function sendReadme(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(model.printReadme);
}

module.exports = {
  sendMessage,
  getMessage,
  sendIndex,
  sendReadme,
};
