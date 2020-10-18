

import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"

const Container = styled.div`
    /* height: 20vh; */
    width: 250px;
    padding-top: 5px;
    border: 0.5px solid black;
    background-color:white;
    border-radius: 5px;
    justify-items: center;
    text-align: center;
    margin: 10px 20px;
    min-height: 250px;
    max-height: 300px;
    
    &:hover{
        background-color: lightblue;
        cursor: pointer;
    }

`

const CardItem = styled.div`
    font-size: 12pt;
    word-wrap: break-word;
`
const CardImage = styled.img`
    max-height: 120px;
`

export const PokeCard = ( {pokeObj, pokeObj:{num, name, weaknesses, type, img}}) => {
    // weaknesses is an array of strings 
    // type is an array of strings
    // onclick link to page passing in whole obj as a prop?
    return (
        <Link 
        // to="/details" 
        to={{
            pathname:"/details",
            state:{
                pokeObj
            }
        }}
        style={{textDecoration: "none", color: "black"}}>

        <Container>
            <CardItem>{name}</CardItem>
            <CardItem>{`# ${num}`}</CardItem>
            <CardImage src={img} alt={name}/>
            <CardItem>{`Type: ${type}`}</CardItem>
            <CardItem>{`Weaknesses: ${weaknesses}`}</CardItem>

        </Container>
        </Link>


    )
}

