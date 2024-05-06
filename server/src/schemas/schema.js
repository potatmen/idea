import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    name: String,
    year: Number,
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
