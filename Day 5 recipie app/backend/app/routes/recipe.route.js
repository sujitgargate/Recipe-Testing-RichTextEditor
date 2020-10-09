var express = require("express");
const router = express.Router();
expressValidator = require("express-validator");
var recipeController = require("../controller/recipe.controller");
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});
router.use(expressValidator());
router.post("/",upload.single('file'), recipeController.create);
router.get("/", recipeController.get);
router.get("/:id", recipeController.getById);
router.put("/",upload.single('file'), recipeController.update)
router.delete("/:id", recipeController.delete);
router.post("/search", recipeController.getByName)
module.exports = router;


