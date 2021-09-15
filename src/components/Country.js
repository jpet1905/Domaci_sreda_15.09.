
export const Country = (country) => {
    const divCountry = document.createElement('div')
    divCountry.className = 'country';
    const p = document.createElement('p')
    p.innerHTML = `<b><em>${country.name}</em></b>`

    const img = document.createElement('img')
    img.src = country.flag
    img.alt = `Flag of ${country.name}`

    divCountry.append(p, img)

    return divCountry
}

export const OneDisplay = (country) => {
    const divCountry = document.createElement('div')
    divCountry.classList.add('central');

    const p = document.createElement('p')
    p.innerHTML = `<b>${country.name}<b>`

    const pNative = document.createElement('p')
    pNative.innerHTML = `<b>${country.nativeName}<b>`

    const pPop = document.createElement('p')
    pPop.innerHTML = `Population: <b>${country.population}<b>`

    const pCap = document.createElement('p')
    pCap.innerHTML = `Capital city: <b>${country.capital}<b>`


    const pInt = document.createElement('p')
    pInt.innerHTML = `Internet domain: <b>${country.topLevelDomain}<b>`

    const img = document.createElement('img')
    img.src = country.flag
    img.alt = `Flag of ${country.name}`

    divCountry.append(img, p, pNative, pPop, pCap, pInt)

    return divCountry
}