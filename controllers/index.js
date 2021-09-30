const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const workoutRoutes = require('./workoutRoutes');

router.use("/", homeRoutes)
router.use("/exercise", exerciseRoutes);
router.use("/workout", workoutRoutes);


module.exports = router