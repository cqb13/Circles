const main = document.getElementsByTagName("main")[0];

const circles = [];

create();

function create() {
  // to adjust for screen size change while running
  const mainWidth = main.offsetWidth;
  const mainHeight = main.offsetHeight;

  const x = Math.floor(Math.random() * mainWidth);
  const y = Math.floor(Math.random() * mainHeight);

  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  circles.push(circle);

  grow(circle, mainHeight, mainWidth);
}

async function grow(circle, mainHeight, mainWidth) {
  const maxSize = Math.floor(Math.random() * 500);

  let currentSize = 0;

  while (currentSize < maxSize) {
    currentSize += 1;

    circle.style.width = `${currentSize}px`;
    circle.style.height = `${currentSize}px`;
    circle.style.opacity = `${currentSize / maxSize}`;

    await new Promise((resolve) => setTimeout(resolve, 3));

    if (circle.offsetLeft + circle.offsetWidth >= mainWidth) {
      break;
    }

    if (circle.offsetTop + circle.offsetHeight >= mainHeight) {
      break;
    }

    // Check if circle touches another circle's border
    for (let i = 0; i < circles.length; i++) {
      if (circle !== circles[i] && doCirclesCollide(circle, circles[i])) {
        circle.style.width = `${currentSize - 1}px`;
        circle.style.height = `${currentSize - 1}px`;
        create();
        return;
      }
    }

    main.appendChild(circle);
  }
  create();
}

// check if two circles collide
function doCirclesCollide(c1, c2) {
  const distance = getDistance(c1, c2);
  const minDistance = c1.offsetWidth / 2 + c2.offsetWidth / 2;
  return distance < minDistance;
}

// get distance between two circles
function getDistance(c1, c2) {
  const x1 = c1.offsetLeft + c1.offsetWidth / 2;
  const y1 = c1.offsetTop + c1.offsetHeight / 2;
  const x2 = c2.offsetLeft + c2.offsetWidth / 2;
  const y2 = c2.offsetTop + c2.offsetHeight / 2;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
