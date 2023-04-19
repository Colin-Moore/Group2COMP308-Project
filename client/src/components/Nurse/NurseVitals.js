import React, { Component, useTransition } from "react";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SideBar from './SideBar';
import AuthContext from "../../AuthContext";

class NurseVitals extends Component {
  state = {
    patients: [],
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.age = React.createRef();
    this.sex = React.createRef();
    this.cp = React.createRef();
    this.trestbps = React.createRef();
    this.chol = React.createRef();
    this.fbs = React.createRef();
    this.restecg = React.createRef();
    this.thalach = React.createRef();
    this.exang = React.createRef();
    this.oldpeak = React.createRef();
    this.slope = React.createRef();
    this.ca = React.createRef();
    this.thal = React.createRef();
  }
  static contextType = AuthContext;

  componentDidMount() {
    this.fetchPatients();
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
  
    fetch('http://localhost:4000/graphql', {
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
      });
  };


  onSubmit = () => {
    const username = this.username.current.value;
    const cp = this.cp.current.value;
    const trestbps = this.trestbps.current.value;
    const chol = this.chol.current.value;
    const fbs = this.fbs.current.value;
    const restecg = this.restecg.current.value;
    const thalach = this.thalach.current.value;
    const exang = this.exang.current.value;
    const oldpeak = this.oldpeak.current.value;
    const ca = this.ca.current.value;
    const slope = this.slope.current.value;
    const thal = this.thal.current.value;
    let requestBody = {
      query: `
      mutation{inputVitals(
        nurseVitalsInput:{
          username:"${username}",
          cp:${cp},
          trestbps:${trestbps},
          chol:${chol},
          fbs:${fbs},
          restecg:${restecg},
          thalach:${thalach},
          exang:${exang},
          oldpeak:${oldpeak},
          slope:${slope},
          ca:${ca},
          thal:${thal}
        })}
      `
    };
    
    console.log(requestBody)
    fetch('http://localhost:4000/graphql', {
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
      alert("Patient vitals updated.")
      this.props.history.push('/nursehome');
    })
    .catch(err => {
      console.log(err);
    });
};

  render(){
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <SideBar style={{ height: "100vh"}} />

    <main className='mx-auto'>
      <div className="vitals">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">

            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Enter Patient Vitals</h2>
                  
                  <div className="vitals-grid">
                    <Form>
                      
                      <Col className="vitals-grid-child">
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicSelect">
                      <Form.Label>Patient:</Form.Label>
                      <Form.Select aria-label="Default select example" ref={this.username} >
                        <option>Select Patient</option>
                        {this.state.patients.map(patient => (
                          <option value={patient.username}>{patient.lastname}, {patient.firstname}</option> 
                        ))}
                      </Form.Select>
                    </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>Constrictive Pericarditis</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.cp} >
                          <option>Select...</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Resting Blood Pressure
                        </Form.Label>
                        <Form.Control type="number"  name="trestbps" ref={this.trestbps}
                            placeholder="122" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Serum Cholestoral in mg/dl
                        </Form.Label>
                        <Form.Control type="number"  name="chol" ref={this.chol}
                            placeholder="200" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>Fasting Blood Sugar over 120mg/dl</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.fbs} >
                          <option>Select...</option>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Resting Electrocardiographic Results
                        </Form.Label>
                        <Form.Control type="number"  name="restecg" ref={this.restecg}
                            placeholder="0 - 2" />
                      </Form.Group>
                      </Col>
                      <Col className="vitals-grid-child">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Maximum Heart Rate Achieved
                        </Form.Label>
                        <Form.Control type="number"  name="thalach" ref={this.thalach}
                            placeholder="122" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>Exercise Induced Angina</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.exang} >
                          <option>Select...</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          ST Depression Induced By Exercise
                        </Form.Label>
                        <Form.Control type="number"  name="oldpeak" ref={this.oldpeak}
                            placeholder="1.5" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Slope of Peak Exercise ST Segment
                        </Form.Label>
                        <Form.Control type="number"  name="slope" ref={this.slope}
                            placeholder="0 - 2" />
                      </Form.Group>
                      
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>Number of Major Vessels Colored By Flouroscopy</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.ca} >
                          <option>Select...</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>Thalassemia</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.thal} >
                          <option>Select...</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </Form.Select>
                      </Form.Group>
                      </Col>
                      
                    </Form>
                    </div>
                    <button className="d-grid btn btn-primary mx-auto mt-5" id="btn1" onClick={this.onSubmit}>Save</button>
                   
                  
                </div>
              </Card.Body>
            </Card>
      
        </Row>
      </Container>
      </div>
      </main>
  </div>
 );
}
}
export default withRouter(NurseVitals);

