import React,{useState} from 'react';
import Task from './Task';
import Sidebar from './Sidebar';


const Content=()=>{
    const [selectedTab, setselectedTab] = useState('INBOX');
 return( 
    <section className="content">
        <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab}/>
        <Task selectedTab={selectedTab}/>
    </section>
    )

}

export default Content;