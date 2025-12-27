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
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */
//#endregion

/**
 * @param {Point} param0 
 */
function translate({ x, y }) {
  // -1..1 | 0..maxHeight/maxWidth
  return {
    x: (x + 1) / 2 * maxWidth,
    y: Math.abs(y - 1) / 2 * maxHeight
  };
}

/**
 * @param {Point} param0 
 */
function point({ x, y }) {
  const size = 10;
  ctx.fillStyle = pointColor;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

/**
 * @param {Point} p1 
 * @param {Point} p2 
 */
function line(p1, p2) {
  ctx.strokeStyle = pointColor;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke();
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

point(translate({ x: -1, y: 1 }));
point(translate({ x: 1, y: 1 }));
point(translate({ x: 0, y: 0 }))
point(translate({ x: -1, y: -1 }));
point(translate({ x: 1, y: -1 }));

line(translate({ x: -1, y: 1 }), translate({ x: 1, y: -1 }));
line(translate({ x: -1, y: -1 }), translate({ x: 1, y: 1 }));
//#endregion