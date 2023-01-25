const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const match_score = Array(3).fill(0); 

const map = new Map();
map.set(0, 'rock'); 
map.set(1, 'paper');
map.set(2, 'scissors'); 

rock.addEventListener("click", () => game("rock"))
paper.addEventListener("click", () => game("paper"))
scissors.addEventListener("click", () => game("scissors"))



function game(playerChoice) { 

    playARound(playerChoice);

    /* 
        - check the document for an element 
        - similar steps: 
            - create a div for the score header 
            - create a div for keeping track of score 
            - appending it to the body 
        - difference is I have to check if the div for keeping score actually exists or not 
    */ 
    
    let score_keeper = document.createElement("div"); 
    score_keeper.classList.add("score-keeper"); 
    score_keeper.id = "keeper";

    let player = document.createElement("h2");
    let comp = document.createElement("h2");
    let ties = document.createElement("h2");
    
    player.textContent = "Player Wins: " + match_score[0]; 
    comp.textContent = "Computer Wins: " + match_score[1]; 
    ties.textContent = "Ties: " + match_score[2]; 

    score_keeper.appendChild(player);
    score_keeper.appendChild(comp);
    score_keeper.appendChild(ties);

    let old = document.getElementById("keeper"); 

    if(!old){ 
        let scoreboard = document.createElement("div"); 
        scoreboard.classList.add("scoreboard"); 
        scoreboard.id = "scoreboard"

        let title = document.createElement("h1"); 
        title.textContent = "SCORE"; 

        scoreboard.appendChild(title); 
        score_keeper.id = "keeper"; 

        scoreboard.append(score_keeper);

        document.body.append(scoreboard);
        return; 
    }

    old.parentNode.replaceChild(score_keeper, old);

} 

function playARound(playerChoice){ 

    compChoice = getComputerChoice() 

    if (match_score[0] < 5 && match_score[1] < 5){ 

        switch (playerChoice) { 

            case 'rock': 
                switch (compChoice){ 
                    case 'rock': 
                        match_score[2]++; 
                        break; 
                    case 'paper': 
                        match_score[1]++; 
                        break; 
                    case 'scissors': 
                        match_score[0]++; 
                        break;
                }
                break; 

            case 'paper': 
                switch (compChoice){ 
                    case 'rock': 
                        match_score[0]++; 
                        break; 
                    case 'paper': 
                        match_score[2]++; 
                        break;
                    case 'scissors': 
                        match_score[1]++; 
                        break; 
                }
                break; 

            case 'scissors': 
                switch (compChoice){ 
                    case 'rock': 
                        match_score[1]++; 
                        break; 
                    case 'paper': 
                        match_score[0]++; 
                        break; 
                    case 'scissors': 
                        match_score[2]++; 
                        break; 
                }
                break; 
        }
    }

    let winning_banner = document.createElement("h1"); 

    if (match_score[0] >= 5 || match_score[1] >= 5){
        if (match_score[0] > match_score[1]){ 
            winning_banner.textContent = "YOU WON, RELOAD TO START AGAIN";
        }else { 
            winning_banner.textContent = "YOU LOST, RELOAD TO START AGAIN";
        }

        let scoreboard = document.getElementById("scoreboard"); 
        scoreboard.append(winning_banner);
        rock.disabled = true; 
        paper.disabled = true; 
        scissors.disabled = true; 
    }
}

function getComputerChoice() { 

    compChoice = Math.floor(Math.random()*3); 

    return map.get(compChoice); 
}