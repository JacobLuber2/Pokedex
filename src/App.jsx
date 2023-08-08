import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [pokemon, setPokemon] = useState({ pokemon: [] });
  const [optionWeakness, setOptionWeakness] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [optionPokemon, setOptionPokemon] = useState("");
  const [optionType, setOptionType] = useState([]);
  console.log("option Weakness", optionWeakness);
  console.log("option Type", optionType);
  let types = [
    "Fire",
    "Ice",
    "Flying",
    "Grass",
    "Poison",
    "Psychic",
    "Ground",
    "Rock",
    "Water",
    "Electric",
    "Fighting",
    "Ghost",
    "Steel",
    "Dark",
    "Fairy",
  ];
  function filterByWeakness(pokemon) {
    console.log('filterByWeakness ran');
      let filteredWeaknesses = pokemon.filter((pokemon) => {
        let found_weakness = true;
        for (let i = 0; i < optionWeakness.length; i++) {
          if (!pokemon.weaknesses.includes(optionWeakness[i])) {
            found_weakness = false;
          }
        }
        return found_weakness;
      });
      console.log('filtered weaknesses', filteredWeaknesses);
      return filteredWeaknesses;
  }
  function fetchPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((res) => res.json())
      .then((pokemon) => {
      setPokemon(pokemon.pokemon);
      })

      .catch((err) => console.error(err));
  }
  function filterByType(pokemon) {
    if (optionType.length > 0) {
      let filteredTypes = pokemon.filter((pokemon) => {
        let found_type = true;
        for (let i = 0; i < optionType.length; i++) {
          if (!pokemon.type.includes(optionType[i])) {
            found_type = false;
          }
        }
        return found_type;
      });
      return filteredTypes;
    } else {
      return pokemon;
    }
  }
  function checkBoth() {
  let firstFilter = false; 
  let finalFilter;
  if(optionType.length > 0) {
  firstFilter = filterByType(pokemon);
  if(optionWeakness.length > 0 && firstFilter) {
    finalFilter = filterByWeakness(firstFilter);
  setFilteredList(finalFilter);
  } else if(optionWeakness.length > 0) {
    finalFilter = filterByWeakness(pokemon);
    console.log('final filter', finalFilter);
  setFilteredList(finalFilter);
  } else {
  setFilteredList(pokemon);
  }
  }
  }
  function fetchPokemon() {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((res) => res.json())
      .then((pokemon) => {
        setPokemon(pokemon.pokemon);
        setFilteredList(pokemon.pokemon);
      })
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
    if (pokemon.length > 0) {
      checkBoth();
    }
  }, [optionWeakness]);
  useEffect(() => {
    if (pokemon.length > 0) {
      checkBoth();
    }
  }, [optionType]);

  function filterByWeaknessBoxes() {
    return (
      <>
        {types.map((weakness) => {
          return (
            <div key={weakness + weakness}>
              <label>{weakness}</label>
              <input
                key={pokemon.weakness}
                type="checkbox"
                onChange={function (e) {
                  if (e.target.checked === true) {
                    setOptionWeakness([...optionWeakness, weakness]);
                  } else if (e.target.checked === false) {
                    for (let i = 0; i < optionWeakness.length; i++) {
                      let intermediaryArray = [...optionWeakness];
                      if (optionWeakness[i] === weakness) {
                        intermediaryArray.splice(i, 1);
                      }
                      setOptionWeakness(intermediaryArray);
                    }
                  }
                }}
              />
            </div>
          );
        })}
      </>
    );
  }
  function filterByTypeBoxes() {
    return (
      <>
        {types.map((type) => {
          return (
            <div key={type + type}>
              <label>{type}</label>
              <input
                key={pokemon.type}
                type="checkbox"
                onChange={function (e) {
                  if (e.target.checked === true) {
                    setOptionType([...optionType, type]);
                  } else if (e.target.checked === false) {
                    for (let i = 0; i < optionType.length; i++) {
                      let intermediaryArray = [...optionType];
                      if (optionType[i] === type) {
                        intermediaryArray.splice(i, 1);
                      }
                      setOptionType(intermediaryArray);
                    }
                  }
                }}
              />
            </div>
          );
        })}
      </>
    );
  }
  return (
    <>
      <div>
        <form>
          <div name="Weaknesses" id="Weaknesses">
            <label>Filter By Weakness:</label>
            {filterByWeaknessBoxes()}
            <label>Filter By Type:</label>
            {filterByTypeBoxes()}
          </div>
          Filter By Name
          <input
            type="text"
            name="text"
            id="text"
            value={optionPokemon}
            onChange={(event) => setOptionPokemon(event.target.value)}
          />
        </form>
        <ul key={pokemon.name}>
          {filteredList.map((pokemon) => {
            return (
              <li key={pokemon.id}>
                <div className="eachPokemon">
                  {pokemon.name}, {pokemon.num} type(s):
                  {pokemon.type.length > 0 &&
                    pokemon.type.map((pokemonType) => {
                      return (
                        <span key={pokemonType + pokemonType}>
                          {" "}
                          {pokemonType + " "}
                        </span>
                      );
                    })}
                  weakness(es):
                  {pokemon.weaknesses.length > 0 &&
                    pokemon.weaknesses.map((pokemonWeakness) => {
                      return (
                        <span key={pokemonWeakness + pokemon.weakness}>
                          {" "}
                          {pokemonWeakness + " "}
                        </span>
                      );
                    })}
                  <br />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default App;
