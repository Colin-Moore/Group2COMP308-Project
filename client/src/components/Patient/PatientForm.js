import React, { Component } from "react";
import { Col, Row, Container, Card, Form } from "react-bootstrap";

import AuthContext from "../../AuthContext";
import {withRouter } from 'react-router-dom';

class PatientForm extends Component {
  state = {
    patients: [],
    isLogin: true
  };

  
  constructor(props) {
    super(props);
    this.history = History;
    this.firstname = React.createRef();
    this.lastname = React.createRef();
    this.age = React.createRef();
    this.sex = React.createRef();
  }

  static contextType = AuthContext;

  onSubmit = () => {
    const firstname = this.firstname.current.value;
    const lastname = this.lastname.current.value;
    const age = this.age.current.value;
    const sex = this.sex.current.value;
    
    let requestBody = {
        query: `
        mutation{createPatient(
            patientInput:{
                username: "${this.context.username}",
                firstname: "${firstname}",
                lastname: "${lastname}",
                age: ${age},
                sex: ${sex}
        }){
          username, firstname, lastname
        }}`
    }
    const token = this.context.token;

    console.log(requestBody)
    fetch('https://comp308.herokuapp.com/graphql', {
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
          const patients = resData.data.createPatient;
          this.setState({ patients: patients, isLoading: false });
          console.log(patients);
          this.props.history.push('/patienthome');
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        });
  }
  render(){
    return(
      <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Welcome!</h2>
                  <p className=" mb-5">Please Enter Your Information</p>
                  <div className="mb-3">
                  <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">
                    First Name
                  </Form.Label>
                  <Form.Control type="text"  name="firstname" ref={this.firstname}
                      placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">
                    Last Name
                  </Form.Label>
                  <Form.Control type="text"  name="lastname" ref={this.lastname}
                      placeholder="Last Name" />
                </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-center">
                    Age
                  </Form.Label>
                  <Form.Control type="number"  name="age" ref={this.age}
                      placeholder="52" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicSelect">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select aria-label="Default select example" ref={this.sex} >
                    <option>Select...</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </Form.Select>
                </Form.Group>
          </Form>
          <button className="d-grid btn btn-primary m-3" onClick={this.onSubmit}>Submit</button>
                    
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

          
    );
  }

}export default withRouter(PatientForm);
