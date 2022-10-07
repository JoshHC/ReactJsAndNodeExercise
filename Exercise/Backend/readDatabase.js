const fs = require("fs");
const { parse } = require("csv-parse");
const { response } = require("express");
var orderedDatabase = [];

function readDatabase() {
  fs.createReadStream("./GeoLite2-City-Blocks-IPv4.csv")
    .pipe(parse({ delimiter: "," }))
    .on("data", function (data) {
      let mask = data[0].split("/");
      let bitspermitted = 32 - mask[1];
      let numberofhosts = Math.pow(2, bitspermitted) - 2;

      let lasthost = data[0].split("/");
      lasthost = lasthost[0].toString();
      lasthost = lasthost.split(".");
      let firsthost;
      firsthost = [...lasthost];

      if (bitspermitted <= 8 && bitspermitted > 0) {
        let lastoctate = parseInt(lasthost[3]) + numberofhosts;
        lasthost[3] = lastoctate.toString();
        firsthost[3] = parseInt(firsthost[3]) + 1;
        firsthost[3] = firsthost[3].toString();
      } else if (bitspermitted > 8 && bitspermitted <= 16) {
        let lastoctate = parseInt(lasthost[3]) + 254;
        lasthost[3] = lastoctate.toString();

        let thirdoctate = numberofhosts - 254;
        lasthost[2] = thirdoctate.toString();

        firsthost[3] = parseInt(firsthost[3]) + 1;
        firsthost[3] = firsthost[3].toString();

        firsthost[2] = thirdoctate.toString();
      } else if (bitspermitted > 16 && bitspermitted <= 24) {
        let lastoctate = parseInt(lasthost[3]) + 254;
        lasthost[3] = lastoctate.toString();

        let thirdoctate = numberofhosts - 254;
        lasthost[2] = thirdoctate.toString();

        let secondoctate = numberofhosts - thirdoctate;
        lasthost[1] = secondoctate.toString();

        firsthost[3] = parseInt(firsthost[3]) + 1;
        firsthost[3] = firsthost[3].toString();

        firsthost[2] = thirdoctate.toString();
        firsthost[1] = secondoctate.toString();
      } else if (bitspermitted > 24 && bitspermitted <= 32) {
        let lastoctate = parseInt(lasthost[3]) + 254;
        lasthost[3] = lastoctate.toString();

        let thirdoctate = numberofhosts - 254;
        lasthost[2] = thirdoctate.toString();

        let secondoctate = numberofhosts - thirdoctate;
        lasthost[1] = secondoctate.toString();

        let firstoctate = numberofhosts - secondoctate;
        lasthost[0] = firstoctate.toString();

        firsthost[3] = parseInt(firsthost[3]) + 1;
        firsthost[3] = firsthost[3].toString();

        firsthost[2] = thirdoctate.toString();
        firsthost[1] = secondoctate.toString();
        firsthost[0] = firstoctate.toString();
      }

      firsthost = parseInt(
        firsthost[0] + firsthost[1] + firsthost[2] + firsthost[3]
      );
      lasthost = parseInt(
        lasthost[0] + lasthost[1] + lasthost[2] + lasthost[3]
      );

      const orderedDatabaseElement = {
        network: data[0],
        latitude: data[7],
        longitude: data[8],
        firsthost: firsthost,
        lasthost: lasthost,
      };
      orderedDatabase.push(orderedDatabaseElement);
    })
    .on("end", function () {
      console.log("Database Charged");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}

function getinformation(ipaddress = "") {
  ipaddress = ipaddress.split(".");
  let firstoctate = ipaddress[0];
  let secondoctate = ipaddress[1]
  ipaddress = parseInt(
    ipaddress[0] + ipaddress[1] + ipaddress[2] + ipaddress[3]
  );
  var returnresponse;
  for (let element of orderedDatabase) {
    if (ipaddress >= element.firsthost && ipaddress <= element.lasthost) {
      if (element.network.split(".", 1).toString() == firstoctate) {
        let auxiliar = element.network.split(".", 2).toString().split(",")
        auxiliar = auxiliar[1]
        if (auxiliar == secondoctate) {
          returnresponse = Object.assign({}, element);
        }
      }
    }
  }

  return returnresponse;
}

module.exports.getinformation = getinformation;
module.exports.readDatabase = readDatabase;
