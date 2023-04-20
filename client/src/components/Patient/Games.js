import SideBar from './SideBar';
import { Component } from 'react';
import AuthContext from '../../AuthContext';
import Spinner from '../Spinner'

class Games extends Component {
  state = {
    isLoading: false,
    games: []
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchGames();
  }

  fetchGames = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            games{
              name, description
            }
          }`
    };
  
    fetch('https://comp308.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const games = resData.data.games;
        this.setState({ games: games, isLoading: false });
        console.log(games);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render(){
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <SideBar props={this.context} style={{ height: "100vh"}} />
        <main className='mx-auto'>
          <h1 className='mb-5 mt-5'> Games</h1>
          <div>
          {this.state.isLoading ? (
          <Spinner />
        ) : (
         
      <div className='gamedisplay'>
              {this.state.games.map(game => ( 
            
            <div class="card" style={{width: 250}}>
              <div class="card-body">
                <h5 class="card-title">{game.name}</h5>
                <p class="card-text">{game.description}</p>
                <a href="#" class="btn btn-primary">Play Game</a>
              </div>
            </div>
            ))}
            </div>
            )}  
          </div>
          
        </main>
      </div>
      
  );
  }
}
export default Games;

