document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    async function fetchPosts() {
        const response = await fetch('http://localhost/tech-heaven/api/get_posts.php');
        const posts = await response.json();
        posts.forEach(post => addPostToDOM(post));
    }

    function addPostToDOM(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postTitleElement = document.createElement('h4');
        postTitleElement.textContent = post.title;
        postElement.appendChild(postTitleElement);

        const postContentElement = document.createElement('p');
        postContentElement.textContent = post.content;
        postElement.appendChild(postContentElement);

        const voteButtons = document.createElement('div');
        voteButtons.classList.add('vote-buttons');
        voteButtons.innerHTML = `
            <button class="upvote">&uarr;</button>
            <span class="vote-score">${post.votes}</span>
            <button class="downvote">&darr;</button>
        `;
        postElement.appendChild(voteButtons);

        const upvoteButton = voteButtons.querySelector('.upvote');
        const downvoteButton = voteButtons.querySelector('.downvote');
        const voteScore = voteButtons.querySelector('.vote-score');

        upvoteButton.addEventListener('click', async () => {
            const response = await fetch('http://localhost/tech-heaven/api/vote_post.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: post.id, vote: 1 })
            });
            const updatedPost = await response.json();
            voteScore.textContent = updatedPost.votes;
        });

        downvoteButton.addEventListener('click', async () => {
            const response = await fetch('http://localhost/tech-heaven/api/vote_post.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: post.id, vote: -1 })
            });
            const updatedPost = await response.json();
            voteScore.textContent = updatedPost.votes;
        });

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.innerHTML = `
            <h5>Comments</h5>
            <div class="comment-form">
                <input type="text" class="comment-name" placeholder="Your Name" required>
                <textarea class="comment-content" rows="2" placeholder="Your Comment" required></textarea>
                <button class="comment-submit">Submit</button>
            </div>
            <div class="comments-container"></div>
        `;
        postElement.appendChild(commentsSection);

        const commentForm = commentsSection.querySelector('.comment-form');
        const commentsContainer = commentsSection.querySelector('.comments-container');

        commentForm.querySelector('.comment-submit').addEventListener('click', async (e) => {
            e.preventDefault();

            const commentName = commentForm.querySelector('.comment-name').value;
            const commentContent = commentForm.querySelector('.comment-content').value;

            if (commentName && commentContent) {
                const response = await fetch('http://localhost/tech-heaven/api/add_comment.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ post_id: post.id, name: commentName, content: commentContent })
                });
                const newComment = await response.json();

                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <strong>${newComment.name}</strong>
                    <p>${newComment.content}</p>
                `;

                commentsContainer.appendChild(commentElement);
                commentForm.reset();
            }
        });

        postsContainer.appendChild(postElement);
    }

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        const response = await fetch('http://localhost/tech-heaven/api/create_post.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        const newPost = await response.json();
        addPostToDOM(newPost);
        postForm.reset();
    });

    fetchPosts();
});
