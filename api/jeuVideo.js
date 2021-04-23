let mongoose = require('mongoose'),
    Schema	 	= mongoose.Schema;


let JeuVideoSchema = new Schema({
    
    nom : { type : String, required : true},
    type : String,
    description : String,
    console : String,
    disponible : Boolean
});

mongoose.model('jeuVideo', JeuVideoSchema);
