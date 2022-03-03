const express = require("express");
var cors = require("cors");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");
const app = express();
const port = 3200;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sendMailMethod = require("./enviarEmail");

app.get("/fetchData", async (req, res) => {
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = "token.json";

  // Load client secrets from a local file.
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), listMajors, res);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback, res) {
    console.log(credentials);
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, res);
    });
  }

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  function listMajors(auth, res) {
    const sheets = google.sheets({ version: "v4", auth });
    var resp = res;
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1cjuPp1lHpvLnfUQ7cFUQyGSmxgaH_io6JLY74iQ8WiE",
        range: "A:E",
        majorDimension: "ROWS",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        var response = [];
        const rows = res.data.values;
        if (rows.length) {
          // Print columns A and E, which correspond to indices 0 and 4.
          rows.map((row, id) => {
            if (id > 0) {
              var objToPush = {};
              row.map((value, idV) => {
                objToPush[rows[0][idV]] = value;
              });
              response.push(objToPush);
            }
          });
          resp.send({ code: 0, items: response });
        } else {
          resp.send({ code: -1, res: "No data found." });
          console.log("No data found.");
        }
      }
    );
  }
});

app.post("/sendEmail", (req, res) => {
  sendMailMethod(req.body, res);
  //res.send(envioDeCorreo);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
