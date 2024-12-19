$(document).ready(() => {
    $('.tab').on('click', function () {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active').addClass('hidden');

        if ($(this).attr('id') === 'today-tab') {
            $('#today').addClass('active').removeClass('hidden');
        } else {
            $('#forecast').addClass('active').removeClass('hidden');
        }
    });

    $('#search').on('click', function () {
        const location = $('#location').val();
        if (location.trim() !== '') {
            $.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8ed5a55111d9eb9e977f219ce00f630c`, (data) => {
                $('#city-name').text(data.name);
                $('#current-weather').html(`
                    ${data.main.temp}°C, ${data.weather[0].description}
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">
                `);
                
                const hourlyWeather = $('#hourly-weather tbody');
                hourlyWeather.empty();
                for (let i = 0; i < 6; i++) {
                    hourlyWeather.append(`
                        <tr>
                            <td>${i * 3}:00</td>
                            <td>${data.weather[0].main} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon"></td>
                            <td>${data.main.temp.toFixed(1)}</td>
                            <td>${(data.main.feels_like).toFixed(1)}</td>
                            <td>${data.wind.speed.toFixed(1)}</td>
                        </tr>
                    `);
                }

                $('#baladzhary-temp').text(`${data.main.temp.toFixed(1)}`);
                $('#baladzhary-condition').html(`
                    ${data.weather[0].description}
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">
                `);
            });
            $.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=8ed5a55111d9eb9e977f219ce00f630c`, (data) => {
                const forecastTable = $('#forecast-table tbody');
                forecastTable.empty();
                for (let i = 0; i < data.list.length; i += 8) {
                    forecastTable.append(`
                        <tr>
                            <td>${data.list[i].dt_txt.split(' ')[0]}</td>
                            <td>${data.list[i].main.temp.toFixed(1)}</td>
                            <td>
                                ${data.list[i].weather[0].description}
                                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="weather icon">
                            </td>
                        </tr>
                    `);
                }

                const forecastHourly = $('#forecast-hourly tbody');
                forecastHourly.empty();
                for (let i = 0; i < 6; i++) {
                    forecastHourly.append(`
                        <tr>
                            <td>${data.list[i].dt_txt.split(' ')[1]}</td>
                            <td>${data.list[i].weather[0].main} <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="weather icon"></td>
                            <td>${data.list[i].main.temp.toFixed(1)}</td>
                            <td>${data.list[i].main.feels_like.toFixed(1)}</td>
                            <td>${data.list[i].wind.speed.toFixed(1)}</td>
                        </tr>
                    `);
                }
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const nearbyPlacesWeather = {
        Baladzhary: { temp: 7.8, condition: "overcast clouds" },
        Bailov: { temp: 8.2, condition: "partly cloudy" },
        Badamdar: { temp: 7.5, condition: "clear sky" },
        CherniGorod: { temp: 8.0, condition: "light rain" }
    };
    document.getElementById("baladzhary-temp").textContent = nearbyPlacesWeather.Baladzhary.temp;
    document.getElementById("baladzhary-condition").textContent = nearbyPlacesWeather.Baladzhary.condition;

    document.getElementById("bailov-temp").textContent = nearbyPlacesWeather.Bailov.temp;
    document.getElementById("bailov-condition").textContent = nearbyPlacesWeather.Bailov.condition;

    document.getElementById("badamdar-temp").textContent = nearbyPlacesWeather.Badamdar.temp;
    document.getElementById("badamdar-condition").textContent = nearbyPlacesWeather.Badamdar.condition;

    document.getElementById("chernigorod-temp").textContent = nearbyPlacesWeather.CherniGorod.temp;
    document.getElementById("chernigorod-condition").textContent = nearbyPlacesWeather.CherniGorod.condition;
    document.getElementById("today-tab").addEventListener("click", function () {
        document.getElementById("today").classList.remove("hidden");
        document.getElementById("forecast").classList.add("hidden");
        this.classList.add("active");
        document.getElementById("forecast-tab").classList.remove("active");
    });
    document.getElementById("forecast-tab").addEventListener("click", function () {
        document.getElementById("forecast").classList.remove("hidden");
        document.getElementById("today").classList.add("hidden");
        this.classList.add("active");
        document.getElementById("today-tab").classList.remove("active");
    });
});
