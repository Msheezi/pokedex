import styled from 'styled-components'

export const Container = styled.div`
    width: 80vw;
    /* background-color: white; */
    margin: auto;
    display: grid;
    grid-template-areas: 
    "types"
    "weaknesses"
    "search"
    "pokemon";
    
    `

export const CheckboxContainer = styled.div`
   width: 5vw;
   min-width:60px;
   height: 5vh;
   min-height: 45px;
   /* border: 0.5px solid black; */
   border: ${(props)=> props.selected ? "1px solid #55C2F1": "none"};
    /* background-color:white; */
    background-color:${(props)=> props.selected ? "lightblue" : "white"};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-direction: column;
    margin: 2px;
    text-align: center;
    line-height: 5vh;
    cursor: pointer;
    
    &:hover{
        background-color: lightblue;
        
    }
    
    `

export const SelectorsContainer = styled.div`
    justify-content: center;
    align-content: center;
    align-items:center;
    flex-wrap: wrap;
    width: 100%;
    /* height: 10vh; */
    display: flex;
    grid-area: ${(props)=> props.gridArea};

`

export const SearchContainer = styled(SelectorsContainer)`
    
    /* width: 100%; */
    height: 10vh;
    
   
`

export const StyledLabel = styled.label`
    text-align: center;
`

export const StyledInput = styled.input`
    margin: auto;
    cursor: pointer;
`

export const PokemonContainer = styled.div`
display: flex; 
flex-wrap: wrap; 
margin: auto;
justify-content: space-evenly; 
overflow-Y: scroll ;
height: 60vh;
 -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
   &::-webkit-scrollbar{
    display: none;
   } 

`