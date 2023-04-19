const authResolver = require('./auth');
const vitalsResolver = require('./vitals.js');
const motivationResolver = require('./motivation');
const alertResolver = require('./alert');
const gamesResolver = require('./games');
const usersResolver = require('./user');
const patientResolver = require('./patient');

const rootResolver = {
    ...authResolver,
    ...vitalsResolver,
    ...motivationResolver,
    ...alertResolver,
    ...gamesResolver,
    ...usersResolver,
    ...patientResolver
};

module.exports = rootResolver;