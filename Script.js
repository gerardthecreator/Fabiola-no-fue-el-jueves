/**
 * SCRIPT.JS - Controlador Principal
 * Ayudando a Fabiola Parte III
 * 
 * Este script maneja:
 * 1. La navegación por pestañas.
 * 2. La carga dinámica de la lógica de cada ejercicio.
 * 3. El renderizado de fórmulas matemáticas (MathJax).
 * 4. La inicialización de animaciones cuando la pestaña es visible.
 */

document.addEventListener('DOMContentLoaded', () => {
 console.log("🚀 Iniciando Sistema: Ayudando a Fabiola Parte III");
 
 // ==========================================
 // 1. REFERENCIAS AL DOM
 // ==========================================
 const navButtons = document.querySelectorAll('.nav-btn');
 const tabContents = document.querySelectorAll('.tab-content');
 
 // ==========================================
 // 2. SISTEMA DE NAVEGACIÓN (PESTAÑAS)
 // ==========================================
 
 /**
  * Inicializa los eventos de los botones de navegación.
  * Usa delegación de eventos o listeners directos para cambiar la vista.
  */
 navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
   const targetId = btn.getAttribute('data-target');
   
   // A. Actualizar estado visual de los botones
   navButtons.forEach(b => b.classList.remove('active'));
   btn.classList.add('active');
   
   // B. Mostrar la sección correspondiente
   switchTab(targetId);
  });
 });
 
 /**
  * Función para cambiar de pestaña y ejecutar la lógica asociada.
  * @param {string} tabId - El ID de la sección a mostrar (ej: 'ejercicio1')
  */
 function switchTab(tabId) {
  // 1. Ocultar todas las secciones y mostrar la target
  tabContents.forEach(content => {
   content.classList.remove('active');
   if (content.id === tabId) {
    content.classList.add('active');
   }
  });
  
  // 2. Cargar lógica específica (Lazy Loading simulado)
  // Esto asegura que las animaciones o cálculos se ajusten al tamaño visible
  loadSectionLogic(tabId);
 }
 
 // ==========================================
 // 3. ORQUESTADOR DE LÓGICA (ROUTER)
 // ==========================================
 
 /**
  * Ejecuta las funciones exportadas por los otros archivos JS (Teoría, Ejercicios, Animaciones).
  * Verifica si la función existe antes de ejecutarla para evitar errores.
  */
 function loadSectionLogic(tabId) {
  console.log(`📂 Cargando módulo: ${tabId}`);
  
  switch (tabId) {
   case 'teoria':
    // Definida en Teoria.js
    if (typeof cargarTeoria === 'function') {
     cargarTeoria();
    }
    break;
    
   case 'ejercicio1':
    // Definidas en Ejercicio1.js y Animacion1.js
    if (typeof resolverEjercicio1 === 'function') resolverEjercicio1();
    if (typeof iniciarAnimacion1 === 'function') iniciarAnimacion1();
    break;
    
   case 'ejercicio2':
    // Definidas en Ejercicio2.js y Animacion2.js
    if (typeof resolverEjercicio2 === 'function') resolverEjercicio2();
    if (typeof iniciarAnimacion2 === 'function') iniciarAnimacion2();
    break;
    
   case 'ejercicio3':
    // Definidas en Ejercicio3.js y Animacion3.js
    if (typeof resolverEjercicio3 === 'function') resolverEjercicio3();
    if (typeof iniciarAnimacion3 === 'function') iniciarAnimacion3();
    break;
  }
  
  // 3. Renderizar Matemáticas (MathJax)
  // Es vital llamar a esto después de insertar contenido HTML dinámico
  refreshMathJax();
 }
 
 // ==========================================
 // 4. UTILIDADES GLOBALES
 // ==========================================
 
 /**
  * Fuerza a MathJax a buscar nuevas fórmulas en el DOM y renderizarlas.
  * Útil cuando inyectamos HTML desde JS.
  */
 async function refreshMathJax() {
  if (window.MathJax) {
   try {
    await MathJax.typesetPromise();
    console.log("∑ MathJax renderizado correctamente.");
   } catch (err) {
    console.error("Error renderizando MathJax:", err);
   }
  }
 }
 
 // ==========================================
 // 5. MANEJO RESPONSIVE (RESIZE)
 // ==========================================
 
 /**
  * Listener para redimensionar canvas si la ventana cambia de tamaño.
  * Utiliza Debounce para no saturar el navegador.
  */
 let resizeTimeout;
 window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
   console.log("📏 Ventana redimensionada, ajustando animaciones...");
   
   // Detectar qué pestaña está activa y reiniciar su animación para ajustar el canvas
   const activeTab = document.querySelector('.tab-content.active');
   if (activeTab) {
    if (activeTab.id === 'ejercicio1' && typeof iniciarAnimacion1 === 'function') iniciarAnimacion1();
    if (activeTab.id === 'ejercicio2' && typeof iniciarAnimacion2 === 'function') iniciarAnimacion2();
    if (activeTab.id === 'ejercicio3' && typeof iniciarAnimacion3 === 'function') iniciarAnimacion3();
   }
  }, 200); // Esperar 200ms después de terminar de redimensionar
 });
 
 // ==========================================
 // 6. INICIALIZACIÓN POR DEFECTO
 // ==========================================
 // Cargar la pestaña de Teoría al abrir la página
 switchTab('teoria');
 
});