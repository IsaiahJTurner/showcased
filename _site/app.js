try {
  require("./config");
} catch (e) {
  // config file not found (this is for those who don't want to define environment variables, set process.env in a config file)
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
    var csv = "";
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var submission = childSnapshot.val();
      csv += (key || "") + "," + (submission.email || "") + "," + Boolean(submission.isEventOrganizer) + "," + (submission.createdAt || "") + "\n";
    });
    res.send(csv);
  });
});

app.listen(process.env.PORT || 4001, function() {
  console.log('Showcase listening on port 3000!');
});
