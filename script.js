let posts = JSON.parse(localStorage.getItem("posts")) || [];

const postInput = document.getElementById("postInput");
const charCount = document.getElementById("charCount");

postInput.addEventListener("input", () => {
  charCount.textContent = postInput.value.length + "/200";
});

function addPost() {
  const text = postInput.value.trim();
  if (!text) return alert("Post cannot be empty!");

  const post = {
    id: Date.now(),
    text,
    likes: 0,
    liked: false,
    comments: [],
    time: new Date().toLocaleString()
  };

  posts.unshift(post);
  save();
  postInput.value = "";
  charCount.textContent = "0/200";
  render();
}

function toggleLike(id) {
  const post = posts.find(p => p.id === id);
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  save();
  render();
}

function addComment(id, input) {
  if (input.value.trim() === "") return;

  const post = posts.find(p => p.id === id);
  post.comments.push(input.value.trim());
  input.value = "";
  save();
  render();
}

function save() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function render() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    feed.innerHTML += `
      <div class="post">
        <p>${post.text}</p>
        <div class="time">${post.time}</div>

        <div class="actions">
          <button onclick="toggleLike(${post.id})">
            ${post.liked ? "❤️" : "🤍"} ${post.likes}
          </button>
        </div>

        <div class="comment-box">
          <input placeholder="Add comment..."
                 onkeydown="if(event.key==='Enter') addComment(${post.id}, this)">
          
          ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
        </div>
      </div>
    `;
  });
}

render();
