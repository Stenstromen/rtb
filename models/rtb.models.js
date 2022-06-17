let burnMessage = [];
const index = "./assets/store/index.txt";
const indexHeader = "./assets/store/indexheader.txt"
const indexFooter = "./assets/store/indexfooter.txt"
const landHeader  = "./assets/store/landheader.txt"
const landFooter  = "./assets/store/landfooter.txt"
const msgHeader = "./assets/store/msgheader.txt"
const msgFooter = "./assets/store/msgfooter.txt"
const noMsg = "./assets/store/nomsg.txt"
const readme = "./assets/store/readme.txt";
const fs = require("fs");

const printIndex = fs.readFileSync(index, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printIndexHeader = fs.readFileSync(indexHeader, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printIndexFooter = fs.readFileSync(indexFooter, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printLandHeader = fs.readFileSync(landHeader, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printLandFooter = fs.readFileSync(landFooter, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printMsgHeader = fs.readFileSync(msgHeader, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printMsgFooter = fs.readFileSync(msgFooter, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const printNoMsg = fs.readFileSync(noMsg, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});


const printReadme = fs.readFileSync(readme, "utf8", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

module.exports = {
  burnMessage,
  printIndex,
  printIndexHeader,
  printIndexFooter,
  printLandHeader,
  printLandFooter,
  printMsgHeader,
  printMsgFooter,
  printNoMsg,
  printReadme,
};
