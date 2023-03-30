const URL = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}${filter}`).then(res => {
    if (!res) {
      throw new Error(res.status);
    }

    return res.json();
  });
}

// Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту. Винеси її в окремий файл fetchCountries.js і зроби іменований експорт.
