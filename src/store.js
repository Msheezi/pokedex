import Axios from 'axios'
import React, {createContext, useEffect, useState} from 'react'

export const Store = createContext({})

export function StoreProvider({children}){

    const [pokeState, setPokeState] = useState({})
    const [pokeProps, setPokeProps] = useState([])

    const fetchPokemon = async () => {
        let {data:{pokemon}} = await Axios.get(
            `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`
            )
            
            let pokemonsObj = {}
            pokemon.forEach(pokemon => pokemonsObj[pokemon.num] = pokemon)
            setPokeProps(pokemon)
            setPokeState(pokemonsObj)
    }
    useEffect(()=>{
        !Object.keys(pokeState).length  && fetchPokemon()
    })

    return (
        <Store.Provider value={{pokemon: pokeState, pokeList: pokeProps}}>
            {children}
        </Store.Provider>
    )
}