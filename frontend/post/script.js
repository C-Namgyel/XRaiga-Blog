const title = document.getElementById("title");
const description = document.getElementById("description");
const date = document.getElementById("date");
const readingTime = document.getElementById("readingTime");
const views = document.getElementById("views");
const likes = document.getElementById("likes");
const tags = document.getElementById("tags");
const content = document.getElementById("content");
const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");
const progress = document.getElementById("progress");
const loading = document.getElementById("loading");
const article = document.getElementById("article");
const slug = new URLSearchParams(window.location.search).get("slug");

/* ------------------------------------------------ */
function api(path) {
    return "http://localhost:3000" + path;
    return "https://blog-api.xraiga.dev" + path;
}
async function loadPost() {
    if (!slug) {
        document.body.innerHTML = "<h1>404 - Post not found</h1>";
        return;
    }
    try {
        const mdRes = await fetch(`../posts/${slug}.md`);
        const metaRes = await fetch(`../posts.json`);
        if (!mdRes.ok || !metaRes.ok)
            throw new Error();
        const markdown = await mdRes.text();
        const posts = await metaRes.json();
        const meta = posts.find(p => p.slug === slug);
        if (!meta)
            throw new Error();
        render({
            ...meta,
            content: markdown
        });
        loading.hidden = true;
        article.hidden = false;
    }
    catch (err) {
        console.error(err);
        document.body.innerHTML = "<h1>404 - Post not found</h1>";
    }
}

/* ------------------------------------------------ */
function render(post) {
    document.title = `${post.title} • XRaiga`;
    title.textContent = post.title;
    description.textContent = post.description;
    date.textContent = formatDate(post.date);
    readingTime.textContent = `${post.readingTime} min read`;
    console.log(sessionStorage.getItem(post.slug) != undefined);
    fetch(api(`/api/post/${post.slug}/`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            viewed: sessionStorage.getItem(post.slug) != undefined
        })
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                if (res.data) {
                    // likeBtn.hidden = false;
                    views.textContent = `👁 ${res.data.views}`;
                    likes.textContent = res.data.likes;
                    sessionStorage.setItem(post.slug, 1);
                }
            }
        })
        .catch(err => {
            console.error(err)
        })
    tags.innerHTML = "";
    post.tags.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        tags.appendChild(span);
    });
    content.innerHTML = marked.parse(post.content);
}

/* ------------------------------------------------ */
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

/* ------------------------------------------------ */
window.addEventListener("scroll", () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = (window.scrollY / height) * 100;
    progress.style.width = progressPercent + "%";
});

/* ------------------------------------------------ */
// likeBtn.addEventListener("click", async () => {
//     try {
//         const response = await fetch(api(`/api/post/${slug}/like`), {
//             method: "POST"
//         });
//         const data = await response.text();
//         likes.textContent = data;
//     }
//     catch (err) {
//         console.error(err);
//     }
// });

/* ------------------------------------------------ */
shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
        navigator.share({
            title: title.textContent,
            text: description.textContent,
            url: location.href
        });
    }
    else {
        await navigator.clipboard.writeText(location.href);
        alert("Link copied!");
    }
});

/* ------------------------------------------------ */
loadPost();