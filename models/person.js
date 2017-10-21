var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

PersonSchema = new Schema({
 name: {
 	type: String
 },
 relationship: {
 	type: ObjectId
 },
 gender: {
 	type: String
 }
});


Persons = mongoose.model('Persons', PersonSchema);
module.exports = Persons;