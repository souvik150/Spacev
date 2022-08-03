module.exports = (fn) => {
  // This below wouldnt work cause we dont have access to the req, res, next
  // fn(req, res, next).catch((err) => next(err));

  return (req, res, next) => {
    return fn(req, res, next).catch((err) => next(err));
  };
};
