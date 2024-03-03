const createCard = array => {
  array.forEach(element => {
    const gridCard = document.getElementById("grid-card");

    let col = document.createElement("div");
    col.classList.add("col-md-4");

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
        throw new Error("400 - Errore lato utente");
      }
      if (response.status === 404) {
        throw new Error("404 - Dato non trovato");
      }
      if (response.status === 500) {
        throw new Error("500 - Errore lato server");
      }

      throw new Error("Errore reperimento dati");
    }
  })
  .then(products => {
    console.log(products);
    createCard(products);
  });

// btn

// const btnFirst = document.getElementById("btn-first");
// const btnSecond = document.getElementById("btn-second");
