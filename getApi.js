const request = require("request");
const getAutoData = require("./getAutomationData");

async function getApi(element) {
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
    await request(
      {
        url: apiUrl,
        json: true
      },
      (err, response, body) => {
        // console.log(JSON.stringify(body, undefined, 4));
        // console.log(body.list.length);
        // for (let i = 0; body.list.length < 5; i++) {
        console.log("data of body of api is", body.list[0].temp);
        return body;

        // return body.list[0].main.temp === temp.replace("°F", "").trim()
        // }
      }
    );
    // });

    //Quit driver
    // setTimeout(function() {

    //   console.log("Driver is quitting");
    // }, 5000);
  } catch (error) {
    console.log(error);
  }
}

exports.getApi = getApi;
