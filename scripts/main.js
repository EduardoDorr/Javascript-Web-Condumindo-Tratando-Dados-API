const cep = document.getElementById("cep");
const street = document.getElementById("endereco");
const district = document.getElementById("bairro");
const city = document.getElementById("cidade");
const state = document.getElementById("estado");
const cepError = document.getElementById("erro");

cep.addEventListener('focusout', async event => {
  try {
    const address = await searchAddressAsync(event.target.value);

    street.value = address.logradouro;
    district.value = address.bairro;
    city.value = address.localidade;
    state.value = address.uf;
    cepError.innerHTML = '';
  } catch (error) {
    street.value = '';
    district.value = '';
    city.value = '';
    state.value = '';
    cepError.innerHTML = '<p>Este CEP é inválido!</p>';
  }
});

async function searchAddressAsync(cep) {
  try {
    const search = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const response = await formatToJsonAsync(search);

    if (response.erro) {
      throw Error("Este CEP não existe");
    } else {
      return response;
    }
  } catch (error) {
    throw Error(error);
  }
}

async function formatToJsonAsync(toJson) {
  return await toJson.json();
}





// let ceps = ["93010360", "93052480"];
// let cepCollection = ceps.map(cep => searchAddressAsync(cep));
// Promise.all(cepCollection).then(result => console.log(result));

// fetch("https://viacep.com.br/ws/93052480/json/")
//  .then(response => response.json())
//  .then(response => {
//    if (response.erro) {
//      throw Error("Este CEP não existe");
//    } else {
//      console.log(response);
//    }
//  })
//  .catch(error => console.log(error))
//  .finally(() => console.log("Processamento concluído!"));