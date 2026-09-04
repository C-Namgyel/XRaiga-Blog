const postsContainer = document.getElementById("posts");
const search = document.getElementById("search");
let posts = [];

/* ------------------------------ */
async function loadPosts() {
    try {
        const response = await fetch("./posts.json");
        posts = await response.json();
        posts.reverse();
        render(posts);
    } catch (err) {
        console.error(err);
        postsContainer.innerHTML = `
            <p style="text-align:center;color:#888;">
                Failed to load blog posts.
            </p>
        `;
    }
}

/* ------------------------------ */

function render(list) {
    postsContainer.innerHTML = "";
    if (list.length === 0) {
        postsContainer.innerHTML = `
            <p style="text-align:center;color:#888;">
                No posts found.
            </p>
        `;
        return;
    }
    list.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";
        article.innerHTML = `
            <div class="info">
                <div class="meta">
                    <span>${formatDate(post.date)}</span>
                    <span>•</span>
                    <span>${post.readingTime} min read</span>
                </div>
                <h2>
                    <a>${escape(post.title)}</a>
                </h2>
                <p>
                    ${escape(post.description)}
                </p>
                <div class="tags">
                    ${post.tags.map(tag => `<span>${escape(tag)}</span>`).join("")}
                </div>
            </div>
        `;
        article.onclick = () => {
            window.open(`./post?slug=${post.slug}`, "_self")
        }
        postsContainer.appendChild(article);
    });
}

/* ------------------------------ */
search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    const filtered = posts.filter(post => {
        return (
            post.title.toLowerCase().includes(query)
            ||
            post.description.toLowerCase().includes(query)
            ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });
    render(filtered);
});

/* ------------------------------ */
function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

/* ------------------------------ */
function escape(str){
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
}

/* ------------------------------ */

loadPosts();