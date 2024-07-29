import Header from "./header.jsx";
import './App.css'
import Vault from "./vault.jsx";
import Usercontextprovider from "./usercontextprovider.jsx";



export default function App(){


  return(
   <Usercontextprovider>
     <Header/>
     <Vault/>

     
   
   </Usercontextprovider>



  );



}