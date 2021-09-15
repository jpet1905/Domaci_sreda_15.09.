//funkcija koja ce biti univerzalna za sva sortiranja (rastuci poredak)
export function compareProperty(key) {
    return function compare(a, b) {
        let result;
        //a i b su objekti, key je property
        //transformisemo u mala jer sort radi prema ASCII
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
            result = 1;
        } else {
            result = -1; //bitno da ne vrati 0
        }
        return result;
    }
}


