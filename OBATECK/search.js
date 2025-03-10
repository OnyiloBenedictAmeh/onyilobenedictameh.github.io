let searchData = [];
async function loadSearchResults() {
   try {
      let response = await fetch("search-data.json"); 
      
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log("Loaded Data:", data); // Debugging

   } catch (error) {
      console.error("Error fetching search data:", error);
   }
}
document.addEventListener("DOMContentLoaded", function() {
   loadSearchResults(); // Call your function after the DOM is fully loaded
});

// Fetch search data when the page loads
async function loadSearchData() {
   let response = await fetch("search-data.json");
   searchData = await response.json();
}

// Extract search query from URL
function getSearchQuery() {
   let params = new URLSearchParams(window.location.search);
   return params.get("q")?.toLowerCase() || "";
   console.log("Search Query:", query); // Debugging
}

// Load search results on search.html
async function loadSearchResults() {
   let query = getSearchQuery();
   if (!query) return;

   document.getElementById("queryText").innerText = `Showing results for: "${query}"`;

   let response = await fetch("search-data.json");
   let data = await response.json();
   console.log("Loaded Data:", data); // Debugging

   let filteredResults = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
      
   );
   console.log("Filtered Results:", filteredResults); // Debugging

   displayResults(filteredResults);
}

// Pagination variables
let currentPage = 1;
const resultsPerPage = 5;

// Display results with pagination
function displayResults(results) {
   let resultsContainer = document.getElementById("searchResults");
   resultsContainer.innerHTML = "";

   let start = (currentPage - 1) * resultsPerPage;
   let end = start + resultsPerPage;
   let paginatedResults = results.slice(start, end);

   if (paginatedResults.length > 0) {
      paginatedResults.forEach(item => {
         let div = document.createElement("div");
         div.classList.add("result-item");
         div.innerHTML = `<a href="${item.url}" target="_blank">${item.title} (${item.category})</a>`;
         resultsContainer.appendChild(div);
      });

      showPaginationControls(results);
   } else {
      resultsContainer.innerHTML = "<p>No results found</p>";
   }
}

// Create pagination buttons
function showPaginationControls(results) {
   let paginationContainer = document.createElement("div");
   paginationContainer.classList.add("pagination");

   let totalPages = Math.ceil(results.length / resultsPerPage);
   paginationContainer.innerHTML = ""; 

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

// Run functions on page load
document.addEventListener("DOMContentLoaded", () => {
   loadSearchData();
   loadSearchResults();
});
