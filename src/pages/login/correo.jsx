import React,{useEffect,useState,useRef,useContext} from 'react';
import AuntContext from '../../models/AuthProvider';
import axios from '../../api/axiosLogin'
import '../../styles/login/Correo.scss'
import react from '../../img/react.jpg'
const LOGIN_URL='../../models/AuthProvider.js'


const Correo = () => {
    const {setAuth}=useContext(AuntContext)
    const userRef=useRef()
    const errRef=useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
  
    }, []);
    useEffect(() => {
        setErrMsg('')
  
    }, [user,pwd]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            })
            console.log(JSON.stringify(response?.data))
            const accessToken=response?.data.accessToken;
            const roles=response?.data?.roles;
            setAuth({user,pwd,roles,accessToken})
            setUser('')
            setPwd('')
            setSuccess(true)
        }catch(err){
              if(!err?.response){
                setErrMsg('el servidor no response')
              }else if(err.response?.status===400){
                setErrMsg('se persio el nombre de usuario o contraseña')
              }else if(err.response.status===401){
                setErrMsg('inautirizado')
              }else{
                setErrMsg('registro fallido')
              }
              errRef.current.focus()
        }

    }
    return (
        <>
       {success?(
            <section>
                <h1>Estas registrado</h1>
                <p><a>ir a casa</a></p>
            </section>):(
         <section>
   
            <p ref={errRef}className={errMsg?'errmsg':'offscreen'}>{errMsg}</p>
        
            <form className='form-register' onSubmit={handleSubmit}>
            <div className='img-contenedor'>
            <img className='imagen' src={react}></img>
           </div>
            <h1>Registrarse</h1>
                <label htmlFor='username'>Nombre de usuario</label>
                <input className='controls' required type='text'id='username'ref={userRef}autoComplete='off'onChange={(e)=>setUser(e.target.value)}value={user}/>
                <label htmlFor='password'>contraseña</label>
                <input className='controls' required type='text'id='password'ref={userRef}onChange={(e)=>setPwd(e.target.value)}value={pwd}/>
               <button className='btn'>Buscar</button>
            </form>
         </section>
         )}
         </>
         
            
    );
}

export default Correo;
