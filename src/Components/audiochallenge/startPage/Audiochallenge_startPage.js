import 'antd/dist/antd.css';
import React from 'react';
import { Space,Button,Typography  } from 'antd';
import { Link } from "react-router-dom";


const Audiochallenge_startPage =()=> {
    const { Text, Title ,Paragraph } = Typography;
   
return(
        <Space align="center" direction="vertical">
        <Title strong >AUDIOCHALLENGE</Title>
        <Paragraph className="myText"><Text strong >  Improves your listening skills in English.</Text></Paragraph>
         <Link to="/audiochallenge_game"><Button  type="default"  size="large" >start </Button></Link>
        </Space>
)

}
export default Audiochallenge_startPage