import React, { Component } from "react";

export default class HalloweenGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardArray: [
                {
                    name:'pumpkin',
                    img: 'img/3pumpkins.png'
                },
                {
                    name:'bat',
                    img: 'img/bat.png'
                },
                {
                    name:'candy',
                    img: 'img/candy.png'
                },
                {
                    name: 'candy2',
                    img: 'img/candy2.png'
                },
                {
                    name: 'mask2',
                    img: 'img/mask2.png'
                },
                {
                    name: 'pumpkinstick',
                    img: 'img/pumpkinstick.png'
                },
                {
                    name:'pumpkin',
                    img: 'img/3pumpkins.png'
                },
                {
                    name:'bat',
                    img: 'img/bat.png'
                },
                {
                    name:'candy',
                    img: 'img/candy.png'
                },
                {
                    name: 'candy2',
                    img: 'img/candy2.png'
                },
                {
                    name: 'mask2',
                    img: 'img/mask2.png'
                },
                {
                    name: 'pumpkinstick',
                    img: 'img/pumpkinstick.png'
                }
            ],
            grid:grid = document.querySelector('.grid')
        }}

        grid = document.querySelector('.grid')
        resultDisplay = document.querySelector('#result')
        cardsChosen = []
        cardsChosenId = []
        cardsWon = []
    //board please work :)
createBoard() {
    for (let i = 0; i < this.state.cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/moon.png')
      card.setAttribute('data-id', i)
      card.addEventListener('click', this.flipCard)
      this.state.grid.appendChild(card)
    }
}
    //matches
  checkForMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = this.cardsChosenId[0]
    const optionTwoId = this.cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/moon.png')
      cards[optionTwoId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/moon.png')
      alert('You have clicked the same image!')
    }
    else if (this.cardsChosen[0] === this.cardsChosen[1]) {
      var audio = new Audio('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/wolfshort.mp3');
      audio.play();
      cards[optionOneId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/orange.png')
      cards[optionTwoId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/orange.png')
      cards[optionOneId].removeEventListener('click', this.flipCard)
      cards[optionTwoId].removeEventListener('click', this.flipCard)
      this.cardsWon.push(this.cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/moon.png')
      cards[optionTwoId].setAttribute('src', 'https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/moon.png')
    }
    this.cardsChosen = []
    this.cardsChosenId = []
    this.resultDisplay.textContent = this.cardsWon.length
    if  (this.cardsWon.length === this.cardArray.length/2) {
      audio.pause()
      alert('You WIN!');
      var audio = new Audio('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/congrats.mp3');
      audio.play();
      this.resultDisplay.textContent = 'You WIN-[ANSWER KEY:Number 1-Turnip! | Number 2-2625 Pounds! | Number 3-Ireland | Number 4-True! | Number 5-True!]'
    }
  }

  flipCard() {
    const cardId = this.getAttribute('data-id')
    this.cardsChosen.push(this.cardArray[cardId].name)
    this.cardsChosenId.push(cardId)
    this.setAttribute('src', this.cardArray[cardId].img)
    if (this.cardsChosen.length ===2) {
      setTimeout(this.checkForMatch(), 500)
    }
  }
componentDidMount(){
  this.createBoard()
}

  render() {

    this.state.cardArray.sort(() => 0.5 - Math.random())
    return (
      <body class="custom-cur">
        <form>
          <h1 class="heading">Halloween Activity!</h1>
          <fieldset class="quiz">
            <legend class="question">
              The first Jack O' Lanterns were made out of what?
            </legend>
            {/* Correct Answer-Turnip */}
            <div>
              <input type="radio" id="pumpkin" name="cheese" value="pumpkin" />
              <label for="pumpkin">Pumpkin</label>
              <input
                type="radio"
                name="cheese"
                id="cantoleuope"
                value="cantoleuope"
              />
              <label for="cantoleuope">Cantoleuope</label>
              <input type="radio" name="cheese" id="turnip" value="turnip" />
              <label for="turnip">Turnip</label>
              <input
                type="radio"
                name="cheese"
                id="watermelon"
                value="watermelon"
              />
              <label for="watermelon">Watermelon</label>
            </div>
          </fieldset>
          <fieldset class="quiz">
            <legend class="question">
              How heavy do you think the worlds largest pumpkin was?
            </legend>
            {/* Correct Answer-2625 */}
            <div>
              <input type="radio" name="wieght" id="2145lbs" value="2145lbs" />
              <label for="2145lbs">2145 Lbs</label>
              <input type="radio" name="wieght" id="1455lbs" value="1455lbs" />
              <label for="1455lbs">1455 Lbs</label>
              <input type="radio" name="wieght" id="3456" value="3456" />
              <label for="3456">3456 Lbs</label>
              <input type="radio" name="wieght" id="2625" value="2625" />
              <label for="2625">2625 Lbs</label>
            </div>
          </fieldset>
          <fieldset class="quiz">
            <legend class="question">
              What country was Halloween supposedly started in?
            </legend>
            {/* Correct Answer-Ireland */}
            <div>
              <input type="radio" name="country" id="ireland" value="ireland" />
              <label for="ireland">Ireland</label>
              <input type="radio" name="country" id="usa" value="usa" />
              <label for="usa">United States of America</label>
              <input type="radio" name="country" id="mexico" value="mexico" />
              <label for="mexico">Mexico</label>
              <input type="radio" name="country" id="germany" value="germany" />
              <label for="germany">Germany</label>
            </div>
          </fieldset>
          <fieldset class="quiz">
            <legend class="question">
              True or False: Halloween has been around since medival times.
            </legend>
            <div>
              <input type="radio" name="option" id="false" value="false" />
              <label for="false">False</label>
              <input type="radio" name="option" id="true" value="true" />
              <label for="true">True</label>
            </div>
          </fieldset>
          <fieldset class="quiz">
            <legend class="question">
              True or False: Halloween is the second most popular holiday in the
              US.
            </legend>
            <div>
              <input
                type="radio"
                name="halloween"
                id="holiday"
                value="holiday"
              />
              <label for="holiday">True</label>
              <input
                type="radio"
                name="halloween"
                id="popular"
                value="popular"
              />
              <label for="popular">False</label>
            </div>
          </fieldset>
        </form>
        <h2 class="heading">Complete Game to Unlock Answer Key</h2>
        <div>
          <h3 class="heading">
            Score:<span id="result"></span>
          </h3>
          <div class="hgrid" />
        </div>
      </body>
    );
  }
}
