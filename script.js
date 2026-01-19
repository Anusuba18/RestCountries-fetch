const countriesDiv = document.getElementById("countries");
const searchInput = document.getElementById("search");

let countriesData = [];

fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,flags,cca3")
  .then(res => {
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    return res.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error("Expected array but got object");
    }
    countriesData = data;
    displayCountries(data);
  })
  .catch(err => {
    console.error("Fetch error:", err);
  });

function displayCountries(data) {
  countriesDiv.innerHTML = "";
  data.forEach(country => {
    countriesDiv.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
        <div class="card h-80">
          <img src="${country.flags.png}" class="card-img-top">
          <div class="card-body">
            <h5>${country.name.common}</h5>
            <p><b>Capital:</b> ${country.capital?.[0] || "N/A"}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Code:</b> ${country.cca3}</p>
          </div>
        </div>
      </div>`;
  });
}

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = countriesData.filter(c => {
    const name = c.name?.common?.toLowerCase() || "";
    const code = c.cca3?.toLowerCase() || "";
    const region = c.region?.toLowerCase() || "";
    const capital = c.capital?.[0]?.toLowerCase() || "";

    return (
      name.includes(value) ||
      code.includes(value) ||
      region.includes(value) ||
      capital.includes(value)
    );
  });

  displayCountries(filtered);
});
