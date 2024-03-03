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

  let brand = document.querySelector("#container-description h4");
  brand.innerText = paramBrand;

  let name = document.querySelector("#container-description h1");
  name.innerText = paramName;

  let description = document.querySelector("#container-description p");
  description.innerText = paramDescription;
}

createProfile();
