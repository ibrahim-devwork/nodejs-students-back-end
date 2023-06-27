const express   = require('express');
const router    = express.Router();

const studentsController    = require("../http/controllers/studentsController.js");
const studentsRequest    = require("../http/requests/studentsRequest.js");

router.post('/api/students-all',            studentsRequest.getAllStudentsValidator, studentsController.getAllStudents);
router.get('/api/student-one/:id',          studentsController.geStudentById);
router.post('/api/students-create',         studentsRequest.createStudentValidator, studentsController.createStudent);
router.put('/api/students-update/:id',      studentsRequest.updateStudentValidator, studentsController.updateStudent);
router.delete('/api/students-delete/:id',   studentsController.deleteStudent);

  
module.exports = router;