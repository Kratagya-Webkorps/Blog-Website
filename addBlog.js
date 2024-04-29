let addYourPost = document.getElementById("addYourBlog")
let cardBlock = document.getElementById("cardBlock")
let confirmBlogSubmit = document.getElementById("confirmBlogSubmit")
let cancelBlogSubmit = document.getElementById("cancelBlogSubmit")
let addNewBlog = document.getElementById("addNewBlog")
let exploreBlock1 = document.getElementById("exploreBlock")
let signOut = document.getElementById("signOut")

signOut.addEventListener("click",()=>{
    window.location.href = "index.html"

})



const addBlogFromJson = async () => {
    let userBlogs = await fetch('./blogDetails.json')
    let response = await userBlogs.json()
    console.log( typeof response.users[0].tags)
    response.users.map((e) => {
        console.log(e)
        createCard(e.name, e.title, e.body, e.tags)

    })
}
addBlogFromJson()




addYourPost.addEventListener("click", function () {
    exploreBlock.style.display = "none";
    cardBlock.style.display = "none";
    addNewBlog.style.display = "block";
})

cancelBlogSubmit.addEventListener("click", function () {
    exploreBlock.style.display = "block";
    addNewBlog.style.display = "none";
    cardBlock.style.display = "block";

})

confirmBlogSubmit.addEventListener("click", function () {
    let pEmail = document.getElementById("userEmailId").value
    let pName = document.getElementById("publisherName").value
    let pTitle = document.getElementById("publisherTitle").value
    let pBody = document.getElementById("publisherBody").value
    let pTags = document.getElementById("publisherTags").value

    let getData = { pEmail, pName, pTitle, pBody, pTags }
    console.log(getData)
    // pushDataIntoJson(pEmail, pName, pTitle, pBody, pTags)

    createCard( pName, pTitle, pBody, pTags)
    document.getElementById('userEmailId').value = '';
    document.getElementById('publisherName').value = '';
    document.getElementById('publisherTitle').value = '';
    document.getElementById('publisherBody').value = '';
    document.getElementById('publisherTags').value = '';
    exploreBlock.style.display = "block";
    addNewBlog.style.display = "none";
    cardBlock.style.display = "block";
})

const createCard = (...args) => {

    let newCard = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardText = document.createElement('p');
    let cardSubtitle = document.createElement('h6');
    let cardTitle = document.createElement('h5');
    let cardTags = document.createElement('p');
    let deleteBtn = document.createElement('button');
    let cardBlock1 = document.getElementById("cardBlock1")

    newCard.className = 'card mx-5 mt-4';
    newCard.style.width = '18rem';

    cardBody.className = 'card-body';
    cardTitle.id = "card-title"
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${args[1]}`;

    cardSubtitle.className = 'card-subtitle mb-2 text-muted';
    cardSubtitle.id = 'card-subtitle';
    cardSubtitle.textContent = `${args[2]}`;

    cardText.className = 'card-text';
    cardText.id = 'card-text';
    cardText.textContent = `${args[3]}`;

    cardTags.className = 'card-text';
    cardTags.id = 'card-link';
    cardTags.textContent = `${args[0]}`;

    deleteBtn.id = "deleteBlog"
    deleteBtn.className = "btn btn-sm btn-danger mx-2"
    deleteBtn.textContent = "delete"
    deleteBtn.addEventListener("click", function () {
        let deleteCard = this.closest("div.card");
        deleteCard.style.display = "none";
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardTags);
    if (window.location.href !== "http://127.0.0.1:5500/user.html") {
        cardBody.appendChild(deleteBtn)
    }

    newCard.appendChild(cardBody);
    cardBlock1.appendChild(newCard)
}


// const pushDataIntoJson = (...args) => {


// }
