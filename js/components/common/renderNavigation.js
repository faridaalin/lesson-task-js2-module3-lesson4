import { getFromStorage, userKey } from "../storage.js";
import logoutButton from "./logoutFunction.js";

const renderDynamicNavigation = () => {
  const { pathname } = document.location;

  let activeClass;
  const user = getFromStorage(userKey);

  const loggedIn =
    user.length === 0
      ? `<li class="nav-item ${(activeClass =
          pathname === "/login.html" ? "active" : "")} ml-auto">
    <a class="nav-link" href="./login.html">Login</a>
    </li>`
      : `<li class="nav-item">
    <span class="nav-link" style="color: #E2CBAF">Hi ${user.username}!</span>
    </li>
    <li class="nav-item ${(activeClass =
      pathname === "/edit.html" ? "active" : "")} ml-auto">
    <a class="nav-link" href="./hotel.html">Add hotel</a>
    </li>
    <li class="nav-item ${(activeClass =
      pathname === "logout.html" ? "active" : "")} ml-auto">
        <button class="btn btn-primary" id="logout-btn">Log out</button>
        
    </li>
    `;

  const dynamicMenu = document.querySelector(".dynamicMenu");
  dynamicMenu.innerHTML = `<ul class="navbar-nav w-100">
                                    <li class="nav-item ${(activeClass =
                                      pathname === "/index.html" ||
                                      pathname === "/"
                                        ? "active"
                                        : "")}">
                                        <a class="nav-link" href="./index.html">Home <span class="sr-only">(current)</span></a>
                                    </li>
                                    ${loggedIn}  
                                </ul>`;

  logoutButton();
};

export default renderDynamicNavigation;
