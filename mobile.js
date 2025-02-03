let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      // Bring the paper to the front
      paper.style.zIndex = highestZ;
      highestZ += 1;

      // Record the initial touch position
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault(); // Prevent default scrolling behavior

      const touchMoveX = e.touches[0].clientX;
      const touchMoveY = e.touches[0].clientY;

      // Calculate the movement delta
      const deltaX = touchMoveX - this.prevTouchX;
      const deltaY = touchMoveY - this.prevTouchY;

      // Update the paper's position
      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;

      // Apply the transformation
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

      // Update the previous touch position
      this.prevTouchX = touchMoveX;
      this.prevTouchY = touchMoveY;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Initialize all papers
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});