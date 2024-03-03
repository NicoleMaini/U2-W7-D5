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
  const btnReset = document.getElementById("reset-btn");

  // funzione per confermare la modifica
  btnReset.onclick = () => {
    if (confirm("Sei sicuro di voler resettare tutti i campi?")) {
      form.reset();
    }
  };

  // se l'indirizzo del nostro prodotto esiste allora:
  if (produtctId) {
    tilte.innerText = "Modifica caratteristiche del prodotto";

    btnDouble.innerText = "Edit";

    // funzione per confermare la modifica
    btnDouble.onclick = e => {
      e.preventDefault();

      if (confirm("Sei sicuro di voler effettuare questi cambiamenti?")) {
        const message = `<div class="alert alert-success d-flex align-items-center" style="margin-top: 6rem;" role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
      <div>
      ${document.getElementById("name").value} modificato con successo!
      </div>
    </div>`;
        allert(message);
        setTimeout(() => {
          window.location.assign("../index.html");
        }, 700);
      } else {
      }
    };

    // creiamo il btn delite

    btnDelete.innerText = "Delite";
    btnDelete.classList.remove("btn-outline-rose");
    btnDelete.classList.add("btn-danger");

    // funzione per confermare l'eliminazione

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
            // una volta eliminato il prodotto, si rimuove il form e c'è la conferma del prodotto eliminato
            const message = `<div class="alert alert-success d-flex align-items-center" style="margin-top: 6rem;" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <div>
            ${product.name} eliminato con successo!
            </div>
            </div>`;
            allert(message);
          });

        // dopodiché, con uno scarto di 1 secondo, l'utente viene riportato alla homepage
        setTimeout(() => {
          window.location.assign("../index.html");
        }, 700);
      }
    };

    // quindi facciamo una fetch in modo da riottenere i dati dell'oggetto e andarli a immettere nel form per essere salvati

    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYjFiZDRjNTllYzAwMTk5MGQ3OWUiLCJpYXQiOjE3MDkyODk5MTgsImV4cCI6MTcxMDQ5OTUxOH0.Xetjs2pF9la9RUExay-929FxXJMdp812qWLuaQgmWwY",
        "Content-Type": "application/json",
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
        // una volta ottenuto l'oggetto ecco che gli andiamo a riassegnarli le proprietà
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

    // funzione per il ritorno in home
    btnDelete.onclick = () => {
      window.location.assign("../index.html");
    };
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

  // 2)creiamo la fetch che ci permette di creare gli elementi per le card

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
  const message = `<div class="alert alert-success d-flex align-items-center" style="margin-top: 6rem;" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    <div>
    ${objOffice.name} creato con successo!
    </div>
    </div>`;
  allert(message, removeDisplayNone);
  e.target.reset();
};

// funzione feedback per notificare all'utente se il processo è andato a buon fine

function allert(message, func) {
  const alertAppend = document.getElementById("append-alert");
  const alertContainer = document.getElementById("alert");
  alertContainer.classList.add("d-none");
  alertAppend.innerHTML = message;
  setTimeout(() => {
    func(alertAppend, alertContainer);
  }, 600);
}

// funzione per ritornare nel form ad aggiungere articoli
function removeDisplayNone(append, container) {
  append.innerHTML = "";
  append.appendChild(container);
  container.classList.remove("d-none");
}
