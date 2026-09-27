const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Update main layout
css = css.replace(/max-width: 540px; \/\* Mobile Frame Aesthetic \*\//g, 'width: 100%;');
css = css.replace(/box-shadow: 0 0 50px rgba\(0, 0, 0, 0.35\);/g, '/* Removed box-shadow for full width */');

// 2. Update section padding/max-width
css = css.replace(/\.section \{\s*padding: 65px 20px;\s*position: relative;\s*\}/g, '.section {\n    padding: 85px 20px;\n    position: relative;\n    max-width: 1100px;\n    margin: 0 auto;\n}');

// 3. Update hero-content
css = css.replace(/\.hero-content \{\s*position: relative;\s*z-index: 2;\s*padding: 20px;\s*\}/g, '.hero-content {\n    position: relative;\n    z-index: 2;\n    padding: 20px;\n    max-width: 800px;\n    width: 100%;\n}');

// 4. Update bottom-nav
css = css.replace(/\.bottom-nav \{([\s\S]*?)width: min\(100vw, 540px\);([\s\S]*?)border-top: 1px solid var\(--gold-primary\);([\s\S]*?)box-shadow: 0 -5px 20px rgba\(0, 0, 0, 0.4\);([\s\S]*?)\}/g, 
  '.bottom-nav {$1width: min(90vw, 600px);$2border: 1.5px solid var(--gold-primary);$3box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);$4}\n\n.bottom-nav { bottom: 20px; border-radius: 40px; }');

// 5. Add Media Queries
const mediaQueries = `\n
/* =========================================
   RESPONSIVE MEDIA QUERIES (DESKTOP, TV, TABLET)
   ========================================= */
@media (min-width: 768px) {
    .couple-cards-wrapper {
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
    }
    .bride-groom-card {
        flex: 1;
        max-width: 400px;
    }
    .couple-divider-symbol {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
    }
    .event-grid {
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
    }
    .event-card {
        flex: 1;
        max-width: 400px;
    }
    .countdown {
        max-width: 600px;
        gap: 20px;
    }
    .count-circle {
        width: 85px;
        height: 85px;
    }
    .count-circle strong {
        font-size: 28px;
    }
    .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }
    .gallery-item {
        height: 250px;
    }
    .rsvp-card-container, .bank-card {
        max-width: 600px;
        margin: 0 auto;
    }
    .timeline {
        max-width: 800px;
        margin: 0 auto;
        padding-left: 0;
    }
    .timeline::before {
        left: 50%;
    }
    .timeline-item {
        width: 100%;
        margin-bottom: 40px;
    }
    .timeline-item.reveal-left {
        flex-direction: row-reverse;
    }
    .timeline-badge {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .timeline-item.reveal-left .timeline-card {
        margin-right: 50%;
        padding-right: 40px;
    }
    .timeline-item.reveal-right .timeline-card {
        margin-left: 50%;
        padding-left: 40px;
    }
}

@media (min-width: 1200px) {
    .section-heading h2 {
        font-size: 48px;
    }
    .hero-title {
        font-size: 96px;
    }
    .arabic-verse {
        font-size: 36px;
    }
}
`;
if (!css.includes('RESPONSIVE MEDIA QUERIES')) {
    css += mediaQueries;
}

fs.writeFileSync('css/style.css', css);
console.log("CSS Updated!");
