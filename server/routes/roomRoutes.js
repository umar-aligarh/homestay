const router = require('express').Router();
const User = require('../models/userAccountsModel');


router.route('add').post((req, res) => {
    const mob = req.body.mobNo;

    const newUser = new User({
       _id: mob
    });
   
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;