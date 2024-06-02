const mongoose = require('mongoose');

// Define the Student schema
const StudentSchema = mongoose.Schema({
    sname: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
});

// Define the RegisteredUser schema
const RegisteredUserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
});

// Create the models
const Student = mongoose.model("Student", StudentSchema);
const RegisteredUser = mongoose.model("RegisteredUser", RegisteredUserSchema);

// Export the models
module.exports = { Student, RegisteredUser };
