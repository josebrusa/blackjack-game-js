
const miModulo = (() => {
    'use strict';

    let deck = [];
    const   tipos = ['C', 'D', 'H', 'S'],
            especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const   btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');
            
    const   divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntaje = document.querySelectorAll('small');

    // funcion que inicializa el juego

    const inicializarJuego = ( numJugadores = 2 ) => {
        
        deck = crearDeck();
        puntosJugadores = [];
        
        for( let i = 0; i < numJugadores; i++ ){
            puntosJugadores.push( 0 );
        }

        puntaje.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
        
        deck = [];
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
            return _.shuffle(deck);
    }

    const pedirCarta = () => {

        if ( deck.length === 0 ) {
            throw ' No hay cartas en el deck';
        }
        return deck.pop();
    }
    


    const valorCarta = ( carta ) => {
        const valor = carta.substring( 0, carta.length -1 );
            return ( isNaN( valor ) ) ?
                    ( valor === 'A' ) ? 11 : 10
                    : valor * 1;
    }

    // Turno: 0 primer jugador y el ultimo sera la computadora

    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntaje[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add ('carta');
        divCartasJugadores[turno].append( imgCarta );
    }

    //Definir ganador 

    const determinarGanador = () => {

        const [ puntosMinimo, puntosOrdenador ] = puntosJugadores;

        setTimeout(() => {

            if ( puntosOrdenador === puntosMinimo ) {
                alert('Nadie gana')
            } else if (puntosMinimo > 21) {
                alert('Computadora Gana')
            } else if ( puntosOrdenador > 21 ) {
                alert('Has Ganado!')
            } else {
                alert('Computadora Gana')
            }
        }, 100)

    }


    // turno computadora

    const turnoComputadora = ( puntosMinimo ) => {

        let puntosOrdenador = 0;

        do {
            const carta = pedirCarta();
            puntosOrdenador = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta( carta, puntosJugadores.length - 1 );

        } while( (puntosOrdenador < puntosMinimo) && (puntosMinimo <= 21) );

        determinarGanador();

    }

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0 );

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
        turnoComputadora( puntosJugadores[0] );
    });


    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();

    });

    return {
        nuevoJuego: inicializarJuego
    }
})();
