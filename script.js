var n = 1;
var positionSet = new Set();
var targetedDiv = undefined;
var generatePositions = function () {
    var randomPosition = Math.floor(Math.random() * 20) + 1;
    if (positionSet.has(randomPosition))
        generatePositions();
    else
        positionSet.add(randomPosition);
};
var generateRandomPosition = function () {
    var randomPosition = Math.floor(Math.random() * 20) + 1;
    if (positionSet.has(randomPosition))
        return generateRandomPosition();
    else
        return randomPosition;
};
var generateRandomPic = function () {
    var pic = document.createElement('img');
    var picNumber = Math.floor(Math.random() * 5) + 1;
    pic.src = "Images/img (".concat(picNumber, ").svg");
    pic.style.width = '50%';
    return pic;
};
var appendElement = function (pic, pos) {
    pos.appendChild(pic);
};
var reset = function () {
    var allElements = document.querySelectorAll('[class^= item');
    for (var _i = 0, allElements_1 = allElements; _i < allElements_1.length; _i++) {
        var elemnt = allElements_1[_i];
        elemnt.innerHTML = '';
    }
};
var game = function () {
    if (n === 19) {
        alert('congrats, you won');
        return;
    }
    var pic = generateRandomPic();
    for (var i = 0; i < n; i++) {
        generatePositions();
    }
    for (var _i = 0, positionSet_1 = positionSet; _i < positionSet_1.length; _i++) {
        var position = positionSet_1[_i];
        var picturePositions = document.getElementsByClassName("item-".concat(position));
        appendElement(pic.cloneNode(true), picturePositions[0]);
        appendElement(pic.cloneNode(true), picturePositions[1]);
    }
    var oddNumber = generateRandomPosition();
    var randomSide = Math.floor(Math.random() * 2);
    var oddPosition = document.getElementsByClassName("item-".concat(oddNumber))[randomSide];
    targetedDiv = oddPosition;
    console.log(oddPosition);
    var oddPic = pic.cloneNode(true);
    oddPic.className = 'odd';
    appendElement(oddPic, oddPosition);
};
game();
document.body.addEventListener('click', function (e) {
    if (e.target === targetedDiv ||
        e.target.className === 'odd') {
        n++;
    }
    else {
        n = 1;
        // alert('You lost, try again');
    }
    reset();
    positionSet.clear();
    game();
});
