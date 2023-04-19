import SideBar from './SideBar';
import { Component } from 'react';
import AuthContext from '../../AuthContext';
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from 'react-bootstrap';
import Spinner from '../Spinner';

///Need to fix loading of tip so it shows the correct message!///


class PatientHome extends Component {
  constructor(){
    super();
  this.state = {
    isLoading: false,
    motivations: [],
    Body: "",
    Title: "",
    username: AuthContext.username
  };
  this.showModal = this.showModal.bind(this);
  this.hideModal = this.hideModal.bind(this);
  }

  static contextType = AuthContext;
  
  componentDidMount() {
    this.fetchMotivations();
  }

  showModal = (title, body) => {
    this.setState({ Title: title})
    this.setState({ Body: body})
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  deleteTip = () =>{
    this.setState({isLoading: true})
    const requestBody = {
      query:`  mutation{deleteMotivation(Title:"${this.state.Title}", username:"${this.context.username}")}`
    };
    const token = this.context.token;
    console.log(requestBody)
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        const message = resData.data.deleteMotivation;
        this.setState({isLoading: false})
        alert(message)
        this.fetchMotivations()
      })
      .catch(err => {
        console.log(err);
      });
      this.hideModal();
  }

  fetchMotivations = () => {
    console.log(this.context.token)
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      query{
        getMotivation(
          tipInput:{
            username:"${this.context.username}"
          })
          {
            Title
            Body
          }
        }`
    };
    const token = this.context.token;
   console.log(requestBody)
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        const motivations = resData.data.getMotivation;
        this.setState({ motivations: motivations, isLoading: false });
        console.log(motivations);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render(){
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
      <SideBar props={this.context} style={{ height: "100vh"}} />
      <main className='mx-auto'>
        <h1 className='mx-auto mb-5 mt-5'> Daily Tips</h1>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
        <div className='motivationdisplay'>
      
        {this.state.motivations.map(motivation => ( 
          
          <div class="card" style={{width: 250}}>
            <div class="card-body">
              <h5 class="card-title">{motivation.Title}</h5>   
              <button className="btn btn-primary" value={[motivation.Title, motivation.Body]} onClick={() => this.showModal(motivation.Title, motivation.Body)}>
              View Tip
            </button>
            </div>
          </div>
          ))}
          </div>
        )}
          <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.Body}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="danger" onClick={this.deleteTip}>
              Delete Tip
            </Button>
          </Modal.Footer>
        </Modal>
        </main>
      </div>
      
  );
  }
}

export default PatientHome;

