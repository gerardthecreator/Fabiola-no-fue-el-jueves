/**
 * ANIMACION 3.JS - EL COHETE
 * Simulación de movimiento compuesto (Acelerado -> Gravitacional).
 * 
 * Características:
 * - Máquina de Estados (Fase 1: Motor, Fase 2: Inercia, Fase 3: Caída).
 * - Sistema de Partículas para simular el fuego del motor.
 * - Cámara estática con escala dinámica para visualizar los 2000m de altura.
 * - Indicadores de estado en tiempo real.
 */

let animationId3 = null;

function iniciarAnimacion3() {
    // ==========================================
    // 1. CONFIGURACIÓN
    // ==========================================
    const canvas = document.getElementById('canvas3');
    const container = document.getElementById('animacion-container-3');
    const ctx = canvas.getContext('2d');
    const dataDisplay = document.getElementById('data-display-3');

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();

    // Constantes del Problema
    const A_MOTOR = 6.0;    // m/s^2
    const G = 9.8;          // m/s^2
    const T_CORTE = 20.0;   // s (Momento de apagado)
    
    // Variables de Estado
    let t = 0;
    let isPlaying = false;
    let speed = 0.2; // Velocidad de simulación (más rápido que tiempo real porque dura 52s)
    let particles = []; // Array para el fuego

    // Escala: El cohete llega a ~1935m. Usaremos 2100m como tope.
    let maxRenderHeight = 2100;
    let scaleY = canvas.height / maxRenderHeight;
    let groundY = canvas.height - 20;

    // ==========================================
    // 2. CLASE COHETE
    // ==========================================
    class Rocket {
        constructor() {
            this.y = 0;
            this.v = 0;
            this.width = 20;
            this.height = 40;
        }

        update(time) {
            // Lógica Física por Fases
            if (time <= T_CORTE) {
                // FASE 1: MRUV Acelerado (Motor ON)
                // y = 0.5 * a * t^2
                this.y = 0.5 * A_MOTOR * Math.pow(time, 2);
                // v = a * t
                this.v = A_MOTOR * time;
                
                // Generar fuego
                this.addParticles();
            } else {
                // FASE 2 y 3: MVCL (Motor OFF, solo gravedad)
                // Necesitamos condiciones iniciales al t=20
                const y20 = 0.5 * A_MOTOR * Math.pow(T_CORTE, 2); // 1200m
                const v20 = A_MOTOR * T_CORTE; // 120 m/s
                const dt = time - T_CORTE; // Tiempo transcurrido desde el apagado

                // y = y0 + v0*t - 0.5*g*t^2
                this.y = y20 + (v20 * dt) - (0.5 * G * Math.pow(dt, 2));
                // v = v0 - g*t
                this.v = v20 - (G * dt);
            }

            // Suelo
            if (this.y < 0) {
                this.y = 0;
                this.v = 0;
                isPlaying = false; // Detener al chocar
                document.getElementById('btn-play-3').textContent = "Reiniciar";
            }
        }

        addParticles() {
            // Crear partículas de fuego en la base del cohete
            for(let i=0; i<5; i++) {
                particles.push({
                    x: (canvas.width / 2) + (Math.random() * 10 - 5), // Aleatorio en X
                    y: groundY - (this.y * scaleY), // Base del cohete
                    life: 1.0, // Vida de la partícula
                    vx: (Math.random() * 2 - 1),
                    vy: (Math.random() * 5 + 2) // Hacia abajo visualmente
                });
            }
        }

        draw(ctx) {
            const pixelX = canvas.width / 2;
            const pixelY = groundY - (this.y * scaleY);

            // 1. Dibujar Cohete
            ctx.save();
            ctx.translate(pixelX, pixelY);
            
            // Cuerpo
            ctx.fillStyle = "#ecf0f1"; // Blanco plata
            ctx.fillRect(-this.width/2, -this.height, this.width, this.height);
            
            // Punta
            ctx.beginPath();
            ctx.moveTo(-this.width/2, -this.height);
            ctx.lineTo(0, -this.height - 15);
            ctx.lineTo(this.width/2, -this.height);
            ctx.fillStyle = "#e74c3c"; // Rojo
            ctx.fill();

            // Aletas
            ctx.fillStyle = "#34495e"; // Azul oscuro
            ctx.beginPath();
            ctx.moveTo(-this.width/2, 0);
            ctx.lineTo(-this.width/2 - 10, 10);
            ctx.lineTo(-this.width/2, -10);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(this.width/2, 0);
            ctx.lineTo(this.width/2 + 10, 10);
            ctx.lineTo(this.width/2, -10);
            ctx.fill();

            ctx.restore();

            // 2. Vectores (Flechas)
            // Vector Velocidad (Azul)
            // Escalamos mucho menos porque la velocidad llega a 120
            if (Math.abs(this.v) > 1) {
                drawArrow(ctx, pixelX + 25, pixelY - 20, this.v * 0.5, "#0052D4", `v=${this.v.toFixed(0)}`);
            }

            // Vector Aceleración (Verde o Rojo)
            if (t <= T_CORTE && t > 0) {
                // Aceleración hacia arriba
                drawArrow(ctx, pixelX - 25, pixelY - 20, 40, "#2ecc71", "a=+6");
            } else if (t > T_CORTE && this.y > 0) {
                // Gravedad hacia abajo
                drawArrow(ctx, pixelX - 25, pixelY - 20, -40, "#e74c3c", "g=-9.8");
            }
        }
    }

    const rocket = new Rocket();

    // ==========================================
    // 3. UTILIDADES DE DIBUJO
    // ==========================================
    function drawArrow(ctx, x, y, length, color, label) {
        const endY = y - length;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Cabeza
        const dir = length >= 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(x, endY);
        ctx.lineTo(x - 4, endY + (5 * dir));
        ctx.lineTo(x + 4, endY + (5 * dir));
        ctx.lineTo(x, endY);
        ctx.fillStyle = color;
        ctx.fill();

        // Texto
        ctx.fillStyle = color;
        ctx.font = "bold 11px Oswald";
        ctx.fillText(label, x + 8, endY + (length > 0 ? 0 : 10));
    }

    function drawParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.y += p.vy; // Mover hacia abajo
            p.x += p.vx;
            p.life -= 0.05; // Desvanecer

            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3 + (1-p.life)*5, 0, Math.PI * 2);
                // Gradiente de amarillo a rojo
                ctx.fillStyle = p.life > 0.5 ? "#f1c40f" : "#e74c3c";
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    function drawPhaseIndicator() {
        ctx.font = "bold 20px Anton";
        ctx.textAlign = "left";
        
        if (t <= T_CORTE) {
            ctx.fillStyle = "#2ecc71";
            ctx.fillText("FASE 1: MOTORES ENCENDIDOS", 20, 40);
            ctx.font = "14px Oswald";
            ctx.fillStyle = "#fff";
            ctx.fillText("Acelerando hacia arriba", 20, 60);
        } else if (rocket.v > 0) {
            ctx.fillStyle = "#f39c12";
            ctx.fillText("FASE 2: INERCIA (SUBIDA)", 20, 40);
            ctx.font = "14px Oswald";
            ctx.fillStyle = "#fff";
            ctx.fillText("Motor apagado, frenando por gravedad", 20, 60);
        } else {
            ctx.fillStyle = "#e74c3c";
            ctx.fillText("FASE 3: CAÍDA LIBRE", 20, 40);
            ctx.font = "14px Oswald";
            ctx.fillStyle = "#fff";
            ctx.fillText("Cayendo hacia el suelo", 20, 60);
        }
    }

    // ==========================================
    // 4. BUCLE PRINCIPAL
    // ==========================================
    function loop() {
        // Limpiar
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fondo (Cielo degradado)
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#000022"); // Espacio
        gradient.addColorStop(1, "#87CEEB"); // Cielo
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Suelo
        ctx.fillStyle = "#27ae60";
        ctx.fillRect(0, groundY, canvas.width, 20);

        // Marcas de altura (Grid)
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "10px Arial";
        for(let h=0; h<=2000; h+=500) {
            let yPos = groundY - (h * scaleY);
            ctx.beginPath();
            ctx.moveTo(0, yPos);
            ctx.lineTo(canvas.width, yPos);
            ctx.stroke();
            ctx.fillText(h + "m", 5, yPos - 2);
        }

        // Actualizar Lógica
        if (isPlaying) {
            t += speed;
        }
        rocket.update(t);

        // Dibujar Elementos
        drawParticles();
        rocket.draw(ctx);
        drawPhaseIndicator();

        // Actualizar HTML
        dataDisplay.innerHTML = `
            <span>⏱️ T: ${t.toFixed(1)} s</span>
            <span>📏 Y: ${rocket.y.toFixed(0)} m</span>
            <span>🚀 V: ${rocket.v.toFixed(0)} m/s</span>
        `;

        animationId3 = requestAnimationFrame(loop);
    }

    // ==========================================
    // 5. CONTROLES
    // ==========================================
    const btnPrev = document.getElementById('btn-prev-3');
    const btnPlay = document.getElementById('btn-play-3');
    const btnNext = document.getElementById('btn-next-3');

    const newBtnPrev = btnPrev.cloneNode(true);
    const newBtnPlay = btnPlay.cloneNode(true);
    const newBtnNext = btnNext.cloneNode(true);
    
    btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);
    btnPlay.parentNode.replaceChild(newBtnPlay, btnPlay);
    btnNext.parentNode.replaceChild(newBtnNext, btnNext);

    newBtnPrev.addEventListener('click', () => {
        isPlaying = false;
        t = Math.max(0, t - 1.0);
        particles = []; // Limpiar partículas al saltar tiempo
        newBtnPlay.textContent = "Reproducir";
    });

    newBtnNext.addEventListener('click', () => {
        isPlaying = false;
        t += 1.0;
        particles = [];
        newBtnPlay.textContent = "Reproducir";
    });

    newBtnPlay.addEventListener('click', () => {
        if (rocket.y <= 0 && t > 1) {
            t = 0; // Reiniciar
        }
        isPlaying = !isPlaying;
        newBtnPlay.textContent = isPlaying ? "Pausa" : "Reproducir";
    });

    // Iniciar
    if (animationId3) cancelAnimationFrame(animationId3);
    loop();
}