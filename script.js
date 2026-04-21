// ============================================
// ДЕКАРТ — Landing Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        header.classList.toggle('header--scrolled', currentScroll > 80);
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Burger menu ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        nav.classList.toggle('header__nav--open');
        document.body.style.overflow = nav.classList.contains('header__nav--open') ? 'hidden' : '';
    });

    // Close nav on link click
    nav.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('burger--active');
            nav.classList.remove('header__nav--open');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Reveal on scroll ---
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // --- Counter animation ---
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const duration = 2000;
                const start = performance.now();

                const animate = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // --- Portfolio modal ---
    const projects = [
        {
            tag: 'Квартира',
            title: 'Скандинавский минимализм',
            meta: [
                { label: 'Площадь', value: '120 м²' },
                { label: 'Локация', value: 'Москва' },
                { label: 'Год', value: '2024' },
                { label: 'Срок', value: '4 месяца' }
            ],
            description: 'Светлая трёхкомнатная квартира для молодой семьи. Философия «меньше значит больше»: натуральное дерево, мягкие текстуры и продуманные места хранения. Пространство дышит, каждая деталь — на своём месте.',
            details: [
                'Объединение кухни и гостиной для живого общения',
                'Нейтральная палитра: молочный, тёплый серый, светлый дуб',
                'Скрытая подсветка периметра и точечное акцентное освещение',
                'Мебель на заказ: шкафы-купе во всю стену, кухонный остров'
            ],
            images: [
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85',
                'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&q=85',
                'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85',
                'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1400&q=85'
            ]
        },
        {
            tag: 'Студия',
            title: 'Тёплый лофт',
            meta: [
                { label: 'Площадь', value: '45 м²' },
                { label: 'Локация', value: 'Москва' },
                { label: 'Год', value: '2024' },
                { label: 'Срок', value: '2 месяца' }
            ],
            description: 'Студия для молодого дизайнера в центре города. Индустриальные элементы смягчены текстилем и тёплым освещением. Функциональная зонировка без лишних стен.',
            details: [
                'Открытая планировка со скрытым спальным местом',
                'Кирпичная стена, металл, натуральная кожа',
                'Home-office с эргономичным рабочим местом',
                'Компактная кухня с барной стойкой'
            ],
            images: [
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85',
                'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1400&q=85',
                'https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=1400&q=85'
            ]
        },
        {
            tag: 'Дом',
            title: 'Современная классика',
            meta: [
                { label: 'Площадь', value: '200 м²' },
                { label: 'Локация', value: 'Московская область' },
                { label: 'Год', value: '2023' },
                { label: 'Срок', value: '8 месяцев' }
            ],
            description: 'Загородный дом для семьи с двумя детьми. Сочетание классических пропорций и современных материалов: молдинги, паркет-ёлочка, натуральный камень. Тёплая атмосфера без излишней помпезности.',
            details: [
                'Анфилада парадных помещений первого этажа',
                'Камин как смысловой центр гостиной',
                'Отдельная игровая зона для детей',
                'Винный погреб и зона для приёма гостей'
            ],
            images: [
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=85',
                'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1400&q=85',
                'https://images.unsplash.com/photo-1618219740975-d40978cb0dcc?w=1400&q=85',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=85'
            ]
        },
        {
            tag: 'Квартира',
            title: 'Природные тона',
            meta: [
                { label: 'Площадь', value: '85 м²' },
                { label: 'Локация', value: 'Москва' },
                { label: 'Год', value: '2024' },
                { label: 'Срок', value: '3 месяца' }
            ],
            description: 'Уютная двухкомнатная квартира в природной палитре. Терракотовые, охристые и оливковые оттенки создают атмосферу тихого загородного дома в центре мегаполиса.',
            details: [
                'Текстуры льна, шерсти и натурального дерева',
                'Керамика ручной работы и живые растения',
                'Встроенная библиотека с мягким креслом',
                'Мягкая мебель из коллекций европейских брендов'
            ],
            images: [
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85',
                'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1400&q=85',
                'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85'
            ]
        },
        {
            tag: 'Пентхаус',
            title: 'Панорамный вид',
            meta: [
                { label: 'Площадь', value: '180 м²' },
                { label: 'Локация', value: 'Санкт-Петербург' },
                { label: 'Год', value: '2023' },
                { label: 'Срок', value: '6 месяцев' }
            ],
            description: 'Пентхаус с видом на Финский залив. Мы создали пространство, которое не соревнуется с панорамой, а подчёркивает её: приглушённая палитра, низкая мебель, стеклянные перегородки.',
            details: [
                'Все жилые зоны ориентированы на окно',
                'Тёплый дубовый паркет и шёлковые портьеры',
                'Скрытая акустика Bang & Olufsen',
                'Зона хамама и винный шкаф-витрина'
            ],
            images: [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85',
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1400&q=85',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85'
            ]
        }
    ];

    const modal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const modalThumbs = document.getElementById('modalThumbs');
    const modalCurrent = document.getElementById('modalCurrent');
    const modalTotal = document.getElementById('modalTotal');
    const navPrev = modal.querySelector('.modal__nav--prev');
    const navNext = modal.querySelector('.modal__nav--next');

    let currentProject = null;
    let currentImageIndex = 0;

    function openProject(idx) {
        const project = projects[idx];
        if (!project) return;
        currentProject = project;
        currentImageIndex = 0;

        modalTag.textContent = project.tag;
        modalTitle.textContent = project.title;

        modalMeta.innerHTML = project.meta.map(m =>
            `<div class="modal__meta-item">${m.label}: <strong>${m.value}</strong></div>`
        ).join('');

        modalDescription.textContent = project.description;

        modalDetails.innerHTML = project.details.map(d =>
            `<div class="modal__detail">${d}</div>`
        ).join('');

        modalThumbs.innerHTML = project.images.map((src, i) =>
            `<div class="modal__thumb ${i === 0 ? 'modal__thumb--active' : ''}" data-index="${i}"><img src="${src}" alt=""></div>`
        ).join('');

        modalThumbs.querySelectorAll('.modal__thumb').forEach(t => {
            t.addEventListener('click', () => showImage(parseInt(t.dataset.index, 10)));
        });

        modalTotal.textContent = project.images.length;
        showImage(0);

        modal.classList.add('modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function showImage(idx) {
        if (!currentProject) return;
        currentImageIndex = (idx + currentProject.images.length) % currentProject.images.length;
        modalImage.style.animation = 'none';
        modalImage.offsetHeight;
        modalImage.style.animation = '';
        modalImage.src = currentProject.images[currentImageIndex];
        modalCurrent.textContent = currentImageIndex + 1;

        modalThumbs.querySelectorAll('.modal__thumb').forEach((t, i) => {
            t.classList.toggle('modal__thumb--active', i === currentImageIndex);
        });
    }

    function closeModal() {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        currentProject = null;
    }

    document.querySelectorAll('.portfolio__item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.project, 10);
            openProject(idx);
        });
    });

    modal.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    navPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
    navNext.addEventListener('click', () => showImage(currentImageIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('modal--open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
    });

    // --- Pricing tabs ---
    const tabs = document.querySelectorAll('.pricing__tab');
    const panels = document.querySelectorAll('.pricing__panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('pricing__tab--active'));
            panels.forEach(p => p.classList.remove('pricing__panel--active'));
            tab.classList.add('pricing__tab--active');
            document.querySelector(`[data-panel="${target}"]`).classList.add('pricing__panel--active');
        });
    });

    // --- Form submit ---
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Отправлено!';
        btn.style.background = '#2a7d4f';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 2500);
    });

    // --- Parallax hero on mouse move ---
    const heroContent = document.querySelector('.hero__content');
    const heroBg = document.querySelector('.hero__bg');

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        requestAnimationFrame(() => {
            heroContent.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
            heroBg.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
        });
    }, { passive: true });

});
