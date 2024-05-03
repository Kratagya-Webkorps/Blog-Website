
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};


searchInput.addEventListener("keyup", debounce(() => {
    let storedData = localStorage.getItem('blogDetails');
    let parsedData = JSON.parse(storedData);
    const searchTerm = searchInput.value.toLowerCase();
    const matchingUsers = parsedData.users.filter(user => user.name.toLowerCase().includes(searchTerm));
    console.log(matchingUsers);
}, 300));




signOut.addEventListener("click", () => {
    localStorage.removeItem("loginDetails")
    window.location.href = "readme.html"
})
const createCard = (name, title, body, tags, likes, key) => {
    let newCard = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardText = document.createElement('p');
    let cardSubtitle = document.createElement('h6');
    let cardTitle = document.createElement('h5');
    let cardTags = document.createElement('p');
    let deleteBtn = document.createElement('button');
    let likeBtn = document.createElement('button');
    let commentBtn = document.createElement('button');
    let cardBlock1 = document.getElementById("cardBlock1");


    newCard.className = 'card mx-5 mt-4 mb-3';
    newCard.style.width = '18rem';
    newCard.id = `element-${key}`

    cardBody.className = 'card-body';
    cardTitle.id = "card-title";
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${title}`;

    cardSubtitle.className = 'card-subtitle mb-2 text-muted';
    cardSubtitle.id = 'card-subtitle';
    cardSubtitle.textContent = `${body}`;

    cardText.className = 'card-text';
    cardText.id = 'card-text';
    cardText.textContent = `${tags}`;

    cardTags.className = 'card-text';
    cardTags.id = 'card-link';
    cardTags.textContent = `${name}`;

    likeBtn.className = "btn btn-sm btn-danger mx-2 myClass";
    likeBtn.id = "likeBlog";
    likeBtn.innerHTML = `&#9829; ${likes}`;
    likeBtn.addEventListener("click", () => {
        let storedData = localStorage.getItem('blogDetails');
        let parsedData = JSON.parse(storedData);
        parsedData.users[key].likes++;
        let updatedData = JSON.stringify(parsedData);
        localStorage.setItem('blogDetails', updatedData);
        likeBtn.innerHTML = `&#9829; ${parsedData.users[key].likes}`;
    });

    const cloneCard = (originalCard) => {
        let clonedCard = originalCard.cloneNode(true);
        return clonedCard;
    };

    commentBtn.className = "btn btn-sm btn-danger mx-2 ";
    commentBtn.id = "commentBlog";
    commentBtn.textContent = 'comment';
    commentBtn.addEventListener("click", function () {
        let parentCard = this.parentNode.parentNode;
        let clonedCard = cloneCard(parentCard);
        let commentSection = document.createElement('div');
        let commentArea = document.createElement('div');
        let commentInput = document.createElement('textarea');
        let submitCommentBtn = document.createElement('button');
        let closeCommentBtn = document.createElement('button');
        commentArea.id = "commentArea"
        commentArea.style.display = "flex"
        commentSection.id = "commentSection"
        commentSection.className = 'comment-section input-group mt-3';

        commentInput.className = 'comment-input';
        commentSection.style.height = "50px"
        commentSection.style.display = "flex"
        commentInput.placeholder = 'Write your comment here...';

        submitCommentBtn.className = 'btn btn-primary submit-comment-btn';
        submitCommentBtn.textContent = 'Submit';
        closeCommentBtn.className = 'btn btn-dark submit-comment-btn';
        closeCommentBtn.textContent = 'Close';

        submitCommentBtn.addEventListener('click', function () {
            let commentText = commentInput.value;
            let storedData = localStorage.getItem('blogDetails');
            let parsedData = JSON.parse(storedData);
            let parsedLogin = JSON.parse(localStorage.getItem('loginDetails'));
            let newComment = { viewerName: parsedLogin[0].name, comments: [commentText] }
            parsedData.users[key].comment.push(newComment);
            let updatedData = JSON.stringify(parsedData);
            localStorage.setItem('blogDetails', updatedData);
            commentInput.value = '';
            while (commentContent.firstChild) {
                commentContent.removeChild(commentContent.firstChild);
            }
            parsedData.users[key].comment.forEach(comment => {

                let singleComment = document.createElement("div");
                singleComment.id = "oldComments";
                singleComment.innerHTML = `Name:- ${comment.viewerName} and Comment:- ${comment.comments}`;
                commentContent.appendChild(singleComment);
            });

        });


        closeCommentBtn.addEventListener("click", function () {
            commentArea.remove();
            cardBlock1.style.display = "flex";
        })
        commentSection.appendChild(commentInput);
        commentSection.appendChild(submitCommentBtn);
        commentSection.appendChild(closeCommentBtn);

        let storedData = localStorage.getItem('blogDetails');
        let parsedData = JSON.parse(storedData);
        let comments = parsedData.users[key].comment;
        let commentsDiv = document.createElement("div")
        let commentHeading = document.createElement("h2")
        commentHeading.innerHTML = "Comments"
        let commentContent = document.createElement("div")
        commentContent.id = "commentContent"

        comments.forEach(comment => {
            let singleComment = document.createElement("div");
            singleComment.id = "oldComments"
            singleComment.innerHTML = `Name:- ${comment.viewerName} and Comment:- ${comment.comments}`;
            commentContent.appendChild(singleComment);

        });

        commentArea.appendChild(clonedCard);
        commentsDiv.appendChild(commentHeading);
        commentsDiv.appendChild(commentContent);
        commentsDiv.appendChild(commentSection);
        commentArea.appendChild(commentsDiv);

        landingPage.append(commentArea);
        cardBlock1.style.display = "none";
    });
    deleteBtn.id = "deleteBlog";
    deleteBtn.className = "btn btn-sm btn-danger mx-1";
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", function () {
        let storedData = localStorage.getItem('blogDetails');
        let parsedData = JSON.parse(storedData);
        let deleteCard = this.closest("div.card");
        let cardIndex = Array.from(deleteCard.parentElement.children).indexOf(deleteCard);
        parsedData.users.splice(cardIndex, 1);

        localStorage.setItem('blogDetails', JSON.stringify(parsedData));
        deleteCard.style.display = "none";
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardTags);
    cardBody.appendChild(likeBtn);
    cardBody.appendChild(commentBtn);
    cardBody.style.height = '400px';

    let storedLoginDetails = localStorage.getItem('loginDetails');
    let parsedLoginDetails = JSON.parse(storedLoginDetails);
   

    if (name === parsedLoginDetails[0].name) {
        cardBody.appendChild(deleteBtn);
    }

    newCard.appendChild(cardBody);
    cardBlock1.appendChild(newCard);
};


const addBlogFromJson = async () => {
    let userBlogs = await fetch('./blogDetails.json');
    let response = await userBlogs.json();
    let dataExists = localStorage.getItem('blogDetails') !== null;

    if (!dataExists) {
        let blogDetails = response;
        let jsonData = JSON.stringify(blogDetails);
        localStorage.setItem('blogDetails', jsonData);
    }

    let storedData = localStorage.getItem('blogDetails');
    const parsedData = JSON.parse(storedData);
    let storedInJson = parsedData.users;
    let key = 0;

    storedInJson.forEach((e) => {
        createCard(e.name, e.title, e.body, e.tags, e.likes, key);
        key++;
    });
};

addBlogFromJson();


document.getElementById("addYourBlog").addEventListener("click", function () {
    exploreBlock.style.display = "none";
    cardBlock.style.display = "none";
    addNewBlog.style.display = "block";
    if (document.getElementById("commentArea")) {
        commentArea.style.display = "none";
    }
});

cancelBlogSubmit.addEventListener("click", function () {
    document.getElementById('publisherName').value = '';
    document.getElementById('publisherTitle').value = '';
    document.getElementById('publisherBody').value = '';
    document.getElementById('publisherTags').value = '';
    exploreBlock.style.display = "block";
    addNewBlog.style.display = "none";
    cardBlock.style.display = "block";
    if (document.getElementById("commentArea")) {
        commentArea.style.display = "flex";
    }
});

confirmBlogSubmit.addEventListener("click", function () {
    let pName = document.getElementById("publisherName").value;
    let pTitle = document.getElementById("publisherTitle").value;
    let pBody = document.getElementById("publisherBody").value;
    let pTags = document.getElementById("publisherTags").value;

    let getData = {
        "name": pName, "title": pTitle, "body": pBody, "tags": pTags, "likes": 0, "comment": []
    };
    let updatedData = localStorage.getItem('blogDetails');
    const parsedData = JSON.parse(updatedData);
    let storedInJson = parsedData.users;
    storedInJson.push(getData);
    localStorage.setItem('blogDetails', JSON.stringify(parsedData));
    document.getElementById('publisherName').value = '';
    document.getElementById('publisherTitle').value = '';
    document.getElementById('publisherBody').value = '';
    document.getElementById('publisherTags').value = '';
    exploreBlock.style.display = "block";
    addNewBlog.style.display = "none";
    cardBlock.style.display = "flex";

    let parentElement = document.getElementById('cardBlock1');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    let key = 0;
    storedInJson.forEach((e) => {
        createCard(e.name, e.title, e.body, e.tags, e.likes, key);
        key++;
    });
});