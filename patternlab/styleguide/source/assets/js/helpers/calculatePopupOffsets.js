/**
 * calculatePopupPositions: find the top/left
 * @param {element} popup          : DOM elmenet of the popup to be placed
 * @param {number}  top            : The top coordinate of where the popup should point
 * @param {number}  left           : The left coordinate of where the popup should point
 * @param {number}  offset         : an offet to be added to top/bottom or left/right
 * @param {string}  triangleSide   : "top", "right", "bottom", or "left"
 * @param {number}  triangleSize   : used to calculate the position
 * @param {boolean} flipToContain  : "parent" or "viewport" or ""/false. will flip the popup if it goes outside the viewport
 * @param {string}  nudgeToContain : "parent" or "viewport" or ""/false. will nudge t
 * @return {object}  {
 *     relativeTop    : with no offset adjustment, the popup should go here, based on triangleSide, relative to parent
 *     relativeLeft   : ^^
 *     adjustedTop    : with adjustment from nudging or flipping
 *     adjustedLeft   : ^^
 *     overflow       : "top", "right", "bottom", "left".  Positive numbers are overflows
 *     triangleOffset : Amount the triangle needs to move to be on the dot, relative from 50%
 *     triangleSide   : Will be the same as passed in triangleSide, unless it fliped via flipToContain
 * }
 * use adjustedTop, adjustedLeft, and triangleOffset to position the popup
 */
export default function calculatePopupOffsets({ popup, top, left, offset = 0, triangleSide = "bottom", triangleSize = 0, flipToContain = false, nudgeToContain = false }){


    // get the width and height of this popup from the DOM
    // using offsetWidth/offsetHeight isntead of getBoundingClientRect because offsetWidth doesn't account for scale(0.9)
    const width = popup.offsetWidth;
    const height = popup.offsetHeight;

    // common calculations
    const popupOnTop = top - height - triangleSize - offset;
    const popupOnBottom = top + triangleSize + offset;
    const popupOnLeft = left - width - triangleSize - offset;
    const popupOnRight = left + triangleSize + offset;

    // calculate where the top of the popup should be based on top/left
    const relativeTop = (triangleSide === "bottom") ? popupOnTop
                      : (triangleSide === "top")    ? popupOnBottom
                      : top - height/2; //  left or right

    const relativeLeft = (triangleSide === "right") ? popupOnLeft
                       : (triangleSide === "left")  ? popupOnRight
                       : left - (width/2); // center

    const realRight = (relativeLeft + width);
    const realBottom = (relativeTop + height);

    // if we don't need to do complicated math
    if (!flipToContain && !nudgeToContain){
        // return with just the basic stuff
        return {
            relativeTop, relativeLeft, triangleSide,
            triangleOffset: 0,
            popupTop: relativeTop,
            popupLeft: relativeLeft,
            adjustedTop: relativeTop,
            adjustedLeft: relativeLeft
        };
    }


    // get the width/height of the parent container div
    const parent = popup.parentNode;
    const parentWidth = parent.clientWidth;
    const parentHeight = parent.offsetHeight; // client height of body will only be the viewport height
    const parentClientRect = parent.getBoundingClientRect();


    const topBottom = (triangleSide === "top" || triangleSide === "bottom");
    const leftRight = (triangleSide === "left" || triangleSide === "right");
    // these values should be "parent", "viewport", or ""/false
    const horizontalOverflow = topBottom ? nudgeToContain : flipToContain;
    const verticalOverflow   = leftRight ? nudgeToContain : flipToContain;


    // find what is considered to be "overflowed", the parent, or the viewport
    const referencePoints = {
        top : (verticalOverflow   === "viewport") ? parentClientRect.top  : 0,
        left: (horizontalOverflow === "viewport") ? parentClientRect.left : 0,
        bottom: (verticalOverflow === "viewport") ? parentHeight - (parentClientRect.bottom - window.innerHeight)
              : (verticalOverflow === "parent")   ? parentHeight
              : 0,
        right: (horizontalOverflow === "viewport") ? parentWidth - (parentClientRect.right - window.innerWidth)
             : (horizontalOverflow === "parent")   ? parentWidth
             : 0
    };


    // the amounts that this popup is outside of it's parent or the viewport. (positive number are outside)
    const overflow = {
        top   : -(referencePoints.top    + relativeTop),
        right : -(referencePoints.right  - realRight),
        bottom: -(referencePoints.bottom - realBottom),
        left  : -(referencePoints.left   + relativeLeft)
    };


    // calculate where the popup should go
    // start with adjustedLeft as relativeLeft before nudging
    let adjustedTop = relativeTop;
    let adjustedLeft = relativeLeft;
    let triangleOffset = 0;
    let newTriangleSide = triangleSide; // make a copy of this so we can override it if it flips

    // if there is an overflow on the right, adjust the popup and triangle position
    if (overflow.right > 0){
        if (triangleSide === "top" || triangleSide === "bottom"){
            adjustedLeft = relativeLeft - overflow.right;
            triangleOffset = overflow.right;
        }

        // for left, flip the popup
        if (triangleSide === "left" && flipToContain){
            newTriangleSide = "right";
            adjustedLeft = popupOnLeft;
        }
    }

    // if there is an overflow on the left, adjust the popup and triangle position
    if (overflow.left > 0){
        if (triangleSide === "top" || triangleSide === "bottom"){
            adjustedLeft = relativeLeft + overflow.left;
            triangleOffset = -overflow.left;
        }

        // for right, flip the popup
        if (triangleSide === "right" && flipToContain){
            newTriangleSide = "left";
            adjustedLeft = popupOnRight;
        }
    }

    // if there is an overflow on the bottom
    if (overflow.bottom > 0){
        // for left/right, butt the popup against the bottom
        if (triangleSide === "left" || triangleSide === "right") {
            adjustedTop = relativeTop - overflow.bottom;
            triangleOffset = overflow.bottom;
        }

        // for top, flip the popup
        if (triangleSide === "top" && flipToContain){
            newTriangleSide = "bottom";
            adjustedTop = popupOnTop;
        }
    }

    // if there is an overflow on the top
    if (overflow.top > 0){

        if (triangleSide === "left" || triangleSide === "right") {
            adjustedTop = relativeTop + overflow.top;
            triangleOffset = -overflow.top;
        }

        // for bottom, flip the popup
        if (triangleSide === "bottom" && flipToContain){
            newTriangleSide = "top";
            adjustedTop = popupOnBottom;
        }
    }

    // return all the measurements
    return {
        relativeTop, relativeLeft, adjustedTop, adjustedLeft,
        triangleOffset: (nudgeToContain) ? triangleOffset : 0,
        popupTop : (leftRight && nudgeToContain || topBottom && flipToContain) ? adjustedTop : relativeTop,
        popupLeft: (topBottom && nudgeToContain || leftRight && flipToContain) ? adjustedLeft : relativeLeft,
        triangleSide: (flipToContain) ? newTriangleSide : triangleSide
    };


}

// element.closest polygill
if (!Element.prototype.matches){ Element.prototype.matches = Element.prototype.msMatchesSelector; }
if (!Element.prototype.closest) {
    Element.prototype.closest = function(selector) {
        let el = this;
        while (el) {
            if (el.matches(selector)) {
                return el;
            }
            el = el.parentElement;
        }
    };
}
