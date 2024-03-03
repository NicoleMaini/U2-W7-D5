const params = new URLSearchParams(window.location.search);
console.log(params);

const paramId = params.get("id");
const paramBrand = params.get("brand");
const paramName = params.get("name");
const paramImg = params.get("img");
const paramDescription = params.get("description");

function createProfile() {
  let img = document.getElementById("img-profile");
  img.src = paramImg;

  console.log(paramImg);

  let container = document.getElementById("container-description");

  let description = document.createElement("p");
  description.classList.add("lead", "text-start");
  description.innerText = paramDescription;

  let brand = document.createElement("h3");
  brand.classList.add("jumbotron-heading", "text-start");
  brand.innerText = paramBrand;

  let name = document.createElement("h1");
  name.classList.add("jumbotron-heading");
  name.innerText = paramName;

  let id = document.createElement("small");
  id.classList.add("text-end", "d-block", "mt-4");
  id.innerText = "ID: " + paramId;

  container.append(brand, name, description, id);
}

createProfile();

// function bgColor() {
//   let body = document.querySelector("body");
//   body.style = `background-color: #${paramColor};`;
// }

// bgColor();
