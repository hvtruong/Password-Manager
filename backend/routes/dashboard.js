const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const multer = require('multer');

 //Multer DiskStorage Config 
const diskStorage = multer.diskStorage(
{ destination: 'assets/profile_upload'} );

 //Create Multer Instance
const upload = multer({ storage: diskStorage });

router.route('/')
  .get(passwordController.getAllPasswords)
  .post(passwordController.createNewPassword)
  .put(passwordController.updatePassword)
  .delete(passwordController.deletePassword)

  router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);

   //removed the rest of the code to keep it simple. req.file here is always undefined.

});

module.exports = router;