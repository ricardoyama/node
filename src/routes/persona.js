const express = require('express');
const router = express.Router();

const personaController = require('../controllers/personasController');

router.get('/', personaController.list);
router.post('/add', personaController.save);
router.get('/update/:id', personaController.edit);
router.post('/update/:id', personaController.update);
router.get('/delete/:id', personaController.delete);
router.get('/datos', personaController.home);
router.get('/datos/:data', personaController.data);


module.exports = router;