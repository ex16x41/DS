const dorkCategories = {
	'Sensitive Directories': [
		'intitle:index.of',
		'intitle:"Index of /" +{directory}',
		'intitle:"Index of /" inurl:{directory}'
	]
	// add more categories and dork queries as needed
};

function searchDorks(event) {
	event.preventDefault();
	const category = document.getElementById('category').value;
	const domain = document.getElementById('domain').value;
	const dorks = dorkCategories[category];
	const searchResults = [];

	dorks.forEach(dork => {
		const query = dork.replace('{domain}', domain);
		const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
		searchResults.push({
			query: dork,
			url: searchUrl
		});
	});

	// Open each search result in the same window
	searchResults.forEach(result => {
		window.location.href = result.url;
	});

	return false;
}
