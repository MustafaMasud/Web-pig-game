/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var gamePlaying, Scores, roundScore, dice, activePlayer

initialize()




var prevDice

document.querySelector('.btn-roll').addEventListener('click',function(){

    if (gamePlaying){
        //1.Random number generated
        dice = Math.floor(Math.random()*6) + 1

        //2.Displaying the dice
        document.querySelector('.dice').style.display = 'block'
        document.querySelector('.dice').src='./img/dice-'+dice+'.png'

        //3.Update round score IF not 1
        if (dice === 6 && prevDice === 6){
           
            nextPlayer()
            Scores[activePlayer]=0
            document.querySelector('#score-' + activePlayer).textContent = '0'

        }else if(dice!== 1){
            //add Score
            roundScore += dice

            //displaying the roundscore
            document.querySelector('#current-'+ activePlayer).textContent = roundScore
        }
        else{
            //Next Player
            nextPlayer()
        
         
        }
        prevDice = dice
    }

  
})

document.querySelector('.btn-hold').addEventListener('click', function(){
   
    if (gamePlaying){
        //adding score
        scores[activePlayer] += roundScore

        //displaying score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
     
        var limitScore = document.querySelector('.input').value
        var winningScore

        if(limitScore){
            winningScore = limitScore
        }else{
            winningScore = 20
        }
        
        //check if player won
        if(scores[activePlayer]>= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
            gamePlaying = false
        }else{
             //Next Player
            nextPlayer()
        }
    }
   
})

function nextPlayer(){
    if(activePlayer === 0){
        activePlayer = 1
    }else{
        activePlayer = 0
    }
    roundScore= 0  
    
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0' 

    document.querySelector('.player-0-panel').classList.toggle('active') 
    document.querySelector('.player-1-panel').classList.toggle('active')   
    
    document.querySelector('.dice').styles.display='none'

}

document.querySelector('.btn-new').addEventListener('click', initialize)

function initialize(){
    scores = [0,0]
    roundScore = 0
    activePlayer = 0
    gamePlaying = true
    
    
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('#name-0').textContent = 'Player 1'
    document.querySelector('#name-1').textContent = 'Player 2'
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}
