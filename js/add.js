import renderDynamicNavigation from "./components/common/renderNavigation.js";
import BASE_URL from "./components/api.js";
import displayMessage from "./components/common/displayMessage.js";
import { getFromStorage, token } from "./components/storage.js";

renderDynamicNavigation();

const productName = document.querySelector("#productName");
const description = document.querySelector("#description");
const message = document.querySelector(".messageContainer");
const form = document.querySelector("#addForm");

const addProduct = async (name, description) => {
  const URL = `${BASE_URL}/hotels`;

  const data = {
    name: name,
    images: null,
    description: description,
    categories: "",
  };

  const userToken = getFromStorage(token);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(URL, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("alert-success", "Product created", ".messageContainer");
      form.reset();
    }
    if (json.error) {
      displayMessage("alert-warning", json.message, ".messageContainer");
    }
  } catch (error) {
    displayMessage("alert-danger", "An error occured", ".messageContainer");
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  message.innerHTML = "";

  const nameValue = productName.value.trim();
  const descriptionValue = description.value.trim();
  if (nameValue.length === 0 || descriptionValue.length === 0) {
    displayMessage("alert-danger", "Values are missing", ".messageContainer");
  }

  addProduct(nameValue, descriptionValue);
};

form.addEventListener("submit", handleSubmit);
