const Vitals = require('../../models/vitals');
const Patient = require('../../models/patient');
const tf = require('@tensorflow/tfjs');
const heart = require('../../../heart.json');

module.exports = {
    vitals: async () => {
        try {
          const vitals = await Vitals.find();
          return vitals.map(vital => {
            return vital;
          });
        } catch (err) {
          throw err;
        }
    },

    getVitals: async (args) => {

        const patientVitals = Vitals.findOne({username: args.username});
        if(!patientVitals){
            throw new Error("No records found.");
        }

        return patientVitals;
    },

    inputVitals: async (args) => {
        const vitals = await Vitals.findOne({username: args.patientVitalsInput.username});
      

        console.log(args.patientVitalsInput.chol)
            await Vitals.updateOne({username: args.patientVitalsInput.username}, {$set:{
                age: parseInt(vitals.age),
                sex: parseInt(vitals.sex),
                cp: parseInt(args.patientVitalsInput.cp), 
                trestbps: parseInt(args.patientVitalsInput.trestbps),
                chol: parseInt(args.patientVitalsInput.chol),
                fbs: parseInt(args.patientVitalsInput.fbs),
                restecg: parseInt(args.patientVitalsInput.restecg),
                thalach: parseInt(args.patientVitalsInput.thalach),
                exang: parseInt(args.patientVitalsInput.exang) ,
                oldpeak: parseFloat(args.patientVitalsInput.oldpeak),
                slope: parseInt(args.patientVitalsInput.slope),
                ca: parseInt(args.patientVitalsInput.ca),
                thal: parseInt(args.patientVitalsInput.thal),
            }}, {upsert: true});

        return "Submitted";
    },

    trainAndPredict: async (args) => {
        var patientVitals = await Vitals.findOne({username: args.username});
        if(!patientVitals){
            throw new Error("No record exists");
        }
        var input = [
            {
                age: parseInt(patientVitals.age),
                sex: parseInt(patientVitals.sex),
                cp: parseInt(patientVitals.cp), 
                trestbps: parseInt(patientVitals.trestbps),
                chol: parseInt(patientVitals.chol),
                fbs: parseInt(patientVitals.fbs),
                restecg: parseInt(patientVitals.restecg),
                thalach: parseInt(patientVitals.thalach),
                exang: parseInt(patientVitals.exang) ,
                oldpeak: parseFloat(patientVitals.oldpeak),
                slope: parseInt(patientVitals.slope),
                ca: parseInt(patientVitals.ca),
                thal: parseInt(patientVitals.thal),
            }
        ];
        console.log(input)
        const epochs = 1000;
        const learningRate = 0.01

        const trainingData = tf.tensor2d(heart.map(item => [
            item.age,
            item.sex,
            item.cp,
            item.trestbps,
            item.chol,
            item.fbs,
            item.restecg,
            item.thalach,
            item.exang,
            item.oldpeak,
            item.slope,
            item.thal ,
        ]))

        const outputData = tf.tensor2d(heart.map(item => [
            item.target === 1 ? 1 : 0,
            item.target === 0 ? 1 : 0
        ]))

        const newTestingData = tf.tensor2d(input.map(item => [
            item.age,
            item.sex,
            item.cp,
            item.trestbps,
            item.chol,
            item.fbs,
            item.restecg,
            item.thalach,
            item.exang,
            item.oldpeak,
            item.slope,
            item.thal ,
        ]))

        const model = tf.sequential()

        model.add(tf.layers.dense({
            inputShape: [12],
            activation: "sigmoid",
            units: 13, 
        }))

        model.add(tf.layers.dense({
            inputShape: [13],
            activation: "sigmoid",
            units: 7, 
        }))

        model.add(tf.layers.dense({
            inputShape: [7],
            activation: "sigmoid",
            units: 2, 
        }))

        model.add(tf.layers.dense({
            activation: "sigmoid",
            units: 2, 
            }))

        model.compile({
            loss: "meanSquaredError",
            optimizer: tf.train.adam(.01),
        })
    
        const startTime = Date.now()
        await model.fit(trainingData, outputData,         
        {
            epochs: epochs,
            callbacks: {
                onEpochEnd: async (epoch, log) => {
                    model.optimizer.learningRate = learningRate;
                    lossValue = log.loss;
                    console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                    elapsedTime = Date.now() - startTime;
                    console.log('elapsed time: ' + elapsedTime)
                }
            }
        })

        results =  model.predict(newTestingData);
        
        return results.array().then(array => {
            return resultForData = array[0];
        })  
    } 
}
