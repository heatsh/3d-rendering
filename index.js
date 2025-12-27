/**
 * Type gymnastic, canvas will not be null
 * @template T
 * @param {T} thing
 * @returns {Exclude<T, null>}
 */
export function assertNonNull(thing) {
  return /** @type {Exclude<T, null>} */ (thing);
}
const graph = assertNonNull(document.querySelector('canvas'));
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

function point({ x, y }) {
  const size = 10;
  ctx.fillStyle = pointColor;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

function translate({ x, y }) {
  // -1..1 | 0..maxHeight/maxWidth
  return {
    x: (x + 1) / 2 * maxWidth,
    y: Math.abs(y - 1) / 2 * maxHeight
  };
}
