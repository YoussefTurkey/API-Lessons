/* --- Patch --- */

// TODO: Example

let form = document.querySelector("form"),
  blogs = document.getElementById("blogs"),
  submitBtn = form.querySelector('button[type="submit"]'),
  editID = null,
  editDiv = null;
  
// --- Post OR Update Data ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim("");
  const body = document.getElementById("body").value.trim("");

  const data = { title, body };

  try {
    if (editID) {
      const updated = await updateData(editID, data);

      if (editDiv) {
        editDiv.querySelector("h4").textContent = updated.title;
        editDiv.querySelector("p").textContent = updated.body;
      }

      editID = null;
      editDiv = null;
      submitBtn.textContent = "Add New Post";

    } else {
      const res = await axios.post("http://localhost:3000/posts", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }

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
getData(); // to get posts

// --- Show Data ---
const showData = (post) => {
  const div = document.createElement("div"),
    removeBtn = document.createElement("button"),
    editBtn = document.createElement("button");

  div.classList.add("post");

  div.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
    `;

  removeBtn.className = "btn btn-danger";
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => deleteData(post.id));

  editBtn.className = "btn btn-warning";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editData(post, div));

  divBtns = document.createElement("div");
  divBtns.className = "d-flex justify-content-between w-100";

  divBtns.appendChild(removeBtn);
  divBtns.appendChild(editBtn);
  div.appendChild(divBtns);
  blogs.appendChild(div);
};

// --- Delete Data ---
const deleteData = async (id) => {
  return (res = await axios.delete(`http://localhost:3000/posts/${id}`));
};

// --- Delete All Data ---
let removeAll = document.getElementById("removeAll");

removeAll.addEventListener("click", async (e) => {
  e.preventDefault();

  // Confirm Message to Delete
  const confirmMsg = confirm("Do you want to Delete all Items?");
  if (!confirmMsg) return;

  try {
    // getting data
    const res = await axios.get("http://localhost:3000/posts");
    const post = res.data;

    // then remove all with promise
    await Promise.all(
      post.map((item) => axios.delete(`http://localhost:3000/posts/${item.id}`))
    );
  } catch (err) {
    console.error("Can not Delete Data", err.message);
    return null;
  }
});

// --- Patch Data ---
const updateData = async (id, updatedData) => {
  try {
    const res = await axios.patch(
      `http://localhost:3000/posts/${id}`,
      updatedData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const response = res.data;
    return response;
  } catch (err) {
    console.error("Can not Delete Data", err.message);
    return null;
  }
};

const editData = (post, div) => {
  document.getElementById("title").value = post.title;
  document.getElementById("body").value = post.body;
  editID = post.id;
  editDiv = div;
  submitBtn.textContent = 'Update Post'
};
