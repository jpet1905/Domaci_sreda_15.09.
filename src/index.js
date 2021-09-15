import { getAllCountries } from "./service.js";
import { main, inputS, divSelect, Select, divSort, divPag } from "./components/konstante.js"
import { Countries, OneCountry } from "./components/Countries.js"
import { compareProperty } from "./components/sorting.js"
import { displayOnPage, setUpPag } from "./components/pagination.js"

let countries = [];  //mora spolja jer se koristi na vise mesta

getAllCountries().then(res => {
    countries = res.data
    console.log(countries[0]); //za jednu drzavu
    // main.append(...Countries(countries)) //zbog paginacije
    //pravimo select nad svim zemljama
    generateSelect(countries);
    generateSort(countries);

    //DODATO ZA PAGINACIJU
    //primenjujemo f-ju za paginaciju i prikaz elemenata
    displayOnPage(Countries(countries), main, 7, 1); // da odmah od pocetka stoji nesto na stranici
    setUpPag(Countries(countries), main, divPag, 7);
})

inputS.addEventListener('input', () => {
    main.innerHTML = "";
    let nizPretraga = countries.filter(country => country.name.toLowerCase().includes(inputS.value.toLowerCase()));
    if (nizPretraga.length == 1) {
        main.append(...OneCountry(nizPretraga));
    } else {
        // main.append(...Countries(nizPretraga)); //zbog paginacije
        //DODATO ZA PAGINACIJU
        displayOnPage(Countries(nizPretraga), main, 7, 1); // da odmah od pocetka stoji nesto na stranici
        setUpPag(Countries(nizPretraga), main, divPag, 7);
    }
    //pravimo select sa regionima zemalja koje je vratila pretraga
    generateSelect(nizPretraga);
    generateSort(nizPretraga);
})


//funkcija koja pravi "konkretan" select i pozivamo je svuda gde treba
//imace samo opcije regiona koje imaju prikazane zemlje na stranici (bilo sve, bilo one koje smo pretrazili kroz input)
const generateSelect = (niz) => {
    //trazimo regione - na sajtu ne postoji direktan link do njih
    let nizRegiona = [...new Set(niz.map(country => country.region))];
    console.log(nizRegiona);

    divSelect.innerHTML = '';

    let select = Select(nizRegiona);

    select.addEventListener('change', () => {
        let tmp = niz.filter(country => country.region == select.value);
        main.innerHTML = "";
        // main.append(...Countries(tmp)); //zbog paginacije
        //DODATO ZA PAGINACIJU
        //primenjujemo f-ju za paginaciju i prikaz elemenata
        displayOnPage(Countries(tmp), main, 7, 1); // da odmah od pocetka stoji nesto na stranici
        setUpPag(Countries(tmp), main, divPag, 7);

        generateSort(tmp);

        //DODATNO: KAD HOCU DA I KROZ SELECT RADIM PRETRAGU U INPUTU (ZEMALJA IZ TOG JEDNOG REGIONA)
        inputS.addEventListener('input', () => {
            main.innerHTML = "";
            let nizPretraga = tmp.filter(country => country.name.toLowerCase().includes(inputS.value.toLowerCase()));
            if (nizPretraga.length == 1) {
                main.append(...OneCountry(nizPretraga));
            } else {
                // main.append(...Countries(nizPretraga)); //zbog paginacije
                //DODATO ZA PAGINACIJU
                displayOnPage(Countries(nizPretraga), main, 7, 1); // da odmah od pocetka stoji nesto na stranici
                setUpPag(Countries(nizPretraga), main, divPag, 7);
            }
            generateSelect(nizPretraga);
            generateSort(nizPretraga);
        })
    })
    divSelect.append(select);
}

//select za sortiranje
const selectSort = document.createElement('select');
divSort.append(selectSort);

const defaultO = document.createElement('option');
defaultO.value = '-1';
defaultO.selected = true;
defaultO.disabled = true;
defaultO.hidden = true;
defaultO.textContent = 'Sort countries';

const opt1 = document.createElement('option');
opt1.textContent = "By name";
opt1.value = "name";
const opt2 = document.createElement('option');
opt2.textContent = "By capital";
opt2.value = "capital";
const opt3 = document.createElement('option');
opt3.textContent = "By region";
opt3.value = "region";
selectSort.append(defaultO, opt1, opt2, opt3);


const generateSort = (niz) => {

    let privremeniNiz = [...niz];
    //sort menja originalan niz, zato uvodimo privremeni

    selectSort.addEventListener('change', () => {

        main.innerHTML = "";

        if (selectSort.value == "name") {
            privremeniNiz.sort(compareProperty("name"));
        } else if (selectSort.value == "capital") {
            privremeniNiz.sort(compareProperty("capital"));
        } else if (selectSort.value == "region") {
            privremeniNiz.sort(compareProperty("region"));
        }

        // main.append(...Countries(privremeniNiz));//zbog paginacije
        //DODATO ZA PAGINACIJU
        displayOnPage(Countries(privremeniNiz), main, 7, 1); // da odmah od pocetka stoji nesto na stranici
        setUpPag(Countries(privremeniNiz), main, divPag, 7);
    })
}