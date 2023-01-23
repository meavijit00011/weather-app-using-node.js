const domElements = (() => {
  return {
    searchInput: document.querySelector(".search__input"),
    searchIcon: document.querySelector(".search__icon"),
    minTemp: document.querySelector(".min__temp"),
    maxTemp: document.querySelector(".max__temp"),
    currentTemp: document.querySelector(".large__temp__show"),
    feelsLikeTemp: document.querySelector(".feels__like__temp"),
    weatherImage: document.querySelector(".weather__image"),
    weatherDescription: document.querySelector(".weather__description"),
    rightDetails: document.querySelectorAll(".right__detail"),
    windSpeed: document.querySelector(".content__1"),
    content2: document.querySelectorAll(".content__2"),
    date: document.querySelector(".date"),
    weatherDetailShowContainer: document.querySelector(
      ".weather__details__show__container"
    ),
    refreshData: document.querySelector(".refresh__icon"),
  };
})();
const calcTime = (seconds, timeDiff) => {
  let utcSeconds = seconds;
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  let gmtTime = new Date(d);
  gmtTime.setMinutes(gmtTime.getMinutes() + d.getTimezoneOffset());
  let searchedPlaceLocalTime = new Date(
    gmtTime.setSeconds(gmtTime.getSeconds() + timeDiff)
  );
  return `${searchedPlaceLocalTime.getHours() % 12 || 12}:${
    searchedPlaceLocalTime.getMinutes() < 10
      ? `0${searchedPlaceLocalTime.getMinutes()}`
      : searchedPlaceLocalTime.getMinutes()
  }`;
};
const localTimeCalc = (timeDiff) => {
  let arrayOfMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Deccember",
  ];
  const localMachineTime = new Date();
  const gmtTime = new Date();
  gmtTime.setMinutes(
    gmtTime.getMinutes() + localMachineTime.getTimezoneOffset()
  );
  const searchedPlaceLocalTime = new Date(
    gmtTime.setSeconds(gmtTime.getSeconds() + timeDiff)
  );
  return `${
    searchedPlaceLocalTime.getHours() < 10
      ? `0${searchedPlaceLocalTime.getHours()}`
      : searchedPlaceLocalTime.getHours()
  }:${
    searchedPlaceLocalTime.getMinutes() < 10
      ? `0${searchedPlaceLocalTime.getMinutes()}`
      : searchedPlaceLocalTime.getMinutes()
  }, ${searchedPlaceLocalTime.getDate()} ${
    arrayOfMonths[searchedPlaceLocalTime.getMonth()]
  }`;
};
const calcAngle = (angle) => {
  const windAngle = angle;
  let rotateAngle;
  let direction;
  if (windAngle < 180) {
    rotateAngle = windAngle + 180;
  } else {
    rotateAngle = windAngle - 180;
  }
  let arr = [180, 270, 360, 0, 90, 180];
  let arr2 = ["North", "East", "South", "West"];
  for (let i = 0; i < arr.length - 1; i++) {
    if (rotateAngle >= arr[i] && rotateAngle < arr[i + 1]) {
      direction = i > 1 ? arr2[i - 1] : arr2[i];
      break;
    }
  }
  return { rotateAngle, direction };
};
const updateDom = (data) => {
  console.log(data)
  const reomveAllChild = () => {
    while (domElements.weatherDetailShowContainer.hasChildNodes()) {
      domElements.weatherDetailShowContainer.removeChild(
        domElements.weatherDetailShowContainer.firstChild
      );
    }
  };
  if (typeof data == "object") {
    let html = `<div class="today__weather__details__show__container">
    <p class="date">Local time : ${localTimeCalc(data.timezone)}</p>
    <div class="min__max__temp__container">
        <p class="min__temp">Min ${data.main.temp_min.toFixed(0)}&#xb0 C</p>
        <p class="max__temp">Max ${data.main.temp_max.toFixed(0)}&#xb0 C</p>
    </div>
    <div class="temp__container">
        <div class="left__temp__container">
            <p class="large__temp__show">${data.main.temp.toFixed(0)}&#xb0 C</p>
            <p class="feels__like__temp">Feels like ${data.main.feels_like.toFixed(
              0
            )}&#xb0 </p>
        </div>
        <div class="right__temp__container">
            <img src="http://openweathermap.org/img/wn/${
              data.weather[0].icon
            }.png" alt="" class="weather__image">
            <p class="weather__description">${data.weather[0].description}</p>
        </div>
    </div>
    <div class="current__details__container">
      <h3>Current details</h3>
      <div class="pressure__show">
          <div class="left__detail">Pressure</div>
          <div class="right__detail">${data.main.pressure} mBar</div>
      </div>
      <div class="humidity__show">
        <div class="left__detail">Humidity</div>
        <div class="right__detail">${data.main.humidity}%</div>
      </div>
      <div class="visibility">
        <div class="left__detail">visibility</div>
        <div class="right__detail">${data.visibility / 1000} km</div>
      </div>
    </div>
    <div class="wind__details__container">
        <div class="wind__heading__img__container">
            <h3>Wind</h3>
            <img src="/img/wind-direction.png" alt="">
        </div>
        <div class="left__right__details__container">
            <div class="left__detail">
                <div class="content__1">${(data.wind.speed * 3.6).toFixed(
                  0
                )}</div>
                <div class="content__2">Km/h</div>
            </div>
              <div class="right__detail">
                <div class="content__1">
                    <img src="/img/up-arrow.png" alt="" class="wind__angle__arrow">
                </div>
                <div class="content__2">From ${
                  calcAngle(data.wind.deg).direction
                }</div>
              </div>
        </div>
        
    </div>
    <div class="sunlight__detail">
        <div class="sunlight__heading__img__container">
            <h3>Sunrise & sunset</h3>
            <img src="/img/sun.png" alt="">
        </div>
        <div class="left__right__details__container">
            <div class="left__detail">
                <div class="content__1">sunrise</div>
                <div class="content__2">${calcTime(
                  data.sys.sunrise,
                  data.timezone
                )} am</div>
            </div>
              <div class="right__detail">
                <div class="content__1">sunset</div>
                <div class="content__2">${calcTime(
                  data.sys.sunset,
                  data.timezone
                )} pm</div>
              </div>
        </div>
    </div>
  
  </div>
  `;
    reomveAllChild();
    domElements.weatherDetailShowContainer.insertAdjacentHTML(
      "beforeend",
      html
    );
    domElements.weatherDetailShowContainer.childNodes[0].childNodes[9].childNodes[3].childNodes[3].childNodes[1].childNodes[1].style.rotate = `${
      calcAngle(data.wind.deg).rotateAngle
    }deg`;
  } else {
    let html = `<p class='error__message'>${data}</p>`;
    reomveAllChild();
    domElements.weatherDetailShowContainer.insertAdjacentHTML(
      "beforeend",
      html
    );
  }
};

const getWeather = async () => {
  let weatherData;
  if (domElements.searchInput.value) {
    domElements.refreshData.classList.add('refresh__icon__animation')
    const fetchedWeather = await fetch(`/${domElements.searchInput.value}`);
    const data = await fetchedWeather.json();
    weatherData = data;
  }
  else{
    return
  }
  domElements.refreshData.classList.remove('refresh__icon__animation')
  return updateDom(weatherData);
};
const controller = (() => {
  // get weather on enter key or search icon click
  domElements.searchIcon.addEventListener(
    "click",
    getWeather.bind(false, null)
  );
  document.addEventListener("keypress", (e) =>
    e.keyCode == 13 ? getWeather() : null
  );
  domElements.refreshData.addEventListener('click',()=>{
    window.alert('Are you sure , You want to reload ?');
    getWeather()
  })
})();
