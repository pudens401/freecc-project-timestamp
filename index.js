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

app.get("/api/:time",(req,res)=>{
  const {time} = req.params
  let arr = time.split("-");
  console.log(arr[0]==time)
  if(arr[0].length==time.length){
    const utcTime = new Date(Number(time)).toUTCString();
    return res.json({"unix":time,"utc":utcTime})
  }else{
    const newArr = []
    arr.forEach(el=>{
      newArr.push(parseInt(el))
    })
    const utcTyme = new Date(Date.UTC(newArr[0],newArr[1]-1,newArr[2],0,0,0)).toUTCString()
    const unix = Date.parse(utcTyme);
    return res.json({"unix":unix,"utc":utcTyme})
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
