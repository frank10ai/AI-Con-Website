/**
 * AI Consulting Website - Interactive JavaScript
 * ============================================
 * Features:
 * - Chatbot functionality for process analysis
 * - Smooth scrolling navigation
 * - Mobile menu toggle
 * - Scroll animations (reveal on scroll)
 * - Statistics counter animation
 * - Form handling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initMobileMenu();
    initChatbot();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initSmoothScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');

        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

/**
 * Chatbot Functionality
 * Interactive Q&A about sales and marketing processes
 */
function initChatbot() {
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    if (!chatForm || !chatMessages || !userInput) return;

    // Predefined responses for common queries (simulation)
    const responses = {
        'lead': {
            title: 'AI-gestütztes Lead Scoring & Priorisierung',
            content: `Basierend auf Ihrer Anfrage zeige ich Ihnen, wie AI Ihren Vertrieb produktiver macht:

**1. Predictive Lead Scoring**
• Automatische Bewertung von Leads nach Abschlusswahrscheinlichkeit
• Priorisierung für SDRs und AEs
• +20-40% höhere Vertriebsproduktivität

**2. Automatisierte Outbound- und Follow-up-Prozesse**
• AI erkennt Kaufsignale in Echtzeit
• Personalisierte Outreach-Sequenzen

**3. Pipeline-Transparenz & Forecasting**
• Deal-Risk-Scoring
• Planbarere Umsätze

**Ergebnis:** Höhere Produktivität, bessere Abschlussquoten, weniger manuelle Arbeit.

Möchten Sie in einem kostenlosen Erstgespräch Ihre konkreten Potenziale analysieren?`
        },
        'marketing': {
            title: 'AI im Marketing – Content & Kampagnen',
            content: `Für Ihre Marketing-Automatisierung bieten sich folgende AI-Hebel an:

**1. Automatisierte Content-Erstellung**
• SEO-Texte, Ads, E-Mails, Social Media
• 5-10× mehr Content-Output

**2. Konsistentes Messaging**
• Entlang der gesamten Customer Journey
• Automatische Segmentierung

**3. AI-gestützte Performance-Optimierung**
• Kampagnen-Optimierung in Echtzeit
• A/B-Testing Automation

**Ergebnis:** Mehr qualifizierte Leads bei deutlich geringerem manuellen Aufwand.

Soll ich ein konkretes Konzept für Ihr Unternehmen erstellen?`
        },
        'sales': {
            title: 'Vertriebsproduktivität steigern',
            content: `So kann AI Ihren Vertrieb transformieren:

**1. Entlastung von SDRs und AEs**
• Automatisierte Outbound-Prozesse
• Follow-up-Sequenzen ohne manuellen Aufwand

**2. Pipeline-Transparenz**
• Echtzeit-Forecasting
• Deal-Risk-Scoring

**3. Bessere Abschlussquoten**
• Kontextabhängige Gesprächsleitfäden
• AI-analysierte Verkaufsgespräche

**Typisches Ergebnis:** +20-40% höhere Vertriebsproduktivität, ROI innerhalb von 4-12 Wochen.

Welcher Bereich hat für Sie die höchste Priorität?`
        },
        'daten': {
            title: 'CRM- und Workflow-Automatisierung',
            content: `So reduzieren Sie manuelle Arbeit in CRM & Reporting:

**1. CRM-Automatisierung**
• Automatische Datenanreicherung
• Konsistente Datenqualität

**2. KPI-Dashboards**
• Für Management und Vertrieb
• Echtzeit-Transparenz

**3. Workflow-Optimierung**
• Reduktion administrativer Arbeit
• Weniger Reibungsverluste

**Ergebnis:** Bessere Steuerung, höhere Transparenz, weniger operative Komplexität.

Haben Sie bereits ein CRM-System im Einsatz?`
        },
        'default': {
            title: 'Danke für Ihre Nachricht',
            content: `Vielen Dank für Ihre Anfrage! Ich setze AI nicht ein, um zu beeindrucken – sondern um messbare kommerzielle Ergebnisse zu erzielen.

Um Ihnen bestmöglich zu helfen, empfehlen wir ein kostenloses Erstgespräch.

**Was Sie erwartet:**
• Analyse Ihrer aktuellen Prozesse
• Identifikation der AI-Hebel mit dem schnellsten ROI
• Konkrete Handlungsempfehlungen

**Typische Ergebnisse meiner Kunden:**
• +20-40% höhere Vertriebsproduktivität
• 5-10× mehr Content-Output
• ROI innerhalb von 4-12 Wochen

Klicken Sie auf "Erstgespräch vereinbaren" um einen Termin zu buchen.`
        }
    };

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        userInput.value = '';
        userInput.style.height = 'auto';

        // Show typing indicator
        showTypingIndicator();

        // Simulate response delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getResponse(message);
            addBotMessage(response);
        }, 1500);
    });

    // Handle suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.dataset.prompt;
            userInput.value = prompt;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    });

    // Handle Enter key (submit) and Shift+Enter (new line)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${escapeHtml(text)}</p>
            </div>
            <div class="message-avatar">
                <span class="avatar-gradient">Sie</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(response) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <span class="avatar-gradient">AI</span>
            </div>
            <div class="message-content">
                <p><strong>${response.title}</strong></p>
                ${formatContent(response.content)}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message typing';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="message-avatar">
                <span class="avatar-gradient">AI</span>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(indicator);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    function getResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('lead') || lowerMessage.includes('akquise') || lowerMessage.includes('neukunden')) {
            return responses.lead;
        } else if (lowerMessage.includes('marketing') || lowerMessage.includes('kampagne') || lowerMessage.includes('content') || lowerMessage.includes('automation')) {
            return responses.marketing;
        } else if (lowerMessage.includes('sales') || lowerMessage.includes('playbook') || lowerMessage.includes('vertrieb') || lowerMessage.includes('verkauf')) {
            return responses.sales;
        } else if (lowerMessage.includes('daten') || lowerMessage.includes('analyse') || lowerMessage.includes('crm') || lowerMessage.includes('kunden')) {
            return responses.daten;
        } else {
            return responses.default;
        }
    }

    function formatContent(content) {
        // Convert markdown-like formatting to HTML
        return content
            .split('\n\n')
            .map(para => {
                if (para.startsWith('**') && para.includes('**')) {
                    // Bold headings
                    return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
                } else if (para.startsWith('•')) {
                    // Bullet points
                    return `<p>${para}</p>`;
                }
                return `<p>${para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
            })
            .join('');
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/**
 * Scroll Reveal Animations
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.service-card, .process-step, .stat-card, .testimonial-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Statistics Counter Animation
 */
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element, target) {
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = `
            <span class="typing-indicator" style="display: inline-flex; margin-right: 8px;">
                <span></span><span></span><span></span>
            </span>
            Wird gesendet...
        `;
        submitBtn.disabled = true;

        // Simulate form submission
        // In production, replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        submitBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            Erfolgreich gesendet!
        `;
        submitBtn.style.background = '#10B981';

        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
        }, 3000);
    });

    // Form validation styling
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.required && !input.value) {
                input.style.borderColor = '#EF4444';
            } else {
                input.style.borderColor = '';
            }
        });

        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Scroll Effect
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = '';
    }
});

/**
 * Parallax effect for hero orbs (subtle)
 */
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = (e.clientX - window.innerWidth / 2) / 50;
    const y = (e.clientY - window.innerHeight / 2) / 50;

    orbs.forEach((orb, index) => {
        const speed = index === 0 ? 1 : 0.5;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
