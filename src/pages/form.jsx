import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/form/form.scss'
import { Link } from 'react-router-dom';
// Models

import { User } from '../models/roles.class';

const PrincipalForm = () => {
    // const navigate=useNavigate()
    // const viajar=()=>{
    // navigate('/')
    // }
const enviar= async (values) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(values); 
   
       let url='https://f6fc-201-141-113-241.ngrok.io/api/Access/SignUp/';
       let valor=values;
       fetch(url,{
        method:'POST',
        mode:'cors',
        headers:{
            "Content-Type":"application/json; charset=utf-8",
            //"Accept":"aplication/json",
        },
        body:JSON.stringify(values)
       }).then((data) => data.json())
       .then( (res) => {
           console.log('data respuesta');
           alert(JSON.stringify(values, null, 2))
       })
       .catch( (err) => console.log('error'))}
    let user = new User();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirm: '', // to confirm password
     
    }
    // const estados={
    //     username: '',
    //     email: '',
    //     password: '',
      
    // }

    const registerSchema = Yup.object().shape(
        {
            username: Yup.string()
                .min(6, 'nombre de usuario muy corto')
                .max(12, 'nombre de usuario muy largo')
                .required('ingresar el nombre de usuario'),
            email: Yup.string()
                .email('Formato invalido')
                .required('ingresa el correo electronico'),
          
            password: Yup.string()
                .min(8, 'Contraseña demasiada corta')
                .required('Contraseña es necesaria'),
            confirm: Yup.string()
                .when("password", {
                    is: value => (value && value.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        '¡la contraseña debe coincidir!'
                    )
                }).required('Tienes que confirmar la contraseña')
        }
    )
 
    return (
        <div className='form-register'>
            <h4>Formulario de registro</h4>
            <Formik className='formik'
                initialValues = {initialValues}
                validationSchema = {registerSchema}
              
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 1000));
                  console.log(values); 
   
                  let url='https://62d5-201-141-113-241.ngrok.io/api/Access/SignUp/';
                  let valor=values;
                  fetch(url,{
                     method:'POST',
                     mode:'no-cors',
                    headers:{
                        "Content-Type":"application/json",
                           
                       "Accept":"application/json",
                    },
                    body:JSON.stringify(valor)
                 }).then((data) => data.json())
               .then( (res) => {
                       console.log('data respuesta');
                   alert(JSON.stringify(values, null, 2))
                })
               .catch( (err) => alert('error')
                )}}
            >

            {({ isSubmitting,
                  handleSubmit,
                    touched,
                    errors,
                    
                    handleChange,
                    handleBlur,
                    values, }) => (
                        <Form className='form'onSubmit={handleSubmit}>
                            <label htmlFor="username">Nombre de Usuario</label>
                            <Field value={values.username} className='controls' id="username" type="text" name="username" placeholder="Tu nombre de usuario" />
                            
                            {/* Username Errors */}
                            {
                                errors.username && touched.username && 
                                (
                                    <ErrorMessage className='error' name="username" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="email">Email</label>
                            <Field value={values.email} className='controls' id="email" type="email" name="email" placeholder="tu email" />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && 
                                (
                                    <ErrorMessage className='error' name="email" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="password">Contraseña</label>
                            <Field
                            value={values.password}
                            className='controls'
                                id="password"
                                name="password"
                                placeholder="contraseña"
                                type='password'
                            />
                            {/* Password Errors */}
                            {
                                errors.password && touched.password && 
                                (
                                    <ErrorMessage className='error' name="password" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="confirm">Confirmar Contraseña</label>
                            <Field
                            value={values.confirm}
                            className='controls'
                                id="confirm"
                                name="confirm"
                                placeholder="confirmar contraseña"
                                type='password'
                            />
                        
                            {
                                errors.confirm && touched.confirm && 
                                (
                                    <ErrorMessage className='error' name="confirm" component='div'></ErrorMessage>
                                )
                            }

                          <button  className='btn' type="submit">Register Account</button>
                            {isSubmitting ? (<p>Enviando tus datos...</p>): null}
                             
                        </Form>
                    )
            }

            </Formik>
        </div>
    );
}

export default PrincipalForm;