// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 


app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  if (date.match(/\d{5,}/)) {
    date = +date;
  } 

  let timeStamp = new Date(date);
   if (timeStamp.toUTCString() === "Invalid Date") {
    res.json({error: "Invalid Date"})
  }
  res.json({unix: timeStamp.valueOf(), utc: timeStamp.toUTCString()});
});

app.get("/api/", (req, res) => {
  let date = new Date();
  res.json({unix: date.valueOf(), utc: date.toUTCString()})
});





// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
