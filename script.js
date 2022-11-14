const pForm = document.getElementById("p-form");
const title = pForm["title"];
const desc = pForm["desc"];
const postContainer = document.getElementById("posts");
const insert = document.getElementById("insert");
const get = document.getElementById("get");
const clear = document.getElementById("clear");
const msg = document.getElementById("msg");

var postsLocalStorage = {
  setPosts: function (newPostCollection) {
    localStorage.setItem("postCollection", JSON.stringify(newPostCollection));
  },
  getPosts: function () {
    return JSON.parse(localStorage.getItem("postCollection"));
  },
  removePosts: function () {
    localStorage.removeItem("postCollection");
  },
};

const posts = postsLocalStorage.getPosts() || [];

insert.addEventListener("click", (e) => {
  e.preventDefault();
  var newTitle = title.value;
  var newDesc = desc.value;

  if(newTitle == "" || newDesc == ""){
    msg.innerHTML = "Either Title or Description cannot be empty."
  }
  else{
        
     posts.push({ newTitle, newDesc });

    postsLocalStorage.setPosts(posts);

     console.log(posts);

     title.value = "";
     desc.value = "";

     msg.innerHTML = ""

  }
  
});

posts.forEach(myFunction);

function myFunction(item, index) {
  postContainer.innerHTML += `<div class="post" id="post-${index}">
    <div class="border border-secondary rounded border-2 p-2 mb-2">
      <h4 class="p-1">${item.newTitle}</h4>
      <p class="p-1 lead">
        ${item.newDesc}
      </p>
    </div>
  </div>`;
}

get.addEventListener("click" ,()=> {
    posts.forEach(myFunction);
})

clear.addEventListener("click" ,()=> {
    postsLocalStorage.removePosts();
    posts = [];
    posts.forEach(myFunction);
})

if(posts.length == 0){
  postContainer.innerHTML += `
  <h4 class="p-3">No posts to show, Create one!</h4>`
}

