// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//[] Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

// I numeri nella lista delle bombe non possono essere duplicati.

// In seguito l'utente clicca su una cella: 
//[] se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
//[] altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

//[] La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
//[] Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.

// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Seleziono il bottone con id play e aggiungo un evento al click
document.getElementById('play').addEventListener('click', start);


// Funzione che si attiva al click del pulsante play
function start() {

    // Faccio sparire l'elemento h2 
    const gameIntro = document.getElementById('intro');
    gameIntro.classList.add('hidden');


    // Seleziono l'elemento div con id griglia
    const container = document.getElementById('grid');
    
    // Faccio comparire la griglia
    container.classList.remove('hidden');

    // resetto il valore di grid a un valore vuoto
    container.innerHTML = '';

    // Rimuovo il bordo esterno
    container.classList.remove('border');
 
    //Seleziono l'elemento con id level contenuto nella select per leggere i valori corrispondenti
    let selectedValue = parseInt (document.getElementById('level').value);
    
    let maxSquaresNumber; 
    let squareDimension;

    // In base al livello riconosco il value e assegno i valori corrispondenti
    if (selectedValue === 1) {
        maxSquaresNumber = 100;
        squareDimension = 10;
    } else if (selectedValue === 2){
        maxSquaresNumber = 81;
        squareDimension = 9;
    } else if (selectedValue === 3){
        maxSquaresNumber = 49;
        squareDimension = 7;
    }

    // Creo i quadrati in base alla dimensione dell'array numbers
    for(let i = 1; i <= maxSquaresNumber; i++) {

        // Creo una cella
        const newCell = newObject (i, squareDimension);

        // Aggiungo la cella  alla griglia
        container.appendChild(newCell);

        // Attacco l'evento allo square
        newCell.addEventListener('click', contentCellClick);   
    }   
    
    // Imposto il numero totale di mine
    const totalMine = 16;

    // Creo le mine richiamando la funzione createMine
    const mineArray = createMine (maxSquaresNumber, totalMine)
     console.log(mineArray)

    // Conto il numero di tentativi fatti dall'utente
    const attempsNumber = maxSquaresNumber - mineArray.length;
    // console.log(attempsNumber);

    // Creo un array vuoto in cui inserire i tentativi dell'utente andati a buon fine 
    const successfulAttemptArray = [];

    // Funzione che seleziona l'elemento cliccato e legge il contenuto
    function contentCellClick () {
    this.classList.add('active');    
    const clickedContent = parseInt( this.querySelector('span').textContent );
    // console.log(clickedContent);
        
        // se il numero cliccato è contenuto nell'array generato contenenti le mine allora aggiungo lo sfondo rosso
        if( mineArray.includes(clickedContent)){
            this.classList.add('mine');
            alert('gioco finito');
        } else {
            // altrimenti la cella blu non è più cliccabile
            this.classList.add('active');

            // ignoro ulteriori eventi sull'elemento cliccato 
            this.style.pointerEvents = "none";
            // this.removeEventListener('click', contentCellClick)

            // aggiungo l'elemento cliccato all'array dei tentativi andati a buon fine
            successfulAttemptArray.push(clickedContent);
            console.log(successfulAttemptArray)
        }                                               


    }
}

// Funzione che crea i contenitori
// deve aggiungere la classe square
// popolare la cella col numero
// settare le dimensioni della cella
function newObject (number, squareDimension) {

    // console.log(number);
    // console.log(squareDimension);
    
    // Creo il div
    const newDiv = document.createElement('div');
    // Assegno la classe square al div
    newDiv.classList.add('square');
    // Inserisco il numero nello span
    newDiv.innerHTML = `<span>${number}</span>`;

    // console.log(newDiv);

    newDiv.style.width = `calc(100% / ${squareDimension})`;
    newDiv.style.height = `calc(100% / ${squareDimension})`;
    
    return newDiv;
}

//[x] Genero le mine (creo un array di 16 numeri non duplicati compresi tra 1 e maxSquaresNumber)


// Funzione che genera un array di mine
// maxMineRange = massimo numero di mine che nel caso della consegna è pari a 16
// mineNumber = numero di elementi di mineArray
function createMine (maxMineRange, mineNumber) {
//  creo numeri random fino a maxMine
//  verifico che sia un elemento unico e lo inserisco nell'array mineArray

    const mineArray = [];
    while(mineArray.length < mineNumber) {
        const randomNumber = getRndInteger (1, maxMineRange) 

        if(!mineArray.includes(randomNumber)) {
            mineArray.push(randomNumber);
        }   
    }
    return(mineArray);  
}      
// let test = createMine (100,16);
// console.log(test)



// Funzione standard per generare numeri random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
  

  
// Calcolo il numero massimo di tentativi dopo il  quale l'utente ha vinto (maxSquaresNumber - lunghezza array bombe)

