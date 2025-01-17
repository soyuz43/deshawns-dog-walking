import { Walkers } from "./Walkers.js"
import { CityList } from "./CityList.js"
import { Assignments } from "./Assignments.js"
import { RegisteredPets } from "./RegisteredPets.js"
import { getWalkers, getPets } from "./database.js"

const walkers = getWalkers()
const pets = getPets()

const mainContainer = document.querySelector("#container")

const applicationHTML = `
<h1>DeShawns Dog Walking</h1>
<article class="details">
    <section class="detail--column list details__cities">
        <h2>Cities with Service</h2>
        ${CityList()}
    </section>
    <section class="detail--column list details__cities">
        <h2>Walkers</h2>
        ${Walkers()}
    </section>
    <section class="detail--column list details__cities">
        <h2>Pets</h2>
        ${RegisteredPets()}
    </section>
</article>

<article class="assignments">
    <h2>Current Assignments</h2>
    ${Assignments()}
</article>
`

mainContainer.innerHTML = applicationHTML

// ! Helper func to parse multiple pets
const concatenatePetNames = (petsArray) => {
    if (petsArray.length === 1) {
        return petsArray[0]
    } else if (petsArray.length === 2) {
        return `${petsArray[0]} and ${petsArray[1]}`
    } else {
        return `${petsArray.slice(0, -1).join(", ")}, and ${petsArray[petsArray.length - 1]}`
    }
}

mainContainer.addEventListener("click", (event) => {
    const petElement = event.target.closest("li[data-pet-id]")
    if (petElement) {
        const petId = parseInt(petElement.dataset.petId)
        const pet = pets.find((p) => p.id === petId)
        const walker = walkers.find((w) => w.id === pet.walkerId)

        if (walker) {
            const petsWalked = pets.filter((p) => p.walkerId === walker.id)
            const petNames = petsWalked.map((p) => p.name)
            const petsMessage = petNames.length > 0
                ? `is walking ${concatenatePetNames(petNames)}`
                : "is not walking anyone"

            window.alert(`${walker.name} ${petsMessage} in ${walker.city}`)
        } else {
            window.alert(`No walker assigned to ${pet.name}.`)
        }
        return
    }

    const cityElement = event.target.closest("li[data-city-id]")
    if (cityElement) {
        const cityName = cityElement.dataset.cityName
        const cityWalkers = walkers.filter((w) => w.city === cityName)

        if (cityWalkers.length === 0) {
            window.alert(`This city (${cityName}) is not serviced by any walkers.`)
            return
        }

        const messages = cityWalkers.map((walker) => {
            const petsWalked = pets.filter((p) => p.walkerId === walker.id)
            const petNames = petsWalked.map((p) => p.name)
            const petsMessage = petNames.length > 0
                ? `who is walking ${concatenatePetNames(petNames)}`
                : "who has no current pets"
            return `${walker.name}, ${petsMessage}`
        })

        const cityMessage = messages.join("; ")

        window.alert(`${cityName} is serviced by ${cityMessage}`)
        return
    }

    const walkerElement = event.target.closest("li[data-walker-id]")
    if (walkerElement) {
        const walkerId = parseInt(walkerElement.dataset.walkerId)
        const walker = walkers.find((w) => w.id === walkerId)

        if (walker) {
            const petsWalked = pets.filter((p) => p.walkerId === walker.id)
            const petNames = petsWalked.map((p) => p.name)
            const petsMessage = petNames.length > 0
                ? `and is walking ${concatenatePetNames(petNames)}`
                : "and is not walking anyone"

            window.alert(`${walker.name} is currently servicing ${walker.city} ${petsMessage}`)
        } else {
            window.alert(`No walker found with ID ${walkerId}.`)
        }
        return
    }
})
