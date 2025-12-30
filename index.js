//#region main
const canvas = assertNonNull(document.querySelector('canvas'));
canvas.width = 800;
canvas.height = 800;
const ctx = assertNonNull(canvas.getContext('2d'));
const canvasContext = {
  canvas,
  ctx,
  style: { backgroundColor: 'black', foregroundColor: 'green' },
};

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

animate(canvasContext, cubes);
//#endregion
