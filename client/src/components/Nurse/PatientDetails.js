import SideBar from './SideBar';
import React, { Component } from 'react';
import {  Form } from 'react-bootstrap';
import Spinner from '../Spinner';

///fix select box from changing back to "select" when patient has been selected.

class PatientDetails extends Component{
  state = {
    patients: [],
    age :'--',
    sex :'--',
    cp : '--',
    trestbps :'--',
    chol :'--',
    fbs :'--',
    restecg :'--',
    thalach :'--',
    exang :'--',
    oldpeak :'--',
    slope :'--',
    ca : '--',
    thal :'--',
    firstname: "",
    username: "",
    lastname: "",
   
  }
  constructor(props){
    super();
    this.user = React.createRef();
  }

  componentDidMount(){
    this.fetchPatients();
  }

  splitUser = () => {

      this.loadPatient()
  }


  fetchPatients = () => {
    
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
           getPatients{
            username, firstname, lastname
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
      console.log(resData)
      const patients = resData.data.getPatients;
      this.setState({ patients: patients, isLoading: false });
      console.log(patients);
    })
    .catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    });
  };


  loadPatient = () => {

    var user = this.user.current.value.split(",")
    this.setState({username: user[0]})
    this.setState({lastname: user[1]})
    this.setState({firstname: user[2]})
    

    const requestBody = {
      query: `
          query {
           getVitals(username:"${user[0]}"){
            age,
            sex,
            cp,
            trestbps,
            chol,
            fbs,
            restecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal,
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
      console.log(resData)
      const vitals = resData.data.getVitals;
      this.setState({ vitals: vitals, isLoading: false });
      this.setState({ age : resData.data.getVitals.age});
      this.setState({ sex : resData.data.getVitals.sex});
      this.setState({ cp : resData.data.getVitals.cp});
      this.setState({ trestbps : resData.data.getVitals.trestbps});
      this.setState({ chol : resData.data.getVitals.chol});
      this.setState({ fbs : resData.data.getVitals.fbs});
      this.setState({ restecg : resData.data.getVitals.restecg});
      this.setState({ thalach : resData.data.getVitals.thalach});
      this.setState({ exang : resData.data.getVitals.exang});
      this.setState({ oldpeak : resData.data.getVitals.oldpeak});
      this.setState({ slope : resData.data.getVitals.slope});
      this.setState({ ca : resData.data.getVitals.ca});
      this.setState({ thal : resData.data.getVitals.thal});
    })
    .catch(err => {
      console.log(err);
    });
  };

  checkPatient = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
      mutation{trainAndPredict(username: "${this.state.username}")
      }`
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
      console.log(resData)
      this.setState({ isLoading: false });
      let heartpredict = resData.data.trainAndPredict[0] * 100 ;
      alert("Your patient has a " + Math.round(heartpredict * 10) / 10 + "% chance of having heart disease.")


    })
    .catch(err => {
      console.log(err); 
    }); 
    
  };

  render(){
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <SideBar style={{ height: "100vh" }} />
    <main className='mx-auto'>
      <h1 className='mb-5 mt-5'> Patient Details</h1>
      {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
        <div className='d-flex'>
        <Form.Group
          className="mb-3 p_select"
          controlId="formBasicSelect">
          
          <Form.Select aria-label="Default select example" onChange={this.loadPatient}  ref={this.user} >
            <option>Select Patient</option>
            {this.state.patients.map(patient => (
              <option value={patient.username + "," + patient.lastname + "," + patient.firstname} >{patient.lastname}, {patient.firstname}</option> 
            ))}
          </Form.Select>
        </Form.Group>
        </div>
        <div className='patient_info'>
          <h5>Details for: {this.state.lastname}, {this.state.firstname}</h5>
        <p>Constrictive Pericarditis:   {this.state.cp}</p>
        <p>Resting Blood Pressure:   {this.state.trestbps}</p>
        <p>Serum Cholestoral in mg/dl:   {this.state.chol}</p>
        <p>Fasting Blood Sugar over 120mg/dl:   {this.state.fbs}</p>
        <p>Resting Electrocardiographic Results:   {this.state.restecg}</p>
        <p>Maximum Heart Rate Achieved:   {this.state.thalach}</p>
        <p>Exercise Induced Angina:   {this.state.exang}</p>
        <p>ST Depression Induced By Exercise:   {this.state.oldpeak}</p>
        <p>Slope of Peak Exercise ST Segment:   {this.state.slope}</p>
        <p>Number of Major Vessels Colored By Flouroscopy:   {this.state.ca}</p>
        <p>Thalassemia:   {this.state.thal}</p>

        <button className='btn btn-primary' onClick={this.checkPatient}>Check for heart disease</button>
        </div>
        </div>
        )}
    </main>
  </div>
 );
}
}
export default PatientDetails;

