// 2) creo la funzione per creare le card

const createCard = array => {
  array.forEach(element => {
    const gridCard = document.getElementById("grid-card");

    let col = document.createElement("div");
    col.classList.add("col-md-6", "col-xl-4");

    let container = document.createElement("div");
    container.classList.add("card", "mb-4", "shadow-sm", "h-100");

    let divImg = document.createElement("div");
    divImg.style = "height: 18rem; overflow: hidden;";

    let link = document.createElement("a");
    link.href = `./info.html?id=${element._id}&img=${element.imageUrl}&brand=${element.brand}&name=${element.name}&price=${element.price}&description=${element.description}`;

    let img = document.createElement("img");
    img.classList.add("card-img-top", "object-fit-contain", "cp");
    img.style = "height: 100%; width: 100%";

    img.src = element.imageUrl;
    img.alt = element.name;

    let divBody = document.createElement("div");
    divBody.classList.add("card-body", "d-flex", "flex-column");

    let linkTitle = document.createElement("a");
    linkTitle.classList.add("card-title", "text-decoration-none");
    linkTitle.href = `./info.html?id=${element._id}&img=${element.imageUrl}&brand=${element.brand}&name=${element.name}&price=${element.price}&description=${element.description}`;

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = element.name;

    let description = document.createElement("p");
    description.classList.add("card-text", "mb-auto");
    description.innerText = element.description;

    let divBodyBtn = document.createElement("div");
    divBodyBtn.classList.add("d-flex", "justify-content-between", "align-items-center");

    let brand = document.createElement("small");
    brand.classList.add("text-muted", "my-3");
    brand.innerText = element.brand;

    let price = document.createElement("small");
    price.classList.add("h4");
    price.innerText = element.price + "€";

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn-group");

    let showMoreLink = document.createElement("a");
    showMoreLink.href = `./info.html?id=${element._id}&img=${element.imageUrl}&brand=${element.brand}&name=${element.name}&price=${element.price}&description=${element.description}`;
    console.log(element._id);

    let showMoreBtn = document.createElement("btn-view");
    showMoreBtn.classList.add("btn", "show-more");
    showMoreBtn.innerText = "Scopri di più";

    let editBtn = document.createElement("btn-edit");
    editBtn.classList.add("btn", "btn-outline-rose");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
  </svg>`;

    let editLink = document.createElement("a");
    editLink.href = `./backoffice.html?id=${element._id}`;
    console.log(element._id);

    showMoreLink.appendChild(showMoreBtn);
    editLink.appendChild(editBtn);
    divBtn.append(showMoreLink, editLink);
    divBodyBtn.append(price, divBtn);
    linkTitle.appendChild(title);
    divBody.append(brand, linkTitle, description, divBodyBtn);
    link.appendChild(img);
    divImg.appendChild(link);
    container.append(divImg, divBody);
    col.appendChild(container);
    gridCard.appendChild(col);
  });
};

// 1) funzione fetch per mostrare in maniera dinamica i prodotti in hompage

const URL = "https://striveschool-api.herokuapp.com/api/product/";

fetch(URL, {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY",
    "Content-Type": "application/json",
  },
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        throw new Error(
          error("400! Qualcosa è andato storto durante l'inserimento dei dati", "400 - Errore lato utente")
        );
      }
      if (response.status === 404) {
        throw new Error(error("404! Mi spiace il dato cercato non è disponibile", "404 - Dato non trovato"));
      }
      if (response.status === 500) {
        throw new Error(
          error(
            "500! Mi dispiace ma al momento il server non è raggiungibile. Riprova più tardi :)",
            "500 - Errore lato server"
          )
        );
      }

      throw new Error(error("! I dati richiesti non sono al momento raggiungibili", "Errore reperimento dati"));
    }
  })
  .then(products => {
    console.log(products);
    createCard(products);

    // mentre aspettiamo il caricamento delle card, mostriamo all'utente uno spinnere una falsa card
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("spinner-border");
    spinner.innerHTML = ` <img
    height="35px"
    src="https://cdn.accentuate.io/35414048907/1675780333416/BH_WS_USPs_candle_duration_200px_010822-(2).png?v=1675780333416"
    alt=""
  />`;
    const placheolders = document.getElementById("placeholder-load");
    placheolders.classList.add("d-none");
  });

function error(string, string2) {
  const containerAllCard = document.getElementById("container-all-card");
  const allertWrong = document.createElement("div");
  allertWrong.innerHTML = `<div class="alert alert-danger d-flex align-items-center  w-50 mx-auto" style="margin-bottom: 3rem; " role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
      <div>
      Error ${string}!
      </div>
      </div>`;
  containerAllCard.appendChild(allertWrong);
  console.log(string2);
}
