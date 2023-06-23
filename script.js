const prePack = document.querySelector(".pre-pack")
const outfitPack = document.querySelector(".outfit-pack")
const clothesPack = document.querySelector(".clothes-pack")
const toiletPack = document.querySelector(".toilet-pack")
const accessPack = document.querySelector('.access-pack')
const funPack = document.querySelector('.fun-pack')
const postPack = document.querySelector(".post-pack")
const nextBtn = document.querySelectorAll(".nextBtn")
const sectionStorage = localStorage.getItem("section")

const sectionNames = ["pre-pack", "outfit-pack", "clothes-pack", "toilet-pack", "access-pack", "fun-pack", "post-pack"]

const ifNewSection = function(section, orderNum) {
    if(sectionStorage === sectionNames[orderNum]) {
        section.classList.remove("hide")
        nextBtn[orderNum].addEventListener("click", () => {
            section.classList.add("hide")
            localStorage.setItem("section", sectionNames[orderNum + 1])
            const sectionEvent = new CustomEvent("section", {detail: sectionNames[orderNum]})
            window.dispatchEvent(sectionEvent)
        })
    }
}

const newSection = function(section, orderNum) {
        section.classList.remove("hide")
        nextBtn[orderNum].addEventListener("click", () => {
            section.classList.add("hide")
            localStorage.setItem("section", sectionNames[orderNum + 1])
            const sectionEvent = new CustomEvent("section", {detail: sectionNames[orderNum]})
            window.dispatchEvent(sectionEvent)
        })
}

if (sectionStorage === null) {
    localStorage.setItem("section", "pre-pack")
    location.reload()
}
ifNewSection(prePack, 0)
ifNewSection(outfitPack, 1)
ifNewSection(clothesPack, 2)
ifNewSection(toiletPack, 3)
ifNewSection(accessPack, 4)
ifNewSection(funPack, 5)

if (sectionStorage === "post-pack") {
    postPack.classList.remove("hide")
}
//localStorage.setItem("section", "pre-pack")

window.addEventListener("section", (e) => {
    console.log(e.detail)
    const secName = e.detail

    if (secName === "pre-pack") {
        newSection(outfitPack, 1)
    } else if (secName === "outfit-pack") {
        newSection(clothesPack, 2)
    } else if (secName === "clothes-pack") {
        newSection(toiletPack, 3)
    } else if (secName === "toilet-pack") {
        newSection(accessPack, 4)
    } else if (secName === "access-pack") {
        newSection(funPack, 5)
    } else {
        postPack.classList.remove("hide")
    }
})

const checkPacks = [outfitPack, clothesPack, toiletPack, accessPack, funPack]

const validateChecks = (pack) => {
    const checkboxes = pack.querySelectorAll("input[type=checkbox]")
    const checks = []
    checkboxes.forEach(checkbox => {
        checks.push(checkbox.checked)
    });
    return checks.every(Boolean)
}

const allCheckboxes = document.querySelectorAll("input[type=checkbox]")

allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        checkPacks.forEach(pack => {
            const text = pack.querySelector(".finishText")
            const btn = pack.querySelector(".checkBtn")
            if (validateChecks(pack)) {
                text.classList.remove("hide")
                btn.classList.remove("hide")
            } else {
                text.classList.add("hide")
                btn.classList.add("hide")
            }
        })

    })
})

const dataResetBtn = document.querySelector(".resetData")

dataResetBtn.addEventListener("click", () => {
    localStorage.removeItem("section")
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = false
    })
    location.reload()
})

