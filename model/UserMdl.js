const Datastore = require('nedb-promises');
const db = Datastore.create({ filename: './db/users.db', autoload: true });

const User = {
  async findOne(query) {
    return await db.findOne(query);
  },
  async save(user) {
    return await db.insert(user);
  }
};

module.exports = User;
