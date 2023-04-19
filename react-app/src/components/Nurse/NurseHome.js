import SideBar from './SideBar';
import { BrowserRouter as Router } from 'react-router-dom';

function NurseHome() {
  
  return (
   
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <SideBar style={{ height: "100vh" }} />
    <main className='mx-auto mt-5'>
      
      <h1>Nurse Home</h1>
    </main>
  </div>
 );
}

export default NurseHome;

