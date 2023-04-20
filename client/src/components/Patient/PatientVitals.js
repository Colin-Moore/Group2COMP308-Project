import React, { Component } from "react";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import SideBar from './SideBar';
import AuthContext from "../../AuthContext";
import {withRouter } from 'react-router-dom';

class PatientVitals extends Component {
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
  onSubmit = () => {
    const username = this.context.username;
    const trestbps = this.trestbps.current.value;
    const fbs = this.fbs.current.value;
    const thalach = this.thalach.current.value;
    const exang = this.exang.current.value;

    let requestBody = {
      query: `
      mutation{inputPatientVitals(
        patientVitalsInput:{
          username:"${username}",
          trestbps:${trestbps},
          fbs:${fbs},
          thalach:${thalach},
          exang:${exang},
        })}
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
      console.log(resData)
      alert("Vitals updated.")
      this.props.history.push('/patienthome');
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
      <div className="vitals">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Enter Vitals</h2>
                  <div className="vitals-grid">
                    <Form>
                      <Col className="vitals-grid-child">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Resting Blood Pressure
                        </Form.Label>
                        <Form.Control type="number"  name="trestbps" ref={this.trestbps}
                            placeholder="122" />
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
export default withRouter(PatientVitals);

