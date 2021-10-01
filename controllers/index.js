const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const statsRoutes = require('./statRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const workoutRoutes = require('./workoutRoutes');
const apiRoutes = require('./apiRoutes');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/stats", statsRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/workout", workoutRoutes);


module.exports = router