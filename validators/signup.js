var signupValidate = (function(){
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

	function checkEmail(email){
		if (!email){
			return "enter an email";
		}
		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!regex.test(email)){
			return "invalid email";
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
	function checkConfirm(password, confirm){
		if (!confirm){
			return "re-enter your password";
		}
		if (password != confirm){
			return "passwords don't match";
		}
		return "";
	}

	function validate(obj){
		var error = {};
		error.username = checkUsername(obj.username);
		error.email = checkEmail(obj.email);
		error.password = checkPassword(obj.password);
		error.confirm = checkConfirm(obj.password, obj.confirm);
		error.none = !error.username && !error.email && !error.password && !error.confirm;
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = signupValidate