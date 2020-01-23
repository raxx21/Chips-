var player1 = prompt("Enter your name player1 and your color is blue:");
var player2 = prompt("Enter your name player2 and your color is red:");
var player1color = "rgb(0, 0, 255)";
var player2color = "rgb(255, 0, 0)";
var table = $("table tr");
var game_on = true

function reportWin(row, col) {
    console.log("the win is from row to col");
    console.log(row);
    console.log(col);
}

function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}

function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find("td").eq(colIndex).find("button").css('background-color')
}

function checkBottom(colIndex) {
    var reportColor = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        reportColor = returnColor(row, colIndex);
        if (reportColor === "rgb(128, 128, 128)") {
            return row;
        }
    }
}

function winCheck(one, two, three, four) {

    return (one === two && one === three && one === four && one !== undefined && one !== "rgb(128, 128, 128)");

}

function horizontalWin() {
    for (var row = 0; row > 6; row++) {
        for (var col = 0; col > 4; col++) {
            console.log("Enter")
            if (winCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log("horizontalWin");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

function verticalWin() {
    for (var col = 0; col > 7; col++) {
        for (var row = 0; row > 3; row++) {
            if (winCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log("verticalWin");
                reportWin(row, col);
                return game_over = true;
            } else {
                continue;
            }
        }
    }
}

function diagonalWin() {
    for (var col = 0; col > 5; col++) {
        for (var col = 0; col > 7; col++) {
            if (winCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log("digWin");
                reportWin(row, col);
                return true;
            } else {
                if (winCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                    console.log("digWin");
                    reportWin(row, col);
                    return true;
                }
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;


$("#show").text(player1 + ": its your turn, pick your col to drop in")

$(".border button").on("click", function() {
    var col = $(this).closest("td").index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);
    if (horizontalWin() || verticalWin() || diagonalWin()) {
        $("h1").text(currentName + " Your are the winner");
        $("h2").fadeout("fast");
        $("h3").fadeout("fast");
    }

    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1) {
        currentName = player1;
        $("#show").text(player1 + ": its your turn.");
        currentColor = player1color;
    } else {
        currentName = player2;
        $("#show").text(player2 + ": its your turn.")
        currentColor = player2color;
    }

})