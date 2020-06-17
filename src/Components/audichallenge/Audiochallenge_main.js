import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { Space,Button,Typography,Layout,Divider  } from 'antd';
import './Audiochallenge_main.css'

const Audiochallenge_main = () => {
    const { Text, Title ,Paragraph } = Typography;
    const { Content } = Layout;
    
    // const [state, setState] = useState('Hello World');

    // useEffect(() => {
    //     setState('Hello "React" World');
    // }, []);

    return   <div class="wrapper">
      
    <Space align="center" direction="vertical">
<Title strong >AUDIOCHALLENGE</Title>
<Paragraph class="myText"><Text strong >  Improves your listening skills in English.</Text></Paragraph>
<Button type="default"  size="large">start</Button>
    </Space>
   
    </div>
   
};

export default Audiochallenge_main;