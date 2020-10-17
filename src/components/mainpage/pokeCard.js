

import React from 'react'


export const PokeCard = ({pokeObj:{num, name, weaknesses, type, img}}) => {
    // weaknesses is an array of strings 
    // type is an array of strings
    return (
        <div>
            <img src={img} alt={name}/>
            <div>{`Number: ${num}`}</div>
            <div>{`Name: ${name}`}</div>
            <div>{`Weaknesses: ${weaknesses}`}</div>
            <div>{`Type: ${type}`}</div>

        </div>


    )
}

