import { getFromStorage, userKey } from "../storage.js";

const renderDynamicNavigation = () => {
  const { pathname } = document.location;

  let activeClass;
  const user = getFromStorage(userKey);

  const loggedIn =
    user.length === 0
      ? `<li class="nav-item ${(activeClass =
          pathname === "/login.html" ? "active" : "")}">
    <a class="nav-link" href="./login.html">Login</a>
    </li>`
      : `<li class="nav-item">
    <span class="nav-link" style="color: #E2CBAF">Hi ${user.username}!</span>
    </li>
    <li class="nav-item ${(activeClass =
      pathname === "/add.html" ? "active" : "")}">
    <a class="nav-link" href="./add.html">Add hotel</a>
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
                                    <li class="nav-item ${(activeClass =
                                      pathname === "logout.html"
                                        ? "active"
                                        : "")} ml-auto">
                                        <a class="nav-link" href="logout.html">Log out</a>
                                    </li>
  
                                </ul>`;
};

export default renderDynamicNavigation;
