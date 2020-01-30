const webdriver = require("selenium-webdriver");
const { Builder, By, key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
//const driver = new webdriver.Builder().forBrowser("chrome").build();
const fs = require("fs");
const request = require("request");
const getAutoData = require("./getAutomationData");

async function getApiTempDiff(driver, callback) {
  let temp1 = await driver
    .findElement(
      By.xpath(
        `//*[@id="widget"]/div/div/div[3]/div[3]/span/span/div[3]/table/tbody/tr[1]/td[2]/p[1]/span[2]`
      )
    )
    .getText();

  let temp2 = await driver
    .findElement(
      By.xpath(
        `//*[@id="widget"]/div/div/div[3]/div[3]/span/span/div[3]/table/tbody/tr[1]/td[2]/p[1]/span[1]`
      )
    )
    .getText();

  let maxTemp = temp1 > temp2 ? temp1 : temp2;
  let minTemp = temp1 > temp2 ? temp2 : temp1;

  let difference = maxTemp - minTemp > 10 ? "fail" : "pass";
  callback(difference);
}

exports.getApiTempDiff = getApiTempDiff;
