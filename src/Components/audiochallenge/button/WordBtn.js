import 'antd/dist/antd.css';
import React, {useState, useEffect,Component} from 'react';
import {Tooltip, Space,Switch,Typography,Checkbox, Button  } from 'antd';
import './WordBtn.css';


export default class WordBtn extends Component{
constructor(props){
    super(props);
    this.addWordBtn = this.addWordBtn.bind(this);
}

 addWordBtn(item){
    return <Button className="button_words" key={item.id}>{item.word}</Button>
    }

render(){
    var {words} = this.props;
    var listWords = words.map(this.addWordBtn);
return (
    <div className="list_button_words">
    {listWords}
    </div>
    )
}
}