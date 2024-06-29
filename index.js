const apiKey = '2256ec8b40943343d53f35da0ecda92b';

const currentCityText = document.querySelector('.location-city');

currentCityText.addEventListener('click', () => {
    document.querySelector('.arrow').classList.toggle('arrow-rotate');
    document.querySelector('.search-bar').classList.toggle('flex');
})

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
    document.querySelector('.description').innerText = data.weather[0].description;

    // Obtener la fecha y hora de la ciudad
    
    const timezoneOffset = data.timezone; 
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);

    const dayOfWeek = localTime.toLocaleString('en-EN', { weekday: 'long' });
    const dayOfMonth = localTime.getDate();
    const hours = localTime.getHours().toString().padStart(2, '0');

    document.querySelector('.day-week-month').innerText = `${dayOfWeek}, ${dayOfMonth}`
    console.log(hours + ':00')

    // Obtener si es de dia o noche

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

const inputSearchElement = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar img');

searchButton.addEventListener('click', () => {
    getWeatherData(inputSearchElement.value)
})