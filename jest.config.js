// Sync object
module.exports = {
  verbose: true,
  testMatch: [
    "**/test/**/*.[jt]s?(x)",
    "*/?(.)+(spec|test).[jt]s?(x)"
  ],
  testEnvironment: "jest-environment-node-single-context",
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "First Test"
    }]
  ]
};