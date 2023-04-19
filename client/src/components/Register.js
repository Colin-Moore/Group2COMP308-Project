import { step } from "@tensorflow/tfjs";
import React, { Component, useTransition } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import AuthContext from "../AuthContext";

class Register extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.userType = React.createRef();
  }

  onSubmit = () => {
    const username = this.username.current.value;
    const password = this.password.current.value;
    const userType = this.userType.current.value;
    let requestBody = {
      query: `
        mutation{
           register(
            registerInput:{
              username:"${username}", 
              password:"${password}", 
              userType:"${userType}"
            }){
              userId
              username
              token
              tokenExpiration
              userType
          }
        }
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
      if (resData.data.register.token) {
        this.context.login(
          resData.data.register.token,
          resData.data.register.username,
          resData.data.register.userId,
          resData.data.register.tokenExpiration,
          resData.data.register.userType,
        );
      }
    })
    .catch(err => {
      console.log(err);
    });
};

  
  render(){
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Welcome</h2>
                  <p className=" mb-5">Register Now!</p>
                  <div className="mb-3">
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text"  name="username" ref={this.username}
                            placeholder="Username" />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  name="password" ref={this.password} 
                            placeholder="Password" />  
                      </Form.Group>    
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicSelect">
                        <Form.Label>User Type</Form.Label>
                        <Form.Select aria-label="Default select example" ref={this.userType} >
                          <option>Select User Type</option>
                          <option value="nurse">Nurse</option>
                          <option value="patient">Patient</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                    <button className="d-grid btn btn-primary m-3" onClick={this.onSubmit}>Submit</button>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="/" className="text-primary fw-bold">
                          Log In
                        </a>
                      </p>
                    </div>
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
}
export default Register;