let burnMessage = [];
const index = "./assets/store/index.html";
const readme = "./assets/store/readme.txt";
const fs = require("fs");

const printIndex = fs.readFileSync(index, "utf8", (error) => {
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
  printReadme,
};
