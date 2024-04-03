const draggables = document.querySelectorAll('.draggable');
const droppables = document.querySelectorAll('.droppable');
const resultDiv = document.querySelector('.result');

let currentDraggable = null;

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', dragStart);
  draggable.addEventListener('dragend', dragEnd);
});

droppables.forEach(droppable => {
  droppable.addEventListener('dragover', dragOver);
  droppable.addEventListener('dragenter', dragEnter);
  droppable.addEventListener('dragleave', dragLeave);
  droppable.addEventListener('drop', drop);
});

function dragStart() {
  currentDraggable = this;
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('droppable-hover');
}

function dragLeave() {
  this.classList.remove('droppable-hover');
}

function drop() {
  this.classList.remove('droppable-hover');
  const country = currentDraggable.dataset.country;
  const city = this.dataset.city;

  if (isMatchCorrect(country, city)) {
    drawLine(currentDraggable, this);
    currentDraggable.removeEventListener('dragstart', dragStart);
    currentDraggable.removeEventListener('dragend', dragEnd);
    currentDraggable.style.pointerEvents = 'none';
    this.style.pointerEvents = 'none';
    checkAllMatches();
  } else {
    currentDraggable.classList.remove('dragging');
    resultDiv.textContent = 'Incorrect match. Try again.';
    setTimeout(() => {
      resultDiv.textContent = '';
    }, 2000);
  }

  currentDraggable = null;
}

function isMatchCorrect(country, city) {
  if ((country === 'Japan' && city === 'Tokyo') ||
      (country === 'USA' && city === 'Washington') ||
      (country === 'China' && city === 'Beijing')) {
    return true;
  }
  return false;
}

function drawLine(startElement, endElement) {
  const startRect = startElement.getBoundingClientRect();
  const endRect = endElement.getBoundingClientRect();

  const line = document.createElement('div');
  line.classList.add('line');
  document.body.appendChild(line);

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angleRad = Math.atan2(endY - startY, endX - startX);
  const angleDeg = angleRad * 180 / Math.PI;

  line.style.width = `${length}px`;
  line.style.transform = `rotate(${angleDeg}deg)`;
  line.style.transformOrigin = '0% 0%';
  line.style.top = `${startY}px`;
  line.style.left = `${startX}px`;
}

function checkAllMatches() {
  const allMatched = [...draggables, ...droppables].every(element => element.style.pointerEvents === 'none');
  if (allMatched) {
    resultDiv.textContent = '✓ All matches are correct!';
  }
}