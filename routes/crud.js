const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

/**
 *  Crud Routes 
*/
router.get('/home', crudController.homepage);
router.get('/about', crudController.about);
router.get('/add', crudController.addCrud);
router.post('/add', crudController.postCrud);
router.get('/view/:id', crudController.view);
router.get('/edit/:id', crudController.edit);
router.put('/edit/:id', crudController.editPost);
router.delete('/edit/:id', crudController.deleteCrud);

router.post('/search', crudController.searchCruds);



module.exports = router;