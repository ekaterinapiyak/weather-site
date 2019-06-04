function citySearchByCoord() {
    var weather_1 = document.querySelector(".weather_1");


    function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition)

        function showPosition(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f3d3b1572334a5456ee9a28c951eeab2';

            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', url, true);
            xhttp.overrideMimeType("application/json");

            xhttp.addEventListener("load", function () {
                if (xhttp.status !== 200) {
                    alert('Ошибка загрузки вашего местоположения');
                }
                else {
                    var create = createDiv(xhttp.responseText, 'my_city');
                    weather_1.innerHTML = create;
                }

            });
            xhttp.send();
        }
    }

    getLocation();
}

function citySearchByName() {
    var weather = document.querySelector(".weather_2");
    var city = document.getElementById("text-to-find").value;

    var arr = localStorage.getItem('cities');
    if (arr !== null) {
        arr = arr.split(',');
    } else arr = [];

    function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition)

        function showPosition(position) {
            var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=f3d3b1572334a5456ee9a28c951eeab2';

            var xhttp = new XMLHttpRequest();
            xhttp.open('GET', url, true);
            xhttp.overrideMimeType("application/json");

            var create, dynDiv;

            xhttp.addEventListener("load", function () {
                if (xhttp.status !== 200) {
                    alert('Город не найден');
                }
                else {
                    create = createDivWithDel(xhttp.responseText, city);

                    if (arr !== null && arr.includes(city)) {
                        alert('Такой город уже есть');
                    } else {
                        var str = JSON.stringify(xhttp.responseText);
                        arr[arr.length] = city;
                        localStorage.setItem(city, str);
                        localStorage.setItem('cities', arr);


                        dynDiv = document.createElement("div");
                        dynDiv.id = 'div_' + city;
                        dynDiv.className = 'info_Area';
                        dynDiv.innerHTML = create;
                        weather.appendChild(dynDiv);
                    }
                }
            });

            xhttp.send();

        }
    }

    getLocation();
}

function getLocalStorageWeather() {
    var weather = document.querySelector(".weather_2");
    var arr = localStorage.getItem('cities');

    if (arr !== null) {
        arr = arr.split(',');

        for (var i = 0; i < arr.length; i++) {
            var city = arr[i];

            var str = localStorage.getItem(city);
            var list = JSON.parse(str);
            var create = createDivWithDel(list, city);

            var id = 'div_' + city;
            var dynDiv = document.createElement("div");
            dynDiv.id = id;
            dynDiv.className = 'info_Area';
            dynDiv.innerHTML = create;
            weather.appendChild(dynDiv);
        }
    }
}


function createDiv(json, city) {
    var list = JSON.parse(json);
    return '<div class="city_name" id="' + city + '">' + list.name + ' </div>' +
        '<span>Температура: ' + Math.round(list.main['temp'] - 273.15) + ' ℃</span></br>' +
        '<span>Видимость: ' + list.weather[0].description + '</span></br>' +
        '<span>Скорость ветра: ' + list.wind.speed + ' mph</span></br>' +
        '<span>Осадки: ' + list.main.humidity + ' %</span></br>';
}

function createDivWithDel(json, city) {
    var list = JSON.parse(json);
    return '<div class="city_name" id="' + city + '">' + list.name + ' </div>' +
        '<span>Температура: ' + Math.round(list.main['temp'] - 273.15) + ' ℃</span></br>' +
        '<span>Видимость: ' + list.weather[0].description + '</span></br>' +
        '<span>Скорость ветра: ' + list.wind.speed + ' mph</span></br>' +
        '<span>Осадки: ' + list.main.humidity + ' %</span></br>' +
        '<div class="button_del">' +
        '<button class="delWeather" id="del_' + city + '">Удалить' +
        '<script>del_' + city + '.onclick = function () {\n' +
        '                    deleteWeatherByName();\n' +
        '                }</script>' +
        '</button>' +
        '</div>';
}


function createRates(json) {
    var list = JSON.parse(json);
    var r = "1 USD = " + list[0].buy + " UAH </br>";
    r += "1 RUR = " + list[2].buy + " UAH </br>";
    r += "1 EUR = " + list[1].buy + " UAH </br>";
    return '<div class="rates_val">' + r + '</div>';
}

function getRates() {
    var rates = document.querySelector(".rates_all");

    var url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.overrideMimeType("application/json");

    xhttp.addEventListener("load", function () {
        if (xhttp.status !== 200) {
            alert('Ошибка загрузки курсов');
        }
        else {
            var create = createRates(xhttp.responseText);
            rates.innerHTML = create;
        }

    });
    xhttp.send();
}
