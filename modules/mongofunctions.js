/*
available functions:

get(collection, primaryKey)
insertOrUpdate(collection, data, primaryKey, alreadyExists)

*/

function getFunctions(database){
	
	var functions = {};
	
	functions.get = function(collection, primaryKey){
		return database.mongo.collection(collection).findOneAndUpdate(
			{_id: primaryKey},
			{$inc: {access_count: 1}, $set: { "date_accessed": new Date() }},
			{returnOriginal: false}
		)
	}
	
	functions.insertOrUpdate = function(collection, data, primaryKey, alreadyExists){
		return new Promise(function(resolve, reject){
			if (alreadyExists){
				database.mongo.collection(collection).updateOne(
				{_id: primaryKey},
				{$set: {
					date_inserted: new Date(),
					date_accessed: new Date(),
					data: data
					}
				},
				{upsert: true}).then(function(){
					console.log("mongo updated!");
					resolve();
				}).catch(function(err){
					console.log("mongo update error: " + err.message);
					reject()
				})
			} else {
				database.mongo.collection(collection).insertOne({
					_id: primaryKey,
					date_inserted: new Date(),
					date_accessed: new Date(),
					access_count: 1,
					data: data
				}).then(function(){
					console.log("mongo inserted!");
					resolve();
				}).catch(function(err){
					console.log("mongo insert error: " + err.message);
					reject();
				})
			}
		});
	}
	return functions;
}

module.exports = {
	getFunctions: getFunctions
};
