import React,{useState,useEffect} from 'react';
import { Container,Col,Table,Row } from 'react-bootstrap';


function StudentData() {
//defining the state
const [students,setStudents] = useState([]);

//with user effect functionality acces the data fron the end point

useEffect(()=>{
    //fetch the students
    fetch('http://localhost:5000/getstudents')
    .then(response =>response.json())
    .then(data=>setStudents(data))
    .catch(error => console.error('error on fetching data:',error));
},[]);

    return (
   <Container>
        <Row>
            <h1 className='display-4 text-center'>Student Data</h1>
        </Row>

        <Row>
            <Col md={2}></Col>
            <Col md={8}>
            <Table striped bordered hover>

      <thead>
        <tr>
          <td>S No</td>
          <td>Student Name</td>
          <td>Age</td>
          <td>Grade</td>
        </tr>
  
    
      </thead>
      <tbody>
        {students.map((student,index)=>(
       
        <tr key={index}>
          <th>{index+1}</th>
          <th>{student.sname}</th>
          <th>{student.age}</th>
          <th>{student.grade}</th>
        </tr>
        ))
}


      </tbody>
    </Table>
            </Col>
            <Col md={2}></Col>
        </Row>
   </Container>
    );
}

export default StudentData;