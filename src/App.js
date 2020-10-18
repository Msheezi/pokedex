import React from 'react';
import './App.css';
import {IndexView} from './components/mainpage/pokemonIndex'
import {PokeDetail} from './components/detailview/pokeDetail'
import {Switch, Route, BrowserRouter as Router} from "react-router-dom"


function App() {
  return (
    <Router>

    <Switch>
      <Route path="/details" component={PokeDetail}/>
       
      <Route path="/" component={IndexView}/>

     
    </Switch>
    </Router>
  );
}

export default App;
