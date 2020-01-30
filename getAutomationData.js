const webdriver = require("selenium-webdriver");
const { Builder, By, key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
// const driver = new webdriver.Builder().forBrowser("chrome").build();
const fs = require("fs");
const request = require("request");
const jsonData = require("./city.list.json");
const getApiTempDiff = require("./getApiTempDiff");

async function getAutomationData(driver, element, callback) {
  //Declaring & Defining Variables:...
  const apiKey = "ce658e43d986d3db6fdafac97e5a006b";
  let apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?id=" +
    element.id +
    "&APPID=" +
    apiKey +
    "&units=imperial";

  //Business Logic Inside tryCatch Block...
  try {
    //Getting Website api:
    await driver.get("https://openweathermap.org/");
    console.log("Website launced successfully!!!");
    //Getting City
    await driver
      .findElement(By.xpath("//form[@id='searchform']//div//input"))
      .sendKeys(element.name);

    //Submit Button
    await driver
      .findElement(By.xpath("//button[@class='btn btn-orange']"))
      .click();
    console.log("Submit Button Clicked");
    await driver
      .findElement(
        By.xpath('//*[@id="forecast_list_ul"]/table/tbody/tr[1]/td[2]/b[1]')
      )
      .click();
    console.log("Visiting next web page");
    //Capturing items from page:
    let temp1 = await driver
      .findElement(
        By.xpath(
          '//*[@id="widget"]/div/div/div[3]/div[3]/span/span/div[3]/table/tbody/tr[1]/td[2]/p[1]/span[2]'
        )
      )
      .getText();

    let temp2 = await driver
      .findElement(
        By.xpath(
          '//*[@id="widget"]/div/div/div[3]/div[3]/span/span/div[3]/table/tbody/tr[1]/td[2]/p[1]/span[1]'
        )
      )
      .getText();

    // let maxTemp = temp1 > temp2 ? temp1 : temp2;
    // let minTemp = temp1 > temp2 ? temp2 : temp1;
    //temp
    let temp = await driver
      .findElement(By.xpath("//div[@id='weather-widget']/h3"))
      .getText();

    console.log("Temperature is1 :" + temp);
    //wind
    let wind = await driver
      .findElement(By.xpath(`//*[@id="weather-widget-wind"]`))
      .getText();
    console.log("Wind is :" + wind);
    //Cloudiness
    let cloudiness = await driver
      .findElement(By.xpath(`//*[@id="weather-widget-cloudiness"]`))
      .getText();
    console.log("Cloudiness is :" + cloudiness);
    //Pressure
    let pressure = await driver
      .findElement(
        By.xpath(`//*[@id="weather-widget"]/table/tbody/tr[3]/td[2]`)
      )
      .getText();
    console.log("Pressure is :" + pressure);
    //Humidity
    let humidity = await driver
      .findElement(
        By.xpath(`//*[@id="weather-widget"]/table/tbody/tr[4]/td[2]`)
      )
      .getText();
    console.log("Humidity is :" + humidity);

    //Get JSON data from API:

    await request(
      {
        url: apiUrl,
        json: true
      },
      (err, response, body) => {
        console.log(
          "temp Comparision --",
          body.list[0].main.temp === temp.replace("°F", "").trim()
        );
        console.log("Wind Comparision --", body.list[0].main.wind === wind);
        console.log(
          "Humidity Comparision --",
          body.list[0].main.humidity === humidity
        );

        driver.quit();

        callback(body.list[0].main.temp === temp.replace("°F", "").trim());
      }
    );

    await driver.quit();
  } catch (error) {
    console.log(error);
  }
}

exports.getAutomationData = getAutomationData;
