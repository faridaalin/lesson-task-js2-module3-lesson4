const form = document.querySelector("#submitForm");
import displaMessage from "./components/common/displayMessage.js";
import BASE_URL from "./components/api.js";
import {
  saveToStorage,
  getFromStorage,
  userKey,
  token,
} from "./components/storage.js";

const messageContainer = document.querySelector(".messageContainer");

const submitForm = (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();

  messageContainer.innerHTML = "";

  if (username.length === 0 || password.length === 0) {
    displaMessage(
      "alert-danger",
      "Invalid username or password",
      ".messageContainer"
    );
  }

  doLogin(username, password);
};

form.addEventListener("submit", submitForm);

async function doLogin(username, password) {
  const URL = `${BASE_URL}/auth/local`;
  const userData = {
    identifier: username,
    password: password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  try {
    const resp = await fetch(URL, options);
    const data = await resp.json();
    console.log(data);
    if (data.user) {
      location.href = "index.html";
      saveToStorage(userKey, data.user);
      saveToStorage(token, data.jwt);
    }
    if (data.error) {
      const { message } = data.message[0].messages[0];
      displaMessage("alert-warning", message, ".messageContainer");
    }
  } catch (error) {
    console.log(error);
  }
}
