myApp.controller("gameController", function( $scope, $interval ) {
    $scope.cache = [];
    $scope.num = 1;
    $scope.maxNum = 9;
    $scope.nums = [];
    $scope.boxes = 9;
    $scope.greenBoxes = 1;
    $scope.timerRunning = false;
    $scope.timer = 0;
    $scope.clearTimer = function(){
        $interval.cancel($scope.runTimer);
        $scope.timerRunning = false;
    };
    
 
    ($scope.getRandomNums = function(){
        $("td").removeClass("green");
        $("#botLeft").addClass("green");
        $scope.clearTimer();
        $scope.timer = 0;
        $scope.nums = [];
        for( var i=0; i<$scope.maxNum; i++ ){
            var randomNum = Math.floor(Math.random() * $scope.maxNum + 1); 
            $scope.nums.push(randomNum);
        }
    })();
    
    $scope.checkTimer = function() {
        if( $scope.timerRunning === false ){
            $scope.timerRunning = true;
            $scope.runTimer = $interval(function(){
                $scope.timer++}, 1000);
        }
        if ( $("#topRight").hasClass("green") ){
            $scope.clearTimer();
        }
    }
    
});

var boxes = 9;
var greenBoxes = 1;

$("td").click(function(){
    var left = $(this).prev();
    var right = $(this).next();
    if( $(this).hasClass("left") ){
        var bot = $(this).parent().next().children("td:nth-child(1)");
        var top = $(this).parent().prev().children("td:nth-child(1)");
    } else if ( $(this).hasClass("mid") ){
        var bot = $(this).parent().next().children("td:nth-child(2)");
        var top = $(this).parent().prev().children("td:nth-child(2)");
    } else if( $(this).hasClass("right") ){
        var bot = $(this).parent().next().children("td:nth-child(3)");
        var top = $(this).parent().prev().children("td:nth-child(3)");
    }

    if ( $(this).hasClass("left") ){
        var topLeft = $(this).prev(); 
        var botRight = bot.next();
    } else if ( $(this).hasClass("mid") ){
        var topLeft = left.parent().prev().children("td:nth-child(1)"); 
        var botRight = bot.next();
    } else if ( $(this).hasClass("right") ){
        var topLeft = left.parent().prev().children("td:nth-child(2)"); 
        var botRight = bot.next();
    }

    var thisNum = Number($(this).text());
    var topNum = Number(top.text());
    var botNum = Number(bot.text());
    var leftNum = Number(left.text());
    var rightNum = Number(right.text());

    var topLeftNum = Number(topLeft.text());
    var botRightNum =  Number(botRight.text());

    if ( topLeftNum == 0 ){
        topLeftNum = boxes + 1;
    }

    if ( botRightNum == 0 ){
        botRightNum = boxes + 1;
    }

    console.log("thisNum: " + thisNum);
    console.log("topLeftNum: " + topLeftNum);
    console.log("botRightNum: " + botRightNum);

    if( !$(this).hasClass("green") && (bot.hasClass("green") || !bot.text()) && (left.hasClass("green") || !left.text()) ) {
        if( (thisNum <= topLeftNum || topLeft.hasClass("green")) && (thisNum <= botRightNum || botRight.hasClass("green"))){
            $(this).addClass("green");
            greenBoxes++;
            if( greenBoxes === boxes ){
                alert("Congratulations, you saved the princess!");
            }
        }      
    }
});