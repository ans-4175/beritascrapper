module.exports = function (app, mongoose) {


  var connect = function () {

    mongoose.connect('mongodb://localhost/beritascrapper');

  };

  connect();  

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err)
  });

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    connect();
  })

};
