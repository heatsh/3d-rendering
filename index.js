/**
 * The DOM element that serves as the container for the graph visualization.
 * @type {HTMLCanvasElement}
 */
const graph = document.querySelector('#graph');
const ctx = graph.getContext('2d');

const maxWidth = 800;
const maxHeight = 800;

graph.width = maxWidth;
graph.height = maxHeight;
ctx.strokeStyle = 'black';
ctx.strokeRect(0, 0, maxWidth, maxHeight);

point(translate({ x: -1, y: 1 }));
point(translate({ x: 1, y: 1 }));
point(translate({ x: 0, y: 0 }))
point(translate({ x: -1, y: -1 }));
point(translate({ x: 1, y: -1 }));

function point({ x, y }) {
  const size = 10;
  ctx.fillStyle = 'green';
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

function translate({ x, y }) {
  // -1..1 | 0..maxHeight
  return {
    x: (x + 1) / 2 * maxWidth,
    y: Math.abs(y - 1) / 2 * maxHeight
  };
}