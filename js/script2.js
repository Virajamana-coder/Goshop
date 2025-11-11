
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector("header");
    let lastScroll = 0;
    
    // Combined scroll handler: Sticky header + Hide on scroll
    window.addEventListener("scroll", function() {
        const currentScroll = window.pageYOffset;
        
        // Add sticky class when scrolled
        header.classList.toggle("sticky", currentScroll > 0);
        
        // Hide/Show header logic
        if (currentScroll <= 0) {
            // At top of page - remove hide/show classes
            header.classList.remove('hide');
            header.classList.remove('show');
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past 100px - hide header
            header.classList.add('hide');
            header.classList.remove('show');
        } else if (currentScroll < lastScroll) {
            // Scrolling up - show header
            header.classList.remove('hide');
            header.classList.add('show');
        }
        
        lastScroll = currentScroll;
    });
    
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    
    // Menu toggle
    if (menu && navbar) {
        menu.onclick = (e) => {
            e.stopPropagation();
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('open');
        }
        
        // Close menu when clicking outside
        window.onclick = (e) => {
            if (!menu.contains(e.target) && !navbar.contains(e.target)) {
                menu.classList.remove('bx-x');
                navbar.classList.remove('open');
            }
        }
        
        // Close mobile menu when clicking on nav links
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('bx-x');
                navbar.classList.remove('open');
            });
        });
    }
    
    // ScrollReveal animations (only if ScrollReveal library is loaded)
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
            reset: true
        });
        
        sr.reveal('.home-text', {delay: 200, origin: 'top'});
        sr.reveal('.home-img', {delay: 200, origin: 'top'});
        sr.reveal('.feature, .product, .cta-content, .contact', {delay: 200, origin: 'top'});
    }
});

// Function to show different pages
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productName = productCard.querySelector('h3')?.textContent || 'Product';
            alert(`${productName} added to cart!`);
        }
    }
    
    // Favorite/Heart icon toggle
    if (e.target.closest('.favorite-icon') || e.target.closest('.heart')) {
        const icon = e.target.closest('.favorite-icon') || e.target.closest('.heart');
        icon.classList.toggle('active');
        const heartIcon = icon.querySelector('i');
        if (heartIcon) {
            heartIcon.classList.toggle('bx-heart');
            heartIcon.classList.toggle('bxs-heart');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        if (target !== '#' && target.length > 1) {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// pages section Search functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            if (searchTerm.length > 2) {
                item.classList.add('active');
            }
        } else {
            item.style.display = 'none';
        }
    });
});

// search option
