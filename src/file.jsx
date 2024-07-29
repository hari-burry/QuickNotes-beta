import './file.css'
import Usercontext from './usercontext.js';
import icon from './assets/pbuh.webp';

function File(props){
 return(<>
 
  <div className='card'>
  <svg className='opt' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path className='opth' d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#0D0D0D"/>
</svg>
  <a className='link' href={props.url} target='_blank' >
	<div className='pic'>
   <img className='icon' src={icon}></img>
   </div>
   </a>
   <h3 className='titl'>{props.type}-{props.num}</h3>
   </div>
 
   
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 </>);


}

export default File