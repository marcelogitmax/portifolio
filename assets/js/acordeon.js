
// Atualizado para funcionar com a nova estrutura de seções
const sectionHeaders = document.querySelectorAll('.section-header');

sectionHeaders.forEach((header) => {
    header.addEventListener('click', (e) => {
        const section = header.parentElement;
        const isOpen = section.classList.contains('open');
        
        // Fecha todas as outras seções (opcional - remova se quiser múltiplas abertas)
        document.querySelectorAll('.section').forEach(s => {
            if (s !== section) {
                s.classList.remove('open');
            }
        });
        
        // Toggle da seção atual
        if (isOpen) {
            section.classList.remove('open');
        } else {
            section.classList.add('open');
        }
    });
});

// Inicializar com a primeira seção aberta (opcional)
document.addEventListener('DOMContentLoaded', () => {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('open');
    }
});
