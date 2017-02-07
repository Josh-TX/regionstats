var uploadSourceValidate = (function(){
	/*function checkData(arr){
		if (typeof arr != "object" || arr.length === 0){
			return "select a file";
		}
		arr.sort()
		var prev = "";
		for (var i = 0; i < arr.length; i++){
			if (prev == arr[i]){
				arr.splice(i, 1); //remove duplicates
			}
			prev = arr[i];
			if (/\uFFFD/.test(arr[i])){
				return "Invalid unicode characters in file";
			}
			if (arr[i].length > 40){
				return 'region "' + arr[i].substr(0, 40) + '..." too long (limit 32 characters)';
			}
		}
		return "";
	}*/
	function checkParent(num){
		//console.log("Region type of " + num + "is: " + (typeof num));
		if (typeof num == "undefined"){
			return "select a parent region";
		}
		if (!/\d/.test(num)){
			return "invalid region id";
		}
		return "";
	}
	function checkType(num){
		//console.log("Publisher type: " + (typeof num));
		if (typeof num == "undefined"){
			return "select a region type";
		}
		if (!/\d/.test(num)){
			return "invalid region type id";
		}
		return "";
	}

	function checkText(text) {
		if (typeof text == "undefined" || !text.length > 0)
			return "enter text!";
		else
			return "";
	}

	function validate(obj){
		var error = {};
		//console.log("Data: " + JSON.stringify(obj));
		error.parent = checkParent(obj.region);
		error.type = checkType(obj.publisher);
		error.title = checkText(obj.title);
		error.url = checkText(obj.url);
		error.none = !error.parent && !error.type && !error.title && !error.url;
		//console.log("Errors: " + JSON.stringify(error));
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = uploadSourceValidate