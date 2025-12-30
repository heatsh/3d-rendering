// @ts-nocheck too many casting, whatever

/**
 * @param {FormData} formData
 * @returns {undefined | { objFile: File, initialState: CanvasAnimationState, multipliers: CanvasAnimationState }}
 */
function getFormInput(formData) {
  if (!formData) {
    return;
  }

  const {
    objFile,
    dxInitial,
    dxMultiplier,
    dyInitial,
    dyMultiplier,
    dzInitial,
    dzMultiplier,
    dThetaInitial,
    dThetaMultiplier,
  } = Object.fromEntries(formData);

  if (!objFile?.size) {
    console.error('No file selected.');
    return;
  }
  /**
   * @type {CanvasAnimationState}
   */
  const initialState = {
    dX: parseFloat(dxInitial),
    dY: parseFloat(dyInitial),
    dZ: parseFloat(dzInitial),
    dTheta: parseFloat(dThetaInitial),
  };
  /**
   * @type {CanvasAnimationState}
   */
  const multipliers = {
    dX: parseFloat(dxMultiplier),
    dY: parseFloat(dyMultiplier),
    dZ: parseFloat(dzMultiplier),
    dTheta: parseFloat(dThetaMultiplier),
  };
  if (
    Object.values(initialState)
      .concat(Object.values(multipliers))
      .find((n) => !Number.isFinite(n))
  ) {
    console.error('Invalid state: ', initialState, multipliers);
    return;
  }

  return {
    objFile,
    initialState,
    multipliers,
  };
}
