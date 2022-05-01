const room = () => {
    let modal = document.querySelector('.room__modal');

    let sofa = document.querySelector('.view-1__sofa').querySelector('.clickable');
    let table = document.querySelector('.view-1__table').querySelector('.clickable');
    let plant = document.querySelector('.view-1__plant').querySelector('.clickable');
    let window = document.querySelector('.view-1__window').querySelector('.clickable');
    let carpet = document.querySelector('.view-1__carpet').querySelector('.clickable');
    let picture = document.querySelector('.view-1__picture').querySelector('.clickable');


    let items = [sofa, table, plant, window, carpet, picture];
    let luggage = [];

    document.querySelector('.arrow').addEventListener('click', () => {
        document.querySelector('.room__view-1').classList.toggle('active');
        document.querySelector('.room__view-2').classList.toggle('active');
    })

    document.querySelector('.open_door').addEventListener('click', () => {
       if(luggage.find(elem => elem.name == 'key')) alert('You win!');
    })


    items.forEach((elem) => {
        elem.addEventListener('click', () => {
            modal.classList.toggle('active');
            modal.style.setProperty('--modal-bg', `url('../source/modal_${elem.dataset['name']}.png')`)
            
            if (elem.dataset['name'] == 'carpet' && !luggage.find(item => item.name == "card1")) {
                let card = modal.querySelector('.room__modal_card').cloneNode(true);
                modal.append(card);
                card.style.setProperty('--modal-card', `url('../source/card1.png')`);
                card.style.display = 'block';
                card.style.top = '280px';
                card.style.left = '550px';
                card.style.transform = 'rotate(30deg)';
                card.addEventListener('click', () => {
                    addLuggageItem({
                        name: 'card1',
                        bg: `url('../source/card1.png')`,
                        numb: 1,
                    })
                    card.style.display = 'none';
                    console.log(luggage);
                }, {once:true});
                modal.querySelector('.room__modal_close').addEventListener('click', () => {
                    card.style.display = 'none';
                });
            }
            if (elem.dataset['name'] == 'plant' && !luggage.find(item => item.name == "card2")) {
                let card = modal.querySelector('.room__modal_card').cloneNode(true);
                modal.append(card);
                card.style.setProperty('--modal-card', `url('../source/card2.png')`);
                card.style.display = 'block';
                card.style.top = '45px';
                card.style.left = '390px';
                card.style.transform = 'rotate(10deg) scale(0.5, 0.5)';
                card.addEventListener('click', () => {
                    addLuggageItem({
                        name: 'card2',
                        bg: `url('../source/card2.png')`,
                        numb: 2,
                    })
                    card.style.display = 'none';
                }, {once:true});
                modal.querySelector('.room__modal_close').addEventListener('click', () => {
                    card.style.display = 'none';
                });
            }
            if (elem.dataset['name'] == 'sofa' && !luggage.find(item => item.name == "card3")) {
                let card = modal.querySelector('.room__modal_card').cloneNode(true);
                modal.append(card);
                card.style.setProperty('--modal-card', `url('../source/card3.png')`);
                card.style.display = 'block';
                card.style.top = '410px';
                card.style.left = '570px';
                card.style.transform = 'rotate(60deg) scale(0.3, 0.5)';
                card.addEventListener('click', () => {
                    //luggage.push('card3');
                    addLuggageItem({
                        name: 'card3',
                        bg: `url('../source/card3.png')`,
                        numb: 3,
                    })
                    card.style.display = 'none';
                }, {once:true});
                modal.querySelector('.room__modal_close').addEventListener('click', () => {
                    card.style.display = 'none';
                });
            }
            if (elem.dataset['name'] == 'picture') {
                if(!checkSafe()) {
                    for(let i = 1; i <= 3; i++) {
                        let cardPort = document.createElement('div');
                        cardPort.setAttribute('id', `cardPort-${i}`);
                        cardPort.setAttribute('class', `cardPort`);
                        modal.append(cardPort);
                    }
                    modal.querySelector('.room__modal_close').addEventListener('click', () => {
                        modal.querySelectorAll('.cardPort').forEach((elem) => elem.remove());
                        document.querySelectorAll('.luggage__item').forEach((elem) => {
                            console.log(elem);
                            if(elem.getAttribute('id') != 'key') elem.remove()
                        });
                        luggage.forEach(item => {
                            let newItem = luggageItem.cloneNode(true);
                            newItem.setAttribute('id', `cardLug-${item.numb}`);
                            newItem.style.background = `${item.bg} center/100% 100% no-repeat`;
                            if(!checkSafe()) luggageObj.append(newItem);
                        })
                        if(modal.querySelectorAll('.pinNum').length) {
                            modal.querySelectorAll('.pinNum').forEach(elem => elem.remove());
                        }
                        if(modal.querySelector('.key')) {
                            modal.querySelector('.key').remove();
                        }
                        pinNum = "";

                    });
                    dragCards();
                    
                } else if (luggage.find(item => item.name == 'key')) {
                    modal.style.setProperty('--modal-bg', `url('../source/modal_safe_opened.png')`);
                } else {
                    modal.style.setProperty('--modal-bg', `url('../source/modal_safe.png')`);
                    for (let i = 1; i <= 4; i++) {
                        let pinNum = document.createElement('div');
                        pinNum.classList.add('pinNum');
                        pinNum.setAttribute('id', `pinNum-${i}`);
                        pinNum.dataset['num'] = i;
                        modal.append(pinNum);
                    }
                    
                    modal.querySelectorAll('.pinNum').forEach((elem) => {
                        elem.addEventListener('click', () => {
                            console.log('---');
                            enteredPin += elem.dataset['num'];
                            console.log(enteredPin);
                            if(checkPin()) {
                               addKey();
                            }
                        })
                    });

                    modal.querySelector('.room__modal_close').addEventListener('click', () => {
                        modal.querySelectorAll('.pinNum').forEach((elem) => elem.remove());
                    });
                }
            }
        })
    })
    let Pin = /1234/;
    let enteredPin = '';

    let checkPin = () => {
        if(enteredPin.match(Pin)) return true;
        else false;
    }
    
    let addKey = () => {
        modal.style.setProperty('--modal-bg', `url('../source/modal_safe_opened.png')`);
        modal.querySelectorAll('.pinNum').forEach(elem => elem.remove());
        let key = document.createElement('div');
        modal.append(key);
        key.classList.add('key');
        modal.append(key);
        key.addEventListener('click', () => {
            addLuggageItem({
                name: 'key',
                bg: `url('../source/key.png')`,
            })
            key.style.display = 'none';
        }, {once:true});
    }


    let luggageObj = document.querySelector('.luggage');
    let luggageItem = document.createElement('div');
    luggageItem.classList.add('luggage__item');
    let addLuggageItem = (item) => {
        luggage.push(item);
        let newItem = luggageItem.cloneNode(true);
        if(item.name != 'key'){
            newItem.setAttribute('id', `cardLug-${item.numb}`);
            newItem.style.background = `${item.bg} center/100% 100% no-repeat`;
        }
        else {
            newItem.setAttribute('id', `key`);
            newItem.style.background = `${item.bg} center/70% auto no-repeat`;
        }
        luggageObj.append(newItem);
    }


    modal.querySelector('.room__modal_close').addEventListener('click', () => {
        modal.classList.toggle('active');
    });
    
    let safeAvailable = {
        '1': false,
        '2': false,
        '3': false,
    }

    let dragCards = () => {
        console.log('+');
        $("#cardLug-1").draggable();
        $("#cardLug-2").draggable();
        $("#cardLug-3").draggable();
        for (let i = 1; i <= 3; i++) {
                $(`#cardPort-${i}`).droppable(
            {
                accept:`#cardLug-${i}`,
                drop: function()
                {
                    safeAvailable[`${i}`] = true;
                    if(checkSafe()) {
                        modal.querySelectorAll('.cardPort').forEach((elem) => elem.remove());
                        document.querySelectorAll('.luggage__item').forEach((elem) => {elem.remove()});
                        modal.style.setProperty('--modal-bg', `url('../source/modal_safe.png')`);
                        for (let i = 1; i <= 4; i++) {
                            let pinNum = document.createElement('div');
                            pinNum.classList.add('pinNum');
                            pinNum.setAttribute('id', `pinNum-${i}`);
                            console.log('+-+-');
                            pinNum.dataset['num'] = i;
                            modal.append(pinNum);
                        }
                        modal.querySelectorAll('.pinNum').forEach((elem) => {
                            elem.addEventListener('click', () => {
                                console.log('---');
                                enteredPin += elem.dataset['num'];
                                console.log(enteredPin);
                                if(checkPin()) {
                                  addKey();
                                }
                            })
                        });
                    }
                },
                out: function()
                {
                    safeAvailable[`${i}`] = false;
                }
            });
        }
        
    }    

    let checkSafe = () => {
        if(safeAvailable['1'] == true && safeAvailable['2'] == true && safeAvailable['3'] == true) {
           return true
        } else return false;
    }


}
// $(document).ready(function() {
//         console.log('+');
//         $("#cardLug-1").draggable();
//         $("#cardPort-1").droppable(
//         {
//             drop: function(event, ui)
//             {
//                     $(this).css("background-color", "#f0f0a0");
//             }
//         });
    
// });
$(document).ready(room());