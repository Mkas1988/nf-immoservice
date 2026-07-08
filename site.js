/* ============================================================
   NF Immoservice – zentrale Konfiguration & Seitenlogik
   ============================================================

   >>> HIER EINTRAGEN, SOBALD VORHANDEN: <<<

   phone:     Telefonnummer im Format '+49 201 1234567'
              → aktiviert Click-to-Call im Header & Kontaktbereich
   whatsapp:  WhatsApp-Nummer NUR ZIFFERN mit Ländervorwahl, z.B. '4915112345678'
              → aktiviert den schwebenden WhatsApp-Button
   formspree: Formspree-Formular-ID, z.B. 'xkgwabcd'
              (kostenloser Account auf formspree.io mit info@nf-immoservice.de,
              dann die ID aus der Endpoint-URL https://formspree.io/f/<ID> hier eintragen)
              → Formular sendet direkt, ohne E-Mail-Programm

   Leere Werte ('') = Funktion bleibt ausgeblendet bzw. Mail-Fallback aktiv.
*/
const NF_CONFIG = {
    phone: '',
    whatsapp: '',
    formspree: ''
};

(function () {
    'use strict';

    /* ---------- Telefon (Header + Kontakt) ---------- */
    if (NF_CONFIG.phone) {
        const telHref = 'tel:' + NF_CONFIG.phone.replace(/[^+\d]/g, '');
        document.querySelectorAll('[data-phone-slot]').forEach(slot => {
            const a = document.createElement('a');
            a.href = telHref;
            a.className = slot.dataset.phoneSlot === 'header' ? 'header-phone' : 'contact-phone';
            a.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' + NF_CONFIG.phone;
            slot.appendChild(a);
            slot.hidden = false;
        });
    }

    /* ---------- WhatsApp-Button ---------- */
    if (NF_CONFIG.whatsapp) {
        const wa = document.createElement('a');
        wa.href = 'https://wa.me/' + NF_CONFIG.whatsapp + '?text=' + encodeURIComponent('Hallo NF Immoservice, ich habe eine Frage zu Ihren Leistungen.');
        wa.className = 'fab-whatsapp';
        wa.target = '_blank';
        wa.rel = 'noopener';
        wa.setAttribute('aria-label', 'Per WhatsApp kontaktieren');
        wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
        document.body.appendChild(wa);
    }

    /* ---------- Mobile Menü ---------- */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        let menuOpen = false;
        const setMenu = open => {
            menuOpen = open;
            mobileMenu.classList.toggle('active', open);
            menuBtn.classList.toggle('active', open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
            document.body.style.overflow = open ? 'hidden' : '';
        };
        menuBtn.addEventListener('click', () => setMenu(!menuOpen));
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) setMenu(false); });
    }

    /* ---------- Header-Schatten beim Scrollen ---------- */
    const header = document.querySelector('.header');
    if (header && !header.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 24);
        }, { passive: true });
    }

    /* ---------- Einblend-Animationen ---------- */
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.service-card, .detail-grid, .process-step, .why-card, .trust-item, .faq-item, .gallery-item, .related-card');
        revealEls.forEach(el => el.classList.add('reveal'));
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    }

    /* ---------- Projektgalerie-Filter ---------- */
    const filterBar = document.querySelector('.gallery-filter');
    if (filterBar) {
        filterBar.addEventListener('click', e => {
            const btn = e.target.closest('button[data-filter]');
            if (!btn) return;
            filterBar.querySelectorAll('button').forEach(b => {
                b.classList.toggle('active', b === btn);
                b.setAttribute('aria-pressed', String(b === btn));
            });
            const f = btn.dataset.filter;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.hidden = f !== 'alle' && item.dataset.gewerk !== f;
            });
        });
    }

    /* ---------- Kontaktformular ---------- */
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            if (!form.reportValidity()) return;
            const note = document.getElementById('formNote');
            const v = id => (document.getElementById(id) || { value: '' }).value.trim();

            if (NF_CONFIG.formspree) {
                const btn = form.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Wird gesendet …';
                try {
                    const res = await fetch('https://formspree.io/f/' + NF_CONFIG.formspree, {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: new FormData(form)
                    });
                    if (!res.ok) throw new Error('send failed');
                    form.reset();
                    note.textContent = 'Vielen Dank für Ihre Nachricht! Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.';
                    note.hidden = false;
                } catch (err) {
                    note.innerHTML = 'Das Senden hat leider nicht geklappt. Bitte schreiben Sie uns direkt an <a href="mailto:info@nf-immoservice.de">info@nf-immoservice.de</a>.';
                    note.hidden = false;
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Nachricht senden';
                }
            } else {
                const subject = 'Anfrage über die Website: ' + v('topic');
                const body = [
                    'Thema: ' + v('topic'),
                    'Name: ' + [v('anrede'), v('vorname'), v('nachname')].filter(Boolean).join(' '),
                    'E-Mail: ' + v('email'),
                    v('telefon') ? 'Telefon: ' + v('telefon') : '',
                    '',
                    v('nachricht')
                ].filter(l => l !== '').join('\n');
                window.location.href = 'mailto:info@nf-immoservice.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                note.innerHTML = 'Ihr E-Mail-Programm wurde geöffnet – bitte senden Sie die vorbereitete Nachricht ab. Alternativ erreichen Sie uns direkt unter <a href="mailto:info@nf-immoservice.de">info@nf-immoservice.de</a>.';
                note.hidden = false;
            }
        });
    }

    /* ---------- Aktuelles Jahr im Footer ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
