var MOVES = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function gameReset(){
    MOVES = 0;
    game_moves.innerHTML = "Movimentos: 0";

    document.querySelectorAll(".card_selected").forEach(el => el.classList.remove("card_selected"));

    document.querySelectorAll(".card_locked").forEach((el, i) => {
        setTimeout(()=>{
            el.classList.remove("card_locked");
        }, 100 * i);
    });
    
    setTimeout(() => {
        for (let i = 0; i < 25; i++){
            let randA = getRandomInt(0, game_area.children.length);
            let randB = getRandomInt(0, game_area.children.length);
            game_area.insertBefore(game_area.children[randA], game_area.children[randB]);
        }
    }, 200);

}


document.querySelectorAll(".card").forEach(card => {

    card.onmousedown = (event) => {
        if ( event.button != 0 ) return;
        
        let card_selected_list = document.querySelectorAll(".card_selected");
        
        if ( card_selected_list.length >= 2 || card.classList.contains("card_locked") || card.classList.contains("card_selected") ) return;

        card.classList.add("card_selected");
        game_moves.innerHTML = `Movimentos: ${++MOVES}`;

        if ( card_selected_list.length != 1 ) return;
        
        card_selected_list = document.querySelectorAll(".card_selected");
        let isEqual = card_selected_list[0].getAttribute("card-name") == card_selected_list[1].getAttribute("card-name");

        setTimeout(()=>{
            card_selected_list.forEach(el => el.classList.toggle("card_locked", isEqual));
            setTimeout(()=>{
                card_selected_list.forEach(el => el.classList.toggle("card_selected", false));
            }, 200);
        }, 500);
        
    };

});



onkeydown = (event) => {
    if (!event.repeat && event.key == "r" ) gameReset();
};



onload = gameReset;