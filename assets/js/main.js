const key = '75cf668cd67e7563a8eca511b95194b2';
let weatherApi = {};

window.onload = () => getLocation();

const getLocation = () => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(storeLocation) : alert('Ooops, we could not reach your location');
}

const storeLocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            weatherApi = data;
            setData();
        })
        .catch(error => console.log(error));
}

const setData = () => {
    document.getElementById('location').innerHTML = weatherApi.name;
    document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png" alt="icon">`;
    document.getElementById('temperature').innerHTML = Math.round(weatherApi.main.temp / 10);
    document.getElementById('description').innerHTML = weatherApi.weather[0].description.charAt(0).toUpperCase() + weatherApi.weather[0].description.slice(1);
}

