const playBtn = document.querySelector('.intro button');
const introScreen = document.querySelector('.intro');
const matchScreen = document.querySelector('.match');
const winner = document.querySelector('.winner');
const game = () => {
    let pScore = 0;
    let cScore = 0;
    const x = 1;
    // Start the Game:
    const startGame = () => {
        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
        });
    };
    // play Match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });

        // Computer Options
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function() {
                playerHand.src = `./img/rock.png`;
                computerHand.src = `./img/rock.png`;
                winner.textContent = '';
                // Computer Choice :
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                playerHand.style.animation = "shakePlayer 1s ease";
                computerHand.style.animation = "shakeComputer 1s ease";
                setTimeout(() => {
                    // Compare Hands
                    compareHands(this.textContent, computerChoice);
                    // Update Images
                    playerHand.src = `./img/${this.textContent}.png`;
                    computerHand.src = `./img/${computerChoice}.png`;
                }, 1100);

            });
        });
    };

    const updateScore = () => {
        playerscore = document.querySelector('.player-score p');
        computerScore = document.querySelector('.computer-score p');
        playerscore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    const compareHands = (playerChoice, computerChoice) => {
        // Update Text;
        // Check for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a Tie';
            return;
        }
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
            }
        }
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
            }
        }
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
            }
        }
    };
    // Is call all the inner Functions
    startGame();
    playMatch();
};
game();