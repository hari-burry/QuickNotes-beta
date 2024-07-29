import { useState,useContext,useRef, useEffect } from 'react';
import './index.css';
import './vault.css'
import Usercontext from './usercontext.js';
const apiurl=process.env.REACT_APP_API_URL;
export default function Header(){
    const {setLoader,setNot,setAss,setTitle,setVault,suggest,setSuggest}=useContext(Usercontext);
  const [search,setSearch]=useState('');
  const [last,setLast]=useState('');
  const inputRef=useRef(null);
   function searchhandle(event){
      setSearch(event.target.value);
      let ans=event.target.value;
      if(ans.trim()===''){
        setSug(false);
        setSuggest([]);

      }
      else{ 
        setSuggest([]);
        setSug(true);
        let a=ans.replace(/\s+/g,'');
        fetchmatch(a);
      }

   }
   const [sug,setSug]=useState(false);

  async function fetchmatch(name){
   await fetch(`${apiurl}/sugbox?text=${name}`)
     .then(response=>response.json())
     .then(async text=>{
      console.log(text);
      const a=await text.map((e)=>e);
      setSuggest(a);


     })

  }

  const handlesearch=()=>{
    setSearch('');
    if(inputRef.current){
      inputRef.current.focus();
    }
    setSug(false);
  }
   

    const sugref=useRef(null);

    useEffect(()=>{
   const handleclick=(event)=>{
       if(sugref.current && !sugref.current.contains(event.target)
         && searchref.current && !searchref.current.contains(event.target)
       
      ){
        setSug(false);
       }
   };

   document.addEventListener('mousedown',handleclick);

   return()=>{
     document.removeEventListener('mousedown',handleclick);
   };

    },[]);

    const searchref=useRef(null);













   async function fetchsub(str,subname){
    setSug(false);
    if(subname==='no results'){
      setSearch(''); 
      return;
    }
    setSearch(subname);
    if(last===str){
      return;
    }
    setLast(str);
    try {
        const response = await fetch(`${apiurl}/sub?text=${str}`);
        if (!response.ok) { 
            throw new Error(`http error: ${response.status}`);
        }
        const text = await response.json();
        console.log(text);
        const title = text.filter((e) => e.type === 'title');
        console.log(title);
        const notes = text.filter((e) => e.type === 'fat');
        console.log(notes);
        const assign = text.filter((e) => e.type === 'ass');
        console.log(assign);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
            setTitle(title);
            setNot(notes);
            setAss(assign);
            if (title.length > 0) setVault(true);
        }, 2000);
    } catch (error) {
        console.error('Fetch error:', error);
    }
      
   }
   async function searchpat(){
      let ans=search;
      if(ans.trim()==='')return;
      let a=ans.replace(/\s+/g,'');
       await fetchmatch(a);

    }


   const fetch2=(event)=>{
     if(event.key==='Enter'){
           if(search===null|| search.trim()===''){
            console.log('invalid value');
            setSug(false);
           }
           else{
            console.log(search);
           fetchsub();
           setSug(false);
           }
           setSearch(null);
     }
   };
  const rickroll=()=>{
     window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0','_blank');
   }
    return(
        <>

        <div className='header'>
         <div className='hdr'>
         <svg 
         onClick={rickroll}
         className='bbsvg' width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 9.75H8C7.31 9.75 6.75 10.31 6.75 11V12.05C6.78 12.04 6.8 12.03 6.83 12.02C6.95 11.96 7.08 11.92 7.21 11.88C7.27 11.86 7.33 11.84 7.4 11.82C7.6 11.78 7.8 11.75 8.01 11.75H16.01C16.22 11.75 16.42 11.78 16.62 11.82C16.68 11.83 16.74 11.86 16.81 11.88C16.94 11.92 17.07 11.96 17.19 12.02C17.22 12.03 17.25 12.04 17.27 12.05V11C17.25 10.31 16.69 9.75 16 9.75Z" fill="#292D32"/>
<path d="M16 13.25H8C7.31 13.25 6.75 13.81 6.75 14.5V15H9.5C9.91 15 10.25 15.34 10.25 15.75C10.25 16.71 11.04 17.5 12 17.5C12.96 17.5 13.75 16.71 13.75 15.75C13.75 15.34 14.09 15 14.5 15H17.25V14.5C17.25 13.81 16.69 13.25 16 13.25Z" fill="#292D32"/>
<path d="M16 6.5H8C7.31 6.5 6.75 7.06 6.75 7.75V8.56C7.13 8.37 7.55 8.25 8 8.25H16C16.45 8.25 16.87 8.37 17.25 8.56V7.75C17.25 7.06 16.69 6.5 16 6.5Z" fill="#292D32"/>
<path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM19 16.5H18H15.16C14.82 17.93 13.53 19 12 19C10.47 19 9.18 17.93 8.84 16.5H6H5C4.59 16.5 4.25 16.16 4.25 15.75C4.25 15.34 4.59 15 5 15H5.25V14.5V14V11V7.75C5.25 6.23 6.48 5 8 5H16C17.52 5 18.75 6.23 18.75 7.75V11V14V14.5V15H19C19.41 15 19.75 15.34 19.75 15.75C19.75 16.16 19.41 16.5 19 16.5Z" fill="#292D32"/>
</svg>
        <h1 className='bb'>QuickNotes</h1>
     
        <div className='searchdiv'
        ref={searchref}
        
        >
        <div className='leftdiv'>
        <svg className='justsvg'width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_15_152)">
<rect className='svgrect' width="24" height="24" fill="white"/>
<circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" strokeLinejoin="round"/>
<path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"/>
</g>
<defs>
<clipPath id="clip0_15_152">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
        </div>
         <input className='searchbar'
         placeholder='Search'
         onChange={searchhandle}
         onKeyDown={fetch2}
         value={search}
         ref={inputRef}
         onClick={searchpat}
         ></input>  
         <div className='searchbtn'>
        <svg 
        onClick={()=>handlesearch()}
        className='searchicon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='lens'd="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"/>
</svg>
</div>



         
        </div>
        </div>
        {sug &&
       <div className='sugbar'
        ref={sugref}
       >
        <div className='sug'>
           { suggest&&
            suggest.map((e)=>{
              return  <p key={e.sname}
              onClick={()=>fetchsub(e.colname,e.name)}
              className='sugsub'>{e.name}</p>
           


            })




           }

        </div>
        </div>
}




        </div>
       





        </>
    );
}