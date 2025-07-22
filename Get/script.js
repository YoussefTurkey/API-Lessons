// // ---- Get Data Using Axios ----
//   let blogsDiv = document.getElementById('blogs')
  
//   // Get Blogs
//   const getBlogs = async() =>{
//     try{
//       const result = await axios.get('https://jsonplaceholder.typicode.com/posts'),
//             data = result.data
//       return data
      
//     }catch(err){
//       console.error('Can not fetching APIs', err.message)
//       return null
//     }
//   }
//   // For Testing Data In Console
//   console.log(getBlogs()) // Will get Promise 
//   getBlogs().then(data => console.log(data)) // Will get just data

//   // Append Data In Documents
//   getBlogs().then( blog => {
//     blog.map(post => {
//       const div = document.createElement('div'),
//             h4 = document.createElement('h4'),
//             p = document.createElement('p');
      
//       // Styling
//       div.classList.add('post')
//       // div.classList.add('col-3')

//       h4.innerHTML = post.title
//       p.innerHTML = post.body

//       div.appendChild(h4)
//       div.appendChild(p)
//       blogsDiv.appendChild(div)
//     })
//   })


let blogDiv = document.getElementById('blogs')

// Function for getting API
const getAPI = async () => {
  try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const api = res.data
    return api
  }catch(error){
    console.error(error.message)
    return null // DO not return anything
  }
}
console.log(getAPI())
getAPI().then(data => console.log(data))

// function for show data in DOM/HTML
const showData = () => {
  
  getAPI().then(blog => {
    blog.map(post => {
      let div = document.createElement('div')
      div.className = 'post'
      let h4 = document.createElement('h4')
      let p = document.createElement('p')

      h4.textContent = post.title
      p.textContent = post.body
      
      div.appendChild(h4)
      div.appendChild(p)

      blogDiv.appendChild(div)
    })
  })
}
showData()