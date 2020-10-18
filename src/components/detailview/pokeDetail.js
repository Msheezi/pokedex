import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    height: 80vh;
    width: 80vw;
    margin: 40px auto;
    display: grid;
    grid-template-areas: 
    "link title ."
    "img details ."
    "prev strwk next";
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 50px 300px 250px;
  
`

const DisplayItem = styled.div`
    grid-area: ${(props)=> props.gridarea};
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;

`

const Title = styled(DisplayItem)`
    font-size: 22pt;
    /* color: white; */
    text-align: center;
    line-height: 50px;
    background-color: white;
`

const StyledLink = styled(Link)`
    grid-area: ${(props)=> props.gridarea};
    color: white;
    font-size: 1.5em;
`

const StyledImg = styled.img`
    height: 200px;
    width: 200px;
    grid-area: ${(props)=> props.gridarea};

`
const ImageContainer = styled.div`
    height: 210px;
    width: 200px;
    line-height: 200px;
    text-align: center;
    align-items: center;
    grid-area: ${(props)=> props.gridarea};
    background-color: lightblue;
    border-radius: 5px;
    margin-right: 20px;
`
const List = styled.ul`
    text-align: center;
    font-size: 20pt;
    list-style: none;
    box-sizing: border-box;
    
    
    & > li {
        font-size: 18pt;
        text-align: center;
    }

`
const DetailsContainer = styled(DisplayItem)`
    background-color: white;
    text-align: center  ;

`

const StrengthsContainer = styled(DisplayItem)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    margin: 10px;
    

`
const EvolutionContainer = styled(StrengthsContainer)`
    line-height: 250px;
    font-size: 12pt;
`

const DetailsItem = styled.div`
    font-size: 18pt;


`

export const PokeDetail = ({location:{state:{pokeObj}}}) => {
    const {name, num, img, type,  weaknesses, height, weight, prev_evolution, next_evolution} = pokeObj

    let previous = prev_evolution ? prev_evolution.map(({name})=>(
    <EvolutionContainer key={name} gridarea="prev">{`Previous: ${name}`}</EvolutionContainer>
    )) : ""

    let next = next_evolution ? next_evolution.map(({name})=>(
    <EvolutionContainer key={name} gridarea="next">{`Next: ${name}`}</EvolutionContainer>
    )) : ""

    let displayType = type.map(singleType=> (
        <li key={singleType}>{singleType}</li>
    ))

    let displayWeakness = weaknesses.map(singleWeakness=> (
        <li key={singleWeakness}>{singleWeakness}</li>
    ))
   

    return(
        <Container>
            <div gridarea={"link"}>

                <StyledLink to="/pokedex" >Back to List</StyledLink>
            </div>
            <Title gridarea={"title"} >{name}</Title>
            <DetailsContainer gridarea="details">
                <h2>Details</h2>
                <div style={{display: "flex", height: "200px", alignItems:"center", justifyContent:"center"}}>

            <ImageContainer >
                <StyledImg src={img} alt={name} />
            </ImageContainer>
                <div>

                <DetailsItem>{`Number: ${num}`}</DetailsItem>
                <DetailsItem>{`Height: ${height}`}</DetailsItem>
                <DetailsItem>{`Weight: ${weight}`}</DetailsItem>
                </div>
                </div>
            </DetailsContainer>
            <StrengthsContainer gridarea="strwk">
                <List > Poke Type
                    {displayType}
                </List>

                
                <List > Weak Against
                    {displayWeakness}
                </List>

            </StrengthsContainer>
            {previous}
            {next}

        </Container>

    )
}