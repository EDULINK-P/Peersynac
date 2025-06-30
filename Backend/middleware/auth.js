const verifySession = (req, res, next) => {
  if(!req.session.userId) {
    res.status(401).send('You must be logged in to view this page.');
    return
  }
  next();
  };

export default verifySession;
