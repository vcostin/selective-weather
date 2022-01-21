// this is a piece of old code written by me long time ago
// TODO old logic code to be refactored old code of mine
"use strict";
var temperatureHolder = function () {
  var temperature = null;
  var temperatureType = null;

  function changeTemperatureType(tempType) {
    var newTemperature = 0;
    // Celsius to Fahrenheit:   (°C × 9/5) + 32 = °F
    // Fahrenheit to Celsius:   (°F − 32) x 5/9 = °C
    if (temperatureType === tempType) {
      return;
    }

    switch (tempType) {
      case "F":
        newTemperature = (temperature * 9) / 5 + 32;
        break;
      case "C":
        newTemperature = ((temperature - 32) * 5) / 9;
        break;
      default:
        return;
        break;
    }
    this.setTemperatureType(tempType);
    this.setTemperature(newTemperature);
  }

  return {
    setTemperature: function (temp) {
      temperature = temp;
    },
    getTemperature: function () {
      return temperature;
    },
    setTemperatureType: function (tempType) {
      temperatureType = tempType;
    },
    getTemperatureType: function () {
      return temperatureType;
    },
    changeTemperatureType: changeTemperatureType,
  };
};

var updateTemperature = function (tempValue, tempType) {
  $(".temperature").html(Math.floor(tempValue) + "° ");
  $(".temperature-type").html(tempType);
};

var getWeatherData = function (lat, long, options) {
  var apiUrl =
    "https://api.darksky.net/forecast/" +
    options.apiKey +
    "/" +
    lat +
    "," +
    long;
  var requestQuery = {
    exclude: "minutely,hourly,daily,flags",
    units: "si",
  };

  return $.ajax({
    url: apiUrl,
    dataType: "jsonp",
    data: requestQuery,
  });
};

var getGeololocationData = function (lat, long, options) {
  var apiUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  var requestQuery = {
    latlng: lat + "," + long,
    result_type: "locality",
    key: options.apiKey,
  };

  return $.ajax({
    url: apiUrl,
    dataType: "json",
    data: requestQuery,
  });
};
var weatherAppTemperature = temperatureHolder();

navigator.geolocation.getCurrentPosition(function (position) {
  getGeololocationData(position.coords.latitude, position.coords.longitude, {
    apiKey: NAVIGATOR_API_KEY,
  })
    .done(function (data) {
      $(".geo-location").text(data.results[0].formatted_address);
    })
    .always(function () {
      console.log("loader stop maybe...");
    });

  getWeatherData(position.coords.latitude, position.coords.longitude, {
    apiKey: WEATHER_DATA_API_KEY,
  })
    .done(function (data) {
      var skycons = new Skycons({ color: "white" });
      skycons.add("icon1", data.currently.icon);
      skycons.play();

      $(".weather-description").html(data.currently.summary);
      weatherAppTemperature.setTemperature(data.currently.temperature);
      weatherAppTemperature.setTemperatureType("C");

      updateTemperature(
        weatherAppTemperature.getTemperature(),
        weatherAppTemperature.getTemperatureType()
      );
    })
    .always(function () {
      console.log("loader stop maybe...");
    });
});

$(".temp-type-swith").on("click", function () {
  var tempTypeToggle =
    weatherAppTemperature.getTemperatureType() === "C" ? "F" : "C";

  weatherAppTemperature.changeTemperatureType(tempTypeToggle);

  updateTemperature(
    weatherAppTemperature.getTemperature(),
    weatherAppTemperature.getTemperatureType()
  );
});
