const express = require('express');
const router = express.Router();

const userRoutes = require("./studentsRoutes.js");

router.use(userRoutes);
  
module.exports = router;