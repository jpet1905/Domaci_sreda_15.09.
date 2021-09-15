import {Country, OneDisplay} from "./Country.js"

const Countries = (countries) => countries.map(country => Country(country))
const OneCountry = (countries) => countries.map(country => OneDisplay(country));

export {Countries, OneCountry}
