import BASE_URL from "./components/api.js";
import displayMessage from "./components/common/displayMessage.js";
import { getFromStorage, token } from "./components/storage.js";
import renderDynamicNavigation from "./components/common/renderNavigation.js";
renderDynamicNavigation();

const query = document.location.search;
const params = new URLSearchParams(query);
const id = params.get("id");
if (!id) {
  document.location.href = "/index.html";
}

const URL = `${BASE_URL}/hotels/${id}`;

const form = document.querySelector("#editForm");
const formContainer = document.querySelector(".hideForm");
const productName = document.querySelector("#productName");
const description = document.querySelector("#description");
const inputId = document.querySelector("#inputID");
const loader = document.querySelector(".loader");
const message = document.querySelector(".messageContainer");

(async () => {
  try {
    const resposne = await fetch(URL);
    const data = await resposne.json();
    productName.value = data.name;
    description.value = data.description;
    inputId.value = data.id;
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = "none";
    formContainer.style.display = "block";
  }
})();

const updateProduct = async (name, description, id) => {
  const URL = `${BASE_URL}/hotels/${id}`;

  const data = {
    name: name,
    images: null,
    description: description,
    categories: "",
  };

  const userToken = getFromStorage(token);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(URL, options);
    const json = await response.json();
    console.log(json);
    if (json.updated_at) {
      displayMessage(
        "alert-success",
        "Product is updated",
        ".messageContainer"
      );
    }
    if (json.error) {
      displayMessage("alert-danger", json.message, ".messageContainer");
    }
  } catch (error) {
    console.log(error);
  }
};

const submitForm = (e) => {
  e.preventDefault();
  message.innerHTML = "";

  const nameValue = productName.value.trim();
  const descriptionValue = description.value.trim();
  const idValue = inputId.value;

  if (nameValue.length === 0 || descriptionValue.length === 0) {
    displayMessage("alert-danger", "Values are missing", ".messageContainer");
  }

  updateProduct(nameValue, descriptionValue, idValue);
};

form.addEventListener("submit", submitForm);
