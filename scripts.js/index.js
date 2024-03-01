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

    let img = document.createElement("img");
    img.classList.add("card-img-top", "object-fit-contain");
    img.style = "height: 100%; width: 100%";

    img.src = element.imageUrl;
    img.alt = element.name;

    let divBody = document.createElement("div");
    divBody.classList.add("card-body", "d-flex", "flex-column");

    let linkTitle = document.createElement("a");
    linkTitle.classList.add("card-title", "text-decoration-none");

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = element.name;

    let description = document.createElement("p");
    description.classList.add("card-text", "my-auto");
    description.innerText = element.description;

    let divBodyBtn = document.createElement("div");
    divBodyBtn.classList.add("d-flex", "justify-content-between", "align-items-center");

    let brand = document.createElement("small");
    brand.classList.add("text-muted");
    brand.innerText = element.brand;

    let price = document.createElement("small");
    price.classList.add("text-muted");
    price.innerText = element.price + "€";

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn-group");

    let buyBtn = document.createElement("btn-view");
    buyBtn.classList.add("btn", "btn-m", "btn-outline-secondary");
    buyBtn.innerText = "Buy";

    let editBtn = document.createElement("btn-edit");
    editBtn.classList.add("btn", "btn-m", "btn-outline-secondary");
    editBtn.innerText = "Edit";

    let editLink = document.createElement("a");
    editLink.href = `./backoffice.html?id=${element._id}`;
    console.log(element._id);

    editLink.appendChild(editBtn);
    divBtn.append(buyBtn, editLink);
    divBodyBtn.append(divBtn, brand, price);
    linkTitle.appendChild(title);
    divBody.append(linkTitle, description, divBodyBtn);
    link.appendChild(img);
    divImg.appendChild(link);
    container.append(divImg, divBody);
    col.appendChild(container);
    gridCard.appendChild(col);
  });
};

// funzione fetch

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

const btnFirst = document.getElementById("btn-first");
const btnSecond = document.getElementById("btn-second");
