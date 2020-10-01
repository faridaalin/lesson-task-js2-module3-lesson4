import { getFromStorage, token } from "../storage.js";
import BASE_URL from "../api.js";
import displayMessage from "../common/displayMessage.js";

const deleteProduct = (id) => {
  const deleteContainer = document.querySelector(".delete-container");
  deleteContainer.innerHTML = `                    <button type="button" class="btn btn-danger w-100" id="delete-btn">Delete</button>
  `;

  const button = document.querySelector("#delete-btn");

  button.onclick = async function () {
    const doDelte = confirm("Are you sure you want to delete?");
    console.log(doDelte);

    if (doDelte) {
      const URL = `${BASE_URL}/hotels/${id}`;
      const userToken = getFromStorage(token);

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      try {
        const response = await fetch(URL, options);
        const json = await response.json();
        location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };
};

export default deleteProduct;
