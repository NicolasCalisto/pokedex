const pokemonNameResp = document.querySelector('.pokemonName');
const pokemonNumberResp = document.querySelector('.pokemonNumber');
const pokemonImgResp = document.querySelector('.pokemonImg');

const form = document.querySelector('.from');
const input = document.querySelector('.inputSearch');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonNameResp.innerHTML = 'Loading...';
  pokemonNumberResp.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImgResp.style.display = 'block';
    pokemonNameResp.innerHTML = data.name;
    pokemonNumberResp.innerHTML = data.id;
    pokemonImgResp.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);