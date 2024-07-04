// Function to fetch cryptocurrency information from CoinRanking API

async function fetchCryptoData() {
	
	try {
		const response = await
			fetch('https://api.coinranking.com/v2/coins');
		const data = await response.json();
		return data.data.coins;
	} catch (error) {
		console.error('Error fetching cryptocurrency data:', error);
		return [];
	}

}

// Function to display cryptocurrency information in the table form
function displayCryptoData(coins) {
	const cryptoTable = document.getElementById('cryptoTable');
	cryptoTable.innerHTML = '';

	coins.forEach(coin => {
		const row = document.createElement('tr');
		row.innerHTML = `
		<td><img src="${coin.iconUrl}"
		class="crypto-logo" alt="${coin.name}"></td>
			<td>${coin.name}</td>
			<td>${coin.symbol}</td>
			<td>$${coin.price}</td>
			<td>${coin.change}%</td>
			<td>${coin.volume ? coin.volume : '-'}</td>
			<td>${coin.marketCap ? coin.marketCap : '-'}</td>
		`;
		cryptoTable.appendChild(row);
	});
}

// Function to filter cryptocurrencies based on user choice
function filterCryptoData(coins, searchTerm) {
	searchTerm = searchTerm.toLowerCase();

	const filterCoins = coins.filter(coin =>
		coin.name.toLowerCase().includes(searchTerm) ||
		coin.symbol.toLowerCase().includes(searchTerm)
	);

	return filterCoins;
}

// Function to operate search input
function handleSearchInput() {
	const searchInput = document.getElementById('searchInput');
	const searchTerm = searchInput.value.trim();

	fetchCryptoData().then(coins => {
		const filterCoins = filterCryptoData(coins,
			searchTerm);
		displayCryptoData(filterCoins);
	});
}

// Function to initialise the crypto-app
async function initialiseApp() {
	const coins = await fetchCryptoData();
	displayCryptoData(coins);

	// Add event listener to search input
	const searchInput = 
		document.getElementById('searchInput');
	searchInput.addEventListener('input',
		handleSearchInput);
}

// Call initialiseApp function

document.addEventListener('DOMContentLoaded'
	, initialiseApp);
