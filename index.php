


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styles.css?v=2.0.0">
    <link rel="stylesheet" href="normalize/normalize.css">
    <link rel="shortcut icon" href="img/favicon/icons8-coche-32.png" type="image/x-icon">

    <title>Talleres Moyano</title>
</head>
<body>
    <div>
        <nav class="navbar" id="myNavbar">
            <a href="#parallax">Inicio</a>
            <a href="#services">Servicios</a>
            <a href="#form-cont">Contacto</a>
            <a target="_blank" href="index-tienda.html">Tienda</a>
            <a target="_blank" href="index-repuestos.html">Repuestos</a>
            <a href="#" id="boton" class="icon">&#9776;</a>
        </nav>
    </div>
    <div id="parallax" class="parallax">
        <div class="content">
            <a href="#encabezado" class="sin-efecto">
                <h1>Talleres Moyano</h1>
                <h2>Tu taller de confianza</h2>
            </a>
        </div>
    </div>
    <div class="motor">
        <hr id= "encabezado">
        <div class="scroll-content" id="text">
            <h1 class="cabeza"><b>¡Atención, conductores!</b> 🚗🔧</h1>
            <section>
                <div class="contenedor">
                    <p>
                        ¿Tu coche necesita un servicio de calidad? ¡No busques más! En <strong>Talleres Moyano</strong>, estamos aquí para cuidar de tu vehículo como se merece. Desde un simple cambio de aceite hasta reparaciones complejas, nuestro equipo de expertos mecánicos está listo para dejar tu coche en perfectas condiciones.</p>
                    </p>
                    <h2 style="text-align: center;">¿Por qué elegirnos?</h2>
                    <ul>
                        <li>✅ <span class="highlight">Experiencia comprobada:</span> Años de servicio respaldan nuestra calidad.</li>
                        <li>✅ <span class="highlight">Diagnóstico gratuito:</span> Descubre lo que necesita tu coche sin costo adicional.</li>
                        <li>✅ <span class="highlight">Precios justos:</span> Sin sorpresas, solo transparencia.</li>
                        <li>✅ <span class="highlight">Atención personalizada:</span> Cada coche es único, y así lo tratamos.</li>
                    </ul>
                    
                    <img id="img1" class="izquierda" src="img/mujer taller.jpeg" alt="">
                    
                    <div class="promotion">
                        <p>Talleres Moyano es un taller de alto standing que pone a los mecánicos más cualificados a su disposición. Nuestros talleres no sólo son la vanguardia de la mecánica moderna sino que son los talleres más competentes del mercado. Y lo más importante <b>¡todo a precios ridículos!</b> Somos el taller que tu quieres y el que tu coche necesita.</p>
                        <p>Disponemos de servicio de grua las 24 horas los 365 dias del año; una <a target="_blank" style="color: red;" href="index-tienda.html">tienda</a> de los mejores coches del mercado; y una <a target="_blank" style="color: red;" href="index-repuestos.html">tienda de respuestos</a> a precios de coste.</p>
                    </div>
                    
                    <h2 id="services" style="text-align: center;">Servicios</h2>
                    <div class="servicios">
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/1.jpeg" title="mantenimiento" alt="" id="img3" data-full="img\services-blok\mantGen.jpg">
                        </div>
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/2.jpeg" title="reparacion" alt="" id="img8" data-full="img\services-blok\repSist.jpg">
                        </div>
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/3.jpeg" title="diagnosis" alt="" id="img4" data-full="img\services-blok\diag.jpg">
                        </div>
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/4.jpeg" title="chapa" alt="" id="img5" data-full="img\services-blok\chapaypint.jpg">
                        </div>
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/5.jpeg" title="accesorios" alt="" id="img6" data-full="img/services-blok/tunning.jpg">
                        </div>
                        <div class="ajuste">
                            <img class="imagenes" src="img/Services/7.jpeg" title="Asesoramiento" alt="" id="img7" data-full="img\services-blok\asesoram.jpg">
                        </div>
                    </div>
                    <!-- contenido de la ventana modal -->
                    <div id="imagenModal" class="modal">
                        <span class="close">&times;</span>
                        <div class="modal-content">
                            <img src="" alt="imagen ampliada" class="modal-image">
                        </div>
                    </div>
                    <!-- fin de la ventna modal -->

                    <div class="contact-info">
                        <p><strong>Horarios:</strong> Lunes a Viernes de 8:00 AM a 6:00 PM | Sábados de 9:00 AM a 1:00 PM</p>
                        <p><strong>Dirección:</strong> Calle Tortola 34, polígono de Asegra, Granada, España</p>
                        <p><strong>Teléfono:</strong> ☎ 91 926 79 70</p>
                    </div>

                    <div class="form-cont" id="form-cont">
                        <form action="verificarCorreo.php" method="POST" id="formulario" class="formulario">
                            <b style="margin-top: 1rem;">Nombre y apellido: </b><input id="nombre" name="nombre" class="ancho-aj" type="text" placeholder="Nombre y apellido" required>
                            <b style="margin-top: 1rem;">Teléfono: </b><input class="ancho-aj" type="text" name="telefono" placeholder="Teléfono" required>
                            <b style="margin-top: 1rem;">Email: </b><input id="correo" name="correo" class="ancho-aj" type="email" placeholder="Email" required>
                            <textarea class="ancho-aj" style="margin-top: 2rem;" name="mensaje" placeholder="Comentarios" required></textarea>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="aceptarAcuerdo">
                                <label class="form-check-label" for="aceptarAcuerdo">*Estas deacuerdo con que tus datos sean tratados por Talleres Moyano</label>
                            </div>
                            <input class="boton-cita" type="submit" name="enviar" value="Pide Cita">
                            <div class="oculto" id="mensajeError" role="alert">Error</div>
                        </form>
                    </div>
                    
                    <p class="anuncio"><strong>¡No esperes más! Ven a <b style="color:white;">"Talleres Moyano"</b> y asegura el buen estado de tu vehículo hoy mismo.</strong></p>
                </div>
                
            </section>
        </div>
    </div>

    <footer class="footer-prima">
        <p>® Todos los derechos reservados. Simón Lavdorenko Shyn</p>
        <p>Todo lo que hay escrito es una obra de ficción y cualquier parecido con la realidad es puramente casual y no responsabiliza ni vincula al creador</p>
    </footer>

    


    <script src="JavaScript/code.js?v=2.0.0"></script>
</body>
</html>
