// Fetching latest exchange rates from Open Exchange Rates API
const api_key = 'YOUR_API_KEY'; // Get your API key from Open Exchange Rates
const base_url = `https://open.er-api.com/v6/latest/${api_key}`;

async function fetchCurrencies() {
  try {
    const response = await fetch(base_url);
    const data = await response.json();
    const currencies = Object.keys(data.rates);
    return currencies;
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

async function populateCurrencyOptions() {
  const currencies = await fetchCurrencies();
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');

  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.text = currency;
    option1.value = currency;
    option2.text = currency;
    option2.value = currency;
    fromCurrencySelect.add(option1);
    toCurrencySelect.add(option2);
  });
}

function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      document.getElementById('convertedAmount').value = convertedAmount;
    })
    .catch(error => {
      console.error('Error converting currency:', error);
    });
}

// Event listeners
document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);

// Initialize
populateCurrencyOptions();
