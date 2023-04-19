const Motivation = require('../../models/motivation');
const PatientTip = require('../../models/patientTips');

module.exports = {
    motivations: async () => {
        try {
          const motivations = await Motivation.find();
          return motivations.map(motivation => {
            return motivation;
          });
        } catch (err) {
          throw err;
        }
    },
    createMotivation: async (args) => {
      console.log(args.motivationInput.Title)
      try {
        const existingMotivation = await Motivation.findOne({ Title: args.motivationInput.Title });
        if (existingMotivation) {
          throw new Error('Tip exists already.');
        }
  
        const motivation = new Motivation({
          Title: args.motivationInput.Title,
          Body: args.motivationInput.Body
        });
  
        const result = await motivation.save();
        return { Title: motivation.Title, Body: motivation.Body };

      } catch (err) {
        console.log(err)
        throw err;
      }
    },

    getMotivation: async (args, req) => {
      if(!req.isAuth){
        throw new Error("Not Authorized for access!")
      }
      console.log(req.username)
      try {
        const motivations = await PatientTip.find({username: req.username});
        return motivations.map(motivation => {
          return motivation;
        });
      } catch (err) {
        throw err;
      }
     
  },

  sendMotivation: async (args) => {
  try{
      const existingTip = await PatientTip.findOne({username: args.username, Title: args.Title})
      if(existingTip){
        throw new Error('Tip already sent!');
      }

      const newTip = new PatientTip({
        username: args.username,
        Title: args.Title,
        Body: args.Body
      });
      const result = await newTip.save();
      return "Sent!";
    }
    catch(err){
      console.log(err);
      throw err;
    }
  },

  deleteMotivation: async (args) => {
    const motivation = await PatientTip.findOne({Title: args.Title}, {username: args.username})
    console.log(motivation._id)
    try{
      await PatientTip.deleteOne({_id: motivation._id})
    }
    catch(err){
      throw new Error("Problem deleting tip...  Try again later.")
    }
    return "Tip Deleted Successfully"
  }
}
