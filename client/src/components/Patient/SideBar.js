import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../AuthContext';

const SideBar = (props) => {
  
  const context = React.useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("I need assistance");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function sendAlert(){
    console.log(props.props)
       const requestBody = {
      query: `
      mutation{createAlert(alertInput:{
        userId:"${props.props.userId}", 
        Message: "${message}"}){
          Message
        }}`
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
        alert("Alert Sent!");
      })
      .catch(err => {
        console.log(err);
      });

    setShow(false);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Quick Links
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/patienthome" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/games" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Fitness Games</CDBSidebarMenuItem>
            </NavLink>
            <NavLink className='mb-5' exact to="/pvitals" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Enter Vitals</CDBSidebarMenuItem>
            </NavLink>
            <Button onClick={handleShow} className='mt-5 alert btn-danger'>
              <CDBSidebarMenuItem icon="exclamation">Send Alert</CDBSidebarMenuItem>
              </Button>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <NavLink exact to="/" onClick={context.logout} activeClassName="activeClicked">
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Logout
          </div>
        </CDBSidebarFooter>
        </NavLink>
      </CDBSidebar>
      <Modal show={show} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Enter your message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setMessage(e.target.value)}>
            <Form.Label className="text-center">
              Message
            </Form.Label>
            <Form.Control type="text"  name="title"
                placeholder="enter your message here" />
          </Form.Group>
          <p>If you don't enter a message, a default alert message will be sent.</p>
          <p>Default message: "I need assistance".</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => sendAlert()}>
              Send
            </Button>
          </Modal.Footer>
          </Modal>
    </div>
  );
};

export default SideBar;
