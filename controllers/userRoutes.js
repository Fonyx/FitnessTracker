const router = require('express').Router();

router.get("/", [], async(req, res) =>{
    try{
        res.send("User home screen")
    }catch(err){
        res.status(500).json(err.message)
    }
});

module.exports = router
