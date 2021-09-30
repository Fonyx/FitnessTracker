const router = require('express').Router();

router.get("/", [], async(req, res) =>{
    try{
        res.render("stats")
    }catch(err){
        res.status(500).json(err.message)
    }
});

module.exports = router
