var uploadRegionValidate = (function(){
	function checkFile(arr){
		if (!arr){
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
			if (arr[i].length > 32){
				return 'region "' + arr[i].substr + '" too long (limit 32 characters)';
			}
		}
		return "";
	}
	function checkParent(num){
		if (!num){
			return "select a parent region";
		}
		if (/\d/.test(num)){
			return "invalid region id";
		}
	}
	function checkType(num){
		if (!num){
			return "select a region type";
		}
		if (/\d/.test(num)){
			return "invalid region type id";
		}
	}

	function validate(obj){
		var error = {};
		error.file = checkFile(obj.data);
		error.parent = checkParent(obj.parent);
		error.type = checkType(obj.type);
		error.none = !error.encoding && !error.parent && !error.type;
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = uploadRegionValidate