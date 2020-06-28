import 'antd/dist/antd.css';
import React, {useState, useEffect,Component} from 'react';
import {Tooltip, Space,Switch,Button,Typography,Checkbox  } from 'antd';
import './Card.css';
import backgroundCard from '../../../assets/img/play_sound.png'

export default class Card extends Component{

 
render(){
   const isChosed=true;
   const styleCard={
      BackgroundImage:`url("${backgroundCard}")`
   }
return (
   isChosed 
   ? 
   <div className="card_image" style={styleCard}>     
   </div>
   :
   <div>aa</div>
)}
}
