console.log('code Checking for Weather App');

let search = document.querySelector('#search');
let weather = document.querySelector('#weather');
const otherInfo = document.querySelector("#otherInfo")

const apiKey = 'ee510c4cd13110daa856bde3cf4f5a54';
// const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}`;

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    getWeather(search.value);
    clearSearch();
})
let getWeather = async (city) => {
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    weather.innerHTML = `Loading...`
    const response = await fetch(Url);
    const data = await response.json();
    return showWeather(data);
    // console.log(data)
}

let showWeather = (data) => {
    console.log(data);
    if (data.cod == 404) {
        weather.innerHTML = `Oops..! City Not Found!`;
        otherInfo.innerHTML = ""
        return;
    }
    if (data.weather[0].main == 'Mist') {
        document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/722587.jpg')";
    }
    else if (data.weather[0].main == 'Haze') {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1423209086112-cf2c8acd502f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGF6ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')";
    }
    else if (data.weather[0].main == 'Clear') {
        document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/175961.jpg')";
    } else if (data.weather[0].main == 'Clouds') {
        document.body.style.backgroundImage = "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=600')";
    }
    let displayWeather = `
    <div class="row" id="weather">
            <div class="row">
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" id="weatherImg"</div>
            <div>
                <h1>${data.main.temp}℃ in ${search.value}</h1>
                <h3>${data.weather[0].main}</h3>
            </div>
        </div>`
    let otherInfom = `
        <tr>
            <th>
                Feels like:
            </th>
            <td id="feelLIke">${data.main.feels_like}</td>
        </tr>
        <tr>
            <th>
                windSpeed:
            </th>
            <td id="windSpeed">${data.wind.speed}km/h</td>
        </tr>
        <tr>
            <th>Humidity:</th>
            <td id="humidity">${data.main.humidity}%</td>
        </tr>
        <tr>
            <th>Max temp:</th>
            <td id="Max temp">${data.main.temp_max}℃</td>
        </tr>
        <tr>
            <th>Min temp:</th>
            <td id="Min temp">${data.main.temp_min}℃</td>
        </tr>
        <tr>
            <th>Visibility:</th>
            <td id="visibility">${data.visibility / 1000} km/h</td>
        </tr>`
    weather.innerHTML = displayWeather;
    otherInfo.innerHTML = otherInfom;
}
function clearSearch() {
    return setTimeout(() => {
        search.value = "";
    }, 500)
}