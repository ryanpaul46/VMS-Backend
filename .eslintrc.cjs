module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["error", "always"],
  },
};
