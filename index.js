const apiKey = '2256ec8b40943343d53f35da0ecda92b';

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    var data = await response.json();

    console.log(data)

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°`;
    document.querySelector('.weather-img').src = `images/weather-imgs/${data.weather[0].main}.png`;
    document.querySelector('.humidity p').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.wind p').innerHTML = `${(data.wind.speed).toFixed(0)} km/h`;
    document.querySelector('.max').innerHTML = `Max: ${Math.floor(data.main.temp_max)}°`;
    document.querySelector('.min').innerHTML = `Min: ${Math.floor(data.main.temp_min)}°`;
    
};

getWeatherData('barranquilla');
