const dorkCategories = {
  "Misconfigured Interfaces": [
    "intitle:index.of",
    "inurl:.svn",
    "inurl:/owa/auth/logon.aspx",
    "inurl:/admin/login.php",
    "inurl:/wp-admin/ intext:username",
    "inurl:/admin/login.php filetype:php",
    "inurl:/wp-admin/ filetype:php"
  ],
  "Exposed Documents": [
    "filetype:php",
    "site:{domain} intext:password",
    "intext:username filetype:log",
    "inurl:wp-content/uploads",
    "intext:DB_PASSWORD",
    "intitle:\"Index of\" passwords.txt",
    "site:{domain} ext:sql | ext:dbf | ext:mdb",
    "intext:\"sql syntax near\" | intext:\"syntax error has occurred\" filetype:php",
    "inurl:backup filetype:mdb",
    "site:{domain} ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini"
  ],
  // add more categories and dork queries as needed
};

function searchDorks(category, domain) {
  const dorks = dorkCategories[category];
  const searchResults = [];
  dorks.forEach(dork => {
    const query = dork.replace("{domain}", domain);
    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
    searchResults.push({
      query: dork,
      url: searchUrl
    });
  });

  // Open each search result in the same window
  searchResults.forEach(result => {
    window.location.href = result.url;
  });

  return searchResults;
}

// Get the form and add a submit event listener
const form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the selected category and domain from the form
  const category = form.elements["category"].value;
  const domain = form.elements["domain"].value;

  // Call the searchDorks function with the selected category and domain
  searchDorks(category, domain);
});

