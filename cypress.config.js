const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://gateway-service-design-d0ngl1wkh.dms.int.usw2.ficoanalyticcloud.com",
    oktaUrl: "https://facdev.okta.com",
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    headed: true
  }
});
