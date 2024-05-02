let submitLoginPage = document.getElementById("submitLoginPage")
let signinPage = document.getElementById("signinPage")
let loginPage = document.getElementById("loginPage")
let landingPage = document.getElementById("landingPage")
let exploreBlock = document.getElementById("exploreBlock")
let exampleInputEmail1 = document.getElementById("exampleInputEmail1")
let exampleInputPassword1 = document.getElementById("exampleInputPassword1")
let signinPageBlock = document.getElementById("signinPageBlock")
let cancelSignin = document.getElementById("cancelSignin")
let confirmSignin = document.getElementById("confirmSignin")
let clearLocalData = document.getElementById("clearLocalData")
clearLocalData.addEventListener("click", function () {
    localStorage.clear()
})



window.onload = async function () {
    let myData = await fetch('./data.json')
    let response = await myData.json()
    let dataExists = localStorage.getItem('addLoginDetails') !== null;

    if (!dataExists) {
        let blogDetails = response;
        let jsonData = JSON.stringify(blogDetails);
        localStorage.setItem('addLoginDetails', jsonData);
    }

}
confirmSignin.addEventListener("click", function () {

    let newUserEmailId = document.getElementById("newUserEmailId")
    let newUserPassword1 = document.getElementById("newUserPassword1")
    let newUserName = document.getElementById("newUserName")
    if (newUserEmailId.value !== "" && newUserPassword1.value !== "" && newUserName.value !== "") {
        let storedData = localStorage.getItem('addLoginDetails');
        console.log(newUserEmailId)
        const parsedData = JSON.parse(storedData);
        let storedInJson = parsedData;
        console.log(storedInJson[0].otherUsers)


        let newUser = {
            "email": `${newUserEmailId.value}`,
            "password": `${newUserPassword1.value}`,
            "name": `${newUserName.value}`
        };
        storedInJson[0].otherUsers.push(newUser);
        localStorage.setItem('addLoginDetails', JSON.stringify(parsedData));
        console.log(storedInJson)
        loginPage.style.display = "block"
        signinPageBlock.style.display = "none"
        document.getElementById('newUserEmailId').value = '';
        document.getElementById('newUserPassword1').value = '';
        document.getElementById('newUserName').value = '';
    }
    else {
        let signinDetails = document.getElementById("signinDetails")
        let errorMsg = document.createElement("p")
        errorMsg.innerHTML = "Please Enter Valid Details"
        signinDetails.appendChild(errorMsg)
    }
})
if (submitLoginPage) {
    submitLoginPage.addEventListener("click", async function () {
        let result = await checkIfAdmin()
        if (result === 1) {
            window.location.href = "admin.html"

        }
        else if (result === 2) {
            window.location.href = "user.html"
            console.log("Enter valid details admin")
        }



    })
}

const checkIfAdmin = async () => {
    let storedData = localStorage.getItem('addLoginDetails');
    const parsedData = JSON.parse(storedData);
    return check(parsedData)
};

const check = (storedInJson) => {
    let inputEmail = exampleInputEmail1.value
    let inputPass = exampleInputPassword1.value
    let dataExists = localStorage.getItem('loginDetails') !== null;
    if (!dataExists) {
        localStorage.setItem('loginDetails', JSON.stringify([]));
    }

    let flag = 0
    if (inputEmail === storedInJson[0].admin.email && inputPass === storedInJson[0].admin.password) {
        let defaultLoginDetails = [{ "name": storedInJson[0].admin.name, "email": storedInJson[0].admin.email }];
        let jsonData = JSON.stringify(defaultLoginDetails);
        localStorage.setItem('loginDetails', jsonData);
        console.log("Welcome admin")
        flag = 1
        console.log("admin")
        return flag
    }
    var otherUsers = storedInJson[0]["otherUsers"];
    for (var j = 0; j < otherUsers.length; j++) {
        var user = otherUsers[j];

        if (user.email === inputEmail && user.password === inputPass) {
            let defaultLoginDetails = [{ "name": user.name, "email": user.email }];
            let jsonData = JSON.stringify(defaultLoginDetails);
            localStorage.setItem('loginDetails', jsonData);
            console.log("first")
            flag = 2
            return flag;
        }
    }
}

signinPage.addEventListener("click", function () {

    loginPage.style.display = "none"
    signinPageBlock.style.display = "block"

})
cancelSignin.addEventListener("click", function () {

    loginPage.style.display = "block"
    signinPageBlock.style.display = "none"

})








