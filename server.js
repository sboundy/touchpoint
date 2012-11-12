

var express = require('express'),
    incident = require('./routes/incident');

var app = express();

app.configure(function () {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/incident', incident.findAll);
app.get('/incident/:id', incident.findById);
app.post('/incdient', incident.addIncident);
app.put('/incident/:id', incident.updateIncident);
app.delete('/incident/:id', incident.deleteIncident);

app.listen(3000);
console.log('Listening on port 3000...');

