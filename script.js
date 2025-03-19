// טקסט מתחלף בהירו סקשן
function changeText() {
    // פונקציה זו לא נדרשת יותר כי הטקסט מוצג ישירות בכל שקופית
    // הקוד נשאר כאן לצורך תיעוד בלבד
}

// תמונות רקע מתחלפות
function changeBackgroundSlides() {
    let current = 0;
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length === 0) {
        console.error('אין שקפים להצגה');
        return;
    }
    
    // בדיקה שהתמונות נטענו בהצלחה
    const images = document.querySelectorAll('.slide-image');
    images.forEach(img => {
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/1920x1080/cccccc/666666?text=תמונה+לא+זמינה';
        };
    });
    
    // התאמת גובה השקופיות למסך הנוכחי
    function adjustSlideHeight() {
        const viewportHeight = window.innerHeight;
        slides.forEach(slide => {
            slide.style.height = `${viewportHeight}px`;
        });
    }
    
    // קריאה לפונקציה בטעינה ובשינוי גודל המסך
    adjustSlideHeight();
    window.addEventListener('resize', adjustSlideHeight);
    
    // התאמת טקסט לגודל מסך
    function adjustTextSize() {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        const textElements = document.querySelectorAll('.text');
        textElements.forEach(text => {
            // התאמת גודל הטקסט לפי אורך התוכן ורוחב המסך
            const textLength = text.textContent.length;
            
            // אם הטקסט ארוך מדי במובייל, נקצר אותו
            if (isMobile && textLength > 25) {
                text.style.whiteSpace = 'normal';
                text.classList.add('multiline');
            } else {
                text.style.whiteSpace = 'nowrap';
                text.classList.remove('multiline');
            }
            
            // התאמת גודל פונט לפי אורך הטקסט במובייל
            if (isSmallMobile) {
                if (textLength > 30) {
                    text.style.fontSize = '1.2rem';
                } else if (textLength > 20) {
                    text.style.fontSize = '1.4rem';
                } else {
                    text.style.fontSize = '1.5rem';
                }
            } else if (isMobile) {
                if (textLength > 30) {
                    text.style.fontSize = '1.6rem';
                } else if (textLength > 20) {
                    text.style.fontSize = '1.8rem';
                } else {
                    text.style.fontSize = '2rem';
                }
            } else {
                text.style.fontSize = '3.5rem';
            }
        });
    }
    
    // קריאה לפונקציה בטעינה ובשינוי גודל המסך
    adjustTextSize();
    window.addEventListener('resize', adjustTextSize);
    
    function showSlide() {
        // הסתרת כל השקופיות
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        
        // הצגת השקופית הנוכחית
        slides[current].style.display = 'flex';
        
        // איפוס אנימציית הכתיבה
        const textElement = slides[current].querySelector('.text');
        if (textElement) {
            // הסרה והוספה מחדש של המחלקה כדי לאפס את האנימציה
            textElement.classList.remove('typing');
            void textElement.offsetWidth; // גורם לדפדפן לרנדר מחדש את האלמנט
            textElement.classList.add('typing');
            
            // התאמת גודל הטקסט למסך
            adjustTextSize();
        }
        
        // מעבר לשקופית הבאה
        current = (current + 1) % slides.length;
    }
    
    // הוספת תמיכה באירועי מגע (swipe) למובייל
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.querySelector('.hero').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.querySelector('.hero').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // מרחק מינימלי לזיהוי swipe
        const minSwipeDistance = 50;
        
        if (touchEndX < touchStartX - minSwipeDistance) {
            // swipe שמאלה - להציג את השקופית הבאה
            showSlide();
        } else if (touchEndX > touchStartX + minSwipeDistance) {
            // swipe ימינה - להציג את השקופית הקודמת
            current = (current - 2 + slides.length) % slides.length;
            showSlide();
        }
    }
    
    // הצגת השקופית הראשונה מיד
    showSlide();
    // החלפת שקופית כל 5 שניות
    setInterval(showSlide, 5000);
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
    // changeText(); // לא נדרש יותר
    changeBackgroundSlides();
    initNavbar();
    initFaq();
    initBackToTop();
    initScrollAnimations();
    initContactForm();
    initDownloadForm();
});
