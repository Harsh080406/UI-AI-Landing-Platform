export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          
          // For counter elements:
          if (entry.target.hasAttribute("data-count-to")) {
            animateCounter(entry.target as HTMLElement);
          }
          
          // For SVG path draw elements:
          if (entry.target.hasAttribute("data-draw")) {
            // Find all paths inside this element or if the element itself is a path
            const paths = entry.target.tagName === "path" 
              ? [entry.target] 
              : entry.target.querySelectorAll("path");
            
            paths.forEach((path) => {
              animatePathDraw(path as SVGPathElement);
            });
          }
          
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => {
    observer.observe(el);
  });
}

function animateCounter(el: HTMLElement) {
  const targetStr = el.getAttribute("data-count-to") || "";
  const match = targetStr.match(/^([\d.]+)(.*)$/);
  if (!match) return;

  const matchPart1 = match[1];
  const targetValue = parseFloat(matchPart1);
  const suffix = match[2];
  const duration = 1200; // 1200ms duration
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease-out cubic (1 - (1 - t)^3)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = targetValue * easeProgress;

    // Check if targetValue has decimals
    const hasDecimal = matchPart1.includes(".");
    const decimalPlaces = hasDecimal ? matchPart1.split(".")[1].length : 0;
    
    const displayVal = currentValue.toFixed(decimalPlaces);
    el.textContent = displayVal + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = targetStr; // force exact final string on completion
    }
  }

  requestAnimationFrame(update);
}

function animatePathDraw(path: SVGPathElement) {
  try {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = length.toString();
    
    // Force a style recalculation
    path.getBoundingClientRect();
    
    path.style.transition = "stroke-dashoffset 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
    path.style.strokeDashoffset = "0";
  } catch {
    // Fallback if path total length cannot be calculated (e.g. element not fully rendered)
    path.style.strokeDasharray = "none";
  }
}
