fs = require('fs');

var parseInputAPI = function(type) {
  if(type == "xml") {
    //fs.readFile(file, [encoding], [callback]);
    return "lulz";
  }
};

console.log(parseInputAPI("xml"));

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index', {stuff:"things"});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
