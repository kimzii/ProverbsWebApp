import data from "../resources/proverbs.json" assert { type: "json" };

const searchInput = document.querySelector(".myInput")

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    console.log(data)
})

