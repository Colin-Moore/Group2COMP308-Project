import React, { Component } from "react";
import { Col, Row, Container, Card, Form } from "react-bootstrap";

import AuthContext from "../AuthContext";

class Login extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
  }

  onSubmit = () => {
    const username = this.username.current.value;
    const password = this.password.current.value;
    console.log(username + " - " + password)
    let requestBody = {
      query: `
        query {
          login(username: "${username}", password: "${password}") {
            userId
            username
            token
            tokenExpiration
            userType
          }
        }
      `
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
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.username,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
            resData.data.login.userType,
          );
        }
      })
      .catch(err => {
        alert("login failed ")
        console.log(err);
      });
  };
  

  render(){
  return(
    <div classname="mainpage">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Welcome</h2>
                  <p className=" mb-5">Please enter your login and password</p>
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
                 
                    </Form>
                    <button className="d-grid btn btn-primary m-3" onClick={this.onSubmit}>Submit</button>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/register" className="text-primary fw-bold">
                          Sign Up
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
export default Login;
