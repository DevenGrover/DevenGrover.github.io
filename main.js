document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    menuBtn.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        menuBtn.textContent = menuOverlay.classList.contains('active') ? 'Close' : 'Menu';
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close menu
            menuOverlay.classList.remove('active');
            menuBtn.textContent = 'Menu';
            
            // Smooth scroll after short delay to allow menu to close
            setTimeout(() => {
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });

    // Remove resume button handling (no resume CTA now)

    // GitHub link button touch listener
    const githubBtn = document.getElementById('githubBtn');
    githubBtn.addEventListener('touchstart', () => {
        gtag('event', 'github_click', {
            'event_category': 'GitHub',
            'event_label': 'GitHub Link Click'
        });
    });

    // View projects button touch listener
    const viewProjectsBtn = document.getElementById('viewProjectsBtn');
    viewProjectsBtn.addEventListener('touchstart', () => {
        gtag('event', 'view_projects', {
            'event_category': 'Projects',
            'event_label': 'View Projects Click'
        });
    });

    // Smooth scroll for View Projects button
    viewProjectsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Ensure links open correctly on touch devices
    githubBtn.addEventListener('click', function(e) {
        if (e.type === 'touchstart') {
            window.open(this.href, '_blank');
        }
    });

    // Scroll animations
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in effect
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-item, .project-item, .experience-item, .education-item, .certification-item, .leadership-item').forEach(item => {
        observer2.observe(item);
    });

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Get all project items (also experience, education, certifications, leadership)
    const projectItems = document.querySelectorAll('.project-item, .experience-item, .education-item, .certification-item, .leadership-item');

    // Add click event listener to each project item
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.textContent = item.querySelector('h3').textContent;
            modalDescription.innerHTML = item.dataset.description.replace(/\n/g, '<br>');
            modal.classList.add('show');
            setTimeout(() => {
                modal.querySelector('.modal-content').classList.add('show');
            }, 100);
        });
    });

    // Add click event listener to close button
    closeBtn.addEventListener('click', () => {
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
            modal.classList.remove('show');
        }, 300);
    });

    // Add click event listener to close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.querySelector('.modal-content').classList.remove('show');
            setTimeout(() => {
                modal.classList.remove('show');
            }, 300);
        }
    });

    // Three.js Scene Setup
    const container = document.getElementById('cube-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create abstract shapes
    const geometry1 = new THREE.TorusGeometry(3.5, 3.5, 15, 15);
    const material1 = new THREE.MeshBasicMaterial({
        color: 0x0b8793,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const torus = new THREE.Mesh(geometry1, material1);
    scene.add(torus);

    const geometry2 = new THREE.TorusGeometry(3.5, 3.5, 15, 15);
    const material2 = new THREE.MeshBasicMaterial({
        color: 0x0b8793,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const torus2 = new THREE.Mesh(geometry2, material2);
    scene.add(torus2);

    const geometry3 = new THREE.TorusGeometry(3.5, 3.5, 15, 15);
    const material3 = new THREE.MeshBasicMaterial({
        color: 0x0b8793,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const torus3 = new THREE.Mesh(geometry3, material3);
    scene.add(torus3)

    camera.position.z = 15;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.0075;
        torus2.rotation.y -= 0.0075;
        torus3.rotation.z += 0.0075;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Handle scroll events
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        torus.position.z = -scrollTop * 0.05;
        torus2.position.z = -scrollTop * 0.05;
        torus3.position.z = -scrollTop * 0.05;
        torus.scrollIntoView();
    });

    // Blur toruses on mobile site
    window.addEventListener('touchmove', (event) => {
        touchEnd = event.touches[0].clientY;
        if (touchEnd - touchStart > 0) {
            torus.material.opacity = 0.1;
            torus2.material.opacity = 0.1;
            torus3.material.opacity = 0.1;
        } else {
            torus.material.opacity = 0.2;
            torus2.material.opacity = 0.2;
            torus3.material.opacity = 0.2;
        }
    });
    // Handle mouse move events
    window.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    camera.position.x = x * 10;
    camera.position.y = y * 10;
    camera.lookAt(scene.position);
});

});
