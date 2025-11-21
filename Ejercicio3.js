/**
 * EJERCICIO 3.JS - EL COHETE (MOVIMIENTO COMPUESTO)
 * 
 * Este problema es un reto porque combina MRUV (motores) con MVCL (gravedad).
 * Se divide en 3 Fases:
 * 1. Ascenso propulsado (0 a 20s).
 * 2. Ascenso por inercia (motores apagados hasta altura máxima).
 * 3. Caída libre (desde altura máxima al suelo).
 */

console.log("✅ Cargando explicación detallada del Ejercicio 3...");

function resolverEjercicio3() {
 const contenedor = document.getElementById('solucion-3');
 
 if (!contenedor) {
  console.error("❌ Error: No encuentro el div con id 'solucion-3'");
  return;
 }
 
 const htmlContent = `
        <!-- INTRODUCCIÓN ESTRATÉGICA -->
        <div class="step-box" style="border-left: 5px solid #9b59b6;">
            <h3 class="step-title">Estrategia: Divide y Vencerás</h3>
            <p>
                Este problema no se puede resolver con una sola fórmula porque la aceleración cambia.
                Debemos dividir la película en dos partes:
            </p>
            <ul>
                <li><strong>Fase 1 (Motores ON):</strong> El cohete acelera hacia arriba a \\(6,0 \\, m/s^2\\).</li>
                <li><strong>Fase 2 (Motores OFF):</strong> El cohete se mueve solo bajo la gravedad (\\(-9,8 \\, m/s^2\\)).</li>
            </ul>
            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>¡Cuidado!</strong> Cuando se apagan los motores a los 20 segundos, el cohete 
                    <strong>NO se detiene</strong> ni empieza a caer inmediatamente. Tiene una gran velocidad acumulada 
                    (inercia) que lo hará seguir subiendo un rato más, aunque frenando.
                </p>
            </div>
        </div>

        <!-- INCISO A: ALTURA FASE 1 -->
        <div class="step-box">
            <h3 class="step-title">A) Altura a los 20 segundos (Fase 1)</h3>
            <p>
                Usamos datos de la fase propulsada. Parte del reposo (\\(v_0=0\\)).
            </p>
            <div class="step-formula">
                $$ y_1 = y_0 + v_0 t + \\frac{1}{2} a t^2 $$
            </div>
            <p>Sustituimos \\(a = +6,0\\) y \\(t = 20\\):</p>
            <div class="step-formula">
                $$ y_1 = 0 + 0 + \\frac{1}{2}(6,0)(20)^2 $$
                $$ y_1 = 3,0 \\times 400 = 1200 \\, m $$
            </div>
            <p><strong>Resultado A:</strong> A los 20s, el cohete está a 1200 metros de altura.</p>
        </div>

        <!-- INCISO B: VELOCIDAD FASE 1 -->
        <div class="step-box">
            <h3 class="step-title">B) Velocidad a los 20 segundos (Vector)</h3>
            <p>
                Necesitamos saber qué tan rápido iba justo antes de apagar motores.
            </p>
            <div class="step-formula">
                $$ v_f = v_0 + a \\cdot t $$
                $$ v_1 = 0 + (6,0)(20) = 120 \\, m/s $$
            </div>
            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>Importancia de este dato:</strong> 
                    Esta velocidad final de la Fase 1 (\\(120 \\, m/s\\)) se convierte automáticamente en la 
                    <strong>Velocidad Inicial de la Fase 2</strong>. Es la "herencia" que recibe la etapa de gravedad.
                </p>
            </div>
        </div>

        <!-- INCISO C: ALTURA MÁXIMA -->
        <div class="step-box">
            <h3 class="step-title">C) Máxima Altura Alcanzada</h3>
            <p>
                Ahora entramos en la <strong>Fase 2 (Solo gravedad)</strong>.
                <br>Datos nuevos:
                <br>• \\(v_0 = 120 \\, m/s\\) (La que calculamos antes).
                <br>• \\(v_f = 0 \\, m/s\\) (Condición de altura máxima).
                <br>• \\(g = -9,8 \\, m/s^2\\).
            </p>
            
            <p>Usamos la ecuación independiente del tiempo para hallar cuánto <em>más</em> subió (\\(\\Delta y\\)):</p>
            <div class="step-formula">
                $$ v_f^2 = v_0^2 + 2 g \\Delta y $$
                $$ 0 = (120)^2 + 2(-9,8) \\Delta y $$
            </div>
            
            <p>Despejamos \\(\\Delta y\\):</p>
            <div class="step-formula">
                $$ 0 = 14400 - 19,6 \\Delta y $$
                $$ 19,6 \\Delta y = 14400 $$
                $$ \\Delta y = \\frac{14400}{19,6} \\approx 735 \\, m $$
            </div>

            <p><strong>Altura Total:</strong> Sumamos lo que subió con motor + lo que subió por inercia.</p>
            <div class="step-formula">
                $$ H_{total} = 1200 + 735 = 1935 \\, m $$
            </div>
        </div>

        <!-- INCISO D: TIEMPO TOTAL -->
        <div class="step-box">
            <h3 class="step-title">D) Tiempo Total en el Aire</h3>
            <p>El tiempo total es la suma de tres intervalos:</p>
            <ol>
                <li><strong>\\(t_1\\) (Motor ON):</strong> 20 s (Dato del problema).</li>
                <li><strong>\\(t_2\\) (Subida inercial):</strong> Tiempo desde que apaga motor hasta altura máxima.</li>
                <li><strong>\\(t_3\\) (Caída libre):</strong> Tiempo desde altura máxima hasta el suelo.</li>
            </ol>

            <p><strong>Calculando \\(t_2\\) (Subida extra):</strong></p>
            <div class="step-formula">
                $$ v_f = v_0 + g t_2 $$
                $$ 0 = 120 + (-9,8) t_2 $$
                $$ t_2 = \\frac{120}{9,8} \\approx 12,24 \\, s $$
            </div>

            <p><strong>Calculando \\(t_3\\) (Caída desde 1935 m):</strong></p>
            <p>Ahora cae desde el reposo (\\(v=0\\)) desde la altura máxima.</p>
            <div class="step-formula">
                $$ y_f = y_0 + v_0 t + \\frac{1}{2} g t^2 $$
                $$ 0 = 1935 + 0 - 4,9 t_3^2 $$
            </div>
            <p><em>(Nota: \\(y_f=0\\) es el suelo, \\(y_0=1935\\) es la cima).</em></p>
            <div class="step-formula">
                $$ 4,9 t_3^2 = 1935 $$
                $$ t_3 = \\sqrt{\\frac{1935}{4,9}} \\approx \\sqrt{394,9} \\approx 19,87 \\, s $$
            </div>

            <p><strong>Suma Total:</strong></p>
            <div class="step-formula">
                $$ t_{total} = 20 + 12,24 + 19,87 = 52,11 \\, s $$
            </div>
        </div>

        <!-- RESULTADOS FINALES -->
        <div class="final-answer-box">
            <h4>RESUMEN DE RESULTADOS</h4>
            
            <div style="text-align: left; display: grid; gap: 10px;">
                <div><strong>a) Altura (20s):</strong> <span class="final-value">1200 m</span></div>
                <div><strong>b) Velocidad (20s):</strong> <span class="final-value">120 m/s</span> (↑)</div>
                <div><strong>c) Altura Máxima:</strong> <span class="final-value">1935 m</span></div>
                <div><strong>d) Tiempo de Vuelo:</strong> <span class="final-value">52 s</span></div>
            </div>
            
            <span class="sig-figs-note">
                Nota: Se han mantenido decimales intermedios para precisión, redondeando al final a 2 cifras significativas (acorde a 6,0 y 20).
            </span>
        </div>
    `;
 
 contenedor.innerHTML = htmlContent;
}