/**
 * EJERCICIO 1.JS - VERSIÓN DETALLADA Y PEDAGÓGICA
 * 
 * Este script inyecta la explicación teórica y matemática paso a paso
 * debajo de la animación.
 * 
 * NOTA TÉCNICA: Se usan dobles barras (\\) para que MathJax funcione bien.
 */

console.log("✅ Cargando explicación detallada del Ejercicio 1...");

function resolverEjercicio1() {
    const contenedor = document.getElementById('solucion-1');
    
    if (!contenedor) {
        console.error("❌ Error: No encuentro el div con id 'solucion-1'");
        return;
    }
    
    const htmlContent = `
        <!-- INTRODUCCIÓN AL PROBLEMA -->
        <div class="step-box" style="border-left: 5px solid #FFD700;">
            <h3 class="step-title">Análisis Físico del Problema</h3>
            <p>
                El enunciado es corto pero tiene mucha información oculta ("implícita"). 
                Nos dice: <em>"Un bate batea una pelota y sube durante 3 segundos"</em>.
            </p>
            <p>
                <strong>¿Qué significa esto físicamente?</strong><br>
                Significa que el cronómetro empieza (t=0) cuando la pelota se separa del bate, y termina (t=3) 
                justo cuando la pelota deja de subir. Ese instante final es la <strong>Altura Máxima</strong>.
            </p>
        </div>

        <!-- PASO 1: DATOS -->
        <div class="step-box">
            <h3 class="step-title">Paso 1: Extracción de Datos (Lo que tenemos)</h3>
            <p>Para resolver física, primero debemos traducir el texto a variables matemáticas:</p>
            
            <ul>
                <li>
                    <strong>Tiempo de subida (\\(t\\)):</strong> \\(3,0 \\, s\\).
                </li>
                <li>
                    <strong>Gravedad (\\(g\\)):</strong> \\(-9,8 \\, m/s^2\\). 
                    <br><em style="font-size:0.9rem; color:#666;">(Es negativa porque siempre apunta hacia el centro de la Tierra, frenando la subida).</em>
                </li>
                <li>
                    <strong>Velocidad Final (\\(v_f\\)):</strong> \\(0 \\, m/s\\).
                </li>
            </ul>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>💡 EL PORQUÉ CLAVE:</strong> ¿Por qué decimos que la velocidad final es cero? 
                    Imagina la animación. La pelota sube rápido, luego más lento, más lento... hasta que por un instante 
                    se queda "congelada" en el aire antes de empezar a caer. En ese punto exacto de altura máxima, 
                    su velocidad vertical se agota. <strong>\\(v = 0\\)</strong>. Sin este dato, el problema no se puede resolver.
                </p>
            </div>
        </div>

        <!-- PASO 2: VELOCIDAD INICIAL -->
        <div class="step-box">
            <h3 class="step-title">Paso 2: Calcular la Velocidad Inicial (\\(v_0\\))</h3>
            <p>
                <strong>Objetivo:</strong> Saber con qué rapidez salió disparada la pelota.
                <br><strong>Selección de Fórmula:</strong> Buscamos una fórmula que tenga \\(v_f\\), \\(g\\), \\(t\\) y la incógnita \\(v_0\\).
            </p>

            <div class="step-formula">
                $$ v_f = v_0 + g \\cdot t $$
            </div>

            <p><strong>Sustitución:</strong> Reemplazamos las letras por los números.</p>
            <div class="step-formula">
                $$ 0 = v_0 + (-9,8)(3,0) $$
            </div>

            <p><strong>Resolución Matemática:</strong></p>
            <p>1. Multiplicamos la gravedad por el tiempo:</p>
            <div class="step-formula">
                $$ 0 = v_0 - 29,4 $$
            </div>
            
            <p>2. Despejamos \\(v_0\\). Como el 29,4 está restando, pasa al otro lado sumando:</p>
            <div class="step-formula">
                $$ 29,4 = v_0 $$
            </div>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>Interpretación:</strong> El resultado es positivo (\\(+29,4\\)). 
                    Esto confirma que la velocidad inicial iba hacia ARRIBA. Si nos hubiera dado negativo, 
                    significaría que la lanzamos hacia el suelo, lo cual no tendría sentido para "subir".
                </p>
            </div>
        </div>

        <!-- PASO 3: ALTURA MÁXIMA -->
        <div class="step-box">
            <h3 class="step-title">Paso 3: Calcular la Altura Máxima (\\(y_{max}\\))</h3>
            <p>
                <strong>Objetivo:</strong> Saber cuántos metros subió.
                <br><strong>Selección de Fórmula:</strong> Usamos la ecuación de posición. Asumimos que partió del suelo (\\(y_0 = 0\\)).
            </p>

            <div class="step-formula">
                $$ y_f = y_0 + v_0 \\cdot t + \\frac{1}{2} g \\cdot t^2 $$
            </div>

            <p><strong>Sustitución:</strong></p>
            <div class="step-formula">
                $$ y = 0 + (29,4)(3,0) + \\frac{1}{2}(-9,8)(3,0)^2 $$
            </div>

            <p><strong>Resolución paso a paso (La complejidad explicada):</strong></p>
            
            <p>1. Calculamos el impulso inicial (lo que subiría si no hubiera gravedad):</p>
            <div style="text-align:center; font-family:monospace; color:#0052D4;">
                (29,4) × (3,0) = 88,2 metros
            </div>
            <br>
            
            <p>2. Calculamos cuánto le "robó" la gravedad en esos 3 segundos:</p>
            <div style="text-align:center; font-family:monospace; color:#e74c3c;">
                0,5 × (-9,8) × (9) = -44,1 metros
            </div>
            <br>

            <p>3. Restamos:</p>
            <div class="step-formula">
                $$ y = 88,2 - 44,1 $$
                $$ y = 44,1 \\, m $$
            </div>

            <div class="explanation-block">
                <p class="explanation-text">
                    <strong>💡 ¿Por qué se resta?</strong> 
                    El término \\(\\frac{1}{2}gt^2\\) representa la distancia que la gravedad hace caer al cuerpo. 
                    Aunque el cuerpo está subiendo, la gravedad está "tirando" de él hacia abajo constantemente, 
                    reduciendo la distancia que lograría recorrer solo con su velocidad inicial.
                </p>
            </div>
        </div>

        <!-- RESULTADO FINAL -->
        <div class="final-answer-box">
            <h4>RESPUESTAS DEFINITIVAS</h4>
            
            <div style="display:flex; justify-content:space-around; flex-wrap:wrap; gap:20px;">
                <div>
                    <p>Velocidad Inicial (\\(v_0\\))</p>
                    <div class="final-value">29 m/s</div>
                </div>
                <div>
                    <p>Altura Máxima (\\(h\\))</p>
                    <div class="final-value">44 m</div>
                </div>
            </div>
            
            <span class="sig-figs-note">
                *Resultados redondeados a 2 cifras significativas (regla del dato menos preciso: 3,0s y 9,8m/s²).
            </span>
        </div>
    `;
    
    contenedor.innerHTML = htmlContent;
}