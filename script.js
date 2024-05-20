const csvUrls = [
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.7163percent_group5.0.csv", points: 5 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.0444percent_group6.0.csv", points: 6 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.3440percent_group7.0.csv", points: 7 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/3.0831percent_group8.0.csv", points: 8 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.5375percent_group9.0.csv", points: 9 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.9808percent_group10.0.csv", points: 10 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.0807percent_group11.0.csv", points: 11 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.8866percent_group12.0.csv", points: 12 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.7003percent_group13.0.csv", points: 13 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/3.3233percent_group14.0.csv", points: 14 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/3.7255percent_group15.0.csv", points: 15 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.1729percent_group16.0.csv", points: 16 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.2310percent_group17.0.csv", points: 17 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.5805percent_group18.0.csv", points: 18 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.6719percent_group19.0.csv", points: 19 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.5621percent_group20.0.csv", points: 20 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/3.1356percent_group21.0.csv", points: 21 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/6.0555percent_group22.0.csv", points: 22 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/7.3600percent_group23.0.csv", points: 23 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/4.5328percent_group24.0.csv", points: 24 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/4.5193percent_group25.0.csv", points: 25 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/3.2066percent_group26.0.csv", points: 26 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.5604percent_group27.0.csv", points: 27 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.4961percent_group28.0.csv", points: 28 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.1433percent_group29.0.csv", points: 29 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.5201percent_group30.0.csv", points: 30 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.3340percent_group31.0.csv", points: 31 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.6087percent_group32.0.csv", points: 32 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/2.4117percent_group33.0.csv", points: 33 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.2847percent_group34.0.csv", points: 34 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.2559percent_group35.0.csv", points: 35 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/1.4822percent_group36.0.csv", points: 36 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.7066percent_group37.0.csv", points: 37 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.3854percent_group38.0.csv", points: 38 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.5131percent_group39.0.csv", points: 39 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.2277percent_group40.0.csv", points: 40 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.3624percent_group41.0.csv", points: 41 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.3258percent_group42.0.csv", points: 42 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.2892percent_group43.0.csv", points: 43 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.3911percent_group44.0.csv", points: 44 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.5389percent_group45.0.csv", points: 45 },
    { url: "https://raw.githubusercontent.com/xyzq-dev/distribution/main/0.7119percent_group46.0.csv", points: 46 },
];

const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');
const resultTable = document.getElementById('resultTable').querySelector('tbody');
const tableHeaders = document.getElementById('resultTable').querySelector('thead');
const checkButton = document.getElementById('checkButton');
const walletAddressInput = document.getElementById('walletAddressInput');

async function fetchAndParseCsv(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split('\n').map(row => row.trim());
    return rows;
}


function isValidEvmAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}


async function checkAddresses(addresses) {
    loader.style.display = 'block';
    resultTable.innerHTML = '';
    tableHeaders.style.display = 'none';

    const allData = await Promise.all(
        csvUrls.map(async ({ url, points }) => {
            const rows = await fetchAndParseCsv(url);
            return { points, addresses: rows };
        })
    );

    let foundAny = false;
    addresses.forEach(address => {
        let found = false;
        allData.forEach(({ points, addresses }) => {
            if (addresses.includes(address.trim())) {
                found = true;
                foundAny = true;
                const row = resultTable.insertRow();
                row.insertCell(0).textContent = address;
                row.insertCell(1).textContent = points;
            }
        });
        if (!found) {
            const row = resultTable.insertRow();
            row.insertCell(0).textContent = address;
            row.insertCell(1).textContent = 'NOT ELIGIBLE';
        }
    });

    if (foundAny) {
        tableHeaders.style.display = 'table-header-group';
    }

    loader.style.display = 'none';
}


checkButton.addEventListener('click', () => {
    const addresses = walletAddressInput.value.split('\n')
        .map(addr => addr.trim())
        .filter(addr => isValidEvmAddress(addr));

    if (addresses.length > 0) {
        checkAddresses(addresses);
    } else {
        alert("Enter valid EVM addresses.");
    }
});