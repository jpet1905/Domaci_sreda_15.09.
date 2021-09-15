let currentPage = 1; //za pocetak prikazuje prvu stranicu (po defaultu)

//f-ja koja ispisuje elemente svake stranice
export function displayOnPage(items, divEl, items_per_page, page) { //kako prikazuje elemente jedne stranice

    let paginatedItems = [];

    let end = items_per_page * page;//lakse mi unazad zbog prve stranice
    let start = end - items_per_page; //pocetni element za tu stranicu
    paginatedItems = items.slice(start, end);  //izvuci iz glavnog niza te elemente
    console.log(paginatedItems);

    divEl.innerHTML = "";
    for (let i = 0; i < paginatedItems.length; i++) {
        divEl.append(paginatedItems[i]);
    }
}

export function setUpPag(items, divEl, divP, items_per_page) {
    divP.innerHTML = "";
   
    //zaokruzimo na vise da ne izgubimo "visak" elemenata koji nije stao na zadnju POPUNJENU stranicu
    let numberOfPages = Math.ceil(items.length / items_per_page);
    for (let i = 1; i <= numberOfPages; i++) {
        const btn = document.createElement('button');
        divP.appendChild(btn); 
        btn.textContent = i;  //dugme sa brojem te stranice u sebi
        if (currentPage == i) { //za pocetak je to prvo dugme
            btn.className = 'active';
        }
        btn.addEventListener('click', () => {
            currentPage = i;
            
            //skinemo stanje active sa onog koje je bilo do sada i dodamo na ovo dugme koje je sada kliknuto
            let current_btn = document.querySelector('#pagination button.active');
            current_btn.classList.remove('active');
    
            btn.classList.add('active');
            divEl.innerHTML = "";

            displayOnPage(items, divEl, items_per_page, currentPage);
        })
    
    }
}
