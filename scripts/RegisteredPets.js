// RegisteredPets.js
import { getPets } from "./database.js"

const pets = getPets()

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li data-pet-id="${pet.id}">
            ${pet.name}
        </li>`
    }

    petHTML += "</ul>"

    return petHTML
}
