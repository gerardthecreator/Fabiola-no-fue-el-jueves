/**
 * TEORÍA.JS - CORREGIDO
 * Contiene toda la base teórica, fórmulas y explicaciones detalladas
 * para el Movimiento Vertical de Caída Libre (MVCL).
 * 
 * NOTA: Se usan dobles barras invertidas (\\) en las fórmulas LaTeX
 * para evitar que JavaScript las interprete como escapes de texto.
 */

function cargarTeoria() {
    const contenedor = document.getElementById('contenido-teoria');
    
    // Definimos el contenido HTML.
    // IMPORTANTE: Todas las fórmulas LaTeX llevan doble barra (\\)
    const htmlContent = `
        <!-- INTRODUCCIÓN -->
        <div class="theory-card">
            <h3 class="theory-title">1. ¿Qué es el Movimiento Vertical?</h3>
            <p>
                Imagina que lanzas una moneda al aire o dejas caer una manzana. Ese movimiento, 
                que ocurre exclusivamente en el eje <strong>Y</strong> (arriba y abajo), se conoce como 
                <strong>Movimiento Vertical de Caída Libre (MVCL)</strong>.
            </p>
            <br>
            <p>
                Se le llama "de Caída Libre" no necesariamente porque el objeto esté cayendo, 
                sino porque la <strong>única fuerza</strong> que actúa sobre él es la gravedad. 
                Despreciamos la resistencia del aire para estos ejercicios ideales.
            </p>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>El Porqué:</strong> Estudiamos esto en el vacío (sin aire) porque simplifica 
                    la realidad. Si incluyéramos el aire, la forma y masa del objeto cambiarían las ecuaciones. 
                    Al eliminar el aire, <strong>todos los cuerpos caen con la misma aceleración</strong>, 
                    como demostró Galileo Galilei.
                </p>
            </div>
        </div>

        <!-- LA GRAVEDAD -->
        <div class="theory-card">
            <h3 class="theory-title">2. La Gravedad: El Motor del Movimiento</h3>
            <p>
                En el movimiento horizontal (MRUV), un auto acelera porque pisa el acelerador. 
                En el movimiento vertical, el "motor" es la atracción de la Tierra.
            </p>
            
            <div class="formula-highlight">
                $$ g \\approx 9,8 \\, m/s^2 $$
            </div>

            <p>
                Esto significa que, por cada segundo que pasa, la velocidad del objeto cambia en \(9,8 \, m/s\).
            </p>
            
            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>¿Por qué es un vector?</strong> La gravedad siempre apunta hacia el centro de la Tierra 
                    (hacia abajo). Por eso, en nuestro sistema de referencia vectorial, la aceleración de la gravedad 
                    siempre será <strong>negativa</strong>.
                    $$ \\vec{a} = -g = -9,8 \\, m/s^2 $$
                </p>
            </div>
        </div>

        <!-- CONVENCIÓN DE SIGNOS -->
        <div class="theory-card">
            <h3 class="theory-title">3. Convención de Signos (Vectorial)</h3>
            <p>
                Para resolver los ejercicios 2 y 3 correctamente (donde hay objetos subiendo y bajando a la vez), 
                es vital usar un sistema de referencia estricto. No usaremos fórmulas de "subida" y "bajada" separadas, 
                sino una sola ecuación vectorial.
            </p>

            <ul>
                <li><strong>Hacia ARRIBA (+):</strong> Posición, Velocidad o Desplazamiento positivos.</li>
                <li><strong>Hacia ABAJO (-):</strong> Posición, Velocidad, Desplazamiento y Gravedad negativos.</li>
                <li><strong>Nivel de Referencia (\\(y=0\\)):</strong> Usualmente el punto de lanzamiento.</li>
            </ul>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>El Porqué:</strong> Usar signos nos permite calcular todo automáticamente. 
                    Si calculas una velocidad final y te da negativa (ej: \\(-20 \\, m/s\\)), la matemática te está 
                    diciendo sola: "El objeto está bajando". No tienes que adivinar.
                </p>
            </div>
        </div>

        <!-- LAS ECUACIONES -->
        <div class="theory-card">
            <h3 class="theory-title">4. Las Ecuaciones Maestras</h3>
            <p>Estas son las 3 fórmulas fundamentales que usaremos en los ejercicios:</p>

            <!-- Fórmula 1 -->
            <h4 style="color:var(--royal-blue); margin-top:1rem;">A. Ecuación de Velocidad vs Tiempo</h4>
            <div class="step-formula">
                $$ v_f = v_0 + g \\cdot t $$
            </div>
            <p>Donde \\(g = -9,8\\). Esta fórmula nos dice qué tan rápido va el objeto en cualquier instante.</p>

            <!-- Fórmula 2 -->
            <h4 style="color:var(--royal-blue); margin-top:1rem;">B. Ecuación de Posición (Altura)</h4>
            <div class="step-formula">
                $$ y_f = y_0 + v_0 \\cdot t + \\frac{1}{2} g \\cdot t^2 $$
            </div>
            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>Análisis:</strong> 
                    <br>• \\(y_f\\): Altura final.
                    <br>• \\(y_0\\): Altura inicial (ej: 800m en el ejercicio 2).
                    <br>• \\(v_0 \\cdot t\\): Lo que subiría si no hubiera gravedad.
                    <br>• \\(\\frac{1}{2} g t^2\\): Lo que la gravedad le quita (o añade) de altura.
                </p>
            </div>

            <!-- Fórmula 3 -->
            <h4 style="color:var(--royal-blue); margin-top:1rem;">C. Ecuación Independiente del Tiempo</h4>
            <div class="step-formula">
                $$ v_f^2 = v_0^2 + 2 \\cdot g \\cdot (y_f - y_0) $$
            </div>
            <p>Úsala cuando el problema <strong>no te dé el tiempo</strong> ni te lo pida.</p>
        </div>

        <!-- PROPIEDADES CLAVE -->
        <div class="theory-card">
            <h3 class="theory-title">5. Propiedades de Oro</h3>
            <p>Estos son "trucos" teóricos que simplifican los cálculos:</p>
            
            <ul>
                <li>
                    <strong>En la altura máxima:</strong> La velocidad instantánea es CERO (\\(v = 0\\)). 
                    El objeto deja de subir para empezar a bajar.
                </li>
                <li>
                    <strong>Tiempo de vuelo:</strong> El tiempo que tarda en subir es igual al tiempo que tarda en bajar 
                    (al mismo nivel).
                    $$ t_{subida} = t_{bajada} $$
                </li>
                <li>
                    <strong>Velocidad simétrica:</strong> Si lanzas algo a \\(+30 \\, m/s\\), cuando vuelva a pasar por tu mano 
                    tendrá una velocidad de \\(-30 \\, m/s\\). Misma magnitud, sentido contrario.
                </li>
            </ul>
        </div>

        <!-- CIFRAS SIGNIFICATIVAS -->
        <div class="theory-card">
            <h3 class="theory-title">6. Nota sobre Cifras Significativas</h3>
            <p>
                En física, la precisión importa. Si los datos son \\(80,0\\) (3 cifras) y \\(6,0\\) (2 cifras), 
                nuestros resultados deben respetar la precisión del dato menos preciso en multiplicaciones, 
                o los decimales en sumas.
            </p>
            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>El Porqué:</strong> No podemos inventar precisión. Si mides con una regla escolar, 
                    no puedes dar un resultado en nanómetros. En los ejercicios, redondearemos adecuadamente 
                    para ser rigurosos.
                </p>
            </div>
        </div>
    `;
    
    // Inyectar el HTML en el contenedor
    contenedor.innerHTML = htmlContent;
}