
import React, { useState, useEffect, useContext  } from "react";
import { PokeCard } from "./pokeCard";
import { types as types1, weaknesses } from "./pokeAttributes";
import {Container,CheckboxContainer, SelectorsContainer, SearchContainer, PokemonContainer} from './indexStyles'
import {Store} from '../../store'

export const IndexView = () => {
  // const [pokeList, setPokeList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [types, setTypes] = useState(types1);
  const [weakness, setWeakness] = useState(weaknesses);
  const { pokeList} = useContext(Store)

  

  useEffect(() => {
    let regex = new RegExp(searchString, "gi");

    const trueTypes = Object.keys(types).filter((key) => types[key]);
    const trueWeakness = Object.keys(weakness).filter((key) => weakness[key]);

    let filteredList = pokeList.filter((poke) => {
      // Additional filters added by adding another res and a logic test
      let typeFilter = trueTypes.every((type)=>{
        return poke.type.includes(type)
      })
   
      let weaknessFilter = trueWeakness.every((weakness) => {
        return poke.weaknesses.includes(weakness);
        
      });
      let nameFilter = regex.test(poke.name);
      
      let resAll = true 
      if(trueTypes.length) resAll = resAll && typeFilter
      if (trueWeakness.length) resAll = resAll && weaknessFilter
      if (searchString.length) resAll = resAll && nameFilter
      return resAll
      
    });
    setRenderList(filteredList);
  }, [types, weakness, searchString, pokeList]);

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
        <h2 style={{color: "#98ECDB"}}>Types</h2>
        {filterTypes}
      </SelectorsContainer>

      <SelectorsContainer gridArea={"weaknesses"}>
        <h2 style={{color: "#98ECDB"}}>Weaknesses</h2>
        {weaknessTypes} 
      </SelectorsContainer>

      <SearchContainer>
           <div style={{color: "#98ECDB", 
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


 // if (!trueTypes.length) resA = false 
    //   else if (trueTypes.length===1){
    //     console.log(1)
    //      resA = trueTypes.every((type) => {
    //       return poke.type.includes(type);
    //     })

    //   }
    //   else {
    //     if(poke.type.length <2 ) return false
    //     if(trueTypes.length > 2) return false
    //     resA = poke.type.every((type)=>{
    //       return trueTypes.includes(type)
    //     })
    //   }
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



  // const fetchPokemon = async () => {
  //   let{ data:{pokemon} }= await Axios.get(
  //     `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
  //   );

  //   setPokeList(pokemon);
  //   setRenderList(pokemon);
  // };


  // useEffect(() => {
  //   fetchPokemon();
  // }, []);

  /*
    Refactored so use pokelist from context value from store
      - data doesn't change, 
      - no need to make multiple remote API calls during session
  */
  // use context to reproduce pokelist previously set via remote api call
  // let tempList = Object.keys(pokeStore.pokemon).map(key => pokeStore.pokemon[key]).sort((a,b)=> {
  //   const objA = a.id
  //   const objB = b.id 
  //   return  objA - objB
  // })
 
  // useEffect(()=> {
  //   const convertStoreList = () => {
  //     return Object.keys(pokemon).map(key => pokemon[key]).sort((a,b)=> {
  //   const objA = a.id
  //   const objB = b.id 
  //   return  objA - objB
  // })
  
  // //    }

  //   !pokeList.length && setPokeList(convertStoreList())
  // }, [pokeList.length, tempList])