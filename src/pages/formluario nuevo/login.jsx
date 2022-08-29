import { useRef, useState, useEffect, useContext } from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import axios from 'axios';

import useAuth from '../../hooks/useAuth';
// import axios from '../../api/axios';

import { AuthContext } from '../../context/AuthContext';


const LOGIN_URL = '/auth/login';


const Login = () => {
    const { setAuth,persist,setPersist } = useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname||'/posts'
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // const [success, setSuccess] = useState(false);

    const { loginUser } = useContext(AuthContext);

    useEffect(() => {
        userRef.current.focus();
    }, []);

   
    

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
          
            const accessToken = response?.data?.accessToken;
            setAuth({  username,  password, accessToken });
            localStorage.setItem("access", accessToken);
            setUser('');
            setPwd('');
            navigate(from,{replace:true})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const responseUser = await loginUser({ username, password });

        if(responseUser != 401){
            alert('usuario logueado correctamente')
            navigate('/');
        } else {
            alert('verifica los datos ya que están incorrectos')
        }
        
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])
    return (

                <section className="form-register">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Iniciar Sesion</h1>
                    <form onSubmit={handleSubmitLogin}>
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input 
                        className="controls"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                        className='controls'
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <button className='btn'>Iniciar sesion</button>
                         <div className='persistCheck'>
                            <input onChange={togglePersist}checked={persist} type='checkbox'id='persist'/>
                            <label htmlFor='persist'>dale click aqui</label>
                         </div>
                    </form>
                    <p>
                        ¿necesitas una cuenta?<br />
                        <span className="line">
                            {/*put router link here*/}
                           <Link to='/register'>Registrarse</Link>
                        </span>
                    </p>
                </section>
        //     )}
        // </>
    )
}

export default Login