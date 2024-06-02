import React,{useState} from 'react';
import { Container,Col,Button,Row,Form } from 'react-bootstrap';
import axios from 'axios';




function AddStudent() {
//default structure of formdata
const [formData,setFormData] = useState({
    sname:'',
    age:'',
    grade:''
});

const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:value});
    console.log(formData);
}

const handleFormSubmit = async (e) =>{
    e.preventDefault();

    try{
        const response = await axios.post('http://localhost:5000/addstudent',formData);
        if(response.status === 200){
            console.log("student data added successfully");
            alert("Student added successfully");
        }
        else{
            console.log('failed to add the data');
        }

    }
    catch(error){
        console.error('error adding student',error.message);
    }
  
}

    return (
        <Container>
            <Row>
                <h1 className='display-5 text-center'>Add Student Record</h1>
            </Row>

            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className='mb-3' controlId='formBasicName'>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Enter your name'
                                name='sname'
                                value = {formData.sname}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicAge'>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder='Enter your name'
                                name='age'
                                min={15}
                                max={80}
                                value = {formData.age}
                                onChange={handleChange}
                            />
                        </Form.Group>


                        <Form.Group className='mb-3' controlId='formBasicGrade'>
                            <Form.Label>Grade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='Enter your Grade'
                                name='grade'
                                value = {formData.grade}
                                onChange={handleChange}
                         
                            />
                        </Form.Group>

                        <Button variant='primary' type='submit'>Submit</Button>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    );
}

export default AddStudent;