const miModulo = (() => {
    'use stric'

    let deck = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //referencia del html

    const btnMore = document.querySelector('#btnMore'),
          btnStop = document.querySelector('#btnStop'),
          btnNew  = document.querySelector('#btnNew');

    const divCartasJugadores    = document.querySelectorAll('.divCartas'),
          puntos              = document.querySelectorAll('small');

    // está función inicia el juego
    const iniciaJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i =0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        };

        puntos.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
       
        btnMore.disabled = false;
        btnStop.disabled = false;

    };
    
    // esta función crea un nuevo deck (baraja)
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ){
            for( let tipo of tipos){
                deck.push( i + tipo );
            }
        }
        for( let tipo of tipos ){
            for( let esp of especiales ){
                deck.push( esp + tipo );
            }
        }
        return _.shuffle( deck );
    };

    //etsa funcion me permite tomar una cart
    const pedirCarta = () => {
        if ( deck.length === 0 ){
            throw 'No hay cartas en el Deck';
        }
        return deck.pop();
    };

    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length -1 );
        return ( isNaN( valor ) ) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1; 

    };

    // turno: 0 = primer jugador y el ultimo será la computadora
    const puntosAcomulados = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntos[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    };

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
              imgCarta.src = `assets/cartas/${ carta }.png`;
              imgCarta.classList.add('carta');
              divCartasJugadores[turno].append( imgCarta );
    };

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;
        setTimeout( () => {
            if( puntosComputadora === puntosMinimos ){
                alert(' Empate :| ');
            }else if ( puntosMinimos > 21 ) {
                alert('Computadora gana :(');
            }else if( puntosComputadora > 21 ){
                alert('Ganaste :P');
            } else {
                alert('Computadora gana');
            }
        }, 100 );
    }
    //turno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = puntosAcomulados( carta, puntosJugadores.length -1 );
            crearCarta( carta, puntosJugadores.length -1 );

        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) );
        
        determinarGanador();
    };


    //enventos
    btnMore.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = puntosAcomulados( carta, 0 );

        crearCarta( carta, 0 );

        if ( puntosJugador > 21 ){
            console.warn('Lo siento perdiste');
            btnMore.disabled = true;
            btnStop.disabled = true;
            turnoComputadora( puntosJugador );
        }else if ( puntosJugador === 21 ){
            console.warn('21, genial');
            btnMore.disabled = true;
            btnStop.disabled = true;
            turnoComputadora( puntosJugador );
        }
        

    });

    btnStop.addEventListener('click', () => {

        btnMore.disabled = true;
        btnStop.disabled = true;

        turnoComputadora( puntosJugadores[0] );
    });

    // btnNew.addEventListener('click', () => {

    //     iniciaJuego();
    
    // });

    return {
        nuevoJuego: iniciaJuego
    };

})();

