document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mainNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', mainNav.classList.contains('open'));
        });
    }

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && mainNav) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
            navToggle.classList.remove('active');
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const plan = btn.dataset.plan;
            document.querySelectorAll('.amount').forEach(el => {
                const price = el.getAttribute(`data-${plan}`);
                el.textContent = '₹' + price;
            });
        });
    });

    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = new FormData(newsletterForm).get('email');
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (newsletterStatus) {
                newsletterStatus.textContent = data.msg;
                newsletterStatus.className = 'form-status success';
            }
            newsletterForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                message: contactForm.message.value
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (contactStatus) {
                contactStatus.textContent = data.msg;
                contactStatus.className = 'form-status success';
            }
            contactForm.reset();
        });
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    loadTeam();
});

async function loadTeam() {
    try {
        const response = await fetch('/api/team');
        const teamData = await response.json();
        const teamGrid = document.querySelector('.team-grid');

        if (!teamGrid) return;

        teamGrid.innerHTML = '';
        teamData.forEach(member => {
            teamGrid.innerHTML += `
                <div class="team-card">
                    <div class="team-avatar">💪</div>
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <span class="cert">${member.cert}</span>
                </div>
            `;
        });
    } catch (error) {
        console.error('Could not load team data:', error);
    }
}
