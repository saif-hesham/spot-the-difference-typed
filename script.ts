let n: number = 1;
const positionSet: Set<number> = new Set();
let targetedDiv: undefined | Element = undefined;

const generatePositions = (): void => {
  const randomPosition = Math.floor(Math.random() * 20) + 1;
  if (positionSet.has(randomPosition)) generatePositions();
  else positionSet.add(randomPosition);
};

const generateRandomPosition = (): number => {
  const randomPosition = Math.floor(Math.random() * 20) + 1;
  if (positionSet.has(randomPosition)) return generateRandomPosition();
  else return randomPosition;
};

const generateRandomPic = (): HTMLImageElement => {
  const pic = document.createElement('img');
  const picNumber = Math.floor(Math.random() * 5) + 1;
  pic.src = `Images/img (${picNumber}).svg`;
  pic.style.width = '50%';
  return pic;
};

const appendElement = (pic: Node, pos: Element) => {
  pos.appendChild(pic);
};
const reset = (): void => {
  const allElements = document.querySelectorAll('[class^= item');
  for (const elemnt of allElements) elemnt.innerHTML = '';
};

const game = (): void => {
  if (n === 19) {
    alert('congrats, you won');
    return;
  }
  const pic = generateRandomPic();

  for (let i = 0; i < n; i++) {
    generatePositions();
  }

  for (const position of positionSet) {
    const picturePositions = document.getElementsByClassName(
      `item-${position}`
    );
    appendElement(pic.cloneNode(true), picturePositions[0]);
    appendElement(pic.cloneNode(true), picturePositions[1]);
  }

  const oddNumber = generateRandomPosition();
  const randomSide = Math.floor(Math.random() * 2);
  const oddPosition = document.getElementsByClassName(`item-${oddNumber}`)[
    randomSide
  ];
  targetedDiv = oddPosition;
  console.log(oddPosition);
  const oddPic = pic.cloneNode(true) as Element;
  oddPic.className = 'odd';
  appendElement(oddPic, oddPosition);
};

game();
document.body.addEventListener('click', (e: Event) => {
  if (
    e.target === targetedDiv ||
    (e.target as HTMLElement).className === 'odd'
  ) {
    n++;
  } else {
    n = 1;
    // alert('You lost, try again');
  }
  reset();
  positionSet.clear();
  game();
});
