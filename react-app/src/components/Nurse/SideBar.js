import React from 'react';
import AuthContext from '../../AuthContext';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const SideBar = (props) => {

  var context = React.useContext(AuthContext);

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
            <NavLink exact to="/nursehome" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/nvitals" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Enter Vitals</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/patientdetail" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Patient Details</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tips" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Daily Tips</CDBSidebarMenuItem>
            </NavLink>
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
    </div>
  );
};

export default SideBar;
