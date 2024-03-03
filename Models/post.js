var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    Description: {
        type: String,
        required: true,
        unique: true
    },
    Image: {
        type: String,
        default: ''
    },
    Date: String 
    ,
    Reacts: {
        type: Number ,
        default: 0
    }
});
var Post = new mongoose.model('Post', schema);
module.exports = Post;