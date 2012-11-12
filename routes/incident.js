var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('incidentdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'incidentdb' database");
        db.collection('incident', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'Incident' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving incident: ' + id);
    db.collection('incident', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('incident', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addIncident = function(req, res) {
    var wine = req.body;
    console.log('Adding incident: ' + JSON.stringify(incident));
    db.collection('incident', function(err, collection) {
        collection.insert(incident, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateIncident = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(incident));
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, incident, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating incident: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(incident);
            }
        });
    });
}

exports.deleteIncident = function(req, res) {
    var id = req.params.id;
    console.log('Deleting incident: ' + id);
    db.collection('incident', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}