//#region type gymnastic
/**
 * canvas will not be null
 * @template T
 * @param {T} thing
 * @returns {Exclude<T, null>}
 */
function assertNonNull(thing) {
  return /** @type {Exclude<T, null>} */ (thing);
}

/**
 * @typedef {Object} Point2D
 * @property {number} x [-1, 1]
 * @property {number} y [-1, 1]
 */

/**
 * @typedef {Object} Point3D
 * @property {number} x [-1, 1]
 * @property {number} y [-1, 1]
 * @property {number} z [-1, 1]
 */
//#endregion

/**
 * @param {Point2D} point
 */
function translate({ x, y }) {
  // -1..1 | 0..maxHeight/maxWidth
  return {
    x: (x + 1) / 2 * maxWidth,
    y: Math.abs(y - 1) / 2 * maxHeight
  };
}

/**
 * @param {Point2D} point 
 */
function point({ x, y }) {
  const size = 10;
  ctx.fillStyle = pointColor;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

/**
 * @param {Point2D} p1 
 * @param {Point2D} p2 
 */
function line(p1, p2) {
  ctx.strokeStyle = pointColor;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke();
}

/**
 * @param {Point3D} point
 * @returns {Point2D}
 */
function project({ x, y, z }) {
  return {
    x: x / z,
    y: y / z
  }
}

//#region main
const graph = document.createElement('canvas');
document.body.append(graph);
const ctx = assertNonNull(graph.getContext('2d'));

const maxWidth = 800;
const maxHeight = 800;
const borderColor = 'black';
const pointColor = 'green';

graph.width = maxWidth;
graph.height = maxHeight;
ctx.strokeStyle = borderColor;
ctx.strokeRect(0, 0, maxWidth, maxHeight);

point(translate(project({ x: 0.5, y: 0, z: 1 })));

//#endregion