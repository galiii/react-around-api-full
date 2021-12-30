const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //console.log(req.headers);
  const { authorization } = req.headers;
  //console.log("hjhjhjhjhj",authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Authorization required' });
  }

   
   const token = authorization.replace('Bearer ', '');
//console.log("token", token)
   
   let payload;
   try {
     payload = jwt.verify(token, 'not-very-secret-key');
     //console.log("payload",payload);
   } catch (err) {
     
     return res
      .status(401)
      .send({ message: 'Authorization required' });
   }

   
   req.user = payload._id;
   //console.log(`in auth ${req.user}`);
   next();
};