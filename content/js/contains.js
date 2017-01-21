String.prototype.contains = function(str){
	var filters = str.toLowerCase().split(/[ ,_\-]+/);
	var tokens = this.toLowerCase().split(/[ ,\-]+/);
	for (var i = 0; i < filters.length; i++) {
		var match = false;
		for (var j = 0; j < tokens.length; j++) {
			if (tokens[j].startsWith(filters[i])) {
				match = true;
				break;
			}
		}
		if (match == false) {
			return false;
		}
	}
	return true;
}