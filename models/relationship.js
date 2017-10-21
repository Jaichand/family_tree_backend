var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId
RelationshipSchema = new Schema({
	husband: {
		type: ObjectId
	},
	wife: {
		type: ObjectId
	},
	children: [{type: ObjectId, ref: 'Preson'}]
});

Relationship = mongoose.model('Relationship', RelationshipSchema);
module.exports = Relationship;