var dataValidate = (function(){
	function checkStatCount(count){
		if (typeof count != "number" || count < 1){
			return "invalid stat count";
		}
		return "";
	}

	function checkCats(cats, count){
		var error = {}
		if (!cats || cats.length != count){
			error[0] = "category count doesn't match stat count"
			return error;
		}
		for (var i = 0; i < count; i++){
			if (typeof cats[i] != "number" || cats[i] < 0){
				error[i] = "select a category"				
			}
		}
		return error;
	}
	function checkTitles(titles, count){
		var error = {}
		if (!titles || titles.length != count){
			error[0] = "title count doesn't match stat count";
			return error;
		}
		for (var i = 0; i < count; i++){
			if (/\d+/.test(titles[i])){
				continue;
			}
			if (typeof titles[i] != "string" || titles[i].length == 0){
				error[i] = "enter a title"				;
			}
			else if (titles[i].length < 3){
				error[i] = "title too short";
			}
			else if (titles[i].length > 40){
				error[i] = "title over 40 characters";
			}	
		}
		return error;
	}
	
	function checkCriteria(criteria, count){
		var error = {}
		if (!criteria || criteria.length != count){
			error[0] = "criteria count doesn't match stat count";
			return error;
		}
		for (var i = 0; i < count; i++){
			if (!Array.isArray(criteria[i]) || criteria[i].length > 3){
				error[i] = "criteria not a valid array";
			}
			for (var j = 0; j < criteria[i].length; j++){
				if (/\d+/.test(criteria[i][j])){
					continue;
				}
				if (typeof criteria[i][j] != "string" || criteria[i][j].length == 0){
					error[i + " " + j] = "enter a criteria";
				}
				else if (criteria[i][j].length < 3){
					error[i + " " + j] = "criteria too short";
				}
				else if (criteria[i][j].length > 40){
					error[i + " " + j] = "criteria too over 50 characters";
				}	
			}
			
		}
		return error;
	}
	
	var currentYear = new Date().getFullYear();
	function checkYears(years, count){
		var error = {};
		if (!years || years.length != count){
			error[0] = "year count doesn't match stat count";
			return error;
		}
		for (var i = 0; i < count; i++){
			if (typeof years[i] != "number" || years[i] <= 0){
				error[i] = "enter a year";
			}
			else if (years[i] < 1900 || years[i] > currentYear){
				error[i] = "invalid year";
			}
		}
		return error;
	}

	function validate(obj){
		var error = {};
		error.statCount = checkStatCount(obj.statCount);
		if (!error.statCount){
			error.cats = checkCats(obj.cats, obj.statCount);
			error.titles = checkTitles(obj.titles, obj.statCount);
			error.years = checkYears(obj.years, obj.statCount);
			error.criteria = checkCriteria(obj.criteria, obj.statCount);
			error.none = !Object.keys(error.cats).length && !Object.keys(error.titles).length && !Object.keys(error.years).length && !Object.keys(error.criteria).length
		} else {
			error.none = false;
		}
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = dataValidate