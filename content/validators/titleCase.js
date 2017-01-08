function titleCase(str){	
	var lowers = ['A', 'An', 'The', 'Of'];
	var uppers = ['Id', 'Tv'];
	var words = str.split(/[\s_]+/)
	
	for (var i = 0; i < words.length; i++){
		words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1).toLowerCase();
		for (var j = 0; j < lowers.length; j++){
			if (words[i] == lowers[j]){
				words[i] = words[i].toLowerCase();
			}
		}
	}
	return words.join(" ");		
}

if (typeof module == "object")
	module.exports = titleCase;