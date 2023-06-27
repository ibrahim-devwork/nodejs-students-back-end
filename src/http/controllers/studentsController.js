const db = require('../../../models/index.js');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

const getAllStudents = async (request, response, next) => {
    try {
        
        const { page, pageSize, search } = request.body;
        console.log(pageSize)
        const { docs, pages, total } = await db.Student.paginate({
            attributes: [
                'id',
                'firstName',
                'lastName',
                'dateOfBirth',
                [Sequelize.literal('FLOOR(DATEDIFF(CURDATE(), dateOfBirth) / 365)'), 'age'],
                'email'
            ],
            page: +page,
            paginate: +pageSize,
            order: [['id',  'DESC']],
            where : 
            { 
                [Op.or]: [
                  { firstName: { [Op.like]: `%${search}%` } },
                  { lastName: { [Op.like]: `%${search}%` } },
                  { email: { [Op.like]: `%${search}%` } }
                ]
            }
        });

        response.status(200).json({
            students: docs,
            totalPages: pages,
            totalCount: total,
        });

    } catch(error) {
        console.log(error.message)
        response.status(500).json({ message: 'Server error !' });
    }
}

const geStudentById = async (request, response, next) => {
    try {
        const student = await db.Student.findOne({ where: { id: request.params.id } });

        if (!student) {
            return response.status(422).json({ error: 'Student not found' });
        }

        response.status(201).json(student);

    } catch(error) {
        console.log(error.message)
        response.status(500).json({ message: 'Server error !' });
    }
}

const createStudent = async (request, response, next) => {
    try {
        await db.Student.create({
            firstName   : request.body.firstName, 
            lastName    : request.body.lastName, 
            dateOfBirth : request.body.dateOfBirth, 
            email       : request.body.email
        });
        response.status(201).json({ message: 'Student has been created successfully' });

    } catch(error) {
        console.log(error.message)
        response.status(500).json({ message: 'Server error !' });
    }
}

const updateStudent = async (request, response, next) => {
    try {
        const student = await db.Student.findOne({ where: { id: request.params.id } });

        if (!student) {
            return response.status(422).json({ error: 'Student not found' });
        }

        student.firstName   = request.body.firstName; 
        student.lastName    = request.body.lastName; 
        student.dateOfBirth = request.body.dateOfBirth; 
        student.email       = request.body.email; 
        await student.save();

        response.status(200).json({ message: 'Student has been updated successfully' });

    } catch(error) {
        console.log(error.message)
        response.status(500).json({ message: 'Server error !' });
    }
}

const deleteStudent = async (request, response, next) => {
    try {
        const student = await db.Student.findOne({ where: { id: request.params.id } });

        if (!student) {
            return response.status(422).json({ error: 'Student not found' });
        }

        await student.destroy();
        response.status(200).json({ message: 'Student has been deleted successfully' });

    } catch(error) {
        console.log(error.message)
        response.status(500).json({ message: 'Server error !' });
    }
}

module.exports = {
    getAllStudents,
    geStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}