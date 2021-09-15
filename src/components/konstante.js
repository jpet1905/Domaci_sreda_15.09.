//selektovanja
export const divSort = document.querySelector('#sotirajuci');
export const main = document.querySelector('main');
export const inputS = document.querySelector('#input-search')
export const divSelect = document.querySelector('#select');
export const divPag = document.querySelector('#pagination');

export const Select = (nizOpcija) => {

    const select = document.createElement('select');

    const defOpt = document.createElement('option');
    defOpt.value = '-1';
    defOpt.selected = true;
    defOpt.disabled = true;
    defOpt.hidden = true;
    defOpt.textContent = 'Choose a region';

    select.append(defOpt)
    //niz opcija, kod nas ce biti niz regiona
    nizOpcija.forEach(option => {
        const opt = document.createElement('option')

        if (option.length == 0) {
            opt.textContent = "Other";
        } else {
            opt.textContent = option;
        }
        opt.value = option;
        select.append(opt)
    })

    return select
}


