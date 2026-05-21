const track = document.getElementById('track');
const counter = document.getElementById('counter');
const total = track.children.length;
let idx = 0;

// lazy load everything except first image
[...track.children].forEach((img, i) => {
  if (i > 0) img.loading = 'lazy';
});

function go(n) {
  const newIdx = (n + total) % total;

  // if wrapping (e.g. 0 → 38 or 38 → 0), kill transition for that frame
  if (Math.abs(newIdx - idx) > 1) {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${newIdx * 100}%)`;
    track.getBoundingClientRect(); // force reflow before re-enabling
    track.style.transition = '';
  } else {
    track.style.transform = `translateX(-${newIdx * 100}%)`;
  }

  idx = newIdx;
  counter.textContent = `${idx + 1} / ${total}`;
}

document.getElementById('prev').addEventListener('click', () => {
  console.log("prev pressed")
  go(idx - 1)
});
document.getElementById('next').addEventListener('click', () => {
  console.log("next pressed")
  go(idx + 1)
});

// keyboard
document.addEventListener('keydown', e => {
  console.log("key pressed")
  if (e.key === 'ArrowLeft') go(idx - 1);
  if (e.key === 'ArrowRight') go(idx + 1);
});

// touch swipe
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) go(idx + (diff > 0 ? 1 : -1));
});