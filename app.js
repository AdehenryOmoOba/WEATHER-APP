window.addEventListener("load", () => {
  let lat;
  let long;
  const locality = document.querySelector(".locality");
  const tempValue = document.querySelector(".temp-value p");
  const tempDescription = document.querySelector(".temp-description p");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const tempIcon = document.querySelector("#weatherlogo");
  let iconFile;

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = "";
  });

  const getWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=931eea13890382105ce88fbe8b88e09e`
      );
      const weatherData = await response.json();
      console.log(weatherData);
      const { name } = weatherData;
      const { feels_like } = weatherData.main;
      const { id, main } = weatherData.weather[0];
      locality.textContent = name;
      tempDescription.textContent = main;
      tempValue.textContent = Math.floor(feels_like - 273);

      if (id < 300 && id > 200) {
        tempIcon.src = "./icons/storm.png";
      } else if (id < 500 && id > 300) {
        tempIcon.src = "./icons/drizle.png";
      } else if (id < 600 && id > 500) {
        tempIcon.src = "./icons/rainy.png";
      } else if (id < 700 && id > 600) {
        tempIcon.src = "./icons/snowflakes.png";
      } else if (id < 800 && id > 700) {
        tempIcon.src = "./icons/mist.png";
      } else if (id == 800) {
        tempIcon.src = "./icons/clear.png";
      } else if (id > 800) {
        tempIcon.src = "./icons/clouds.png";
      }
    } catch (error) {
      alert("Ooop!...Something went wrong!");
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      // console.log(lat, long);
      const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=931eea13890382105ce88fbe8b88e09e`;
      fetch(weatherURL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { country } = data.sys;
          const { feels_like } = data.main;
          const { id, main } = data.weather[0];
          locality.textContent = country;
          tempDescription.textContent = main;
          tempValue.textContent = Math.floor(feels_like - 273);

          if (id < 300 && id > 200) {
            tempIcon.src = "./icons/storm.png";
          } else if (id < 500 && id > 300) {
            tempIcon.src = "./icons/drizle.png";
          } else if (id < 600 && id > 500) {
            tempIcon.src = "./icons/rainy.png";
          } else if (id < 700 && id > 600) {
            tempIcon.src = "./icons/snowflakes.png";
          } else if (id < 800 && id > 700) {
            tempIcon.src = "./icons/mist.png";
          } else if (id == 800) {
            tempIcon.src = "./icons/clear.png";
          } else if (id > 800) {
            tempIcon.src = "./icons/clouds.png";
          }
        });
    });
  }
});
