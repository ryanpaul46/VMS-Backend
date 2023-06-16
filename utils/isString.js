/* eslint-disable linebreak-style */
export default function isString(str) {
  try {
    return typeof str === "string";
  } catch (e) {
    return false;
  }
}
