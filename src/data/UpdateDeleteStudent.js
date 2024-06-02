import React, { useState, useEffect } from 'react';
import { Container, Col, Table, Row, Button, Form, Modal } from 'react-bootstrap';


function UpdateDeleteStudent() {
    // one: get the student data,
    // second: handling the modal popup,
    // third: set the current student.

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({ id: '', sname: '', age: '', grade: '' });


    //fetch the data to table;
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        fetch('http://localhost:5000/getstudents')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error))
    };

    //execute the delete Functionality

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/deletestudent/${id}`, { method: 'DELETE' })

        .then(response => response.json())
        .then(()=>{
            setStudents(students.filter(student => student._id !== id));
        })
        .catch(error =>console.error('Error deleting Student', error));
    };



    //handle edit
    const handleEdit = (student) => {
        setCurrentStudent(student);
        setShowModal(true);
    }

     //handle the save Changes

    const handleSave = () => {
        fetch(`http://localhost:5000/updatestudent/${currentStudent._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentStudent),
        })
            .then(response => response.json())
            .then(() => {
                setShowModal(false);
                fetchStudents();
            })
            .catch(error => console.error('Error updating student:', error));
        };

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setCurrentStudent({...currentStudent,[name]:value});
    }

   






    return (
       <Container>
            <Row>
                <h1 className='display-5 text-center'>Student Data Edit and Delete</h1>
            </Row>

            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>SNo</th>
                                <th>Student Name</th>
                                <th>Age</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {students.map((student, index) => (
                                <tr key ={student._id}>
                                    <th>{index+1}</th>
                                    <td>{student.sname}</td>
                                    <td>{student.age}</td>
                                    <td>{student.grade}</td>
                                    <td>
                                        <Button variant='warning' onClick={()=>handleEdit(student)}>Edit</Button>{' '}
                                        <Button variant='danger' onClick={()=>handleDelete(student._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                    </Table>
                </Col>


                <Col md={2}></Col>


                

            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form>
                        <Form.Group className='mb-3' controlId='formStudentName'>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='sname'
                                value = {currentStudent.sname}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formAge'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name='age'
                                value = {currentStudent.age}
                                onChange={handleSave}
                            />
                        </Form.Group>


                        <Form.Group className='mb-3' controlId='formGrade'>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control
                                type="text"
                                name='grade'
                                value = {currentStudent.grade}
                                onChange={handleChange}
                         
                            />
                        </Form.Group>
                   
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            </Row>
            </Container>
            
       
    )

}

export default UpdateDeleteStudent;