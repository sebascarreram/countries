const container = document.querySelector(".countries");

/*
 *
/////////////
// ONLY COUNTRY WITHOUT NEIGHBOR
/////////////
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  //request.open("GET", "https://restcountries.eu/rest/v2/all");
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  //console.log(request.responseText)

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const markup = `
    <article class="country">
      <img
          class="country__image"
          src="${data.flag}"
          alt="Image of the USA"
      />
      <div class="country__info">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫🏻</span>${(
          data.population / 1000000
        ).toFixed()} M People</p>
        <p class="country__row"><span>🗣</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

    container.insertAdjacentHTML("beforeend", markup);
  });
};
getCountry("canada");
getCountry("usa");
getCountry("china");
getCountry("new zealand");
getCountry("thailand");
getCountry("spain");
getCountry("colombia");

*/

/////////////
// render CARD
/////////////
const renderCountry = function (data, className = "") {
  const languages = data.languages;
  let str = [];
  if (languages.length > 1) {
    languages.forEach((lan) => {
      str.push(lan.name);
    });
  } else {
    str.push(languages[0].name);
  }
  const markup = `
    <article class="country ${className}">
      <img
          class="country__image"
          src="${data.flag}"
          alt="Image of the USA"
      />
      <div class="country__info">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫🏻</span>${(
          data.population / 1000000
        ).toFixed()} M People</p>
        <p class="country__row"><span>🗣</span>${str.join(", ")}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;

  container.insertAdjacentHTML("beforeend", markup);
  container.style.opacity = 1;
};

const renderError = function (message) {
  const markup = `
  <p class="error">${message}</p>
  `
  container.insertAdjacentHTML("beforeend", markup);
  container.style.opacity = 1;
};

/*
/////////////
// ONLY COUNTRY WITH NEIGHBOR
/////////////
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  //request.open("GET", "https://restcountries.eu/rest/v2/all");
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  //console.log(request.responseText)

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);
    //
    // GET neighbor country

    // it called Destructuring assignment
    const neighbor = data.borders;
    // [ "Hello", "how" ] => "Hello;how"
    const neighborJoin = neighbor.join(";");

    // if there are no elements
    // false ->  true
    if (!neighbor.length) return;

    // AJAX call country 2
    const requestTwo = new XMLHttpRequest();

    requestTwo.open(
      "GET",
      `https://restcountries.eu/rest/v2/alpha?codes=${neighborJoin}`
    );
    requestTwo.send();

    requestTwo.addEventListener("load", function () {
      // string to JSON
      const dataTwo = JSON.parse(this.responseText);
      //console.log(dataTwo);

      dataTwo.forEach((cty) => {
        renderCountry(cty, "neighbour");
      });
      //renderCountry(dataTwo)
    });
  });
};

//getCountryAndNeighbor("Colombia");
getCountryAndNeighbor("usa");
//getCountryAndNeighbor("new zealand");
//
//
*/

//const request = new XMLHttpRequest();
//request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//request.send();
//
//
///////////
// Promise and Fetch API
///////////
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders;

      // GET neighbor country

      // it called Destructuring assignment
      // [ "Hello", "how" ] => "Hello;how"
      const neighborJoin = neighbor.join(";");

      if (!neighbor.length) return;

      return fetch(
        `https://restcountries.eu/rest/v2/alpha?codes=${neighborJoin}`
      );
    })
    .then((res) => res.json())
    .then((getNeighbor) => {
      getNeighbor.forEach((country) => {
        renderCountry(country, "neighbour");
      });
    })
    .catch((err) => {
      console.error(`${err} 🐞🐞`);
      renderError(`Something went wrong 🔥🔥 ${err.message}`);
    });
};

getCountryData("usa");
