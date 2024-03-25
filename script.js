const url = 'https://api.openweathermap.org/data/2.5/';
const key = 'a17bd950447dc8450ab8c9ae9be22158';
const loc = document.querySelector(".location");

function message(msg, type = 'danger') {
    const message = document.querySelector('.message');
    message.classList.add(type);
    message.innerText = msg;
}

function setUrl(e) {
    let city = loc.value;
    if (e.key == 'Enter') {
        if (!city) {
            message('Please enter a city');
        }
        else {
            getResult(city);
        }
    }
}

function kelvinToCelsius(type) {
    let convert = `${Math.trunc(type - 273.15)}°`;
    return convert;
}

function getResult(city) {
    let query = `${url}weather?q=${city}&appid=${key}`;
    const forecast = document.querySelector('.forecast');
    const cityName = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const min = document.querySelector('.min');
    const max = document.querySelector('.max');
    //const feelsLike = document.querySelector('.feels-like');
    const icon = document.querySelector('.icon');

    function Request() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    }
                    else {
                        reject(xhr.statusText);
                    }
                }
            }
            xhr.open("GET", query, true);
            xhr.send();
        });
    }

    Request()
        .then(response => {
            const data = JSON.parse(response);
            cityName.innerHTML = data.main;//eğer şehir yada aranan sonuç mecut değilse hata mesajı dönecek kodu yaz!
            temp.innerHTML = kelvinToCelsius(data.main.temp);
            min.innerHTML = kelvinToCelsius(data.main.temp_min);
            max.innerHTML = `${kelvinToCelsius(data.main.temp_max)} \\ `;
            // feelsLike.innerHTML = kelvinToCelsius(data.main.feels_like);
            cityName.innerHTML = data.name;
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            forecast.innerHTML = data.weather[0].description;
        })
        .catch((err) => {
            message(err);
        });
}
loc.addEventListener('keydown', setUrl);