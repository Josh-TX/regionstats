var loginValidate = (function(){
	function checkUsername(username){
		if (!username){
			return "enter a username";
		}
		if (username.length < 2){
			return "username too short";
		}
		if (username.length > 20){
			return "username too long";
		}
		return "";
	}

	function checkPassword(password){
		if (!password){
			return "enter a password";
		}
		if (password.length < 4){
			return "password too short";
		}
		if (password.length > 40){
			return "password too long";
		}
		return "";
	}

	function validate(obj){
		var error = {};
		error.username = checkUsername(obj.username);
		error.password = checkPassword(obj.password);
		error.none = !error.username && !error.password;
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = loginValidate