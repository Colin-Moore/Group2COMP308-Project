const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async args => {
        try {
          const existingUser = await User.findOne({ username: args.registerInput.username });
          if (existingUser) {
            throw new Error('User exists already.');
          }
          const hashedPassword = await bcrypt.hash(args.registerInput.password, 12);
    
          const user = new User({
            username: args.registerInput.username,
            password: hashedPassword,
            userType: args.registerInput.userType
          });
    
          const result = await user.save();
    
          const token = jwt.sign(
            { userId: user.id, username: user.username, userType: user.userType },
            'secret',
            {
              expiresIn: '1h'
            }
          );
          console.log("Token: " + token)
          return { userId: user.id, username: user.username, token: token, tokenExpiration: 1, userType: user.userType };

        } catch (err) {
          console.log(err)
          throw err;
        }
      },
      login: async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
          { userId: user.id, username: user.username, userType: user.userType },
          'secret',
          {
            expiresIn: '1h'
          }
        );
        return { userId: user.id, username: user.username, token: token, tokenExpiration: 1, userType: user.userType };
      }
   
}