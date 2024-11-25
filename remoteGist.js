let https;
const fs = require("node:fs");
try {
  https = require("node:https");
} catch (error) {
  console.error(error.message);
}

function getRemoteFile(url, path) {
  https
    .get(url, (res) => {
      const { statusCode } = res;

      let error;
      if (statusCode !== 200) {
        error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
      }
      if (error) {
        console.error(error.message);
        res.resume();
        return;
      }

      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          fs.writeFile(path, rawData, (err) => {
            if (err) throw err;
          });
        } catch (e) {
          console.error(e.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });
}

module.exports = { getRemoteFile };
