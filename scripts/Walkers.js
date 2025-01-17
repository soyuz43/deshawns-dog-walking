// Walkers.js
import { getWalkers, getCityById } from "./database.js"

const walkers = getWalkers()

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        const city = getCityById(walker.cityId).name
        walkerHTML += `<li data-walker-id="${walker.id}" data-city-id="${walker.cityId}">${walker.name} - ${city}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}
