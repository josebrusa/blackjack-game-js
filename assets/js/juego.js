
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosOrdenador = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntaje = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasOrdenador = document.querySelector('#computadora-cartas');


// Esta funcion crea un nuevo deck
const createDeck = () => {

    for(let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }
        for(let tipo of tipos){
            for (let esp of especiales){
                deck.push(esp + tipo)
            }
        }
        deck = _.shuffle(deck)
        return deck;
}

createDeck();

const pedirCarta = () => {

    if (deck.length === 0 ) {
        throw ' No hay mas cartas'
    }
    const carta = deck.pop()

    return carta;
}

pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);
        return (isNaN(valor)) ?
                ( valor === 'A' ) ? 10 : 11
                : valor * 1;


    // let puntos = 0;
    // if (isNaN(valor)){
        // puntos = (valor === 'A') ? 11 : 10;
    // }else {
        // puntos = valor * 1;
    // }
}

// turno computadora

const turnoComputadora = ( puntosMinimo ) => {
    do {
        const carta = pedirCarta();
        puntosOrdenador = puntosOrdenador + valorCarta( carta );
        puntaje[1].innerText = puntosOrdenador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add ('carta');
        divCartasOrdenador.append( imgCarta );

        if ( puntosMinimo > 21 ){
            break;
        }

    } while( (puntosOrdenador < puntosMinimo) && (puntosMinimo <= 21) );

    setTimeout(() => {

        if ( puntosOrdenador === puntosMinimo ) {
            alert('Nadie gana')
        } else if (puntosMinimo > 21) {
            alert('Comptadora Gana')
        } else if ( puntosOrdenador > 21 ) {
            alert('Has Ganado!')
        } else {
            alert('Computadora Gana')
        }
    }, 100)

}

const valor = valorCarta(pedirCarta())

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntaje[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add ('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Perdiste, intentalo otra vez');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});


btnNuevo.addEventListener('click', () => {
    console.clear();
    
    deck = [];
    deck = createDeck();

    puntosJugador = 0;
    puntosOrdenador = 0;

    puntaje[0].innerText = 0;
    puntaje[1].innerText = 0;

    divCartasOrdenador. innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

})


