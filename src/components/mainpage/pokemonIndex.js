import Axios from "axios";
import React, { useState, useEffect } from "react";
import { PokeCard } from "./pokeCard";
import { types as types1, weaknesses } from "./pokeAttributes";
import {Container,CheckboxContainer, SelectorsContainer, SearchContainer,StyledInput ,StyledLabel, PokemonContainer} from './indexStyles'

export const IndexView = () => {
  const [pokeList, setPokeList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [types, setTypes] = useState(types1);
  const [weakness, setWeakness] = useState(weaknesses);

  const fetchPokemon = async () => {
    let{ data:{pokemon} }= await Axios.get(
      `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
    );

    setPokeList(pokemon);
    setRenderList(pokemon);
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
        <CheckboxContainer selected={types[type]}
          id={type}
          name="type"
          onClick={(e) => {
              const newValue = !types[e.target.id];
              let temp = { ...types, [e.target.id]: newValue };
              console.log(temp);
              setTypes(temp)
          }}
        >
            {type}
        </CheckboxContainer>
            
      );
    });
    return typeList;
  };

  const renderWeaknesses = () => {
    let weaknessList = Object.keys(weakness).map((ele) => {
      return (
        <CheckboxContainer
          selected={weakness[ele]}
        
                id={ele}
                name="weakness"
                onClick={(e) => {
                const newWeaknesses = !weakness[e.target.id];
                setWeakness({ ...weakness, [e.target.id]: newWeaknesses });
                }}
        >{ele}
        </CheckboxContainer>
      );
    });
    return weaknessList;
  };

 
  if (pokeList) {
    let filterTypes = renderTypes();
    let weaknessTypes = renderWeaknesses();
    
    return (
    <Container>
      
      <SelectorsContainer gridArea={"types"}>
        <h2 style={{color: "white"}}>Types</h2>
        
        {filterTypes}
      </SelectorsContainer>

        <SelectorsContainer gridArea={"weaknesses"}>
            <h2 style={{color: "white"}}>Weaknesses</h2>
            
            {weaknessTypes} 
        </SelectorsContainer>

        <SearchContainer>

            <label>
            {" "}
            Search For Pokemon
            <input

            
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                />
            </label>
        <button onClick={() => fetchPokemon()}>Clear Search</button>
        <div style={{color: "white"}}>{`Displaying ${renderList.length} of ${pokeList.length}`}</div>
        </SearchContainer>
        <PokemonContainer >

        {pokemons}
        </PokemonContainer>
      </Container>
    );
  } else {
    return "";
  }
};
