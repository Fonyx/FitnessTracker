const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.use("/", userRoutes);
router.use("/api", apiRoutes);


module.exports = router