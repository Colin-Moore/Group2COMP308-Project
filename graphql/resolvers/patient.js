const Patient = require('../../models/patient');
const Vitals = require('../../models/vitals');

module.exports = {

    getPatients: async () => {
        const patients = await Patient.find();
        return patients.map(patient => {
            return patient
        })
    },

    createPatient: async (args) =>{
        try {
            const existingPatient = await Patient.findOne({ username: args.patientInput.username });
            if (existingPatient) {
              throw new Error('Patient exists already.');
            }
      
            const patient = new Patient({
                username: args.patientInput.username,
                firstname: args.patientInput.firstname,
                lastname: args.patientInput.lastname,
                age: args.patientInput.age,
                sex: args.patientInput.sex
            });

            const vital = new Vitals({
                username: args.patientInput.username,
                age: parseInt(args.patientInput.age),
                sex: parseInt(args.patientInput.sex),
                cp: 0, 
                trestbps: 0,
                chol: 0,
                fbs: 0,
                restecg: 0,
                thalach: 0,
                exang: 0,
                oldpeak: 0,
                slope: 0,
                ca: 0,
                thal: 0,
            })

            const vitalResult = await vital.save();
            const result = await patient.save();
            return { username: patient.username, firstname: patient.firstname, lastname: patient.lastname };
    
            } catch (err) {
                console.log(err)
                throw err;
            }
        },

};