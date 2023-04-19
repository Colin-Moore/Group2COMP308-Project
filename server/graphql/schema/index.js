const {buildSchema } = require('graphql');



module.exports = buildSchema(`
type User{
  username: String!
  password: String!
  userType: String!
}

type PatientInfo{
  username: String!
  firstname: String!
  lastname: String!
  age: Int!
  sex: Int!
}

input UserInput{
  username: String!
  password: String!
}

type PatientTip{
  username: String!
  Title: String!
  Body: String!
}

input RegisterInput{
  username: String!
  password: String!
  userType: String!
}

type AuthData{
  userId: ID!
  username: String!
  token: String!
  tokenExpiration: Int!
  userType: String!
}

type Motivation{
  Title: String!
  Body: String!
}

type Game{
  name: String!
  description: String!
}

type Alert{
  userId: String!
  Message: String!
}

input MotivationInput{
  Title: String!
  Body: String!
}

input AlertInput{
  userId: String!
  Message: String! 
}

input GameInput{
  name: String!
  description: String!
}

type Vitals {
  age: Int!
  sex: Int!
  cp: Int!
  trestbps: Int!
  chol: Int!
  fbs: Int!
  restecg: Int!
  thalach: Int!
  exang: Int!
  oldpeak: Float!
  slope: Int!
  ca: Int!
  thal: Int!
  target: Int!
}

input TipInput{
  username: String!
}

input PatientInput{
  username: String!
  firstname: String!
  lastname: String!
  age: Int!
  sex: Int!
}

input PatientVitalsInput{
  username: String!
  cp: Int!
  trestbps: Int!
  chol: Int!
  fbs: Int!
  restecg: Int!
  thalach: Int!
  exang: Int!
  oldpeak: Float!
  slope: Int!
  ca: Int!
  thal: Int!
}

input VitalsInput {
  age: Int!
  sex: Int!
  cp: Int!
  trestbps: Int!
  chol: Int!
  fbs: Int!
  restecg: Int!
  thalach: Int!
  exang: Int!
  oldpeak: Float!
  slope: Int!
  ca: Int!
  thal: Int!
}

type RootQuery {
    getPatients: [PatientInfo!]!
    games: [Game!]!
    getUsers: [User!]!
    getMotivation(tipInput: TipInput!): [PatientTip!]!
    getTip(Title: String!): Motivation!
    motivations: [Motivation!]!
    login(username: String!, password: String!): AuthData!
    conditions: [String!]!
    vitals: [Vitals!]!
    getVitals(username: String!): Vitals!
}  

type RootMutation{
  deleteMotivation(Title: String!, username: String!): String!

    createPatient(patientInput: PatientInput!): PatientInfo!
    sendMotivation(username: String!, Title: String!, Body: String!) :String!
    createMotivation(motivationInput: MotivationInput):Motivation!
    createGame(gameInput: GameInput):Game!
    createAlert(alertInput: AlertInput):Alert!
    register(registerInput: RegisterInput!):AuthData!
    trainAndPredict(username: String!): [Float!]!
    inputSymptoms(symptom: String): String
    inputVitals(patientVitalsInput: PatientVitalsInput!): String
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);