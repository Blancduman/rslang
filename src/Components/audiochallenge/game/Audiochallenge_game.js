import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import {Tooltip, Space,Switch,Button,Typography,Checkbox  } from 'antd';
import './Audiochallenge_game.css';
import Card from '../card/Card'
import WordBtn from '../button/WordBtn'

const Audiochallenge_game =()=> {
   const [listWords,setWords]=useState(0)
   const [isSound,setIsSound]=useState(true)
      useEffect(()=>{
        
       console.log({listWords})
       if(listWords){
      listWords.forEach(e=>{
        console.log(e.id)
      })
    }
      },[{listWords}])

  const fetchSearchWord =(e,group=1,page=1)=> {
   
        fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`)
        .then(response => response.json())
        .then(result => setWords(result))
        .catch(error => error)
        }

        
   return (
       <div className="wrapper">
          
    <header className="audiochallenge_header">
        <div className="autoplay_box"> 
       <Tooltip placement="bottom" title='Click to on/off autoplay sound' color="magenta"> <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked  /> </Tooltip>
        </div>
        <div className="close_btn">
       <Button onClick={fetchSearchWord}>close</Button>
        </div>
      </header>

<main className="audiochallenge_main">
  <Card></Card>
  
 { (listWords===0)? <div>ddd</div>
: <WordBtn words={listWords}> </WordBtn>
}
</main>
</div>
)

}


export default Audiochallenge_game