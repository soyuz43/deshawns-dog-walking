import { getWalkers } from "./database.js"

const walkers = getWalkers()


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li data-walker-id="${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML

}

