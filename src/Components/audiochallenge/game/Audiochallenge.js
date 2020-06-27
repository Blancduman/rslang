import 'antd/dist/antd.css';
import React, {useState, useEffect, Component} from 'react';
import {Tooltip, Space,Switch,Button,Typography,Checkbox  } from 'antd';
import './Audiochallenge.css';
import Context from '../context/Context'

const Audiochallenge =()=> {
   const [isStarted,setStart]=useState(false)
   const [isSound,setIsSound]=useState(true)
       
const startGame=()=>{
  setStart(true)
}


   return (
       <div className="wrapper">
          
    <header className="audiochallenge_header">
        <div className="autoplay_box"> 
       <Tooltip placement="bottom" title='Click to on/off autoplay sound' color="magenta"> <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked  /> </Tooltip>
        </div>
        <div className="close_btn">
       <Button >close</Button>
        </div>
      </header>

<main className="audiochallenge_main">
  
 { 

 (isStarted) 
 ? 
 <Context isSound={isSound}></Context>
 : 
 <div className="btn_start_game">
 <Button onClick={startGame}>СТАРТ</Button>
 </div>

}
</main>
</div>

)

}


export default Audiochallenge