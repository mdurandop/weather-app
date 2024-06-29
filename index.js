const apiKey = '2256ec8b40943343d53f35da0ecda92b';

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    var data = await response.json();

    console.log(data)

    // Cambiar los datos de la pagina a los obtenidos por la API
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°`;
    document.querySelector('.humidity p').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind p').innerHTML = `${(data.wind.speed).toFixed(0)} km/h`;
    document.querySelector('.max').innerHTML = `Max: ${Math.floor(data.main.temp_max)}°`;
    document.querySelector('.min').innerHTML = `Min: ${Math.floor(data.main.temp_min)}°`;

    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= sunrise && currentTime < sunset) {
        document.body.style.background = 'linear-gradient(170deg, rgba(41,178,221,1) 0%, rgba(51,170,221,1) 47%, rgba(45,200,234,1) 100%)';
        document.querySelector('.weather-img').src = `images/weather-imgs/${data.weather[0].description} light.png`;
    } else {
        document.body.style.background = 'linear-gradient(170deg, rgba(8,36,79,1) 0%, rgba(19,76,181,1) 47%, rgba(11,66,171,1) 100%)';
        document.querySelector('.weather-img').src = `images/weather-imgs/${data.weather[0].description} dark.png`;
    }
    
};

getWeatherData('barranquilla');

