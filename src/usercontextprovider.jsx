import React from "react";

import Usercontext from './usercontext.js'
import { useState } from "react";

const Usercontextprovider=({children})=>{
    const [not,setNot]=useState([]);
    const [ass,setAss]=useState([]);
    const [title,setTitle]=useState([]);
    const [vault,setVault]=useState(false);
    const [suggest,setSuggest]=useState([]);
    const [loader,setLoader]=useState(false);
    return (
      <Usercontext.Provider value={{loader,setLoader,not,setNot,ass,setAss,title,setTitle,vault,setVault,suggest,setSuggest}}>
        {children}
      </Usercontext.Provider>


    )

}
export default Usercontextprovider;