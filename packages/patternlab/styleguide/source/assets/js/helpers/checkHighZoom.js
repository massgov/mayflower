// check if the browser zoom level is above 300

const isHighZoom = () => {
const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
return zoomLevel >= 300;
}

export default isHighZoom;
