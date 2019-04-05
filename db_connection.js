const mongoose = require('mongoose');



module.exports = () => {
  // define db connection options
  const mongo_connection_options = {
    // useMongoClient: true // for use mongo atlas cloud // option no longer necessary in mongoose 5.x
    useNewUrlParser: true // DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version.
  };
  // DEFINE CONNECTION TO MONGODB
  mongoose.connect(
    `mongodb://node-rest-server:${process.env.MONGO_DB_KEY}@cluster-shard-00-00-3mkmc.mongodb.net:27017,cluster-shard-00-01-3mkmc.mongodb.net:27017,cluster-shard-00-02-3mkmc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-shard-0&authSource=admin&retryWrites=true`,
    mongo_connection_options
  );

  // event fired when connection succeded
  mongoose.connection.on('connected', function(){
    console.log("Mongoose default connection is open to ");
  });

  // event fired when connection has failed
  mongoose.connection.on('error', function(err){
    console.log("Mongoose default connection has occured " + err + " error");
  });

  // event fired when db is disconnected
  mongoose.connection.on('disconnected', function(){
    console.log("Mongoose default connection is disconnected");
  });

  // event fired when application close, so close the connection too
  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0);
      });
  });
}