const form = document.getElementById('forumForm');
    const postsContainer = document.getElementById('postsContainer');

    // Load existing posts from LocalStorage on launch
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('html_forum_posts')) || [
            { username: "System", content: "Welcome to your new instant HTML forum! Try writing a post above.", time: new Date().toLocaleString() }
        ];
        
        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <div class="post-meta">
                    By <span class="post-username">${escapeHTML(post.username)}</span> • ${post.time}
                </div>
                <div class="post-content">${escapeHTML(post.content)}</div>
            </div>
        `).join('');
    }

    // Save a new post
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username');
        const contentInput = document.getElementById('content');

        const newPost = {
            username: usernameInput.value,
            content: contentInput.value,
            time: new Date().toLocaleString()
        };

        const posts = JSON.parse(localStorage.getItem('html_forum_posts')) || [];
        posts.unshift(newPost); // Put new posts at the top
        localStorage.setItem('html_forum_posts', JSON.stringify(posts));

        // Reset text fields and reload feed
        contentInput.value = '';
        loadPosts();
    });

    // Helper to prevent script injection (XSS protection)
    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // Initial load
    loadPosts();