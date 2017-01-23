var dataValidate = (function(){
	function checkStatCount(count){
		if (typeof count != "number" || count < 1){
			return "invalid stat count";
		}
		return "";
	}
	function checkCats(cats, count){
		var error = []
		if (!cats || cats.length != count){
			error.push({
				index: 0,
				message: "category count doesn't match stat count"
			})
			return error;
		}
		for (var i = 0; i < count; i++){
			if (typeof cats[i] != "number" || cats[i] < 0){
				error.push({
					index: i,
					message: "select a category"				
				})
			}
		}
		return error;
	}
	function checkTitles(titles, count){
		var error = []
		if (!titles || titles.length != count){
			error.push({
				index: 0,
				message: "title count doesn't match stat count"
			})
			return error;
		}
		for (var i = 0; i < count; i++){
			if (typeof titles[i].id != "number" || titles[i].id <= 0){
				if (typeof titles[i].name != "string" || titles[i].name.length == 0){
					error.push({
						index: i,
						message: "enter a title"				
					})
				}
				else if (titles[i].name.length < 3){
					error.push({
						index: i,
						message: "title too short"				
					})
				}
			}
		}
		return error;
	}
	
	var currentYear = new Date().getFullYear();
	function checkYears(years, count){
		var error = [];
		if (!years || years.length != count){
			error.push({
				index: 0,
				message: "year count doesn't match stat count"
			})
			return error;
		}
		for (var i = 0; i < count; i++){
			if (typeof years[i] != "number" || years[i] <= 0){
				error.push({
					index: i,
					message: "enter a year"				
				})
			}
			else if (years[i] < 1900 || years[i] > currentYear){
				error.push({
					index: i,
					message: "invalid year"				
				})
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
			error.none = !error.cats.length && !error.titles.length && !error.years.length;
		} else {
			error.none = false;
		}
		return error;
	}
	return validate;
})();

if (typeof module == "object")
	module.exports = dataValidate