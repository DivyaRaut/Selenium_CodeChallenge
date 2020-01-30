const { expect } = require("chai");
const webdriver = require("selenium-webdriver");
const { Builder, By, key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const driver = new webdriver.Builder().forBrowser("chrome").build();
const fs = require("fs");
const request = require("request");
const jsonData = require("../city.list.json");
const testing = require("../getAutomationData");
const apitempdifference = require("../getApiTempDiff");

describe("Test", function() {
  describe("Comparison", function() {
    it("should return -1 when the value is not present", function() {
      jsonData.forEach(element => {
        console.log("JSon data is: " + element);
        const callback = result => {
          expect(result).to.be.true;
        };
        var testtt = testing.getAutomationData(driver, element, callback);
      });
    });
  });
  describe("Temperature Difference", function() {
    it("should return FALSE if temp difference is greater than 10", function() {
      jsonData.forEach(element => {
        const callback = result2 => {
          expect(result2).to.be.true;
        };
        var test2 = apitempdifference.getApiTempDiff(driver, callback);
      });
    });
  });
});
