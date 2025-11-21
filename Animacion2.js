/**
 * ANIMACION 2.JS - EL ENCUENTRO
 * Simulación compleja de dos cuerpos con trayectorias opuestas.
 * 
 * Características Avanzadas:
 * - Uso de Clases (ES6 Class) para gestionar los proyectiles.
 * - Generación procedimental del edificio.
 * - Visualización de vectores de velocidad y gravedad en tiempo real.
 * - Detección de colisión/cruce.
 * - Rastro de movimiento (Motion Trail).
 */

let animationId2 = null;

function iniciarAnimacion2() {
    // ==========================================
    // 1. CONFIGURACIÓN DEL ENTORNO
    // ==========================================
    const canvas = document.getElementById('canvas2');
    const container = document.getElementById('animacion-container-2');
    const ctx = canvas.getContext('2d');
    const dataDisplay = document.getElementById('data-display-2');

    // Ajuste Responsive
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();

    // Constantes Físicas
    const G = 9.8;
    const T_ENCUENTRO_TEORICO = 5.0; // s
    const H_EDIFICIO = 800; // m
    
    // Estado de la Animación
    let time = 0;
    let isPlaying = false;
    let simulationSpeed = 0.08; // Velocidad de reproducción
    let maxTime = 7.0; // Un poco más del encuentro para ver qué pasa después

    // Escala: Mapear 900 metros (800 edificio + aire) al alto del canvas
    // Dejamos un margen del 10% arriba y abajo
    let scaleY = canvas.height / 950; 
    let groundY = canvas.height - 20;

    // ==========================================
    // 2. CLASE PROYECTIL (Lógica de Objetos)
    // ==========================================
    class Proyectil {
        constructor(y0, v0, color, label, offsetX) {
            this.y0 = y0;       // Altura inicial (m)
            this.v0 = v0;       // Velocidad inicial (m/s)
            this.color = color;
            this.label = label;
            this.offsetX = offsetX; // Desplazamiento horizontal para que no se solapen
            
            this.y = y0;
            this.v = v0;
            this.trail = []; // Array para guardar posiciones pasadas
        }

        update(t) {
            // Ecuaciones de cinemática:
            // y = y0 + v0*t - 0.5*g*t^2
            this.y = this.y0 + (this.v0 * t) - (0.5 * G * Math.pow(t, 2));
            
            // v = v0 - g*t
            this.v = this.v0 - (G * t);

            // Guardar rastro cada cierto intervalo (aprox cada 0.5s)
            if (Math.floor(t * 10) % 5 === 0) {
                this.trail.push(this.y);
            }
        }

        draw(ctx) {
            // Convertir metros a píxeles
            // Nota: En canvas Y crece hacia abajo, en física hacia arriba.
            // Invertimos: groundY - (metros * scale)
            const pixelY = groundY - (this.y * scaleY);
            const pixelX = (canvas.width / 2) + this.offsetX;

            // 1. Dibujar Rastro (Ghosting)
            ctx.fillStyle = this.color;
            this.trail.forEach(trailY => {
                const trailPixelY = groundY - (trailY * scaleY);
                ctx.globalAlpha = 0.2;
                ctx.beginPath();
                ctx.arc(pixelX, trailPixelY, 3, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;

            // 2. Dibujar Pelota
            ctx.beginPath();
            ctx.arc(pixelX, pixelY, 8, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.stroke();

            // 3. Dibujar Vector Velocidad (Flecha Dinámica)
            // Escalamos la velocidad para que quepa en pantalla (factor 0.8)
            this.drawArrow(ctx, pixelX, pixelY, this.v * 0.8, this.color, `v=${this.v.toFixed(0)}`);

            // 4. Dibujar Vector Gravedad (Flecha Estática)
            // Lo desplazamos un poco a la izquierda
            this.drawArrow(ctx, pixelX - 15, pixelY, -G * 3, "#555", ""); // Sin etiqueta para no saturar
        }

        drawArrow(ctx, x, y, length, color, text) {
            // Si length es muy pequeño, no dibujar
            if (Math.abs(length) < 2) return;

            const endY = y - length; // Recordar: Y canvas invertido
            const headSize = 6;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, endY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Cabeza de flecha
            const angle = Math.atan2(endY - y, 0); // Vertical
            const dir = length > 0 ? 1 : -1; // Arriba o abajo

            ctx.beginPath();
            ctx.moveTo(x, endY);
            ctx.lineTo(x - 4, endY + (5 * dir));
            ctx.lineTo(x + 4, endY + (5 * dir));
            ctx.lineTo(x, endY);
            ctx.fillStyle = color;
            ctx.fill();

            if (text) {
                ctx.fillStyle = "#000";
                ctx.font = "10px Oswald";
                ctx.fillText(text, x + 10, endY);
            }
        }
    }

    // Instanciar los objetos
    // Pelota A: Desde 800m, v0 = -80 (Baja), Roja, desplazada a la izquierda
    const ballA = new Proyectil(800, -80, "#FF4500", "A", -30);
    
    // Pelota B: Desde 0m, v0 = +80 (Sube), Azul, desplazada a la derecha
    const ballB = new Proyectil(0, 80, "#0052D4", "B", 30);

    // ==========================================
    // 3. DIBUJO DE ESCENA (FONDO)
    // ==========================================
    function drawBackground() {
        // Cielo
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Edificio (Lado izquierdo)
        const buildingWidth = 100;
        const buildingHeightPixel = H_EDIFICIO * scaleY;
        const buildingX = (canvas.width / 2) - 150; // A la izquierda de las pelotas
        
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(buildingX, groundY - buildingHeightPixel, buildingWidth, buildingHeightPixel);
        
        // Ventanas del edificio (Procedural simple)
        ctx.fillStyle = "#f1c40f"; // Luz amarilla
        for(let i = 0; i < buildingHeightPixel; i += 40) {
            for(let j = 10; j < buildingWidth; j += 30) {
                if (Math.random() > 0.3) { // Algunas luces apagadas
                    ctx.fillRect(buildingX + j, groundY - i - 30, 15, 20);
                }
            }
        }

        // Techo del edificio
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(buildingX - 5, groundY - buildingHeightPixel, buildingWidth + 10, 10);
        ctx.fillStyle = "#fff";
        ctx.fillText("800m", buildingX + 10, groundY - buildingHeightPixel - 10);

        // Suelo
        ctx.fillStyle = "#27ae60";
        ctx.fillRect(0, groundY, canvas.width, 20);
        
        // Línea de referencia de encuentro (solo visible cerca del momento)
        if (Math.abs(time - T_ENCUENTRO_TEORICO) < 0.5) {
            const meetY = groundY - (277.5 * scaleY);
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.moveTo(buildingX + buildingWidth, meetY);
            ctx.lineTo(canvas.width, meetY);
            ctx.strokeStyle = "#FFD700";
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillText("PUNTO DE CRUCE (277.5m)", canvas.width/2 + 60, meetY - 5);
        }
    }

    // ==========================================
    // 4. BUCLE PRINCIPAL
    // ==========================================
    function loop() {
        // 1. Actualizar Física
        if (isPlaying) {
            time += simulationSpeed;
            if (time >= maxTime) {
                time = maxTime;
                isPlaying = false;
                document.getElementById('btn-play-2').textContent = "Reiniciar";
            }
        }

        ballA.update(time);
        ballB.update(time);

        // 2. Dibujar Todo
        drawBackground();
        ballA.draw(ctx);
        ballB.draw(ctx);

        // 3. Actualizar Datos HTML
        // Usamos un grid CSS implícito en el string para formatear
        dataDisplay.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; text-align:left;">
                <div>
                    <strong style="color:#FF4500">🔴 Pelota A (Baja)</strong><br>
                    y: ${ballA.y.toFixed(1)} m<br>
                    v: ${ballA.v.toFixed(1)} m/s
                </div>
                <div>
                    <strong style="color:#0052D4">🔵 Pelota B (Sube)</strong><br>
                    y: ${ballB.y.toFixed(1)} m<br>
                    v: ${ballB.v.toFixed(1)} m/s
                </div>
            </div>
            <div style="text-align:center; margin-top:5px; border-top:1px solid #333;">
                ⏱️ Tiempo: <strong>${time.toFixed(2)} s</strong>
            </div>
        `;

        animationId2 = requestAnimationFrame(loop);
    }

    // ==========================================
    // 5. CONTROLES
    // ==========================================
    const btnPrev = document.getElementById('btn-prev-2');
    const btnPlay = document.getElementById('btn-play-2');
    const btnNext = document.getElementById('btn-next-2');

    // Clonar para limpiar eventos viejos
    const newBtnPrev = btnPrev.cloneNode(true);
    const newBtnPlay = btnPlay.cloneNode(true);
    const newBtnNext = btnNext.cloneNode(true);
    
    btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);
    btnPlay.parentNode.replaceChild(newBtnPlay, btnPlay);
    btnNext.parentNode.replaceChild(newBtnNext, btnNext);

    newBtnPrev.addEventListener('click', () => {
        isPlaying = false;
        time = Math.max(0, time - 0.5);
        newBtnPlay.textContent = "Reproducir";
        // Resetear trails si retrocedemos mucho
        ballA.trail = []; ballB.trail = [];
    });

    newBtnNext.addEventListener('click', () => {
        isPlaying = false;
        time = Math.min(maxTime, time + 0.5);
        newBtnPlay.textContent = "Reproducir";
    });

    newBtnPlay.addEventListener('click', () => {
        if (time >= maxTime) {
            time = 0;
            ballA.trail = [];
            ballB.trail = [];
        }
        isPlaying = !isPlaying;
        newBtnPlay.textContent = isPlaying ? "Pausa" : "Reproducir";
    });

    // Iniciar
    if (animationId2) cancelAnimationFrame(animationId2);
    loop();
}