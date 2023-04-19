import './App.css';
//
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AuthContext from './AuthContext';

import Login from "./components/Login"
import Register from "./components/Register"
import NurseHome from './components/Nurse/NurseHome';
import PatientHome from './components/Patient/PatientHome';
import DailyTips from './components/Nurse/DailyTips';
import PatientDetails from './components/Nurse/PatientDetails';
import NurseVitals from './components/Nurse/NurseVitals';
import PatientVitals from './components/Patient/PatientVitals';
import Games from './components/Patient/Games';
import PatientForm from './components/Patient/PatientForm';

class App extends Component {
  state = {
    token: null,
    username: null,
    userId: null,
    userType: null
  };

  login = (token, username, userId, tokenExpiration, userType) => {
    this.setState({ token: token, username: username, userId: userId, userType: userType });
  };

  logout = () => {
    this.setState({ token: null, username: null, userId: null, userType: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              username: this.state.username,
              userId: this.state.userId,
              userType: this.state.userType,
              login: this.login,
              logout: this.logout
            }}
          >
            <main className="main-content">
              <Switch>
                
                {this.state.token && this.state.userType === "nurse" && <Redirect from="/" to="/nursehome" exact />}
                {this.state.token && this.state.userType === "patient" && <Redirect from="/" to="/patienthome" exact />}
                {this.state.token && this.state.userType === "nurse" && <Redirect from="/register" to="/nursehome" exact />}
                {this.state.token && this.state.userType === "patient" && <Redirect from="/register" to="/info" exact />}

                <Route path="/info" component={PatientForm}/>
                <Route path="/register" component={Register}/>

                {!this.state.token && (<Route path="/" component={Login} />)}

                {!this.state.token && !this.state.userType === "patient" && <Redirect to="/" exact />}
                {this.state.token &&(<Route path="/nursehome" component={NurseHome}/>)}
                {this.state.token &&(<Route path="/patienthome" component={PatientHome}/>)}
                {this.state.token &&(<Route path="/nvitals" component={NurseVitals}/>)}
                {this.state.token &&(<Route path="/tips" component={DailyTips}/>)}
                
                {!this.state.token && !this.state.userType === "nurse" && <Redirect to="/" exact />}
                {this.state.token &&(<Route path="/patientdetail" component={PatientDetails}/>)}
                {this.state.token &&(<Route path="/pvitals" component={PatientVitals}/>)}
                {this.state.token &&(<Route path="/games" component={Games}/>)}

                
               
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;