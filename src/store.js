import Axios from 'axios'
import React, {createContext, useEffect, useState} from 'react'

export const Store = createContext({})

export function StoreProvider({children}){

    const [state,updateState] = useState({})

    const fetchPokemon = async () => {
        let {data} = await Axios.get(
            `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
            )
            
            let pokemonsObj = {}
            data.pokemon.forEach(pokemon => pokemonsObj[pokemon.num] = pokemon)
            
            updateState(pokemonsObj)
    }
    useEffect(()=>{
        !Object.keys(state).length  && fetchPokemon()
    })

    return (
        <Store.Provider value={{pokemon: state}}>
            {children}
        </Store.Provider>
    )
}