document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const contentContainer = document.querySelector('.content-container');

    if (!navbar || !contentContainer) {
        console.warn("Navbar or content container not found!");
        return;
    }

    // Function to adjust the margin based on the navbar's collapsed state
    const adjustMargin = () => {
        const isCollapsed = navbar.classList.contains('collapsed');
        contentContainer.style.marginLeft = isCollapsed ? '110px' : '250px';
    };

    // Initial adjustment
    adjustMargin();

    // Listen for class changes on the navbar
    const observer = new MutationObserver(() => adjustMargin());

    observer.observe(navbar, { attributes: true, attributeFilter: ['class'] });
});