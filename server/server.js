const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Student } = require('./model');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/curdapp';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected"))
    .catch(err => {
        console.error('DB connection error:', err.message);
        process.exit(1);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/addstudent', async (req, res) => {
    const { sname, age, grade } = req.body;
    try {
        const newStudent = new Student({ sname, age, grade });
        await newStudent.save();
        const allStudents = await Student.find();
        return res.json(allStudents);
    } catch (err) {
        console.error('Error in /addstudent:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getstudents', async (req, res) => {
    try {
        const allStudents = await Student.find();
        return res.json(allStudents);
    } catch (err) {
        console.error('Error in /getstudents:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getstudents/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.json(student);
    } catch (err) {
        console.error('Error in /getstudents/:id:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/updatestudent/:id', async (req, res) => {
    const { sname, age, grade } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { sname, age, grade },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.json(updatedStudent);
    } catch (err) {
        console.error('Error in /updatestudent/:id:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/deletestudent/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.json({ message: 'Student record deleted successfully' });
    } catch (err) {
        console.error('Error in /deletestudent/:id:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
