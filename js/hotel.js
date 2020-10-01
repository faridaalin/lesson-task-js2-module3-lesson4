import BASE_URL from "./components/api.js";
import displayMessage from "./components/common/displayMessage.js";
import renderDynamicNavigation from "./components/common/renderNavigation.js";
renderDynamicNavigation();

const query = document.location.search;
const params = new URLSearchParams(query);
const id = params.get("id");

if (!id) {
  document.location.href = "/index.html";
}
const URL = `${BASE_URL}/hotels/${id}`;

(async function getHotels() {
  try {
    const resp = await fetch(URL);
    const hotel = await resp.json();
    renderHotel(hotel);
  } catch (error) {
    displayMessage("alert-danger", error, ".wrapper");
  }
})();

const renderHotel = (hotel) => {
  const container = document.querySelector(".container");
  const bgImage = document.querySelector(".hotel-bg");

  const imageUrl =
    hotel.images.length === 0
      ? `https://via.placeholder.com/200x100.png`
      : `${BASE_URL}${hotel.images[0].url}`;

  bgImage.style.backgroundImage = `url(${imageUrl})`;

  container.innerHTML = ` <div class="col-sm">
                              <h1>${hotel.name}</h1>
                              <p>${hotel.description}</p>
                              </div>`;
};
