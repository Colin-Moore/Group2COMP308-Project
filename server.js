let express = require('express');
const app = express();
const mongoose = require('mongoose');
const DB = require('./config/db');
const PORT = 4000;
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const cookieParser = require('cookie-parser');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');
const cors = require('cors');
const isAuth = require("./auth")
require("dotenv").config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


const path = require("path");


app.use(isAuth);

app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))

app.use(cookieParser("secret"));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT || PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING || DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
let mongoDB = mongoose.connection;

mongoDB.on("error", console.error.bind(console, "Connection Error:")); //binds mongoDB to console to send error
//reports from mongoDB to app console
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

