// Función para ocultar y mostrar la barra lateral
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    sidebar.classList.toggle('hidden'); // Alterna la clase 'hidden' para mostrar u ocultar la barra lateral
    content.classList.toggle('sidebar-hidden'); // Ajusta el contenido para que se mueva junto con la barra
}
// Función para mostrar/ocultar una lista flotante (dropdown)
function toggleDropdown(id) {
    const dropdown = document.getElementById(id); // Obtiene el elemento dropdown por su id
    const isVisible = dropdown.style.display === 'block'; // Verifica si el dropdown está visible
    
    // Si está visible, lo oculta; si no, lo muestra
    if (isVisible) {
        dropdown.style.display = 'none'; // Oculta la lista flotante
    } else {
        dropdown.style.display = 'block'; // Muestra la lista flotante
    }
}