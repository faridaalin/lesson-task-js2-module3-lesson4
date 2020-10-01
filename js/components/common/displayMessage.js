const displayMessage = (cssClass, errorMessage, htmlTag) => {
  const element = document.querySelector(htmlTag);
  element.innerHTML = ` <div class="alert ${cssClass}" role="alert">${errorMessage}</div>`;
};

export default displayMessage;
