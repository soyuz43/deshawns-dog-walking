# Assignments.js
+++javascript
import { getPets, getWalkers } from "./database.js"

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
        assignmentHTML += `
            <li data-pet-id="${currentPet.id}" data-walker-id="${currentPet.walkerId}">
                ${currentPet.name} is being walked by
                ${currentPetWalker.name} in ${currentPetWalker.city}
            </li>
        `
    }

    assignmentHTML += "</ul>"

    return assignmentHTML
}


+++

# CityList.js
+++javascript
import { getCities } from "./database.js"

const cities = getCities()

export const CityList = () => {
    let citiesHTML = "<ol>"

    for (const city of cities) {
        citiesHTML += `<li data-city-id="${city.id}" data-city-name="${city.name}">${city.name}</li>`
    }

    citiesHTML += "</ol>"

    return citiesHTML
}

+++

# database.js
+++javascript
// database.js

const database = {
    cities: [
        { id: 1, name: "Chicago" },
        { id: 2, name: "White Plains" },
        { id: 3, name: "Sarasota" },
        { id: 4, name: "San Diego" },
        { id: 5, name: "Boise" },
        { id: 6, name: "Denver" },
        { id: 7, name: "Tucson" },
        { id: 8, name: "Phoenix" },
        { id: 9, name: "Minneapolis" },
        { id: 10, name: "Pittsburgh" },
        // New city added
        { id: 14, name: "San Diego" }
    ],
    walkers: [
        {
            id: 1,
            name: "Alphonse Meron",
            email: "ameron0@mashable.com",
            cityId: 1
        },
        {
            id: 2,
            name: "Damara Pentecust",
            email: "dpentecust1@apache.org",
            cityId: 2
        },
        {
            id: 3,
            name: "Anna Bowton",
            email: "abowton2@wisc.edu",
            cityId: 3
        },
        {
            id: 4,
            name: "Hunfredo Drynan",
            email: "hdrynan3@bizjournals.com",
            cityId: 4
        },
        {
            id: 5,
            name: "Elmira Bick",
            email: "ebick4@biblegateway.com",
            cityId: 5
        },
        {
            id: 6,
            name: "Bernie Dreger",
            email: "bdreger5@zimbio.com",
            cityId: 6
        },
        {
            id: 7,
            name: "Rolando Gault",
            email: "rgault6@google.com",
            cityId: 7
        },
        {
            id: 8,
            name: "Tiffanie Tubby",
            email: "ttubby7@intel.com",
            cityId: 8
        },
        {
            id: 9,
            name: "Tomlin Cutill",
            email: "tcutill8@marketwatch.com",
            cityId: 9
        },
        {
            id: 10,
            name: "Arv Biddle",
            email: "abiddle9@cafepress.com",
            cityId: 10
        },
        // New walker added
        {
            id: 14,
            name: "Amelia Anderson",
            email: "amelia@andersonfam.com",
            cityId: 4
        }
    ],
    pets: [
        {
            id: 1,
            name: "Dianemarie Hartness",
            walkerId: 3
        },
        {
            id: 2,
            name: "Christoph Fosdyke",
            walkerId: 10
        },
        {
            id: 3,
            name: "Rocket",
            walkerId: 7
        },
        {
            id: 4,
            name: "Ebony",
            walkerId: 3
        },
        {
            id: 5,
            name: "Scotty",
            walkerId: 8
        },
        {
            id: 6,
            name: "Mac",
            walkerId: 2
        },
        {
            id: 7,
            name: "Oreo",
            walkerId: 5
        },
        {
            id: 8,
            name: "Sassy",
            walkerId: 1
        },
        {
            id: 9,
            name: "Salem",
            walkerId: 9
        },
        {
            id: 10,
            name: "Panda",
            walkerId: 7
        }
    ]
}

export const getWalkers = () => {
    return database.walkers.map(walker => ({...walker}))
}

export const getPets = () => {
    return database.pets.map(pet => ({...pet}))
}

export const getCities = () => {
    return database.cities.map(city => ({...city}))
}

export const getCityById = (id) => {
    return database.cities.find(city => city.id === id)
}

+++

# main.js
+++javascript
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

+++

# RegisteredPets.js
+++javascript
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

+++

# Walkers.js
+++javascript
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


+++

