// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/comments', function(req, res) {
  fs.readFile('./comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('./comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Server Error');
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

app.listen(port, function() {
  console.log('Server is running on port ' + port);
});