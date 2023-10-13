import jwt from 'jsonwebtoken';

export const currentUser = (
  req,
  res,
  next
) => {
  req.currentUser={email : 'guest'}

  var jwtToken
  if(req.headers.authorization){
    jwtToken = req.headers.authorization.replace('Bearer', '').trim();
 
    if (!jwtToken ) {
      return next();
       
    }
    
    try {  
      const payload = jwt.verify(
        jwtToken,
        "NGPoRHIjMXS72zkqY9G9xQ6ijC0afj73OiKXOHJM2DLRo002EbaDcpjKNQv9txr"
      );
      req.currentUser = payload;
      
    } catch (err) {
      console.log(err)
      next(err)
      }
  }
  next();
};
