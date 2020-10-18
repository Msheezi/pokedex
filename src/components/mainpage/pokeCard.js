

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    /* height: 20vh; */
    width: 250px;
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
`
const CardImage = styled.img`
    max-height: 120px;
`

export const PokeCard = ({pokeObj:{num, name, weaknesses, type, img}}) => {
    // weaknesses is an array of strings 
    // type is an array of strings
    return (
        <Container>
            <CardItem>{name}</CardItem>
            <CardItem>{`# ${num}`}</CardItem>
            <CardImage src={img} alt={name}/>
            <CardItem>{`Type: ${type}`}</CardItem>
            <CardItem>{`Weaknesses: ${weaknesses}`}</CardItem>

        </Container>


    )
}

