
import './styles/loginPage/loginpage.scss';
import compu from './img/Computadora.png';
import logo from './img/logo-programacion-en-español.png'
function App() {
  return (
<body>

<nav class="nav">
    <div class="logo">
  
        <img src={logo} alt="logo"></img>

    </div>
    <div class="menu d-none d-md-block">
        <ul class="main-menu">
        {/*aqui se modifica con el react-router-dom*/}
            <li><a>Articulos</a></li>
        </ul>
    </div>
    <div class="get-started">
        <button class="btn-main-s crear">Crear cuenta</button>
        <button class="btn-main-s iniciar">Iniciar Seción</button>
    </div>
</nav>

<div className='home'>
<section class="sec-home home">
    <div class="home-cta">

        <h2 class="home-title h1">Bienvenido a Programación en español</h2>
        <p class="home-description">unete una de las mejores comunidades de programación de todas, con soporte integrado</p>
       
        <div class="lead-magnet row aling-items-center">
           <div class="col input-col">
            <input type="text"class="form-control input-text "placeholder="Correo electronico"></input>
           
            <button class="btn-main btn">Unete</button>
            
            </div>

        </div>
    </div>
    <div class="home-img d-none d-md-block">
        <img  src={compu} alt='imagen'></img>
    </div>
</section>

</div>



</body>
  );
}

export default App;
