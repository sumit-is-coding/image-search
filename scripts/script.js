const accessKey = "Fz2Ii5T38UmjWzKqJPuHhD9MBoN28tlwB9pYFHHtKrQ";
const inputEl = document.getElementById("search-input");
const formEl = document.querySelector("form");
const container = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let page = 1;
let inputData = "";

async function showImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    container.innerHTML = "";
  }
  results.map((eachResult) => {
    const eachResultContainer = document.createElement("div");
    eachResultContainer.classList.add("search-result");
    const eachResultImage = document.createElement("img");
    eachResultImage.src = eachResult.urls.small;
    eachResultImage.alt = eachResult.alt_description;
    const eachResultAnchor = document.createElement("a");
    eachResultAnchor.href = eachResult.links.html;
    eachResultAnchor.target = "_blank";
    eachResultAnchor.textContent = eachResult.alt_description;

    container.appendChild(eachResultContainer);
    eachResultContainer.appendChild(eachResultImage);
    eachResultContainer.appendChild(eachResultAnchor);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
showMore.addEventListener("click", () => {
  showImages();
});
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  showImages();
});
