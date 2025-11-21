/**
 * EJERCICIO 2.JS - EL ENCUENTRO
 * Resolución detallada del problema de dos cuerpos simultáneos.
 * 
 * Puntos clave explicados:
 * 1. Sistema de Referencia (Signos).
 * 2. Igualación de ecuaciones de posición.
 * 3. Cancelación de términos cuadráticos.
 */

console.log("✅ Cargando explicación detallada del Ejercicio 2...");

function resolverEjercicio2() {
 const contenedor = document.getElementById('solucion-2');
 
 if (!contenedor) {
  console.error("❌ Error: No encuentro el div con id 'solucion-2'");
  return;
 }
 
 const htmlContent = `
        <!-- ANÁLISIS INICIAL -->
        <div class="step-box" style="border-left: 5px solid #FF4500;">
            <h3 class="step-title">Análisis Físico: El Choque de Vectores</h3>
            <p>
                Este es un problema clásico de "encuentro". Tenemos dos objetos moviéndose al mismo tiempo en el mismo espacio.
                Para resolverlo sin confundirnos, necesitamos un <strong>Sistema de Referencia</strong> estricto.
            </p>
            <p>
                <strong>Regla de Oro:</strong> Todo lo que apunta hacia ARRIBA es positivo (+), todo lo que apunta hacia ABAJO es negativo (-).
                El suelo es la posición cero (\\(y=0\\)).
            </p>
        </div>

        <!-- PASO 1: DATOS -->
        <div class="step-box">
            <h3 class="step-title">Paso 1: Organización de Datos Vectoriales</h3>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                <div>
                    <strong>🔴 Pelota A (Baja)</strong>
                    <ul>
                        <li>Posición inicial (\\(y_{0A}\\)): \\(800 \\, m\\)</li>
                        <li>Velocidad inicial (\\(v_{0A}\\)): \\(-80,0 \\, m/s\\) <br><small>(Negativa porque la lanzan hacia abajo)</small></li>
                    </ul>
                </div>
                <div>
                    <strong>🔵 Pelota B (Sube)</strong>
                    <ul>
                        <li>Posición inicial (\\(y_{0B}\\)): \\(0 \\, m\\)</li>
                        <li>Velocidad inicial (\\(v_{0B}\\)): \\(+80,0 \\, m/s\\) <br><small>(Positiva porque va hacia arriba)</small></li>
                    </ul>
                </div>
            </div>
            <p style="margin-top:10px;"><strong>Para ambas:</strong> Gravedad \\(g = -9,8 \\, m/s^2\\).</p>
        </div>

        <!-- PASO 2: PLANTEAMIENTO -->
        <div class="step-box">
            <h3 class="step-title">Paso 2: Armar las Ecuaciones de Posición</h3>
            <p>
                No podemos usar fórmulas simples de distancia. Debemos escribir la ecuación que nos dice 
                <em>"dónde está cada pelota en cualquier momento t"</em>.
            </p>
            <div class="step-formula">
                $$ y(t) = y_0 + v_0 t + \\frac{1}{2} g t^2 $$
            </div>

            <p><strong>Ecuación para la Pelota A (Desde arriba):</strong></p>
            <div class="step-formula">
                $$ y_A = 800 - 80t - 4,9t^2 $$
            </div>
            <p><em>(Nota: -4,9 sale de dividir la gravedad -9,8 entre 2).</em></p>

            <p><strong>Ecuación para la Pelota B (Desde abajo):</strong></p>
            <div class="step-formula">
                $$ y_B = 0 + 80t - 4,9t^2 $$
            </div>
        </div>

        <!-- PASO 3: CALCULO DEL TIEMPO -->
        <div class="step-box">
            <h3 class="step-title">Paso 3: Calcular el Tiempo de Encuentro (Inciso A)</h3>
            <p>
                Físicamente, que "se crucen" significa que sus posiciones son iguales en el mismo instante.
            </p>
            <div class="step-formula">
                $$ y_A = y_B $$
            </div>
            
            <p>Igualamos las dos ecuaciones del Paso 2:</p>
            <div class="step-formula">
                $$ 800 - 80t - 4,9t^2 = 80t - 4,9t^2 $$
            </div>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>💡 ¡Magia Matemática!</strong> 
                    Observa que tenemos \\(-4,9t^2\\) en ambos lados de la igualdad. Como la gravedad afecta a las dos pelotas 
                    exactamente igual, <strong>se cancelan</strong>. El problema se vuelve lineal.
                </p>
            </div>

            <p>Simplificamos:</p>
            <div class="step-formula">
                $$ 800 - 80t = 80t $$
            </div>
            <p>Pasamos el -80t al otro lado sumando:</p>
            <div class="step-formula">
                $$ 800 = 80t + 80t $$
                $$ 800 = 160t $$
                $$ t = \\frac{800}{160} = 5,00 \\, s $$
            </div>
        </div>

        <!-- PASO 4: ALTURA DE ENCUENTRO -->
        <div class="step-box">
            <h3 class="step-title">Paso 4: Calcular la Altura del Cruce (Inciso B)</h3>
            <p>
                Ahora que sabemos que chocan a los 5 segundos, reemplazamos \\(t=5\\) en cualquiera de las dos ecuaciones originales. 
                Usaremos la de la Pelota B (la que sube) porque es más corta.
            </p>

            <div class="step-formula">
                $$ y_B = 80(5) - 4,9(5)^2 $$
            </div>

            <p>Operamos:</p>
            <ul>
                <li>Impulso: \\(80 \\times 5 = 400 \\, m\\)</li>
                <li>Gravedad: \\(4,9 \\times 25 = 122,5 \\, m\\)</li>
            </ul>

            <div class="step-formula">
                $$ y = 400 - 122,5 = 277,5 \\, m $$
            </div>
        </div>

        <!-- PASO 5: VELOCIDADES -->
        <div class="step-box">
            <h3 class="step-title">Paso 5: Velocidades al Cruzarse (Inciso C)</h3>
            <p>Usamos la fórmula de velocidad: \\( v_f = v_0 + g t \\) con \\(t=5\\).</p>

            <p><strong>Pelota A (La que bajaba):</strong></p>
            <div class="step-formula">
                $$ v_A = -80 + (-9,8)(5) $$
                $$ v_A = -80 - 49 = -129 \\, m/s $$
            </div>
            <p><em>El signo negativo confirma que sigue cayendo, ahora mucho más rápido.</em></p>

            <p><strong>Pelota B (La que subía):</strong></p>
            <div class="step-formula">
                $$ v_B = +80 + (-9,8)(5) $$
                $$ v_B = 80 - 49 = +31 \\, m/s $$
            </div>
            <p><em>El signo positivo indica que, al momento del cruce, la pelota B todavía está subiendo (no ha llegado a su altura máxima).</em></p>
        </div>

        <!-- RESULTADOS FINALES -->
        <div class="final-answer-box">
            <h4>RESULTADOS FINALES</h4>
            
            <div style="text-align: left; margin-top: 1rem;">
                <p><strong>a) Tiempo de encuentro:</strong> <span class="final-value" style="font-size:1.5rem;">5,00 s</span></p>
                <p><strong>b) Altura del cruce:</strong> <span class="final-value" style="font-size:1.5rem;">278 m</span></p>
                <p><strong>c) Velocidad Pelota A:</strong> <span class="final-value" style="font-size:1.5rem;">-129 m/s</span> (Bajando)</p>
                <p><strong>c) Velocidad Pelota B:</strong> <span class="final-value" style="font-size:1.5rem;">+31,0 m/s</span> (Subiendo)</p>
            </div>
            
            <span class="sig-figs-note">
                Nota: Resultados redondeados a 3 cifras significativas según los datos (80,0 y 800).
            </span>
        </div>
    `;
 
 contenedor.innerHTML = htmlContent;
}