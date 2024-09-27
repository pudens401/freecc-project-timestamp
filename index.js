// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api",(req,res)=>{
    let t = Date.now()
    let tUTC = new Date(Number(t)).toUTCString()
    return res.json({"unix":Number(t),"utc":tUTC})
})

app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  if (!isNaN(date)) {
    const utcTime = new Date(Number(date)).toUTCString();
    if (utcTime === 'Invalid Date') return res.json({ error: "Invalid Date" });
    return res.json({ "unix": Number(date), "utc": utcTime });
  } 

  else {
    const utcTyme = new Date(date).toUTCString();
    if (utcTyme === 'Invalid Date') return res.json({ error: "Invalid Date" });
    const unix = Date.parse(utcTyme);
    return res.json({ "unix": Number(unix), "utc": utcTyme });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
