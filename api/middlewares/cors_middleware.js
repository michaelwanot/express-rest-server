module.exports = (req, res, next) => {
  //setting up permission from different address and allow Cross-Origin-Resource-Sharing
  res.header('Access-Control-Allow-Origin', '*'); // we can specify an address too (es. http://my-fantastic-client:1234)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // set header to allow listed methods after an OPTION request has been sended
  if(req.method === 'OPTION') { // *OPTION call is firstly sended to the server before other methods to check if server accept them
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
    return res.status(200).json({}); // return an empty json object to stop middleware chain so the app doen't go to routes
  }
  next(); // go to the next middleware (routes)
};