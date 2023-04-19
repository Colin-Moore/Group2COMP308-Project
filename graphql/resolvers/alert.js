const Alert = require('../../models/alert');

module.exports = {
    alerts: async () => {
        try {
          const alerts = await Alert.find();
          return alerts.map(alert => {
            return alert;
          });
        } catch (err) {
          throw err;
        }
    },
    createAlert: async (args) => {
     
        const alert = new Alert({
          userId: args.alertInput.userId,
          Message: args.alertInput.Message
        });
  
        const result = await alert.save();
        return{ Message: args.alertInput.Message}

    },
}
