import React from 'react'
import {Link} from "react-router-dom"


export const EvolutionCard = ({pokeObj, evoType}) => {
    const {name, img} = pokeObj ? pokeObj : {name: "No Evolution", img:""}
    
    return (
        <Link  to={{
            pathname:`/details/${name}`,
            state:{
                pokeObj
            }
        }}
        style={{textDecoration: "none", color: "black"}}>
        <div style={{ textAlign: "center", margin: "20px auto"}} >
            {evoType}
       
        </div>
        <img src={img} alt=""/>
        <div >
        {name}
        </div>
        </Link>
    )
}