//==================//
// 		Part 1	 	//
//==================//
var preBalance = 0;
var newBalance = 0;
// Gets called whenever the money finished tweening to the bottom.
function addFromCatch(value)
{ 
	newBalance+=value;
};
// Gets called every frame. 
// Time elapsed since the last update is passed into the function(milliseconds)
function onUpdate({delta})
{
	updateBalance((preBalance < newBalance ? preBalance+=50: newBalance).toString());
};

// You have access to a function updateBalance which 
// takes in a string and sets the ui to that value
// updateBalance("1");


//==================//
// 		Part 2	 	//
//==================//
function testForWinner(line)
{	
	let lineScore = 0;
	let fiveIconsUpInALine = (line[0] === line[1]) && (line[1] === line[2]) && (line[2] === line[3]) && (line[3] === line[4]);
	let fourIconsUpInALine = (line[0] === line[1]) && (line[1] === line[2]) && (line[2] === line[3]);
	let threeIconsUpInALine = (line[0] === line[1]) && (line[1] === line[2]);
	let threeInARow=(icon)=>{
		switch(icon) {
		  case 1:
		    return 5
		    break;
		  case 2:
		    return 10
		    break;
		  case 3:
		    return 25
		    break;
		  default:
		  return 0
		}
	};
	let fourInARow=(icon)=>{
		switch(icon) {
		  case 1:
		    return 10
		    break;
		  case 2:
		    return 25
		    break;
		  case 3:
		    return 50
		    break;
		  default:
		  return 0
		}
	};
	let fiveInARow=(icon)=>{
		switch(icon) {
		  case 1:
		    return 20
		    break;
		  case 2:
		    return 50
		    break;
		  case 3:
		    return 100
		    break;
		  default:
		  return 0
		}
	};

	if ( fiveIconsUpInALine ) {
		lineScore = fiveInARow(line[0])
	}
	else if ( fourIconsUpInALine ) {
		lineScore = fourInARow(line[0])
	}
	else if ( threeIconsUpInALine ){
		lineScore = threeInARow(line[0])
	}
	else {
		lineScore = 0
	}
	return lineScore;
};


function processSlots(input)
{
	let totalScore = 0;
	let winningLines = 0;
	let diagonalLineA = [input[0][0], input[1][1], input[2][2], input[1][3], input[0][4]];
	let diagonalLineB = [input[2][0], input[1][1], input[0][2], input[1][3], input[2][4]];
	for (let i =0; i< input.length; i++){
		if ( testForWinner(input[i]) > 0){
			winningLines++
			totalScore+= testForWinner(input[i])
		}
	};

	if (testForWinner(diagonalLineA) || testForWinner(diagonalLineB) > 0){
		totalScore+= testForWinner(diagonalLineB)
		totalScore+= testForWinner(diagonalLineA)
		winningLines++
	};
	
	let messageForPlayer = `${lines > 1? `${lines} winning lines`: `${lines} winning line`}, scoring ${totalScore} points.`;
	return messageForPlayer
};
/** 
1. A winning line always starts from the left-most column.
2. Only test for the 5 examples above, but the code should be set up so it is easy to add more.
3. Only symbols 1, 2, 3 can score.
4. Sample arrays will be passed in to test if the solution was correct.
**/
// examples input
var array = [
	[1,0,0,0,1],
	[0,1,0,1,0],
	[0,0,1,0,0]
];
//Output: '1 winning line, scoring 20 points.'

var array2 = [
	[2,4,2,2,3],
	[1,1,1,4,1],
	[3,3,3,4,2]
];
//Output: '2 winning lines, scoring a total 30 points.'