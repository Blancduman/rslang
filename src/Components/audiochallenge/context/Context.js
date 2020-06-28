import '../../../../node_modules/antd/dist/antd.css';
import React, {useState, useEffect,Component} from '../../../../node_modules/react';
import {Tooltip, Space,Switch,Button,Typography,Checkbox  } from '../../../../node_modules/antd';

import Card from '../Card/Card'
import WordBtn from '../WordBtn/WordBtn'



const Context =(props)=>{

 const  {isSound}=props
 const [listWords,setWords]=useState([])
 const [shuffleWords,setShuffleWords]=useState([])
 const [outputWord,setOutputWord]=useState([])
 const [group, setGroup] = useState(1);
 const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [currentWord, setCurrentWord] = useState({});
  const [listUsedWord,setListUsedWord]=useState([{word:'',guessed:false}])

 useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`)
          .then(response => response.json())
          .then(result => result)
          .catch(error => error)
          shuffle(result)
      setWords(result);
     
    };
    fetchData();
  }, [search,group,page]);

useEffect(()=>{
    
    setCurrentWord(listWords[count])
   let shuffleArr=shuffle(listWords)
 
   setShuffleWords(shuffleArr)

   let arr=[]
  
// for (let i = count; i < count+4; i++) {
//   arr.push(shuffleArr[i])
// }

// setOutputWord(arr)

},[listWords])

// useEffect(()=>{
//     console.log(currentWord)
// },[currentWord])

useEffect(()=>{
//   const arr=  
//   console.log(arr)
 
//   console.log(currentWord)
//   shuffle(arr)
    setOutputWord(shuffleWords.filter((e,i)=>i<count+4))

},[shuffleWords])

// useEffect(()=>{
//     console.log(outputWord)
//     console.log(listWords)
// },[outputWord])

  

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

return (
    <div className="context">
    <Card></Card>
    {/* <WordBtn  words={listWords}> </WordBtn> */}
    <WordBtn  words={outputWord}> </WordBtn>
    <input 
        type="text"
        value={page}
        onChange={event => setPage(event.target.value)}>
        </input>
    <Button onClick={() => setSearch(page)}>Search</Button>
   </div>
)

}
export default Context;