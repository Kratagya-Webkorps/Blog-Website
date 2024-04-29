let submitLoginPage = document.getElementById("submitLoginPage")
let loginPage = document.getElementById("loginPage")
let landingPage = document.getElementById("landingPage")
let exploreBlock = document.getElementById("exploreBlock")
let exampleInputEmail1 = document.getElementById("exampleInputEmail1")
let exampleInputPassword1 = document.getElementById("exampleInputPassword1")


submitLoginPage.addEventListener("click", async function () {
    let result = await checkIfAdmin()
    console.log(result)
    if (result === 1) {
        window.location.href = "admin.html"
    }
    else if(result === 2) {
        window.location.href = "user.html"
        console.log("Enter valid details admin")
    }
    

})
const checkIfAdmin = async () => {
    let myData = await fetch('./data.json')
    let response = await myData.json()
    return check(response)
};

const check = (response) => {
    let inputEmail = exampleInputEmail1.value
    let inputPass = exampleInputPassword1.value
    let flag = 0
    if (inputEmail === response[0].admin.email && inputPass === response[0].admin.password) {
        console.log("Welcome admin")
        flag = 1
        return flag
    }
    var otherUsers = response[0]["otherUsers"];
    for (var j = 0; j < otherUsers.length; j++) {
        var user = otherUsers[j];
        if (user.email === inputEmail) {
            console.log("first")
            flag =2
            return flag;
        }
    }
}



