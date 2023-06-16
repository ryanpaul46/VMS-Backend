/* eslint-disable linebreak-style */
export default function errorHandler(error, _req, res, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(500).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "Invalid token" });
  }

  next(error);
}
