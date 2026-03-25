// check if the browser zoom level is above 300 on mobile and above 400 on desktop

const isHighZoom = () => {
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    const isMobile = window.innerWidth <= 840;
  
    if (isMobile) {
      return zoomLevel >= 300;
    } else {
      return zoomLevel >= 400;
    }
  };
  
  export default isHighZoom;