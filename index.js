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
      dZ: currentState.dZ + dt / 2,
      dTheta: currentState.dTheta + dt * Math.PI,
    }),
    fps: 30,
  },
};

animate(canvasContext, cubes);

/**
 * @param {SubmitEvent} event
 */
function updateCanvas(event) {
  event.preventDefault();

  const formInput =
    event.target instanceof HTMLFormElement
      ? getFormInput(new FormData(event.target))
      : undefined;

  if (!formInput) {
    return;
  }
  const reader = new FileReader();

  reader.onload = function (event) {
    const objContent = event.target?.result;
    if (typeof objContent !== 'string') {
      return;
    }

    const waveFrontObj = parseWavefrontObj(objContent);
    animate(canvasContext, {
      ...waveFrontObj,
      animation: {
        initialState: formInput.initialState,
        transformState: (dt, currentState) => ({
          dX: currentState.dX + dt * formInput.multipliers.dX,
          dY: currentState.dY + dt * formInput.multipliers.dY,
          dZ: currentState.dZ + dt * formInput.multipliers.dZ,
          dTheta:
            currentState.dTheta + dt * Math.PI * formInput.multipliers.dTheta,
        }),
        fps: 30,
      },
    });
  };

  reader.onerror = function () {
    alert('Failed to read file');
  };

  reader.readAsText(formInput.objFile);
}
