export default () => {
  
  let shouldLoop = true;
  let calledLatest = null;
  const time = 400; // time in ms to scroll up
  const toScroll = document.body.scrollTop;
  const speed = toScroll / time;
    
  let rafLoop = () => {
    if (!shouldLoop) {
      return;
    }
    
    const currentTime = Date.now();
    const delta = calledLatest ? currentTime - calledLatest : 0;
    calledLatest = currentTime;
    
    const scrollAmount = delta * speed;
    const currentScroll = document.body.scrollTop -= scrollAmount;
    const hasToScroll = currentScroll > 5;
    
    if (hasToScroll) {
      requestAnimationFrame(rafLoop);
    }
  };
  
  rafLoop();
  
  const stopScrolling = () => {
    shouldLoop = false;
  };
  
  return stopScrolling;
};