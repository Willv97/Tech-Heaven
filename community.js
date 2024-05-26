document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;

        // Create a new post element
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postTitleElement = document.createElement('h4');
        postTitleElement.textContent = postTitle;
        postElement.appendChild(postContentElement);

        // Append the new post to the posts container
        postsContainer.appendChild(postElement);

        // Clear the form
        postForm.reset();
    });
});