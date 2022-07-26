import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/form/form.scss'

// Models
import { ROLES } from '../models/roles.enoum';
import { User } from '../models/roles.class';

const PrincipalForm = () => {
    // const navigate=useNavigate()
    // const viajar=()=>{
    // navigate('/')
    // }

    let user = new User();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirm: '', // to confirm password
        role: ROLES.USER
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
                .required('colocar el nombre de usuario'),
            email: Yup.string()
                .email('Formato invalido')
                .required('coloca el correo electronico'),
            role: Yup.string()
                .oneOf([ROLES.USER, ROLES.ADMIN], 'tienes que colocar que rol tienes: User/admin')
                .required('Role es necesario'),
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
                   
                       let url='https://1b7f-201-141-113-241.ngrok.io/api/Access/SignUp/';
                       let valor=values;
                       fetch(url,{
                        method:'POST',
                        mode:'no-cors',
                        headers:{
                            "Content-type":"aplication/json",
                            "Accept":"aplication/json",
                        },
                        body:JSON.stringify(valor)
                       })
                    
                    alert(JSON.stringify(values, null, 2))


                }}
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
                                    <ErrorMessage name="username" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="email">Email</label>
                            <Field value={values.email} className='controls' id="email" type="email" name="email" placeholder="tu email" />

                            {/* Email Errors */}
                            {
                                errors.email && touched.email && 
                                (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
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
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
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
                                    <ErrorMessage name="confirm" component='div'></ErrorMessage>
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