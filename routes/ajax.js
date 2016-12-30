var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/region', function(req, res, next) {
	next("I think this is an error");
	return;
	res.send("ajax controller, /region get");
});

router.get('/', function(req, res, next) {
	res.send("ajax controller, / get");
});

module.exports = router;
