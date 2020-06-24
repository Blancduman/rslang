import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import {Tooltip, Space,Switch,Button,Typography,Checkbox  } from 'antd';
import './Audiochallenge_game.css';


const Audiochallenge_game =()=> {
   const [listWords,setWords]=useState(0)
   const [isSound,setIsSound]=useState(true)
      useEffect(()=>{
        
       console.log({listWords})
       if(listWords){
      //  const one= listWords[0]
      // //  const {audio}=one
      //   console.log(one.id)
      listWords.forEach(e=>{
        console.log(e.id)
      })
    }
      },[{listWords}])
    // const { Text, Title ,Paragraph } = Typography;
  const fetchSearchWord =()=> {
        fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=1&page=1`)
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
<ul>
  {/* {listWords ?
    listWords.forEach(e=>{
        <li>e[audio]</li>})
        : <li>not result</li>
    } */}
    {console.log(`aaa=`)}
</ul>
</main>
</div>
)

}


export default Audiochallenge_game