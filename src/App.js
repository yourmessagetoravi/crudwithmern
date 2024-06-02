

import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Headercomp from './general/header';
//below components are routes
import StudentData from './data/StudentData';
import AddStudent from './data/AddStudent';
import UpdateDeleteStudent from './data/UpdateDeleteStudent';


function App() {
  return (
   <Router>
    <Headercomp/>

      <Routes>
        <Route path = "/" element={<StudentData/>}/>
        <Route path="/addstudent" element={<AddStudent/>}/>
        <Route path="updatedelete" element={<UpdateDeleteStudent/>}/>
   
    </Routes>
    </Router>
  
 
  );
}

export default App;
