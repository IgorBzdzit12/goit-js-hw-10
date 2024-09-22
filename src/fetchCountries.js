export function fetchCountries(name) {
    const base_url = 'https://restcountries.com/v3.1/name/';
    const properties = 'fields=name,capital,population,flags,languages';
    return fetch(`${base_url}${name}?${properties}`).then(response => {
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        return response.json();
    })
};

