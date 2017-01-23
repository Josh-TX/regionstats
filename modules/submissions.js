function getFunctions(database){
	var submissions = {};
	/*
	available functions:

	.insert EXPECTS: .userid, .type, ADDS: .subid
	.changeDate EXPECTS: obj.subid
	.changeStatus EXPECTS: obj.userid, obj.subid, obj.status
	.delete EXPECTS: obj.subid
	*/


	submissions.insert = function(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('INSERT INTO submissions (user_id, date_sub, type, status) VALUES (?, now(), "?", "w")', 
			[body.userid, body.type], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				body.subid = result.insertId;
				resolve(body);
			}
		});
	}

	submissions.changeDate = function(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('UPDATE submissions SET date_mod = now() WHERE id = ?', [body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}

	submissions.changeStatus = function(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('UPDATE submissions SET status = ?, date_eval = now(), admin_id = ? WHERE id = ?', 
				[body.status, body.userid, body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}

	submissions.delete = function(body){
		return new Promise(function(resolve, reject){
			database.mysql.query('DELETE FROM submissions WHERE id = ?', [body.subid], databaseHandler);
			function databaseHandler(err, result) {
				if (err){
					reject({message: "internal database error: "  + err.message});
					return;
				}
				resolve(body);
			}
		});
	}
	return submissions;
}
module.exports = {
	getFunctions: getFunctions
};
