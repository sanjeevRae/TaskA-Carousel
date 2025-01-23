const cards = document.querySelectorAll('.card');
let currentIndex = 0;

function updateCards() {
  cards.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next', 'hidden');

    if (index === currentIndex) {
      card.classList.add('active');
    } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
      card.classList.add('prev');
    } else if (index === (currentIndex + 1) % cards.length) {
      card.classList.add('next');
    } else {
      card.classList.add('hidden'); 
    }
  });
}

let startY = 0;
let isDragging = false;

function handleMouseDown(e) {
  startY = e.clientY;
  isDragging = true;
}

function handleMouseMove(e) {
  if (!isDragging) return;

  const currentY = e.clientY;
  const deltaY = currentY - startY;

  if (deltaY > 50) {
    
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
    isDragging = false; 
  } else if (deltaY < -50) {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
    isDragging = false; 
  }
}

function handleMouseUp() {
  isDragging = false;
}

document.querySelector('.carousel-container').addEventListener('mousedown', handleMouseDown);
document.querySelector('.carousel-container').addEventListener('mousemove', handleMouseMove);
document.querySelector('.carousel-container').addEventListener('mouseup', handleMouseUp);

updateCards();
