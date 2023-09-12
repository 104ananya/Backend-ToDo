export const erroMiddleware = (err, req, res, next) => {
  // console.log(err.message);

  // if message is empty then
  err.message = err.message || "Internal Server Error";

  return res.status(404).json({
    success: false,
    message: err.message,
  });
};
