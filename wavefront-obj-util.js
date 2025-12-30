/**
 * @typedef {Object} ParsedWayfrontObject
 * @property {Point3D[]} vertices
 * @property {number[][]} faces indexes of points to connect
 */

/**
 * @typedef {(tokens: string[], obj: ParsedWayfrontObject) => ParsedWayfrontObject} LineParser
 */

/**
 * @type {Object.<string, LineParser>} ParsedWalfrontObject
 */
const recordTypeHandler = {
  v: parseVertices,
  f: parseFaces,
};

/**
 * @param {string} fileContent
 * @returns {ParsedWayfrontObject}}
 */
function parseWavefrontObj(fileContent) {
  /**
   * @type {ParsedWayfrontObject}
   */
  const result = {
    vertices: [],
    faces: [],
  };

  const lines = fileContent.split('\n');
  return lines.reduce((wip, line) => {
    const tokens = line.split(' ');
    const parser = recordTypeHandler[tokens[0]] || nullParser;
    return parser(tokens, wip);
  }, result);
}

/**
 * @type LineParser
 */
function nullParser(_tokens, obj) {
  return obj;
}

/**
 * v {x} {y} {z}
 *
 * @type LineParser
 */
function parseVertices(tokens, obj) {
  tokens = tokens.slice(1);
  if (tokens?.length !== 3) {
    return obj;
  }
  /**
   * @type {Point3D}
   */
  const vertex = {
    x: parseFloat(tokens[0]),
    y: parseFloat(tokens[1]),
    z: parseFloat(tokens[2]),
  };
  return {
    ...obj,
    vertices: obj.vertices.concat(vertex),
  };
}

/**
 * f {v1/vt1/vn1} {v2/vt2/vn2} ...
 *
 * @type LineParser
 */
function parseFaces(tokens, obj) {
  tokens = tokens.slice(1);
  if (!tokens?.length) {
    return obj;
  }
  /**
   * @type {number[]} only parse vertex for now
   */
  const face = tokens
    .map((token) => token.replace(/\/.*/, ''))
    .map((token) => parseInt(token))
    .map((token) => token - 1); // index starts at 1
  return {
    ...obj,
    faces: [...obj.faces, face],
  };
}
