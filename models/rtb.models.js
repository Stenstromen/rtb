let burnMessage = [];
const con = require("../mysql/db.mysql");

function createMessage(msgId, msgBody, msgIv) {
  let sql = `INSERT INTO burntable (messageId, messageEnc, messageIv) VALUES ("${msgId}", "${msgBody}", "${msgIv}")`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`Burnmessage ${msgId} inserted into the database`);
  });
}

function readAndBurnMessage(msgID) {
  let sql = `SELECT messageEnc, messageIv FROM burntable WHERE messageId = "${msgID}";`
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].messageEnc + " - " + result[0].messageIv);
    /*let burnmsg = {
      resultmessageEnc,
      messageIv
    }
    return burnmsg;*/
  });
}

module.exports = {
  burnMessage,
  createMessage,
  readAndBurnMessage
};
