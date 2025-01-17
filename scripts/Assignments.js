import { getPets, getWalkers, getCityById } from "./database.js"

// Get copy of state for use in this module
const pets = getPets()
const walkers = getWalkers()


// Function whose responsibility is to find the walker assigned to a pet
const findPetWalker = (pet, allWalkers) => {
    let petWalker = null

    for (const walker of allWalkers) {
        if (walker.id === pet.walkerId) {
            petWalker = walker
        }
    }

    return petWalker
}

export const Assignments = () => {
    let assignmentHTML = "<ul>"

    for (const currentPet of pets) {
        const currentPetWalker = findPetWalker(currentPet, walkers)
        const city = currentPetWalker ? getCityById(currentPetWalker.cityId).name : "Unknown"

        assignmentHTML += `
            <li data-pet-id="${currentPet.id}">
                ${currentPet.name} is being walked by
                ${currentPetWalker ? currentPetWalker.name : "No Walker"} in ${city}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}
