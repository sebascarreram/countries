const container = document.querySelector(".countries");

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
