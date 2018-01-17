const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mean1812', { useMongoClient: true });

const singerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    image: { type: String, unique: true },
});

const Singer = mongoose.model('Singer', singerSchema);

module.exports = Singer;
