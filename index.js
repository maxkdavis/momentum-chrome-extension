const author = document.querySelector(".image-credit");
const cryptoData = document.querySelector(".crypto");
const weatherData = document.getElementById("weather");
let centerClock = document.getElementById("time");

function getTime() {
    const date = new Date();
    let currenTime = date.toLocaleTimeString("en-us", { timeStyle: "medium" });
    centerClock.textContent = currenTime;
}
setInterval(getTime, 1000);

//getting the weather data based on the user's geo location
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=36e30b50e3e819e2385d0580b4298a62&units=imperial`)
        .then((response) => response.json())
        .then((data) => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherData.innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-text">${data.name}  ${Math.round(data.main.temp)} <span>&#xb0;</span></p>
            `;
        });
});

//Unsplash photo API: https://api.unsplash.com/photos/random?orientation=landscape&query=space
//in the ap above I added a landscape parameter and a query to filter for only photos that match my key search term, 'space'
//on page load, use fetch to get data from API
window.addEventListener("load", () => {
    fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=fS9s65Lm6Mqo6gjSIxDGGFn5LhAfrPJwZUROKUxN4oQ")
        .then((response) => response.json())
        .then((data) => {
            document.body.style.backgroundImage = `
            url(${data.urls.regular})
            `;

            author.textContent = `Credit: ${data.user.name}`;
        });
});

//base API URL for the crypto information: https://api.coingecko.com/api/v3
//get current data for ethereum: https://api.coingecko.com/api/v3/coins/ethereum
window.addEventListener("load", () => {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
        .then((response) => {
            if (!response.ok) {
                throw Error("Something went wrong");
            }
            return response.json();
        })
        .then((data) => {
            cryptoData.innerHTML = `
            <img src=${data.image.small} class="dogecoin-icon" />
            <span>Price of ${data.name}: $${data.market_data.current_price.usd}</span>
            `;
        })
        .catch((err) => {
            console.log(err);
            cryptoData.textContent = "Unable to locate Crypto";
        });
});
