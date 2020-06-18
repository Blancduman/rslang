import 'antd/dist/antd.css';
import React, {Component} from 'react';
import { Space,Button,Typography  } from 'antd';
import {BrowserRouter as Router, Route, withRouter, Switch } from "react-router-dom";
import './Audiochallenge_main.css'
import Audiochallenge_game from './game/Audiochallenge_game'
import Audiochallenge_startPage from './startPage/Audiochallenge_startPage'


const Audiochallenge_main =()=>{
    
   
        
       
return( 
<Router>
        <div className="wrapper">     
        
         <Switch>
          <Route  exact  path='/' component={Audiochallenge_startPage} />
          <Route  path='/game' component={Audiochallenge_game} />
         
        </Switch>
       
        </div>
        </Router>
        )
            
};
export default Audiochallenge_main
// export default withRouter(Audiochallenge_main)