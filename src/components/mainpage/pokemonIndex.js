
import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import {PokeCard} from './pokeCard'


export const IndexView = () => {
    const [pokeList, updatePokeList] = useState([])
    const [searchString, updateSearchString] = useState("")

    const fetchPokemon = async () => {
            let data = await Axios.get(`https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`)
            updatePokeList(data.data.pokemon)
        } 

    useEffect(  () => {
        fetchPokemon()
    },[])

    let pokemons = pokeList.map(pokeObj => (
        <PokeCard 
            key={pokeObj.id}
            pokeObj={pokeObj}/>
    ))

    const handleChange = (e) => {
        updateSearchString(e.target.value)
    }

    // use regex to filter pokemon list by search string and update state
    const handleSubmit = () => {
        let regex = new RegExp(searchString, "gi")
        
        let searchResults = pokeList.filter(({name}) => {
            return regex.test(name)
        })
        
        updatePokeList(searchResults)
    }

    /*
        need a function for filtering pokemon list
        need a function to get all types and weaknesses from list
        need a handle for if the list is empty
    */ 

    const handleCheck = (e ) => {
        let filteredList
        if (e.target.name === "type"){
        
         filteredList = pokeList.filter((obj)=> {
            return obj.type.includes(e.target.id)
        })}

        if (e.target.name === "weakness"){
        
         filteredList = pokeList.filter((obj)=> {
            return obj.weaknesses.includes(e.target.id)
        })}

        updatePokeList(filteredList)
    }

    const renderTypes = () => {
        let types = new Set()
        pokeList.forEach(({type}) => {
           type.forEach(ele=> types.add(ele))
        })

        let typeList = [...types].map(type => {

            return (
            <label key={type} htmlFor={type}> {type}
            <input type="checkbox" id={type} name="type" onChange={(e)=>handleCheck(e)}/>
            </label>
            )

        })
         return typeList   
    }  
          
     const renderWeaknesses = () => {
        let weakness = new Set()
        pokeList.forEach(({weaknesses}) => {
           weaknesses.forEach(ele=> weakness.add(ele))
        })

        let weaknessList = [...weakness].map(weakness => {

            return (
            <label key={weakness} htmlFor={weakness}> {weakness}
            <input type="checkbox" id={weakness} name="weakness" onChange={(e)=>handleCheck(e)}/>
            </label>
            )

        })
         return weaknessList   
    }
    

    /*
            length of array is total list 
            10 per page 
    */
    //name, num, type, weaknesses 
        if (pokeList){
            let filterTypes = renderTypes()
            let filterWeaknesses = renderWeaknesses()
            return (
                
                <div>
                    <p>Types:</p>
                    <div>
                        {filterTypes}
                        
                    </div>
                    <div> 
                        <p>Weaknesses:</p> 
                        {filterWeaknesses}
                    </div>
                    <label> Search For Pokemon: 

                    <input type="text" value={searchString} onChange={e=>handleChange(e)}/>
                    </label>
                    <button onClick={handleSubmit}>Search</button>
                    <button onClick={()=>fetchPokemon()}>Clear Search</button>
               {pokemons}
             </div>
        )
    } else {
        return ""
    }


}

