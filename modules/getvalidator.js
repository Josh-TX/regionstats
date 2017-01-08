function getValidator(filename){
	var validate = require('../validators/' + filename);
	return function(body){
		return new Promise(function(resolve, reject){
			var error = validate(body)
			if (error.none){
				resolve(body);
			}
			else{
				reject(error);
			}
		})
	}
}
module.exports = getValidator;