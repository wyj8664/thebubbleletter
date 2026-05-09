(function (global) {
  const shine = (arc, dot = "M24 48 L23.5 49") => [
    { d: arc, width: 7, opacity: 0.9 },
    { d: dot, width: 7, opacity: 0.86 }
  ];

  const tallShine = shine("M27 27 C37 18 53 17 66 24", "M23 45 L22.5 46");
  const roundShine = shine("M29 31 C40 20 57 19 70 28", "M23 50 L22.5 51");
  const lowerShine = shine("M28 51 C39 42 56 41 69 48", "M23 68 L22.5 69");

  const glyphs = {
    A: {
      advanceWidth: 112,
      bounds: [12, 12, 88, 106],
      viewBox: [0, 0, 100, 112],
      outerPath: "M14 92 C20 67 29 37 39 20 C43 13 53 12 58 20 C69 40 80 69 86 91 C90 105 70 108 65 94 C63 89 61 83 59 77 C52 80 43 80 36 77 C34 83 32 89 30 94 C25 108 10 105 14 92 Z",
      holes: [{ type: "path", d: "M49 37 C44 48 41 57 39 64 C44 66 53 66 59 64 C56 55 53 47 49 37 Z" }],
      highlightPaths: shine("M27 33 C35 22 48 19 58 24", "M23 50 L22.5 51")
    },
    B: {
      advanceWidth: 116,
      bounds: [16, 10, 88, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 26 C17 17 26 12 35 15 C47 11 69 12 80 26 C90 39 83 52 72 57 C88 62 91 80 80 92 C68 106 45 102 35 98 C27 103 17 98 17 88 Z",
      holes: [
        { type: "ellipse", cx: 56, cy: 39, rx: 15, ry: 10 },
        { type: "ellipse", cx: 58, cy: 75, rx: 16, ry: 11 }
      ],
      highlightPaths: shine("M30 27 C41 20 58 20 69 27", "M27 46 L26.5 47")
    },
    C: {
      advanceWidth: 112,
      bounds: [8, 8, 91, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M84 26 C88 34 79 42 70 37 C58 30 42 31 32 41 C21 52 23 72 35 81 C46 90 61 88 72 78 C82 69 93 81 84 91 C65 111 28 104 15 80 C2 55 15 23 42 14 C57 9 76 12 84 26 Z",
      holes: [],
      highlightPaths: shine("M28 35 C39 23 55 20 70 25", "M22 52 L21.5 53")
    },
    D: {
      advanceWidth: 116,
      bounds: [16, 11, 90, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 24 C18 15 27 11 35 15 C62 7 88 26 89 55 C90 84 65 105 35 98 C27 103 18 98 18 88 Z",
      holes: [{ type: "ellipse", cx: 57, cy: 56, rx: 18, ry: 24 }],
      highlightPaths: tallShine
    },
    E: {
      advanceWidth: 108,
      bounds: [15, 13, 86, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 23 C17 14 25 11 33 15 H80 C91 15 91 31 80 31 H36 V45 H68 C78 45 78 61 68 61 H36 V85 H82 C93 85 93 101 82 101 H32 C23 101 17 95 17 87 Z",
      holes: [],
      highlightPaths: tallShine
    },
    F: {
      advanceWidth: 104,
      bounds: [15, 13, 84, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 23 C17 14 25 11 33 15 H80 C91 15 91 31 80 31 H36 V48 H68 C78 48 78 64 68 64 H36 V92 C36 104 17 104 17 92 Z",
      holes: [],
      highlightPaths: tallShine
    },
    G: {
      advanceWidth: 116,
      bounds: [8, 8, 92, 105],
      viewBox: [0, 0, 100, 112],
      outerPath: "M84 27 C88 35 79 43 70 38 C56 30 38 32 29 45 C19 60 26 83 44 88 C55 92 67 87 73 78 H60 C49 78 49 62 60 62 H86 C91 62 94 66 93 72 C90 94 69 108 43 103 C15 98 1 66 13 39 C25 12 64 7 84 27 Z",
      holes: [],
      highlightPaths: shine("M28 35 C39 24 56 21 70 27", "M23 52 L22.5 53")
    },
    H: {
      advanceWidth: 116,
      bounds: [16, 13, 84, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 23 C18 11 36 11 36 23 V45 H64 V23 C64 11 82 11 82 23 V91 C82 103 64 103 64 91 V68 H36 V91 C36 103 18 103 18 91 Z",
      holes: [],
      highlightPaths: shine("M26 25 C28 33 28 42 27 51", "M24 63 L23.5 64")
    },
    I: {
      advanceWidth: 84,
      bounds: [20, 13, 80, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M29 15 H71 C82 15 82 31 71 31 H60 V85 H72 C83 85 83 101 72 101 H28 C17 101 17 85 28 85 H40 V31 H29 C18 31 18 15 29 15 Z",
      holes: [],
      highlightPaths: shine("M45 24 C51 20 58 20 64 24", "M43 45 L42.5 46")
    },
    J: {
      advanceWidth: 104,
      bounds: [13, 13, 83, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M45 15 H74 C83 15 86 21 84 29 V69 C84 95 63 108 39 101 C24 97 14 84 13 70 C12 59 29 57 32 68 C35 80 46 86 56 80 C63 76 65 69 65 59 V31 H45 C34 31 34 15 45 15 Z",
      holes: [],
      highlightPaths: shine("M61 24 C66 20 72 20 77 24", "M60 45 L59.5 46")
    },
    K: {
      advanceWidth: 112,
      bounds: [16, 13, 90, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 23 C18 11 36 11 36 23 V48 L72 17 C82 8 94 22 83 32 L58 54 L88 86 C97 96 83 109 74 99 L36 61 V91 C36 103 18 103 18 91 Z",
      holes: [],
      highlightPaths: shine("M27 25 C29 34 29 45 28 56", "M45 55 L44.5 56")
    },
    L: {
      advanceWidth: 102,
      bounds: [16, 13, 84, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 23 C18 11 36 11 36 23 V84 H80 C91 84 91 101 80 101 H30 C22 101 18 96 18 88 Z",
      holes: [],
      highlightPaths: shine("M27 25 C29 36 29 48 28 60", "M26 73 L25.5 74")
    },
    M: {
      advanceWidth: 128,
      bounds: [9, 13, 91, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M10 92 V25 C10 14 24 9 31 19 L50 54 L69 19 C76 9 90 14 90 25 V92 C90 104 72 104 72 92 V55 L59 78 C55 86 45 86 41 78 L28 55 V92 C28 104 10 104 10 92 Z",
      holes: [],
      highlightPaths: shine("M20 27 C23 36 24 46 23 57", "M46 59 L45.5 60")
    },
    N: {
      advanceWidth: 118,
      bounds: [15, 13, 85, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 92 V25 C17 14 31 10 38 20 L65 62 V23 C65 11 83 11 83 23 V91 C83 103 69 107 62 96 L35 55 V92 C35 104 17 104 17 92 Z",
      holes: [],
      highlightPaths: shine("M27 27 C32 38 38 48 44 58", "M25 70 L24.5 71")
    },
    O: {
      advanceWidth: 116,
      bounds: [9, 12, 91, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 13 C76 13 91 31 89 57 C87 84 72 100 50 100 C23 100 9 78 12 51 C15 27 30 13 50 13 Z",
      holes: [{ type: "ellipse", cx: 50, cy: 56, rx: 18, ry: 23 }],
      highlightPaths: roundShine
    },
    P: {
      advanceWidth: 108,
      bounds: [16, 12, 88, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 24 C18 15 27 11 35 15 C48 11 72 12 83 27 C95 43 84 68 60 71 C52 72 43 71 36 68 V91 C36 103 18 103 18 91 Z",
      holes: [{ type: "ellipse", cx: 57, cy: 42, rx: 16, ry: 11 }],
      highlightPaths: tallShine
    },
    Q: {
      advanceWidth: 118,
      bounds: [9, 12, 94, 105],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 13 C76 13 91 31 89 57 C88 66 85 75 80 82 C85 86 90 90 94 95 C101 104 88 114 80 105 C77 102 74 99 71 96 C65 99 58 100 50 100 C23 100 9 78 12 51 C15 27 30 13 50 13 Z",
      holes: [{ type: "ellipse", cx: 50, cy: 56, rx: 18, ry: 23 }],
      highlightPaths: roundShine
    },
    R: {
      advanceWidth: 114,
      bounds: [16, 12, 91, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 24 C18 15 27 11 35 15 C48 11 72 12 83 27 C93 41 86 61 68 68 L88 88 C97 97 83 110 74 100 L40 68 H36 V91 C36 103 18 103 18 91 Z",
      holes: [{ type: "ellipse", cx: 57, cy: 42, rx: 16, ry: 11 }],
      highlightPaths: tallShine
    },
    S: {
      advanceWidth: 108,
      bounds: [10, 10, 88, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M80 25 C86 34 75 44 66 37 C55 28 35 29 31 39 C27 50 62 48 77 61 C91 73 86 96 68 103 C49 110 23 103 13 88 C6 78 20 68 28 77 C37 87 58 90 64 80 C70 68 36 70 22 56 C8 43 15 21 33 14 C50 7 70 12 80 25 Z",
      holes: [],
      highlightPaths: shine("M30 31 C41 23 57 23 69 30", "M24 47 L23.5 48")
    },
    T: {
      advanceWidth: 106,
      bounds: [12, 14, 88, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M21 15 H79 C90 15 90 32 79 32 H59 V92 C59 104 41 104 41 92 V32 H21 C10 32 10 15 21 15 Z",
      holes: [],
      highlightPaths: shine("M28 24 C40 21 56 21 70 24", "M47 45 L46.5 46")
    },
    U: {
      advanceWidth: 116,
      bounds: [12, 13, 88, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M14 23 C14 11 32 11 32 23 V66 C32 79 39 86 50 86 C61 86 68 79 68 66 V23 C68 11 86 11 86 23 V66 C86 92 72 103 50 103 C28 103 14 92 14 66 Z",
      holes: [],
      highlightPaths: shine("M24 27 C25 39 25 51 24 63", "M29 79 L28.5 80")
    },
    V: {
      advanceWidth: 112,
      bounds: [10, 13, 90, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M11 26 C7 14 25 8 30 20 L50 75 L70 20 C75 8 93 14 89 26 L61 94 C57 105 43 105 39 94 Z",
      holes: [],
      highlightPaths: shine("M23 25 C28 39 33 52 39 66", "M44 82 L43.5 83")
    },
    W: {
      advanceWidth: 132,
      bounds: [6, 13, 94, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M7 27 C4 15 21 9 25 20 L35 69 L43 42 C46 31 54 31 57 42 L65 69 L75 20 C79 9 96 15 93 27 L78 94 C75 106 61 107 56 95 L50 73 L44 95 C39 107 25 106 22 94 Z",
      holes: [],
      highlightPaths: shine("M18 27 C21 41 24 55 28 70", "M47 54 L46.5 55")
    },
    X: {
      advanceWidth: 112,
      bounds: [11, 14, 89, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 29 C9 20 23 7 32 17 L50 40 L68 17 C77 7 91 20 83 29 L62 56 L86 87 C94 97 80 110 71 99 L50 71 L29 99 C20 110 6 97 14 87 L38 56 Z",
      holes: [],
      highlightPaths: shine("M29 27 C36 34 43 43 50 53", "M25 50 L24.5 51")
    },
    Y: {
      advanceWidth: 112,
      bounds: [10, 13, 90, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M12 27 C5 18 20 7 29 17 L50 42 L71 17 C80 7 95 18 88 27 L59 61 V92 C59 104 41 104 41 92 V61 Z",
      holes: [],
      highlightPaths: shine("M25 25 C32 35 40 44 49 53", "M47 72 L46.5 73")
    },
    Z: {
      advanceWidth: 108,
      bounds: [12, 14, 88, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M22 15 H80 C89 15 93 26 86 33 L43 84 H80 C91 84 91 101 80 101 H21 C12 101 8 90 15 83 L58 32 H22 C11 32 11 15 22 15 Z",
      holes: [],
      highlightPaths: shine("M30 25 C43 22 58 22 72 25", "M49 54 L48.5 55")
    },
    a: {
      advanceWidth: 108,
      bounds: [10, 30, 86, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M78 44 C86 51 87 69 83 84 C80 96 68 101 59 93 C47 102 27 99 18 86 C7 70 14 43 33 35 C47 29 63 33 72 43 C73 42 76 42 78 44 Z",
      holes: [{ type: "ellipse", cx: 48, cy: 67, rx: 14, ry: 12 }],
      highlightPaths: lowerShine
    },
    b: {
      advanceWidth: 110,
      bounds: [16, 8, 90, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 18 C17 8 32 8 32 18 V42 C43 32 65 32 78 44 C93 58 89 87 72 97 C58 105 42 101 32 93 C24 102 17 96 17 86 Z",
      holes: [{ type: "ellipse", cx: 55, cy: 68, rx: 15, ry: 15 }],
      highlightPaths: [
        { d: "M29 19 C30 32 30 43 29 55", width: 7, opacity: 0.88 },
        { d: "M40 46 C50 38 65 40 75 50", width: 7, opacity: 0.84 },
        { d: "M25 66 L24.5 67", width: 7, opacity: 0.86 }
      ]
    },
    c: {
      advanceWidth: 106,
      bounds: [10, 29, 87, 106],
      viewBox: [0, 0, 100, 112],
      outerPath: "M78 45 C83 53 74 62 65 57 C54 50 40 52 32 62 C24 73 31 88 45 90 C54 91 62 87 68 80 C77 70 89 82 80 92 C66 108 36 105 21 89 C5 72 12 43 34 34 C50 28 70 31 78 45 Z",
      holes: [],
      highlightPaths: lowerShine
    },
    d: {
      advanceWidth: 110,
      bounds: [10, 8, 84, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M83 18 V86 C83 96 76 102 68 93 C58 101 42 105 28 97 C11 87 7 58 22 44 C35 32 57 32 68 42 V18 C68 8 83 8 83 18 Z",
      holes: [{ type: "ellipse", cx: 45, cy: 68, rx: 15, ry: 15 }],
      highlightPaths: lowerShine
    },
    e: {
      advanceWidth: 106,
      bounds: [10, 30, 88, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 32 C73 32 89 48 88 66 C87 75 81 80 71 80 H37 C42 89 57 92 69 84 C79 77 89 90 80 98 C64 110 36 107 20 90 C4 73 10 45 34 35 C39 33 44 32 50 32 Z",
      holes: [{ type: "path", d: "M35 61 C39 51 51 47 61 52 C66 55 69 60 69 64 H35 C35 63 35 62 35 61 Z" }],
      highlightPaths: shine("M28 51 C39 42 56 40 68 48", "M24 68 L23.5 69")
    },
    f: {
      advanceWidth: 88,
      bounds: [16, 10, 80, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M70 15 C80 18 75 34 65 31 C56 28 50 34 50 46 H69 C79 46 79 61 69 61 H50 V92 C50 104 33 104 33 92 V61 H24 C14 61 14 46 24 46 H33 C33 23 48 9 70 15 Z",
      holes: [],
      highlightPaths: shine("M48 24 C53 18 61 17 68 20", "M39 46 L38.5 47")
    },
    g: {
      advanceWidth: 108,
      bounds: [10, 30, 88, 126],
      viewBox: [0, 0, 100, 128],
      outerPath: "M78 44 C86 51 88 69 84 84 C82 91 79 96 75 99 C75 111 68 121 57 125 C45 130 30 126 22 116 C15 108 25 98 34 105 C43 112 60 108 61 94 C48 103 27 99 18 86 C7 70 14 43 33 35 C47 29 63 33 72 43 C73 42 76 42 78 44 Z",
      holes: [{ type: "ellipse", cx: 48, cy: 67, rx: 14, ry: 12 }],
      highlightPaths: shine("M28 51 C39 42 56 41 68 48", "M24 69 L23.5 70")
    },
    h: {
      advanceWidth: 108,
      bounds: [16, 8, 86, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 18 C17 8 32 8 32 18 V42 C42 32 61 31 73 41 C82 49 86 60 86 76 V92 C86 103 69 103 69 92 V72 C69 58 62 51 51 51 C40 51 32 60 32 75 V92 C32 103 17 103 17 92 Z",
      holes: [],
      highlightPaths: shine("M28 20 C29 33 29 45 28 58", "M40 50 L39.5 51")
    },
    i: {
      advanceWidth: 58,
      bounds: [31, 14, 69, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M42 52 C42 42 58 42 58 52 V92 C58 103 42 103 42 92 Z M50 14 C61 14 65 28 56 34 C47 40 35 32 39 21 C41 17 44 14 50 14 Z",
      holes: [],
      highlightPaths: shine("M47 54 C50 51 54 51 57 54", "M47 68 L46.5 69")
    },
    j: {
      advanceWidth: 70,
      bounds: [17, 14, 72, 126],
      viewBox: [0, 0, 100, 128],
      outerPath: "M50 14 C61 14 65 28 56 34 C47 40 35 32 39 21 C41 17 44 14 50 14 Z M42 52 C42 42 58 42 58 52 V101 C58 122 34 132 18 119 C10 112 18 100 27 106 C34 111 42 107 42 96 Z",
      holes: [],
      highlightPaths: shine("M47 54 C50 51 54 51 57 54", "M45 69 L44.5 70")
    },
    k: {
      advanceWidth: 102,
      bounds: [16, 8, 88, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 18 C17 8 32 8 32 18 V57 L66 38 C76 32 86 45 76 52 L58 64 L84 85 C94 93 82 107 72 98 L32 70 V92 C32 103 17 103 17 92 Z",
      holes: [],
      highlightPaths: shine("M28 20 C29 33 29 46 28 59", "M45 64 L44.5 65")
    },
    l: {
      advanceWidth: 56,
      bounds: [30, 8, 70, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M42 18 C42 8 58 8 58 18 V92 C58 103 42 103 42 92 Z",
      holes: [],
      highlightPaths: shine("M47 20 C50 17 54 17 57 20", "M46 42 L45.5 43")
    },
    m: {
      advanceWidth: 132,
      bounds: [8, 32, 92, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M9 92 V46 C9 36 22 32 28 41 C38 31 55 32 62 45 C72 32 91 35 92 57 V92 C92 103 76 103 76 92 V62 C76 53 69 50 64 58 V92 C64 103 48 103 48 92 V62 C48 53 41 50 36 58 V92 C36 103 9 103 9 92 Z",
      holes: [],
      highlightPaths: shine("M21 49 C26 42 34 41 40 47", "M55 51 L54.5 52")
    },
    n: {
      advanceWidth: 108,
      bounds: [16, 32, 86, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M17 92 V46 C17 36 31 32 37 42 C47 32 67 31 79 42 C86 49 86 60 86 76 V92 C86 103 69 103 69 92 V72 C69 58 62 51 51 51 C40 51 32 60 32 75 V92 C32 103 17 103 17 92 Z",
      holes: [],
      highlightPaths: lowerShine
    },
    o: {
      advanceWidth: 106,
      bounds: [11, 31, 89, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 33 C75 33 89 49 87 70 C85 91 71 102 50 102 C25 102 11 86 13 65 C15 44 30 33 50 33 Z",
      holes: [{ type: "ellipse", cx: 50, cy: 68, rx: 15, ry: 16 }],
      highlightPaths: lowerShine
    },
    p: {
      advanceWidth: 110,
      bounds: [16, 32, 90, 126],
      viewBox: [0, 0, 100, 128],
      outerPath: "M17 117 V46 C17 36 30 32 36 41 C48 31 68 32 80 45 C94 60 89 89 71 98 C58 105 42 101 32 93 V117 C32 128 17 128 17 117 Z",
      holes: [{ type: "ellipse", cx: 55, cy: 68, rx: 15, ry: 15 }],
      highlightPaths: lowerShine
    },
    q: {
      advanceWidth: 110,
      bounds: [10, 32, 84, 126],
      viewBox: [0, 0, 100, 128],
      outerPath: "M83 117 C83 128 68 128 68 117 V93 C58 101 42 105 28 97 C11 87 7 58 22 45 C34 32 55 31 67 41 C73 32 83 36 83 46 Z",
      holes: [{ type: "ellipse", cx: 45, cy: 68, rx: 15, ry: 15 }],
      highlightPaths: lowerShine
    },
    r: {
      advanceWidth: 88,
      bounds: [17, 32, 82, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 92 V46 C18 36 31 32 37 42 C45 33 63 31 76 39 C86 45 79 61 69 56 C54 49 35 58 35 78 V92 C35 103 18 103 18 92 Z",
      holes: [],
      highlightPaths: shine("M29 50 C37 42 50 41 62 46", "M25 66 L24.5 67")
    },
    s: {
      advanceWidth: 96,
      bounds: [11, 31, 85, 104],
      viewBox: [0, 0, 100, 112],
      outerPath: "M76 45 C82 53 72 63 63 56 C54 49 35 49 33 58 C31 66 65 63 77 75 C89 87 78 104 57 105 C40 106 22 101 14 90 C7 80 21 70 29 79 C36 87 55 91 61 83 C66 74 30 78 20 64 C10 50 22 34 39 31 C53 29 68 34 76 45 Z",
      holes: [],
      highlightPaths: lowerShine
    },
    t: {
      advanceWidth: 82,
      bounds: [16, 23, 82, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M42 29 C42 18 58 18 58 29 V45 H72 C82 45 82 60 72 60 H58 V78 C58 89 64 92 72 88 C82 83 90 96 80 102 C64 110 42 101 42 80 V60 H26 C16 60 16 45 26 45 H42 Z",
      holes: [],
      highlightPaths: shine("M49 31 C52 28 56 28 59 31", "M45 48 L44.5 49")
    },
    u: {
      advanceWidth: 108,
      bounds: [14, 35, 86, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M15 45 C15 34 32 34 32 45 V72 C32 85 39 92 50 92 C61 92 68 84 68 70 V45 C68 34 85 34 85 45 V92 C85 103 72 106 66 96 C56 104 36 105 24 94 C17 87 15 78 15 64 Z",
      holes: [],
      highlightPaths: shine("M25 47 C26 58 26 69 25 78", "M31 90 L30.5 91")
    },
    v: {
      advanceWidth: 104,
      bounds: [10, 35, 90, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M11 47 C6 35 24 29 30 41 L50 78 L70 41 C76 29 94 35 89 47 L60 96 C55 105 45 105 40 96 Z",
      holes: [],
      highlightPaths: shine("M24 47 C30 59 35 69 42 79", "M45 90 L44.5 91")
    },
    w: {
      advanceWidth: 124,
      bounds: [7, 35, 93, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M8 48 C4 36 21 30 26 41 L36 76 L43 56 C47 45 53 45 57 56 L64 76 L74 41 C79 30 96 36 92 48 L76 96 C72 107 60 106 56 96 L50 77 L44 96 C40 106 28 107 24 96 Z",
      holes: [],
      highlightPaths: shine("M19 47 C22 59 25 70 29 81", "M48 61 L47.5 62")
    },
    x: {
      advanceWidth: 100,
      bounds: [12, 35, 88, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M18 49 C10 40 24 28 32 38 L50 56 L68 38 C76 28 90 40 82 49 L62 70 L84 88 C94 97 81 110 71 100 L50 82 L29 100 C19 110 6 97 16 88 L38 70 Z",
      holes: [],
      highlightPaths: shine("M28 47 C35 54 42 61 49 68", "M25 68 L24.5 69")
    },
    y: {
      advanceWidth: 104,
      bounds: [10, 35, 90, 126],
      viewBox: [0, 0, 100, 128],
      outerPath: "M11 47 C6 35 24 29 30 41 L50 78 L70 41 C76 29 94 35 89 47 L61 106 C53 124 34 130 18 119 C8 112 17 99 27 105 C35 111 43 106 47 96 Z",
      holes: [],
      highlightPaths: shine("M24 47 C30 59 36 70 43 81", "M46 94 L45.5 95")
    },
    z: {
      advanceWidth: 96,
      bounds: [13, 36, 87, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M23 37 H78 C87 37 91 48 84 55 L49 85 H79 C89 85 89 101 79 101 H23 C14 101 10 90 17 83 L52 53 H23 C13 53 13 37 23 37 Z",
      holes: [],
      highlightPaths: shine("M29 47 C41 44 55 44 68 47", "M45 66 L44.5 67")
    },
    0: {
      advanceWidth: 112,
      bounds: [10, 12, 90, 101],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 13 C76 13 91 31 89 57 C87 84 72 100 50 100 C23 100 9 78 12 51 C15 27 30 13 50 13 Z",
      holes: [{ type: "ellipse", cx: 50, cy: 56, rx: 18, ry: 23 }],
      highlightPaths: roundShine
    },
    1: {
      advanceWidth: 92,
      bounds: [22, 10, 85, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M39 31 C45 26 49 22 52 17 C57 9 68 13 67 23 V82 C70 82 74 83 77 84 C86 88 84 99 75 100 C61 102 45 102 31 100 C22 99 20 88 29 84 C33 83 37 82 41 82 V40 C34 44 29 39 29 34 C29 29 34 25 39 31 Z",
      holes: [],
      highlightPaths: shine("M49 25 C54 20 59 19 63 22", "M43 45 L42.5 46")
    },
    2: {
      advanceWidth: 112,
      bounds: [14, 12, 93, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M25 35 C32 16 61 9 77 22 C91 34 87 55 72 66 C62 73 51 78 43 87 C55 87 67 86 80 86 C91 86 93 99 82 101 C61 104 42 103 23 101 C14 100 11 91 17 84 C28 71 45 62 60 52 C68 47 70 37 63 33 C55 29 41 31 36 42 C31 53 21 45 25 35 Z",
      holes: [],
      highlightPaths: shine("M31 33 C42 23 59 22 70 30", "M24 48 L23.5 49")
    },
    3: {
      advanceWidth: 108,
      bounds: [11, 11, 88, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M23 25 C36 10 68 8 80 23 C90 35 84 49 72 55 C88 62 90 81 77 94 C62 108 31 106 15 90 C7 82 18 69 27 77 C37 86 60 91 67 80 C74 68 54 64 42 65 C32 66 30 51 41 50 C55 49 70 45 67 35 C64 25 43 25 33 35 C25 44 15 34 23 25 Z",
      holes: [],
      highlightPaths: shine("M32 27 C43 20 58 20 69 27", "M28 45 L27.5 46")
    },
    4: {
      advanceWidth: 112,
      bounds: [11, 13, 89, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M64 21 C69 10 84 14 84 26 V66 H87 C97 66 97 82 87 82 H84 V92 C84 103 67 103 67 92 V82 H22 C13 82 9 71 15 64 Z",
      holes: [{ type: "path", d: "M66 40 L43 66 H67 C67 57 67 48 66 40 Z" }],
      highlightPaths: shine("M64 27 C68 22 73 21 78 24", "M33 65 L32.5 66")
    },
    5: {
      advanceWidth: 108,
      bounds: [12, 14, 88, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M27 15 H78 C88 15 88 31 78 31 H38 L36 49 C52 44 74 47 84 62 C94 78 82 100 62 104 C43 108 22 101 14 89 C8 80 21 69 29 78 C38 88 58 91 66 80 C74 68 61 57 43 62 C31 65 22 58 24 46 Z",
      holes: [],
      highlightPaths: shine("M34 25 C47 22 61 22 73 25", "M31 58 L30.5 59")
    },
    6: {
      advanceWidth: 112,
      bounds: [10, 11, 90, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M78 24 C86 31 76 44 67 37 C53 26 31 34 28 56 C39 46 61 45 76 56 C93 69 89 95 70 103 C50 112 22 100 14 78 C5 53 16 23 40 14 C54 9 69 13 78 24 Z",
      holes: [{ type: "ellipse", cx: 52, cy: 74, rx: 15, ry: 13 }],
      highlightPaths: shine("M31 33 C41 24 56 22 69 27", "M24 54 L23.5 55")
    },
    7: {
      advanceWidth: 104,
      bounds: [12, 14, 88, 102],
      viewBox: [0, 0, 100, 112],
      outerPath: "M22 15 H80 C89 15 94 25 88 34 L55 95 C49 106 33 99 39 87 L69 32 H22 C11 32 11 15 22 15 Z",
      holes: [],
      highlightPaths: shine("M30 25 C43 22 58 22 72 25", "M61 45 L60.5 46")
    },
    8: {
      advanceWidth: 112,
      bounds: [11, 11, 89, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M50 12 C72 12 85 25 83 42 C82 49 78 54 70 58 C84 63 90 73 87 86 C83 104 61 108 50 104 C39 108 17 104 13 86 C10 73 16 63 30 58 C22 54 18 49 17 42 C15 25 28 12 50 12 Z",
      holes: [
        { type: "ellipse", cx: 50, cy: 38, rx: 13, ry: 10 },
        { type: "ellipse", cx: 50, cy: 76, rx: 15, ry: 12 }
      ],
      highlightPaths: shine("M30 29 C40 21 56 21 68 28", "M25 48 L24.5 49")
    },
    9: {
      advanceWidth: 112,
      bounds: [10, 11, 90, 103],
      viewBox: [0, 0, 100, 112],
      outerPath: "M22 88 C14 81 24 68 33 75 C47 86 69 78 72 56 C61 66 39 67 24 56 C7 43 11 17 30 9 C50 0 78 12 86 34 C95 59 84 89 60 98 C46 103 31 99 22 88 Z",
      holes: [{ type: "ellipse", cx: 48, cy: 38, rx: 15, ry: 13 }],
      highlightPaths: shine("M31 26 C42 18 58 18 70 26", "M24 48 L23.5 49")
    }
  };

  const stylePresets = {
    "pink-jelly": {
      label: "Pink Jelly",
      colors: ["#ff66a8"],
      mode: "jelly"
    },
    "orange-jelly": {
      label: "Orange Jelly",
      colors: ["#ff941f"],
      mode: "jelly"
    },
    "yellow-jelly": {
      label: "Yellow Jelly",
      colors: ["#ffd83f"],
      mode: "jelly"
    },
    "blue-jelly": {
      label: "Blue Jelly",
      colors: ["#55d5e9"],
      mode: "jelly"
    },
    "purple-jelly": {
      label: "Purple Jelly",
      colors: ["#b86eff"],
      mode: "jelly"
    },
    rainbow: {
      label: "Rainbow",
      colors: ["#ff66a8", "#ff941f", "#ffd83f", "#6be79c", "#55d5e9", "#b86eff"],
      mode: "jelly"
    },
    pastel: {
      label: "Pastel",
      colors: ["#ffa5cb", "#ffc780", "#ffeb8d", "#9cf0bd", "#91e6f2", "#d7adff"],
      mode: "jelly"
    },
    "black-white-outline": {
      label: "Black & White Outline",
      colors: ["#fffdf8"],
      mode: "outline"
    },
    traceable: {
      label: "Traceable",
      colors: ["#fffdf8"],
      mode: "trace"
    }
  };

  global.BubbleJellyGlyphData = {
    version: "phase-2-full-silhouette",
    glyphs,
    stylePresets,
    supportedChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  };
})(window);
