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
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Point3D
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */
//#endregion

//#region functions
function clear() {
  ctx.fillStyle = borderColor;
  ctx.fillRect(0, 0, maxWidth, maxHeight);
}

/**
 * @param {Point2D} point cartesian coordinates of ([-1, 1], [-1, 1])
 * @returns canvas coordinates of ([0, maxWidth], [0, maxHeight])
 */
function translate({ x, y }) {
  return {
    x: ((x + 1) / 2) * maxWidth,
    y: (Math.abs(y - 1) / 2) * maxHeight,
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
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

/**
 * @param {Point3D} point
 * @returns {Point2D}
 */
function project({ x, y, z }) {
  return {
    x: x / z,
    y: y / z,
  };
}

/**
 * @param {Point3D} p
 * @param {number} dz
 */
function translateZ({ x, y, z }, dz) {
  return {
    x, y, z: z + dz
  }
}
//#region

//#region main
const maxWidth = 800;
const maxHeight = 800;
const borderColor = 'black';
const pointColor = 'green';

const graph = document.createElement('canvas');
document.body.append(graph);
graph.width = maxWidth;
graph.height = maxHeight;
const ctx = assertNonNull(graph.getContext('2d'));

const fps = 60;
let dz = 0;
/**
 * @type {Array<Point3D>}
 */
const points = [
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
];
(function renderFrame() {
  dz += 1 / fps;

  clear();
  for (const p of points) {
    point(translate(project(translateZ(p, dz))));
  }
  setTimeout(renderFrame, 1000 / fps);
})();
//#endregion
