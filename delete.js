function deleteElementNew(elem) {
    // var self = this;
    elem.onclick = function (e) {
        var target = e.target;
        if (target.classList.contains("delWeather")) {
            var parent = target.parentElement.parentElement;
            city = parent.querySelector('.city_name').getAttribute('id');
            console.log('city = ' + city);
            parentId = "div_" + city;
            document.getElementById(parentId).remove();


            //удаление городов из localStorage
            var arr = localStorage.getItem('cities');
            if (arr !== null) {
                arr = arr.split(',');
            } else arr = [];

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === city) {
                    localStorage.removeItem(city);
                    // arr.slice(arr.indexOf(city), 1);
                    arr = arr.filter(item => item !== city);

                }
            }

            if (arr.length === 0) localStorage.removeItem('cities');
            else localStorage.setItem('cities', arr);

        }
    }
}

new deleteElementNew(document.querySelector('.dynamic_city'));