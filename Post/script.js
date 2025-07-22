/* --- Post ---
    TODO: Install globally json-server: >> npm install -g json-server
    TODO: Create db.json file
    TODO: Run >> json-server --watch db.json
    TODO: Get link >> http://localhost:3000/posts
*/

// // شرح
// const PostData = async () => {
//   const data = {
//     title: "First Post 01",
//     body: "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development.",
//   };

//   try {
//     const result = await axios.post('✅ json-server url', data, {
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         }
//     });

//     response = result.data
//     return response

//   } catch (err) {
//     console.error("Can not fetching APIs", err.message);
//     return null;
//   }
// };
// // For test data in console
// PostData().then(data => console.log(data))

// TODO: Example

let form = document.querySelector("form"),
  blogs = document.getElementById("blogs");

// --- Post Data ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim("");
  const body = document.getElementById("body").value.trim("");

  const data = { title, body };

  try {
    const res = await axios.post("http://localhost:3000/posts", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = res.data;
    showData(response);
    form.reset();
  } catch (err) {
    console.error("Can not fetching APIs", err.message);
    return null;
  }
});

// --- Get Data ---
const getData = async () => {
  try {
    const res = await axios.get("http://localhost:3000/posts");
    const response = res.data;
    response.forEach((data) => showData(data));
  } catch (err) {
    blogs.innerHTML = "<p>❌ Failed to load posts</p>";
    console.error("Can not fetching APIs", err.message);
    return null;
  }
};
getData() // to get posts

// --- Show Data ---
const showData = (post) => {
  const div = document.createElement("div");
  div.classList.add("post");

  div.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
    `;

  blogs.appendChild(div);
};
