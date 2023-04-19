const Game = require('../../models/game');

module.exports = {
    games: async () => {
        try {
          const games = await Game.find();
          return games.map(game => {
            return game;
          });
        } catch (err) {
          throw err;
        }
    },
    createGame: async (args) => {
      try {
        const existingGame = await Game.findOne({ name: args.gameInput.name });
        if (existingGame) {
          throw new Error('Game exists already.');
        }
  
        const game = new Game({
          name: args.gameInput.name,
          description: args.gameInput.description
        });
  
        const result = await game.save();
        return { name: game.name, description: game.description };

      } catch (err) {
        console.log(err)
        throw err;
      }


    },

}
