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
    const trueWeakness = Object.keys(weakness).filter((key) => weakness[key]);

    let filteredList = pokeList.filter((poke) => {
      // Additional filters added by adding another res and a logic test
      let resA = poke.type.some((type) => {
        return trueTypes.includes(type);
      });
      let resB = poke.weaknesses.some((weakness) => {
        return trueWeakness.includes(weakness);
      });
      let resC = regex.test(poke.name);
      
      let resAll = true 
      if(trueTypes.length) resAll = resAll && resA
      if (trueWeakness.length) resAll = resAll && resB
      if (searchString.length) resAll = resAll && resC
      return resAll
      // if (!trueWeakness.length && !trueTypes.length && !searchString)
      //   return true;
      // //no entries
      // else if (!trueWeakness.length && !searchString) return resA;
      // // only type
      // else if (!trueTypes.length && !searchString) return resB;
      // // only weakness
      // else if (!trueTypes.length && !trueWeakness.length) return resC;
      // // only searchstring
      // else if (!searchString) return resA && resB;
      // // type and weakness
      // else if (!trueWeakness.length) return resA && resC;
      // //type and searchstring
      // else if (!trueTypes.length) return resB && resC;
      // //weakness and searchstring
      // else return resA && resB && resC; //all 3

      //6 cases
    });
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
          key={type}
          onClick={(e) => {
              const newValue = !types[e.target.id];
              setTypes({ ...types, [e.target.id]: newValue })
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
                key={ele}
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
           <div style={{color: "white", 
           textShadow:"2px 2px black", 
           fontSize: "12pt",
           WebkitTextStroke:"1px white"}}>
             Search For Pokemon
             </div> 

           <div>
            <input
                style={{margin: "0px 5px"}}
                type="text"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Start Typing to Search..."
                />
            </div>
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
