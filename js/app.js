import BASE_URL from "./components/api.js";
import displayMessage from "./components/common/displayMessage.js";
import renderDynamicNavigation from "./components/common/renderNavigation.js";
renderDynamicNavigation();

const hotels_Url = `${BASE_URL}/hotels`;

(async function getdata() {
  try {
    const resp = await fetch(hotels_Url);
    const data = await resp.json();
    renderHotels(data);
  } catch (error) {
    displayMessage("alert-danger", error, ".card-wrapper");
  }
})();

const renderHotels = (hotels) => {
  const container = document.querySelector(".card-container");

  hotels.forEach((hotel) => {
    let imageUrl = `https://via.placeholder.com/200x100.png`;
    let imageContainer;

    if (hotel.images.length === 0) {
      imageContainer = `<div class="bg-img embed-responsive embed-responsive-4by3 rounded-top"
      style="background-image: url(${imageUrl})">
      </div> `;
    } else {
      imageUrl = `${BASE_URL}${hotel.images[0].url}`;
      imageContainer = `<div class="bg-img embed-responsive embed-responsive-4by3 rounded-top"
      style="background-image: url(${imageUrl})">
      </div> `;
    }

    const categoryName =
      hotel.categories.length === 0 ? "Unknown" : `${hotel.categories[0].name}`;

    container.innerHTML += `<div class="col-sm">
                                  <div class="card border-0 rounded mt-4" style="width: 18rem;">
                                      <a href="edit.html?id=${hotel.id}">
                                      ${imageContainer}
                                      </a>

                                      <div class="card-body rounded-bottom">
                                          <p class="category">${categoryName}</p>
                                          <a class="card-title"  href="hotel.html?id=${hotel.id}">${hotel.name}</a>

                                   </div>
                               </div>
                              </div>`;
  });
};
