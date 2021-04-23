// ---- EXPRESS JS - Framework
let express = require('express'),
    app = express();

let fs      = require('fs'),
    path    = require('path'),
    async   = require('async');


let bodyParser = require('body-parser'),
    busboy     = require('connect-busboy'),
    helmet = require('helmet');


app.use(helmet());
app.disabled('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(busboy());

// Connection base de donnée
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let database = mongoose.connect(
    "mongodb://mongo/demo",
    {
        promiseLibrary: require('bluebird'),
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


// Charger le model
const JeuModel = require('./jeuVideo');
const Jeu = mongoose.model('jeuVideo');



// -- Listes des jeu videos
app.get('/jeuVideo', function (req, res) {
    Jeu.find({}).then((jeuVideo)=>{
        res.status(200).json(jeuVideos)
    },(err)=>{
        res.status(400).send(err)
    })
});

// -- Consulter le jeu video
app.get('/jeuVideo/:idJeuVideo', function (req, res) {
    jeuVideo.findOne({id : req.params.idJeuVideo}).then((jeuVideo)=>{
        if(jeuVideo){
            res.status(200).json(jeuVideo)
        }else{
            res.status(404).json({message : "Jeu Video not found - "+req.params.idJeuVideo})
        }
    },(err)=>{
        res.status(400).send(err)
    })
});


// ------------------------
// START SERVER
// ------------------------

// -- Gestion 404
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.listen(3000,function(){
    console.info('HTTP server started on port 3000');
});
