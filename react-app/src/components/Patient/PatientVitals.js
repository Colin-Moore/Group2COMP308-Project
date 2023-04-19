import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './SideBar';

function PatientVitals() {
  return (
    <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
    <SideBar  style={{ height: "100vh"}} />
    <main className='mx-auto'>
      <h1 className='mt-5'> Patient Vitals</h1>
    </main>
  </div>
 );
}

export default PatientVitals;

