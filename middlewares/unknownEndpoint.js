/* eslint-disable linebreak-style */
export default function unknownEndpoint(_req, res) {
  return res.status(404).json({ error: "Unknown endpoint" });
}
