const bank = {
  missingParams: { msg: 'missing Params', code: 400 },
  wordNotFound: { msg: 'word Not Found', code: 400 },
  // { msg: "internal server errors", code: 500 },
  // { msg: "DB issues", code: 500 },
  // { msg: "Not Found!", code: 404 },
};
const errorHandler = (err, req, res, next) => {
  const { msg, code } = bank[err];
  if (!msg) return res.status(500).send('something went wrong!');
  res.status(code).send(msg);
};

module.exports = errorHandler;
