const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');

let playerLives = 6;

//Link variables valor
playerLivesCount.textContent = playerLives;

//Generating data
const getData = () => [

{imgSrc: './images/1.jpg', name: 'uno'},
{imgSrc: './images/2.jpg', name: 'dos'},
{imgSrc: './images/4.jpg', name: 'cuatro'},
{imgSrc: './images/5.jpg', name: 'cinco'},
{imgSrc: './images/6.jpg', name: 'seis'},
{imgSrc: './images/7.jpg', name: 'siete'},
{imgSrc: './images/8.jpg', name: 'ocho'},
{imgSrc: './images/9.jpg', name: 'nueve'},
{imgSrc: './images/1.jpg', name: 'uno'},
{imgSrc: './images/2.jpg', name: 'dos'},
{imgSrc: './images/4.jpg', name: 'cuatro'},
{imgSrc: './images/5.jpg', name: 'cinco'},
{imgSrc: './images/6.jpg', name: 'seis'},
{imgSrc: './images/7.jpg', name: 'siete'},
{imgSrc: './images/8.jpg', name: 'ocho'},
{imgSrc: './images/9.jpg', name: 'nueve'},


]
//randomize pictures
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    console.log(cardData)
    return cardData
}


//card generator
const cardGenerator = () => {
    const cardData = randomize();
    //generate the html cards
   console.log(cardData)


   cardData.forEach((item) =>  {

       const card = document.createElement('div');
       const face = document.createElement('img');
       const back = document.createElement('div');
       card.classList = 'card';
       face.classList = 'face';
       back.classList = 'back';
     
       //attach pic and name
      face.src = item.imgSrc;
      console.log(item.imgSrc)
      card.setAttribute('name', item.name)
      
       //cards to section
       section.appendChild(card);
       card.appendChild(face);
       card.appendChild(back);
       card.addEventListener('click', (e) => {
           card.classList.toggle('toggleCard');
           checkCards(e);
       })
   })
};

//check cards match
const checkCards = (e) => {
    const clickedCard = e.target;
    console.log(clickedCard);
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    //logic

    if(flippedCards.length === 2) {
       if( 
       flippedCards[0].getAttribute('name') === 
       flippedCards[1].getAttribute('name')
       ) {
        console.log('match')
        flippedCards.forEach( card => {
            card.classList.remove('flipped');
            card.style.pointerEvents = 'none';
         })
       
    } else {
        console.log('wrong')
        flippedCards.forEach( card => {
            card.classList.remove('flipped');
            setTimeout(() => card.classList.remove('toggleCard'), 1000)
         })
        
         playerLives--;
    }
    setTimeout(() => {
        playerLivesCount.textContent = playerLives;
    }, 1000)
    if(playerLives === 0) {
      setTimeout(() => {
        restart("Try again");
      }, 1000)
   }
}
//check wins
if(toggleCard.length === 16) {
    restart("You won!")
}

}

//Restart game

const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
        
   cardData.forEach((item , index) => {
        cards[index].classList.remove('toggleCard');
        //randomize again
        setTimeout(() => {

            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);
    })
   playerLives = 6;
   playerLivesCount.textContent = playerLives;
   setTimeout(() => window.alert(text), 100)
}

cardGenerator();

