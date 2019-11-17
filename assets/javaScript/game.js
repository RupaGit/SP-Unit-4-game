//declaring an object and adding multiple instances of the object for each of the avenger charecter

var playersArray = [];
var player;
var opponent;
var firstAttackPower = 0;
var playerSelected = false;
var defendentSelected = false;

//Creating an object of Avenger
function avenger(name,healthPoints,attackPower,counterAttackPower, imageFile) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.imageSource = imageFile;
}

function avengerAlive(obj) {
    if (obj.healthPoints > 0) {
        return true ;
    }
    return false;
}

function isWinner () {
    if ((playersArray.length === 0) && (player.healthPoints > 0)) {
        return true;
    }
    return false;
}

function setFirstAttack (obj) {
    firstAttackPower = obj.attackPower;
}

function increasePower(obj) {
    obj.attackPower += 10;
}

function attack (obj) {
    obj.healthPoints -= this.attackPower;
    increasePower(this);
}

function counterAttack (obj) {
    obj.healthPoints -= this.counterAttackPower;
}

//Creating instances of avenger object 
function initAvengers(){
    var ironMan = new avenger("IRONMAN" , 1000, 75, 80, "./assets/images/ironManPic.jpg");
    var thor = new avenger("THOR" , 1400, 100, 120, "./assets/images/thor.jpg" );
    var hulk = new avenger("HULK" , 2000, 150, 150, "./assets/images/hulk.jpeg");
    var capAmerica = new avenger("CAPTAINAMERICA" , 1000, 75, 80, "./assets/images/captainAmerica.jpg");
    playersArray.push(ironMan,thor,hulk,capAmerica);
}

//Displaying Avengers images to pick a player
function displayAvengers(playerDiv) {
    for (var i=0; i<playersArray.length; i++) {
        $(playerDiv).append('<div />');
        $(playerDiv + " div:last-child").addClass("card");
        $(playerDiv + " div:last-child").addClass("col-lg-3");
        $(playerDiv + " div:last-child").append("<img />");
        $(playerDiv + " img:last-child").attr("id", playersArray[i].name);
        $(playerDiv + " img:last-child").attr("class", "card-img-top");
        $(playerDiv + " img:last-child").attr("src", playersArray[i].imageSource);
        $(playerDiv + " img:last-child").attr("width", 150);
        $(playerDiv + " img:last-child").addClass("img-thumbnail");
        $(playerDiv + " div:last-child").append(playersArray[i].name + "<br>");
        $(playerDiv + " div:last-child").append("HP: " + playersArray[i].healthPoints);
        $(playerDiv + " idv:last-child").append();
    }    
}

// Update the players once a player is selected
function updateAvengers(originalDiv, newDiv) {
    $(originalDiv).children().remove ();
    for (var i=0; i<playersArray.length; i++) {
        $(newDiv).append("<img />");
        $(newDiv + " img:last-child").attr("id", playersArray[i].name);
        $(newDiv + " img:last-child").attr("src", playersArray[i].imageSource);
        $(newDiv + " img:last-child").attr("width", 150);
        $(newDiv + " img:last-child").addClass("img-thumbnail");
    }
}

$('body').on('click','img',function() { 
    if(playerSelected && !defendentSelected  && (this.id != player.name)) {
        for (var m=0; m<playersArray.length; m++) {
            if(playersArray[m].name === this.id){
                opponent = playersArray[m];
                playersArray.splice(m,1);
                console.log(playersArray);
                console.log(opponent);
                defendentSelected = true;
            }
        }
        $("#defendentHolder").append(this);
        $("#defendentHolder").append("<br>" + opponent.name);
        $("#defendentInfoHolder").append(opponent.healthPoints);
    }  
    //console.log(eventObj.target.id);  
    if(!playerSelected) {
        for ( var i=0; i<playersArray.length; i++){
            if(playersArray[i].name === this.id){
                player = playersArray[i];
                playersArray.splice(i,1);
                console.log(playersArray);
                console.log(player);
                playerSelected = true;
                displayInGame();
                setFirstAttack(player);
            }
        }
        updateAvengers("#imageHolder","#remainingPlayerHolder");
        $("#playerHolder").append(this);
        $("#playerHolder").append("<br>" + player.name);
        $("#playerInfoHolder").append(player.healthPoints);
    }        
});

$('body').on('click','#attackButton',function() {
    if(playerSelected && defendentSelected){
        if(avengerAlive(player) && avengerAlive(opponent)) {
            attack.call(player, opponent);
            $("#playerDamageInfo").html(player.name + " attacked you and did a damage of " + player.attackPower );
            counterAttack.call(opponent,player);
            $("#opponentDamageInfo").html(opponent.name + " counter attacked you and did a damage of " + opponent.counterAttackPower );

            $("#playerInfoHolder").html(player.healthPoints);
            $("#defendentInfoHolder").html(opponent.healthPoints);
            if(!avengerAlive(player)) {
                $("#message").html("You Lost... Press restart to play again");
                $("#attackButton").html("Restart Game")
                $('body').on("click", "#attackButton", function () { 
                    location.reload();
                });
            }
            if(!avengerAlive(opponent)) {
                $("#message").html("You defeated your opponent...");
            }
        }
    }
    if(!avengerAlive(opponent)) {
        $("#defendentHolder").children().remove();
        $("#defendentInfoHolder").children().remove();
        $("#defendentHolder").html("");
        $("#defendentInfoHolder").html("");

        defendentSelected = false;
        if(isWinner.call(player)){
            $("#message").html("You defeated all your opponents... You WON!!!");
            $("#attackButton").html("Restart Game")
                $('body').on("click", "#attackButton", function () { 
                    location.reload(); });
        }
    }

});

function displayInGame(){
    $("#firstPage").empty();
    $("#secondPage").show();
    $("#attackArea").show();
}

$(document).ready(function () {
    $("#secondPage").hide();
    $("#attackArea").hide();
    initAvengers();
    displayAvengers("#imageHolder");
});
