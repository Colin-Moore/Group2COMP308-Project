import SideBar from './SideBar';
import React, { Component } from 'react';
import AuthContext from '../../AuthContext';
import Modal from 'react-bootstrap/Modal';
import {Button, Form} from 'react-bootstrap';
import Spinner from '../Spinner'

class DailyTips extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: false,
      motivations: [],
      patients: [],
      showPatient: false,
      showTip: false,
      Title: "",
      Body: ""
    };
    
    this.newTitle = React.createRef();
    this.newBody = React.createRef();
    this.username = React.createRef();
    this.showTipModal = this.showTipModal.bind(this);
    this.hideTipModal = this.hideTipModal.bind(this);
    this.showPatientModal = this.showPatientModal.bind(this);
    this.hidePatientModal = this.hidePatientModal.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchMotivations();
    this.fetchPatients();
  }

  showTipModal = () => {
    this.setState({ showTip: true });
  };

  hideTipModal = () => {
    this.setState({ showTip: false });
  };
  showPatientModal = (title, body) => {
    this.setState({ Title: title});
    this.setState({ Body: body });
    this.setState({ showPatient: true });
  };

  hidePatientModal = () => {
    this.setState({ showPatient: false });
  };

  fetchMotivations = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
           motivations{Title, Body}
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
        console.log(resData)
        const motivations = resData.data.motivations;
        this.setState({ motivations: motivations, isLoading: false });
        console.log(motivations);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
        
      });
  };

  fetchPatients = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
           getUsers{username}
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
        console.log(resData)
        const patients = resData.data.getUsers;
        this.setState({ patients: patients, isLoading: false });
        console.log(patients);
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  saveTip = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      mutation{
        createMotivation(
          motivationInput:{
            Title:"${this.newTitle.current.value}",
            Body:"${this.newBody.current.value}"
          })
          {
            Title,
            Body
          }}
        `
    };
    console.log(requestBody)
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
        this.state.motivations.push(resData.data.createMotivation)
        console.log(resData)
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
    this.hideTipModal();
  }

  sendToPatient = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      mutation{sendMotivation(username:"${this.username.current.value}", 
      Title:"${this.state.Title}",
      Body: "${this.state.Body}")}`
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
        console.log(resData)
        
        this.setState({ isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
    this.hidePatientModal();
  }

  render(){
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <SideBar style={{ height: "100vh"}} />
        <main className='mx-auto'>
          <h1 className='mt-5 mb-5'> Daily Tips</h1>
          {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
          <div className='motivationdisplay'>
        
              {this.state.motivations.map(motivation => ( 
            
            <div class="card" style={{width: 250}}>
              <div class="card-body">
                <h5 class="card-title">{motivation.Title}</h5>
                <p class="card-text">{motivation.Body}</p>   
                <button className="btn btn-primary" value={[motivation.Title, motivation.Body]} onClick={() => this.showPatientModal(motivation.Title, motivation.Body)}>
                Send to Patient
              </button>
              </div>
            </div>
            ))}
       
          </div>     
          </div>
        )}
           <Button variant="primary" className='mt-5' onClick={this.showTipModal}>
              Add New Tip
            </Button>
        <Modal show={this.state.showPatient} onHide={this.hidePatientModal}>
          <Modal.Header closeButton>
            <Modal.Title>Select a Patient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="formBasicSelect">
              <Form.Label>Patient:</Form.Label>
              <Form.Select aria-label="Default select example" ref={this.username} >
                <option>Select Patient</option>
                {this.state.patients.map(patient => (
                  <option value={patient.username}>{patient.username}</option> 
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hidePatientModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.sendToPatient}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      
        <Modal show={this.state.showTip} onHide={this.hideTipModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Tip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">
              Title
            </Form.Label>
            <Form.Control type="text"  name="title" ref={this.newTitle}
                placeholder="title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-center">
              Message
            </Form.Label>
            <Form.Control type="text"  name="body" ref={this.newBody}
                placeholder="message" />
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideTipModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveTip}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        </main>
      </div>
      
  );
  }
}
export default DailyTips;

