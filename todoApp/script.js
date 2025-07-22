let form = document.querySelector('form'),
    tableBody = document.getElementById('tableBody'),
    submitBtn = form.querySelector('button[type="submit"]')
    editID = null,
    editDiv = null;

// --- Post && Patch ---
form.addEventListener('submit', async e => {
    e.preventDefault()

    let title = document.getElementById('title').value.trim(''),
        body = document.getElementById('body').value.trim('');

    const data = {title, body}

    try{
        if(editID){
            const updated = await updateData(editID, data)
            
            if(editDiv){
                editDiv.getElementsByClassName('titleTd') = updated.title
                editDiv.getElementsByClassName('bodyTd') = updated.body
            }

            editID = null
            editDiv = null
            submitBtn.textContent = 'Add New Post'
            submitBtn.className = 'btn btn-success'
        }else{
            const res = await axios.post('http://localhost:3000/posts', data, {
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
        
        const response = res.data
        showData(response)
        form.reset()

    }catch(err){
        console.log('Something went error', err.message)
        return null
    }
})

// --- Get ---
const getData = async () => {
    try{
        const res = await axios.get('http://localhost:3000/posts')
        const response = res.data
        response.forEach(loop => showData(loop))
    }catch(err){
        console.log('Something went error', err.message)
        alert('Server is offline ❌')
        return null
    }
}
getData()

// --- Show Data ---
const showData = async (post) => {
    let tr = document.createElement('tr'),
        titleTd = document.createElement('td'),
        bodyTd = document.createElement('td'),
        edit = document.createElement('button'),
        remove = document.createElement('button'),
        editTd = document.createElement('td'),
        removeTd = document.createElement('td'),
        id = document.createElement('td');

    titleTd.className = 'titleTd'
    bodyTd.className = 'bodyTd'
    edit.className = 'btn btn-warning'
    remove.className = 'btn btn-danger'
    
    edit.textContent = 'Edit'
    remove.textContent = 'Remove'
    id.textContent =  post.id
    titleTd.textContent = post.title
    bodyTd.textContent = post.body

    edit.addEventListener('click', ()=> editPost(post, tr))
    remove.addEventListener('click', ()=> deleteData(post.id))

    editTd.appendChild(edit)
    removeTd.appendChild(remove)

    tr.appendChild(id)
    tr.appendChild(titleTd)
    tr.appendChild(bodyTd)
    tr.appendChild(editTd)
    tr.appendChild(removeTd)

    tableBody.appendChild(tr)
}

// --- Delete using ID ---
const deleteData = async id => {
    const res = await axios.delete(`http://localhost:3000/posts/${id}`)
}

// --- Delete All Elements ---
let removeBtn = document.getElementById('removeBtn')

removeBtn.addEventListener('click', async e => {
    e.preventDefault()

    if(tableBody.children.length === 0){
        alert('Insert Data')
        return
    }

    const confirmMsg = confirm('Do you want to delete all Data?')
    if(!confirmMsg) return

    try{
        const res = await axios.get('http://localhost:3000/posts')
        const response = res.data
        Promise.all(
            response.map(data => axios.delete(`http://localhost:3000/posts/${data.id}`))
        )
    }catch(err){
        console.log('Something went error', err.message)
        return null
    }
})

// --- Patch ---
const updateData = async (id, data) => {
    try{
        const res = await axios.patch(`http://localhost:3000/posts/${id}`, data, {
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        const response = res.data
        return response
    }catch(err){
        console.log('Something went error', err.message)
        return null
    }
}

// --- Edit ---
const editPost = (post, tr) => {
    document.getElementById('title').value = post.title
    document.getElementById('body').value = post.body
    editID = post.id
    editDiv = tr
    submitBtn.textContent = 'Update Post'
    submitBtn.className = 'btn btn-warning'
}

// --- Toggle Theme ---
const toggleBtn = document.getElementById("toggleMode");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") document.body.classList.add("dark")

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
