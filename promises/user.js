function getPromises(database){
	var rdr = db.collection('users').find();
	rdr.forEach(pushUser, finishedReading);
	
	function pushUser(doc, err){
		assert.equal(null, err);
		users.push(doc);
	};
	function finishedReading(){
		db.close();
		res.render('users', {users: users});
	};
}