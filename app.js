try {
  require("./config");
} catch (e) {
  // config file not found (this is for those who don't want to define environment variables, set process.env in a config file)
}

if (!process.env.FIREBASE_SERVICE_ACCOUNT || !process.env.PASSWORD) {
  return console.log("set FIREBASE_SERVICE_ACCOUNT and PASSWORD");
}

if (typeof process.env.FIREBASE_SERVICE_ACCOUNT === "object") {
  process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify(process.env.FIREBASE_SERVICE_ACCOUNT);
}

var express = require('express');
var Firebase = require("firebase");
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync(__dirname + '/_config.yml', 'utf8'));
var firebase = Firebase.initializeApp({
  databaseURL: "https://" + config.firebase_app + ".firebaseio.com",
  serviceAccount: JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
}).database();

var app = express();

app.use(express.static('_site'));

app.get('/emails', function(req, res) {
  if (req.query.password !== process.env.PASSWORD) {
    return res.send("Not authorized");
  }
  firebase.ref("submissions").once("value", function(snapshot) {
    var csv = "ID,Email Address,Event Organizer,Signup Date";
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var submission = childSnapshot.val();
      csv += (key || "") + "," + (submission.email || "") + "," + Boolean(submission.isEventOrganizer) + "," + (submission.createdAt || "") + "\n";
    });
    res.setHeader('Content-Type', "text/csv");
    res.setHeader("Content-Disposition", "inline;filename=emails.csv")
    res.send(csv);
  });
});

app.listen(process.env.PORT || 4001, function() {
  console.log('Showcase listening on port 3000!');
});
