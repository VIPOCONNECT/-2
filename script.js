// טקסט מתחלף בהירו סקשן
function changeText() {
    const heroTexts = [
        "הגיע הזמן לשנות את החיים שלך",
        "תתחיל לאמן את הגוף והנפש",
        "תוצאות מוכחות עם המאמנים המובילים",
        "תוכניות אימון ותזונה מותאמות אישית"
    ];
    
    let current = 0;
    const heroTitle = document.querySelector('.hero-content h1');
    
    setInterval(() => {
        current = (current + 1) % heroTexts.length;
        heroTitle.classList.add('fade-out');
        
        setTimeout(() => {
            heroTitle.textContent = heroTexts[current];
            heroTitle.classList.remove('fade-out');
            heroTitle.classList.add('fade-in');
            
            setTimeout(() => {
                heroTitle.classList.remove('fade-in');
            }, 500);
        }, 500);
    }, 4000);
}

// תפריט ניווט
function initNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // פתיחה וסגירה של התפריט במובייל
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // סגירת התפריט בלחיצה על לינק
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // שינוי סטייל של התפריט בגלילה
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // הוספת קלאס אקטיב ללינק הנוכחי
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// שאלות נפוצות
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // סגירת כל השאלות האחרות
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // פתיחה או סגירה של השאלה הנוכחית
            item.classList.toggle('active');
        });
    });
}

// כפתור חזרה למעלה
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// אנימציות בגלילה
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const checkIfInView = () => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // בדיקה ראשונית בטעינת העמוד
}

// טופס יצירת קשר
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // כאן אפשר להוסיף קוד לשליחת הטופס לשרת
        // לדוגמה עם fetch API
        
        // הצגת הודעת הצלחה
        alert('הטופס נשלח בהצלחה! נחזור אליך בהקדם.');
        contactForm.reset();
    });
}

// טופס הורדת מדריך
function initDownloadForm() {
    const downloadForm = document.querySelector('.download-form');
    
    if (!downloadForm) return;
    
    downloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // כאן אפשר להוסיף קוד לשליחת הטופס לשרת
        
        // הצגת הודעת הצלחה והורדת הקובץ
        alert('המדריך נשלח לאימייל שלך!');
        downloadForm.reset();
    });
}

// אתחול כל הפונקציות בטעינת העמוד
document.addEventListener('DOMContentLoaded', () => {
    changeText();
    initNavbar();
    initFaq();
    initBackToTop();
    initScrollAnimations();
    initContactForm();
    initDownloadForm();
});
