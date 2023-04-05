const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController')

router.get('/',  (req, res) => {
    res.status(200).render('base', {
      tour: "The Forest Hiker",
      user: "Jonas"
  
    })   //express automatically look for the 'base' file in the views folder
  })
  
  router.get('/', viewController.getOverview);
  
  router.get('/tour', viewController.getTour);


module.exports = router;
