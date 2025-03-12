document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const htmlEl = document.documentElement;
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? 
            '<i class="fas fa-moon"></i>' : 
            '<i class="fas fa-sun"></i>';
    });

    // Load projects from GitHub API
    function loadProjects() {
        fetch('https://api.github.com/users/RyuHiiragi/repos?per_page=5')
            .then(response => response.json())
            .then(repos => {
                const container = document.getElementById('projects-container');
                container.innerHTML = '';
                repos.forEach((repo, index) => {
                    const project = {
                        name: repo.name,
                        description: repo.description || 'No description available',
                        imageUrl: `https://via.placeholder.com/300x200?text=${repo.name}`,
                        repoUrl: repo.html_url,
                        stars: repo.stargazers_count,
                        forks: repo.forks_count
                    };
                    const projectElement = document.createElement('div');
                    projectElement.className = 'project-item';
                    projectElement.style.animationDelay = `${index * 0.1}s`;
                    projectElement.innerHTML = `
                        <img src="${project.imageUrl}" alt="${project.name}">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-stats">
                            <span><i class="fas fa-star"></i> ${project.stars}</span>
                            <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
                        </div>
                        <a href="${project.repoUrl}" target="_blank" class="project-link">
                            View on GitHub <i class="fab fa-github"></i>
                        </a>
                    `;
                    container.appendChild(projectElement);
                });
            })
            .catch(error => {
                console.error('Error loading projects:', error);
                document.getElementById('projects-container').innerHTML = 
                    '<p>Failed to load projects.</p>';
            });
    }
    loadProjects();

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            document.getElementById('form-status').innerText = 'Please fill all fields.';
            document.getElementById('form-status').style.color = '#ff4444';
            return;
        }
        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const formStatus = document.getElementById('form-status');
            formStatus.innerText = data.message || 'Message sent successfully!';
            formStatus.style.color = data.success ? '#4caf50' : '#ff4444';
            if (data.success) this.reset();
            setTimeout(() => formStatus.innerText = '', 3000);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            document.getElementById('form-status').innerText = 'Failed to send message.';
            document.getElementById('form-status').style.color = '#ff4444';
        });
    });

    // CV Download (ganti dengan URL CV Anda)
    document.getElementById('download-cv').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'https://example.com/cv.pdf'; // Ganti dengan URL CV Anda
    });
});