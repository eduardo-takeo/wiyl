const key = '75cf668cd67e7563a8eca511b95194b2';
let weatherApi = {};

window.onload = () => getLocation();

const getLocation = () => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(storeLocation) : alert('Ooops, we could not reach your location');
}

const storeLocation = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            weatherApi = data;
            setData();
        })
        .catch(error => console.log(error));
}

const setData = () => {
    document.getElementsByClassName('initial__container')[0].style.display = 'none';
    document.getElementsByClassName('main__container')[0].style.display = 'flex';

    document.getElementById('location__name').innerHTML = weatherApi.name;
    document.getElementById('location__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherApi.weather[0].icon}@2x.png" alt="icon">`;
    document.getElementById('temperature__value').innerHTML = Math.round(weatherApi.main.temp / 10) + '°C';
    document.getElementById('temperature__description').innerHTML = weatherApi.weather[0].description.charAt(0).toUpperCase() + weatherApi.weather[0].description.slice(1);
}