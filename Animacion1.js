/**
 * ANIMACION 1.JS
 * Simulación interactiva del Bateo Vertical.
 * 
 * Características:
 * - Renderizado en Canvas 2D.
 * - Vectores dinámicos: Velocidad (cambia) y Gravedad (constante).
 * - Control de tiempo (Play/Pause, Step-by-step).
 * - Adaptable a móviles (Responsive).
 */

let animationId1 = null; // Variable global para controlar el loop

function iniciarAnimacion1() {
 // 1. CONFIGURACIÓN DEL CANVAS Y CONTEXTO
 const canvas = document.getElementById('canvas1');
 const container = document.getElementById('animacion-container-1');
 const ctx = canvas.getContext('2d');
 const dataDisplay = document.getElementById('data-display-1');
 
 // Ajustar tamaño del canvas al contenedor (Responsive)
 function resizeCanvas() {
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
 }
 resizeCanvas();
 
 // 2. VARIABLES FÍSICAS (MODELO)
 // Usamos los datos calculados en Ejercicio1.js
 const v0 = 29.4; // m/s
 const g = 9.8; // m/s^2
 const tTotal = 6.0; // 3s subida + 3s bajada
 
 // Estado de la animación
 let t = 0; // Tiempo actual
 let isPlaying = false;
 let speed = 0.05; // Paso de tiempo por frame (velocidad de simulación)
 
 // Escala visual (Mapeo de Metros a Píxeles)
 // Altura máx es 44.1m. Dejamos margen.
 // El 80% del alto del canvas representará unos 50 metros.
 let scaleY = (canvas.height * 0.8) / 50;
 
 // 3. FUNCIONES DE DIBUJO (VISTA)
 
 function drawArrow(fromX, fromY, length, color, label) {
  const headlen = 10; // longitud de la cabeza de la flecha
  const angle = -Math.PI / 2; // Apuntando arriba (base)
  
  // Si la longitud es negativa, la flecha apunta abajo
  const endY = fromY - length;
  
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, endY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Dibujar la cabeza
  // Determinar dirección visual para la cabeza
  const direction = length >= 0 ? 1 : -1;
  
  ctx.beginPath();
  ctx.moveTo(fromX, endY);
  ctx.lineTo(fromX - 5, endY + (5 * direction));
  ctx.lineTo(fromX + 5, endY + (5 * direction));
  ctx.lineTo(fromX, endY);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Etiqueta
  ctx.fillStyle = "#000";
  ctx.font = "bold 12px Arial";
  ctx.fillText(label, fromX + 10, fromY - length / 2);
 }
 
 function drawScene() {
  // A. Limpiar Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // B. Dibujar Suelo
  const groundY = canvas.height - 20;
  ctx.fillStyle = "#2ecc71"; // Verde pasto
  ctx.fillRect(0, groundY, canvas.width, 20);
  
  // C. Calcular Física
  // y = y0 + v0*t - 0.5*g*t^2
  let posY_metros = (v0 * t) - (0.5 * g * Math.pow(t, 2));
  
  // v = v0 - g*t
  let vel_actual = v0 - (g * t);
  
  // Evitar que la pelota perfore el suelo por errores de redondeo
  if (posY_metros < 0) posY_metros = 0;
  
  // D. Convertir a Coordenadas Canvas
  const ballX = canvas.width / 2; // Centrado horizontalmente
  const ballY = groundY - (posY_metros * scaleY);
  const ballRadius = 10;
  
  // E. Dibujar Pelota
  ctx.beginPath();
  ctx.arc(ballX, ballY - ballRadius, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF"; // Blanco pelota
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  
  // Costuras de la pelota de béisbol
  ctx.beginPath();
  ctx.arc(ballX - 5, ballY - ballRadius, 8, -0.5, 1.5);
  ctx.strokeStyle = "#ff0000";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(ballX + 5, ballY - ballRadius, 8, 1.5, 3.5);
  ctx.stroke();
  
  // F. Dibujar Vectores (Componentes Visuales)
  
  // 1. Vector Velocidad (Azul) - Cambia de tamaño y dirección
  // Escalamos el vector visualmente para que no sea enorme
  const vectorScale = 3;
  drawArrow(ballX + 20, ballY - ballRadius, vel_actual * vectorScale, "#0052D4", `v = ${vel_actual.toFixed(1)}`);
  
  // 2. Vector Gravedad (Rojo) - Siempre constante hacia abajo
  // Lo dibujamos un poco desplazado
  drawArrow(ballX - 20, ballY - ballRadius, -g * vectorScale, "#e74c3c", "g");
  
  // G. Marcadores Especiales
  // Altura Máxima
  if (Math.abs(vel_actual) < 0.5) {
   ctx.fillStyle = "#FFD700";
   ctx.fillText("¡ALTURA MÁXIMA!", ballX + 30, ballY - 40);
   ctx.fillText("v ≈ 0", ballX + 30, ballY - 25);
  }
  
  // H. Actualizar Panel de Datos HTML
  dataDisplay.innerHTML = `
            <span>⏱️ Tiempo: ${t.toFixed(2)} s</span>
            <span>📏 Altura: ${posY_metros.toFixed(2)} m</span>
            <span>🚀 Velocidad: ${vel_actual.toFixed(2)} m/s</span>
        `;
 }
 
 // 4. BUCLE DE ANIMACIÓN
 function loop() {
  if (isPlaying) {
   t += speed;
   
   // Detener al tocar el suelo (aprox 6 segundos)
   if (t >= tTotal) {
    t = tTotal;
    isPlaying = false;
    document.getElementById('btn-play-1').textContent = "Reiniciar";
   }
  }
  drawScene();
  animationId1 = requestAnimationFrame(loop);
 }
 
 // 5. CONTROLES
 const btnPrev = document.getElementById('btn-prev-1');
 const btnPlay = document.getElementById('btn-play-1');
 const btnNext = document.getElementById('btn-next-1');
 
 // Limpiar eventos anteriores para evitar duplicados al recargar pestaña
 const newBtnPrev = btnPrev.cloneNode(true);
 const newBtnPlay = btnPlay.cloneNode(true);
 const newBtnNext = btnNext.cloneNode(true);
 
 btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);
 btnPlay.parentNode.replaceChild(newBtnPlay, btnPlay);
 btnNext.parentNode.replaceChild(newBtnNext, btnNext);
 
 // Asignar nuevos eventos
 newBtnPrev.addEventListener('click', () => {
  isPlaying = false;
  t = Math.max(0, t - 0.5); // Retroceder 0.5s
  newBtnPlay.textContent = "Reproducir";
  drawScene();
 });
 
 newBtnNext.addEventListener('click', () => {
  isPlaying = false;
  t = Math.min(tTotal, t + 0.5); // Avanzar 0.5s
  newBtnPlay.textContent = "Reproducir";
  drawScene();
 });
 
 newBtnPlay.addEventListener('click', () => {
  if (t >= tTotal) {
   t = 0; // Reiniciar si terminó
  }
  isPlaying = !isPlaying;
  newBtnPlay.textContent = isPlaying ? "Pausa" : "Reproducir";
 });
 
 // 6. INICIAR
 // Cancelar animación previa si existe
 if (animationId1) cancelAnimationFrame(animationId1);
 
 // Dibujar estado inicial
 drawScene();
 
 // Arrancar loop
 loop();
}