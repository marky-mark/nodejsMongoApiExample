var express = require('express'),
    resource = require('express-resource'),
    app = module.exports = express();

require('./db/db-connection.js');
require('./model/test');

var Test = mongoose.model('Test');

app.configure(function() {
    app.use(express.bodyParser());
});

//gets all the test data in db
app.get('/test', function(request, response) {
    Test.find(function (err, tests) {
        if (err) 
            console.log(tests);
        else
            response.send(tests);
    });    
});

app.get('/', function(request, response) {
    response.send('Hello And Welcome!!');
});

app.get('/test/:id', function(request, response) {
    console.log('fetching test id is ' + request.params.id);
    Test.find({'_id': request.params.id},  function (err, test){
	if (err) {
            console.log('Error storing test: ', err);
            response.send(err);
        } else {
            response.send(test);
        }
        
    });	    
    
    //response.send('the id is ' + request.params.id);
    //response.end();
});

app.post('/test', function(request, response) {
    console.log('posting ' + request.body.name);

	var test = {
	    name: request.body.name
	}

	Test.create(test, function (err) {
            if (err) {
                console.log('Error storing test: ', err);
                response.send(err);
            }
            else {
                //response.writeHead(201, {"Content-Type": "application/json"});
                response.send(test);
            }
        });
});

app.delete('/test/:id', function(request, response) {
    console.log('deleting ' + request.params.id);
    
    var query = {
        '_id': request.params.id
    }       

    Test.remove(query, function(err) {
         if (err) {
             console.log('Error finding test: ', err);
             response.send(err);
         } else {
	     response.writeHead(204, {"Content-Type": "application/json"});
	     response.end();
         }
    });    
});

app.put('/test/:id', function(request, response) {
    console.log('editing ' + request.params.id);
        
    var query = {
        '_id': request.params.id
    }
            
    Test.update(query, {'name': request.body.name}, function(err) {
         if (err) {
             console.log('Error storing test: ', err);
             response.send(err);
         } else {
	     //add the new id 
	     Test.findOne(query, function (err, tests) {
                 if (err)
    	             console.log(tests); 
                 else
	             response.send(tests);
             });   
         }
    });   
});


app.listen(3000);
console.log("server started!");