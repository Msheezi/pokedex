import Axios from "axios";
import React, { useState, useEffect } from "react";
import { PokeCard } from "./pokeCard";
import { types as types1, weaknesses } from "./pokeAttributes";
// console.log(types1);
export const IndexView = () => {
  const [pokeList, setPokeList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [types, setTypes] = useState(types1);
  const [weakness, setWeakness] = useState(weaknesses);

  const fetchPokemon = async () => {
    let data = await Axios.get(
      `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
    );

    setPokeList(data.data.pokemon);
    setRenderList(data.data.pokemon);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    let regex = new RegExp(searchString, "gi");

    const trueTypes = Object.keys(types).filter((key) => types[key]);
    // console.log(types);
    const trueWeakness = Object.keys(weakness).filter((key) => weakness[key]);
    // console.log(trueTypes);
    // console.log(trueWeakness);

    let filteredList = pokeList.filter((poke) => {
      let resA = poke.type.some((type) => {
        // console.log(poke);
        // console.log(trueTypes.includes(type));
        return trueTypes.includes(type);
      });
      let resB = poke.weaknesses.some((weakness) => {
        // as written
        return trueWeakness.includes(weakness);
      });
      let resC = regex.test(poke.name);
      //   console.log(resA, resB);

      if (!trueWeakness.length && !trueTypes.length && !searchString)
        return true;
      //no entries
      else if (!trueWeakness.length && !searchString) return resA;
      // only type
      else if (!trueTypes.length && !searchString) return resB;
      // only weakness
      else if (!trueTypes.length && !trueWeakness.length) return resC;
      // only searchstring
      else if (!searchString) return resA && resB;
      // type and weakness
      else if (!trueWeakness.length) return resA && resC;
      //type and searchstring
      else if (!trueTypes.length) return resB && resC;
      //weakness and searchstring
      else return resA && resB && resC; //all 3

      //6 cases
    });
    // console.log(filteredList);
    setRenderList(filteredList);
  }, [types, weakness, searchString]);

  let pokemons = renderList.map((pokeObj) => (
    <PokeCard key={pokeObj.id} pokeObj={pokeObj} />
  ));

  const renderTypes = () => {
    let typeList = Object.keys(types).map((type) => {
      return (
        <label key={type} htmlFor={type}>
          {" "}
          {type}
          <input
            type="checkbox"
            id={type}
            name="type"
            onChange={(e) => {
              //   console.log(e.target, e.target.id);

              const newValue = !types[e.target.id];
              //   console.log(types);
              let temp = { ...types, [e.target.id]: newValue };
              console.log(temp);
              setTypes(temp);
            }}
          />
        </label>
      );
    });
    return typeList;
  };

  const renderWeaknesses = () => {
    let weaknessList = Object.keys(weakness).map((ele) => {
      return (
        <label key={ele} htmlFor={ele}>
          {" "}
          {ele}
          <input
            type="checkbox"
            id={ele}
            name="weakness"
            onChange={(e) => {
              const newWeaknesses = !weakness[e.target.id];
              setWeakness({ ...weakness, [e.target.id]: newWeaknesses });
            }}
          />
        </label>
      );
    });
    return weaknessList;
  };

  /*
            length of array is total list 
            10 per page 
    */
  //name, num, type, weaknesses
  if (pokeList) {
    let filterTypes = renderTypes();
    let weaknesses = renderWeaknesses();
    return (
      <div>
        <p>Types:</p>
        <div>{filterTypes}</div>
        <div>
          <p>Weaknesses:</p>
          {weaknesses}
        </div>
        <label>
          {" "}
          Search For Pokemon:
          <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </label>
        {/* <button onClick={(e) => setSearchString(e.target.value)}>Search</button> */}
        <button onClick={() => fetchPokemon()}>Clear Search</button>
        {pokemons}
      </div>
    );
  } else {
    return "";
  }
};
