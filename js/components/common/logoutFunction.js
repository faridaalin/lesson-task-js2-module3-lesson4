import { clearItemFromStorage } from "../storage.js";

const logoutButton = () => {
  const button = document.querySelector("#logout-btn");

  if (button) {
    button.onclick = function () {
      const doLogout = confirm("Are you sure?");

      if (doLogout) {
        clearItemFromStorage();
        location.href = "/";
      }
    };
  }
};

export default logoutButton;
