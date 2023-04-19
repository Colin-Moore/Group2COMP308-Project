const User = require('../../models/user');

module.exports = {
    getUsers: async () => {
        try {
          const users = await User.find({userType: "patient"});
          return users.map(user => {
            return user;
          });
        } catch (err) {
          throw err;
        }
    }
}