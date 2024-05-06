const Datastore = require('nedb-promises');
const NoteDB = Datastore.create({ filename: './db/notes.db', autoload: true });
module.exports = NoteDB;
