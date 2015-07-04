fs = require('fs');
var parseString = require('xml2js').parseString;

var parseInputAPI = function(type) {
  if(type == "xml") {
    fs.readFile("resources/cards.xml", 'utf8', function(err, data) {
      parseString(data, function (err, result) {
        loadPageInfo(result.cockatrice_carddatabase.sets[0].set,
          result.cockatrice_carddatabase.cards[0].card);
      });
    })

  }
};

var loadPageInfo = function(sets, cards) {
  app.get('/', function(request, response) {
    var util = require('util');
    //console.log(util.inspect(cards, false, 4));//, util.inspect(cards, false, null));

    response.render('pages/index', {sets:sets, cards:getCardsBySetId(cards, request.query.set)});
  });
}

var getCardsBySetId = function(cards, id) {
  var filteredCards = [];
  for(var card in cards) {
    for(var currentSet in cards[card].set) {
      //console.log(cards[card].set[currentSet]._);
      if(id == cards[card].set[currentSet]._) {
        filteredCards.push(cards[card]);
        break;
      }
    }
  }
  return filteredCards;
}

parseInputAPI("xml")

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
