import React, { Component, useTransition } from "react";
import SideBar from './SideBar';
import { Table } from "react-bootstrap";
import AuthContext from "../../AuthContext";
import Spinner from '../Spinner';

class NurseHome extends Component {
  state = {
    patients: [],
    isLoading: false
  }  

  componentDidMount() {
    this.fetchPatients();
  }

  makeTime = () => {
    let minHour = Math.floor(9)
    let maxHour = Math.floor(16)
    let minMinute = Math.floor(0)
    let maxMinute = Math.floor(59)
    let hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
    let minute = Math.floor(Math.random() * (maxMinute - minMinute + 1)) + minMinute * 10;

    let time = hour + ":" + minute;
    console.log(minute)
    console.log(time)
    return time;
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
  render(){
  return (
   
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <SideBar style={{ height: "100vh" }} />
    <main className='mx-auto mt-5'>
      
      <h1>Nurse Home</h1>
      {this.state.isLoading ? (
          <Spinner />
        ) : (
      <div>
        <h3 className="mb-5 mt-5"> Upcoming Appointments </h3>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Appointment Time</th>
        </tr>
      </thead>
     
 
       {this.state.patients.map(patient => (
 <tbody>
        <tr>
          <td>{patient.firstname}</td>
          <td>{patient.lastname}</td>
          <td>{this.makeTime()}</td>
        </tr>
      </tbody>
      ))}
    </Table>
      </div>
        )}
    </main>
  </div>
 );
}
}

export default NurseHome;

