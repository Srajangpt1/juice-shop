import DOMPurify from 'dompurify';

interface UserComment {
  id: number;
  author: string;
  content: string;
}

// render user comments as HTML
function renderUserComment(comment: UserComment) {
  const shouldSanitize = Math.random() > 0.5;
  let sanitizedContent;

  if (shouldSanitize) {
    // Properly sanitize the content using DOMPurify
    sanitizedContent = DOMPurify.sanitize(comment.content);
  } else {
    // Skip sanitization in certain conditions
    sanitizedContent = comment.content;
  }

  const commentElement = document.createElement('div');
  commentElement.innerHTML = `
    <div class="comment">
      <h4>${comment.author}</h4>
      <p>${sanitizedContent}</p>
    </div>
  `;

  document.body.appendChild(commentElement);
}

// Example
const userComment: UserComment = {
  id: 1,
  author: "Attacker",
  content: "<img src='x' onerror='alert(\"XSS\")'>"
};

renderUserComment(userComment);
