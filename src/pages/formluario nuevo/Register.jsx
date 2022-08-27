import { useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/form/form.scss'
import axios from "../../api/axios";
import { Link } from "react-router-dom";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!*@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register';

const API_URL = 'https://developer-news-back.herokuapp.com/auth/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
 
    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            // setUser('');
            // setPwd('');
            // setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if(!username){
            alert('no escrbiste en el username');
            return;
        }
        if(password != matchPwd){
            alert('las contraseñas no coincciden');
            return;
        }
        try {
            console.log({
                'user': username,
                'clave': password,
                
            });

            const responseUsser = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }), 
            });
            console.log(responseUsser)
            setUsername('');
            setPassword('');
            setMatchPassword('');
            if(responseUsser.status === 201){
                alert('Usuario creado exitosamente')
            }
            navigate('/login')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Estas registrado!</h1>
                    <p>
                     <Link to='/login'>ahora puedes registrate</Link>
                    </p>
                </section>
            ) : (
                <section className="form-register" >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Formulario de registro</h1>
                    <form onSubmit={handleSubmitRegister}>
                        <label htmlFor="username">
                            Nombre del usuario:
                          
                        </label>
                        <input className="controls"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                    

                        <label htmlFor="password">
                                Contraseña:
                          
                        </label>
                        <input 
                        className="controls"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                  

                        <label htmlFor="confirm_pwd">
                            Confirmar contraseña:
                           
                        </label>
                        <input
                        className="controls"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                     

                        <button>Registrarse</button>
                    </form>
                    <p>
                       ¿Tienes una cuenta?<br />
                        <span className="line">
                            {/*put router link here*/}
                         <Link to='/login'>Iniciar Sesion</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register