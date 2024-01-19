var bookName        = document.getElementById("bookName")
var bookUrl         = document.getElementById("bookUrl")
var searchInput     = document.getElementById("searchInput")
var modelBox        = document.querySelector("#modelBox")
var closeEl         = document.querySelector("#closeEl")

var bookList = [];
if (localStorage.getItem("data") == null) {
    bookList = [];
    displayBook(bookList)
} else {
    bookList = JSON.parse(localStorage.getItem("data"))
    displayBook(bookList)
}

function displayBook(arr) {
    var temp = ``
    for (var i = 0; i < arr.length; i++) {
        temp += `<tr class="align-baseline">
        <td>`+ (i + 1) + `</td>
        <td>`+ arr[i].name + `</td>
        <td><a href="${arr[i].url}" target="_blank">
            <button class="btn btn-success p-2">
                <i class="fa-solid fa-eye px-1"></i>
                Visit
            </button>
            </a>
        </td>
        <td>
            <button onclick="deleteBook(`+ i + `)" class="btn btn-danger p-2">
                <i class="fa-solid fa-trash-can px-1"></i>
                Delete
            </button>
        </td>
    </tr>`
    }
    document.getElementById("bookStore").innerHTML = temp;
}

function addBook() {
    let checkReapet = bookList.findIndex((el) => {
        return el.name == bookName.value && el.url == bookUrl.value
    })

    if (validName() == true && validUrl() == true) {
        if (checkReapet == -1) {
            var book = {
                name: bookName.value,
                url: bookUrl.value
            }
            bookList.push(book)
            localStorage.setItem("data", JSON.stringify(bookList))
            displayBook(bookList)
            clearForm()
        }
        else {
            modelBox.style.display = "flex"
        }
    }
    else {
        modelBox.style.display = "flex"
    }
}
function clearForm() {
    bookName.value = "";
    bookUrl.value  = "";
    bookName.classList.remove("is-valid")
    bookUrl.classList.remove("is-valid")
}

function deleteBook(x) {
    bookList.splice(x, 1)
    localStorage.setItem("data", JSON.stringify(bookList))
    displayBook(bookList)
}

bookName.addEventListener("keyup", validName)
bookUrl.addEventListener("keyup", validUrl)

function validName() {
    var regexName = /^[A-Za-z]{3,100}$/
    if (regexName.test(bookName.value)) {
        bookName.classList.add("is-valid")
        bookName.classList.remove("is-invalid")
        return true;
    } else {
        bookName.classList.add("is-invalid")
        bookName.classList.remove("is-valid")
        return false;
    }
}
function validUrl() {
    var regexUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
    if (regexUrl.test(bookUrl.value)) {
        bookUrl.classList.add("is-valid")
        bookUrl.classList.remove("is-invalid")
        return true;
    } else {
        bookUrl.classList.add("is-invalid")
        bookUrl.classList.remove("is-valid")
        return false;
    }
}

function searchForBook(term) {
    let matchBooks = []
    for (let i = 0; i < bookList.length; i++) {
        if (bookList[i].name.toLowerCase().includes(term.toLowerCase()) === true) {
            matchBooks.push(bookList[i])
        }
    }
    displayBook(matchBooks)
}

function closeModel() {
    modelBox.style.display = "none"
}

closeEl.addEventListener("click", closeModel)
modelBox.addEventListener("click", function (e) {
    if (e.target.getAttribute("id") == "modelBox") {
        closeModel()
    }
})
