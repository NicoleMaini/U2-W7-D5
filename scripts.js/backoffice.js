// fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
// headers: {
// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY"
// }

const form = document.getElementById("form");

// riprendiamo il parametro passato dalla home per recuperare il nosto oggetto
const produtctId = new URLSearchParams(window.location.search).get("id");
console.log(produtctId);

// const URL = "https://striveschool-api.herokuapp.com/api/product/"; // creaiamo l'url di partenza
// se l'URL contiene al suo interno un id il metodo sarà put in alternativa sara un post, così potremmo usare
// un metodo o l'altro all'interno della stessa fetch senza doverla replicare. Facile ed efficiente una volta che ci si arriva

const URL = produtctId
  ? "https://striveschool-api.herokuapp.com/api/product/" + produtctId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = produtctId ? "PUT" : "POST";

// al caricamento della pagina facciamo questo
window.onload = () => {
  // recuperiamo un po' di id che ci servono
  const tilte = document.getElementById("title");
  const btnDouble = document.getElementById("save-edit");
  const btnDelete = document.getElementById("delete-btn");

  // se l'indirizzo del nostro prodotto esiste allora:
  if (produtctId) {
    tilte.innerText = "Modifica caratteristiche del prodotto";

    btnDouble.innerText = "Edit";

    // funzione per confermare la modifica
    btnDouble.onclick = () => {
      if (confirm("Sei sicuro di voler effettuare questi cambiamenti?")) {
        window.location.assign("../index.html");
      }
    };

    btnDelete.classList.remove("d-none");

    // funzione per confermare l'eliminazione

    const alertCont = document.getElementById("alert");

    btnDelete.onclick = () => {
      if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
        fetch(URL, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY",
            "Content-Type": "application/json", // === row di postman, serve per far capire al server che dato gli arriva
          },
        })
          .then(resp => resp.json())
          .then(product => {
            alertCont.remove();
            alertCont.innerHTML = `<div class="alert alert-success" role="alert">
            ${product.name} eliminato correttamente!
          </div>`;
          });
        setTimeout(() => {
          window.location.assign("../index.html");
        }, 1000);
      }
    };

    // e facciamo una fetch in modo da riottenere i dati dell'oggetto e andarli a immettere nel form per essere salvati

    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY",
        "Content-Type": "application/json", // === row di postman, serve per far capire al server che dato gli arriva
      },
    })
      .then(response => {
        console.log(response);

        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("400 - Errore lato client");
          }

          if (response.status === 404) {
            throw new Error("404 - Dato non trovato");
          }

          if (response.status === 500) {
            throw new Error("500 - Errore lato server");
          }

          throw new Error("Errore nel reperimento dati");
        }
      })
      .then(product => {
        console.log(product);
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("imgObj").value = product.imageUrl;
        document.getElementById("price").value = product.price;
      })
      .catch(err => console.log(err));
  } else {
    tilte.innerText = "Inserisci qui le caratteristiche del prodotto";
    btnDouble.innerText = "Save";
  }
};

// creaiamo l'oggetto che ci verra dato dagli imput della pagina back office

form.onsubmit = e => {
  console.log(e);
  e.preventDefault();

  const objOffice = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imgObj").value,
    price: document.getElementById("price").value,
  };

  console.log(objOffice);

  // creiamo la fetch che ci permette di creare gli elementi per le card
  //   const URL = produtctId
  //   ? "https://striveschool-api.herokuapp.com/api/product/" + produtctId
  //   : "https://striveschool-api.herokuapp.com/api/product/";

  fetch(URL, {
    // const method = produtctId ? "PUT" : "POST";
    method,
    body: JSON.stringify(objOffice),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY",
      "Content-Type": "application/json", // === row di postman, serve per far capire al server che dato gli arriva
    },
  })
    .then(response => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server");
        }

        throw new Error("Errore nel reperimento dati");
      }
    })
    .then(objOffice => {
      console.log(objOffice);
    })
    .catch(err => console.log(err));

  e.target.reset();
};
