// CityList.js
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
