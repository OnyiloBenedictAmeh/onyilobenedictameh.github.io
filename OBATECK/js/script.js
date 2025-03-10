let menu = document.querySelector('#menu-btn');
let navbarLinks = document.querySelector('.header .navbar .links');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbarLinks.classList.toggle('active');
}

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbarLinks.classList.remove('active');

   if(window.scrollY > 60){
      document.querySelector('.header .navbar').classList.add('active');
   }else{
      document.querySelector('.header .navbar').classList.remove('active');
   }
}
document.getElementById("toggleButton").addEventListener("click", function() {
   const moreText = document.querySelector(".more-text");
   if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "block";
      this.textContent = "Read Less";
   } else {
      moreText.style.display = "none";
      this.textContent = "Read More";
   }
});
let searchData = [];

// Fetch search data on page load
async function loadSearchData() {
   let response = await fetch("search-data.json");
   searchData = await response.json();
}

document.addEventListener("DOMContentLoaded", loadSearchData);

// Show auto-complete suggestions
function showSuggestions() {
   let query = document.getElementById("searchInput").value.toLowerCase();
   let suggestionsContainer = document.getElementById("suggestions");
   
   if (query.length === 0) {
      suggestionsContainer.style.display = "none";
      return;
   }

   let filtered = searchData.filter(item => item.title.toLowerCase().includes(query));
   suggestionsContainer.innerHTML = "";

   if (filtered.length > 0) {
      suggestionsContainer.style.display = "block";
      filtered.forEach(item => {
         let div = document.createElement("div");
         div.classList.add("suggestion-item");
         div.innerText = item.title;
         div.onclick = () => {
            document.getElementById("searchInput").value = item.title;
            suggestionsContainer.style.display = "none";
            performSearch();
         };
         suggestionsContainer.appendChild(div);
      });
   } else {
      suggestionsContainer.style.display = "none";
   }
}

// Perform a full search
function performSearch() {
   let query = document.getElementById("searchInput").value.toLowerCase();
   if (query.trim() === "") return;

   // Redirect to the full search results page with the query
   window.location.href = `search.html?q=${query}`;
}

// Load search results on the full search page
async function loadSearchResults() {
   let params = new URLSearchParams(window.location.search);
   let query = params.get("q")?.toLowerCase();
   if (!query) return;

   let response = await fetch("search-data.json");
   let data = await response.json();

   let filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
   );

   displayResults(filteredResults);
}

// Paginate results
let currentPage = 1;
const resultsPerPage = 5;

function displayResults(results) {
   let resultsContainer = document.getElementById("searchResults");
   resultsContainer.innerHTML = "";

   let start = (currentPage - 1) * resultsPerPage;
   let end = start + resultsPerPage;
   let paginatedResults = results.slice(start, end);

   if (paginatedResults.length > 0) {
      resultsContainer.style.display = "block";
      paginatedResults.forEach(item => {
         let div = document.createElement("div");
         div.classList.add("result-item");
         div.innerHTML = `<a href="${item.url}" target="_blank">${item.title} (${item.category})</a>`;
         resultsContainer.appendChild(div);
      });

      showPaginationControls(results);
   } else {
      resultsContainer.innerHTML = "<p>No results found</p>";
      resultsContainer.style.display = "block";
   }
}

// Show pagination controls
function showPaginationControls(results) {
   let paginationContainer = document.createElement("div");
   paginationContainer.classList.add("pagination");

   let totalPages = Math.ceil(results.length / resultsPerPage);

   for (let i = 1; i <= totalPages; i++) {
      let button = document.createElement("button");
      button.innerText = i;
      button.onclick = () => {
         currentPage = i;
         displayResults(results);
      };
      paginationContainer.appendChild(button);
   }

   document.getElementById("searchResults").appendChild(paginationContainer);
}

document.addEventListener("DOMContentLoaded", loadSearchResults);

function expandSearch() {
   let searchInput = document.getElementById('searchInput');
   searchInput.style.width = "300px"; // Expands search bar
}

// Shrinks search bar when clicking outside
document.addEventListener("click", function(event) {
   let searchInput = document.getElementById('searchInput');
   if (!searchInput.contains(event.target)) {
      searchInput.style.width = "200px"; // Shrinks back to default
   }
});
