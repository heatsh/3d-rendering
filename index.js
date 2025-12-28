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

/**
 * @typedef {Object} CanvasAnimationState
 * @property {number} dX
 * @property {number} dY
 * @property {number} dZ
 * @property {number} dTheta
 */

/**
 * @typedef {Object} AnimatableCanvasObject
 * @property {Point3D[]} vertices
 * @property {number[][]} faces indexes of points to connect
 * @property {{
 *   initialState: CanvasAnimationState,
 *   transformState: (dt: number, currentState: CanvasAnimationState) => CanvasAnimationState,
 *   fps: number,
 * }} animation
 */
//#endregion

//#region functions
function clear() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, maxWidth, maxHeight);
}

/**
 * @param {Point2D} point cartesian coordinates of ([-1, 1], [-1, 1])
 * @returns canvas coordinates of ([0, maxWidth], [0, maxHeight])
 */
function toCanvasCoordinate({ x, y }) {
  return {
    x: ((x + 1) / 2) * maxWidth,
    y: (1 - (y + 1) / 2) * maxHeight,
  };
}

/**
 * @param {Point2D} point
 */
function point({ x, y }) {
  const size = 10;
  ctx.fillStyle = foregroundColor;
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

/**
 * @param {Point2D} p1
 * @param {Point2D} p2
 */
function line(p1, p2) {
  ctx.strokeStyle = foregroundColor;
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
  return z === 0
    ? { x, y }
    : {
      x: x / z,
      y: y / z,
    };
}

/**
 * @param {Point3D} p
 * @param {CanvasAnimationState} state
 */
function translate({ x, y, z }, state) {
  return {
    x: x + state.dX,
    y: y + state.dY,
    z: z + state.dZ,
  };
}

/**
 * @param {Point3D} p
 * @param {number} theta rotation degree
 *
 * @see https://en.wikipedia.org/wiki/Rotation_matrix
 */
function rotateAroundY({ x, y, z }, theta) {
  return {
    x: x * Math.cos(theta) - z * Math.sin(theta),
    y, // rotate around y axis, keep y unchanged
    z: x * Math.sin(theta) + z * Math.cos(theta),
  };
}

/**
 * @param {AnimatableCanvasObject} canvasObject
 */
function animate({ vertices: points, faces: vectors, animation }) {
  let state = animation.initialState;
  (function renderFrame() {
    const dt = 1 / animation.fps;
    state = animation.transformState(dt, state);

    clear();
    const pointsInFrame = points
      .map(p => translate(rotateAroundY(p, state.dTheta), state))
      .map(project)
      .map(toCanvasCoordinate);

    vectors.forEach((lines) => {
      for (let i = 0; i < lines.length; i++) {
        line(
          pointsInFrame[lines[i]],
          pointsInFrame[lines[(i + 1) % lines.length]]
        );
      }
    });
    setTimeout(renderFrame, 1000 / animation.fps);
  })();
}
//#region

//#region main
const maxWidth = 800;
const maxHeight = 800;
const backgroundColor = 'black';
const foregroundColor = 'green';

const graph = document.createElement('canvas');
document.body.append(graph);
graph.width = maxWidth;
graph.height = maxHeight;
const ctx = assertNonNull(graph.getContext('2d'));

/**
 * @type {AnimatableCanvasObject}
 */
const cubes = {
  vertices: [
    { x: 0.5, y: 0.5, z: 0.5 },
    { x: -0.5, y: 0.5, z: 0.5 },
    { x: -0.5, y: -0.5, z: 0.5 },
    { x: 0.5, y: -0.5, z: 0.5 },
    { x: 0.5, y: 0.5, z: -0.5 },
    { x: -0.5, y: 0.5, z: -0.5 },
    { x: -0.5, y: -0.5, z: -0.5 },
    { x: 0.5, y: -0.5, z: -0.5 },
  ],
  faces: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ],
  animation: {
    initialState: {
      dX: 0,
      dY: 0,
      dZ: 1,
      dTheta: 0,
    },
    transformState: (dt, currentState) => ({
      ...currentState,
      dZ: currentState.dZ + dt,
      dTheta: currentState.dTheta + dt * Math.PI,
    }),
    fps: 30,
  },
};

animate(cubes);
//#endregion
