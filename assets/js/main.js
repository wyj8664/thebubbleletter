const textInput = document.querySelector("#bubble-text");
const svgPreview = document.querySelector("#bubble-svg-preview");
const glyphSupportNote = document.querySelector("#glyph-support-note");
const canvas = document.querySelector("#bubble-canvas");
const context = canvas?.getContext("2d");
const styleInputs = document.querySelectorAll("input[name='bubble-style']");
const fontInputs = document.querySelectorAll("input[name='bubble-font']");
const colorStyleInput = document.querySelector("#color-style");
const customColorControls = document.querySelector("#custom-color-controls");
const fontColorInput = document.querySelector("#font-color");
const fontRgbInput = document.querySelector("#font-color-rgb");
const fontHexInput = document.querySelector("#font-color-hex");
const backgroundColorInput = document.querySelector("#background-color");
const backgroundHexInput = document.querySelector("#background-color-hex");
const outlineColorInput = document.querySelector("#outline-color");
const outlineHexInput = document.querySelector("#outline-color-hex");
const outlineEnabledInput = document.querySelector("#outline-enabled");
const jellyEffectInput = document.querySelector("#jelly-effect-enabled");
const fontSizeInput = document.querySelector("#font-size");
const fontSizeValue = document.querySelector("#font-size-value");
const outlineWidthInput = document.querySelector("#outline-width");
const outlineWidthValue = document.querySelector("#outline-width-value");
const canvasSizeInput = document.querySelector("#canvas-size");
const gridEnabledInput = document.querySelector("#grid-enabled");
const printButton = document.querySelector("#print-preview");
const downloadButton = document.querySelector("#download-png");
const downloadSvgButton = document.querySelector("#download-svg");
const alphabetSheetCanvas = document.querySelector("#alphabet-sheet-canvas");
const alphabetSheetContext = alphabetSheetCanvas?.getContext("2d");
const alphabetCaseInputs = document.querySelectorAll("input[name='alphabet-case']");
const alphabetFontInputs = document.querySelectorAll("input[name='alphabet-font']");
const alphabetBackgroundColorInput = document.querySelector("#alphabet-background-color");
const alphabetOutlineColorInput = document.querySelector("#alphabet-outline-color");
const alphabetColorStyleInput = document.querySelector("#alphabet-color-style");
const alphabetFontSizeInput = document.querySelector("#alphabet-font-size");
const alphabetFontSizeValue = document.querySelector("#alphabet-size-value");
const alphabetOutlineWidthInput = document.querySelector("#alphabet-outline-width");
const alphabetOutlineWidthValue = document.querySelector("#alphabet-outline-value");
const alphabetDownloadButton = document.querySelector("#download-alphabet-sheet");
const alphabetPrintButton = document.querySelector("#print-alphabet-sheet");
const singleLettersPrintButton = document.querySelector("#print-single-letters");
const bubbleNumbersPrintButton = document.querySelector("#print-bubble-numbers");
const alphabetPresetButtons = document.querySelectorAll("[data-alphabet-case][data-alphabet-font]");
const singleCaseInputs = document.querySelectorAll("input[name='single-letter-case']");
const singleStyleButtons = document.querySelectorAll("[data-single-font]");
const singleColorButtons = document.querySelectorAll("[data-single-color-style]");
const numberStyleButtons = document.querySelectorAll("[data-number-font]");
const numberColorButtons = document.querySelectorAll("[data-number-color-style]");
const singleLetterCanvas = document.querySelector("#single-letter-canvas");
const singleLetterContext = singleLetterCanvas?.getContext("2d");
const singleLetterButtons = document.querySelectorAll("[data-single-letter]");
const selectedSingleLabelOutput = document.querySelector("#selected-single-label");
const selectedSingleLetterOutput = document.querySelector("#selected-single-letter");
const singleLetterPrintButton = document.querySelector("#print-selected-letter");
const singleLetterDownloadButton = document.querySelector("#download-single-letter");
const singleLetterModal = document.querySelector("#single-letter-modal");
const singleLetterModalCanvas = document.querySelector("#single-letter-modal-canvas");
const singleLetterModalContext = singleLetterModalCanvas?.getContext("2d");
const singleLetterModalTitle = document.querySelector("#single-letter-modal-title");
const singleLetterModalCloseButtons = document.querySelectorAll("[data-close-single-modal]");
const singleLetterModalPrintButton = document.querySelector("#print-modal-letter");
const singleLetterModalDownloadButton = document.querySelector("#download-modal-letter");
const phraseCardButtons = document.querySelectorAll("[data-phrase-card]");
const phraseCardModal = document.querySelector("#phrase-card-modal");
const phraseCardCanvas = document.querySelector("#phrase-card-canvas");
const phraseCardContext = phraseCardCanvas?.getContext("2d");
const phrasePrintCanvas = document.querySelector("#phrase-card-print-canvas");
const phrasePrintContext = phrasePrintCanvas?.getContext("2d");
const phraseCardModalTitle = document.querySelector("#phrase-card-modal-title");
const phraseCardModalCloseButtons = document.querySelectorAll("[data-close-phrase-modal]");
const phraseOrientationButtons = document.querySelectorAll("[data-phrase-orientation]");
const phrasePrintButton = document.querySelector("#print-phrase-card");
const phraseDownloadButton = document.querySelector("#download-phrase-card");
const alphabetBrowserCaseInputs = document.querySelectorAll("input[name='alphabet-browser-case']");
const alphabetBrowserCards = document.querySelectorAll("[data-alphabet-card]");
const sectionLinks = document.querySelectorAll("[data-section-href]");
const isHomePage = document.body?.dataset.page === "home";
const isGeneratorPage = document.body?.dataset.page === "generator";
const isTracePage = document.body?.dataset.page === "trace";
const isAlphabetPage = document.body?.dataset.page === "alphabet";

if (isAlphabetPage && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

let selectedSingleLetter = "A";
let selectedSingleCase = "uppercase";
let selectedSingleFont = "Cherry Bomb One";
let selectedSingleColorStyle = isTracePage ? "low-ink" : "jelly-rainbow";
let selectedNumberFont = "Cherry Bomb One";
let selectedNumberColorStyle = isTracePage ? "low-ink" : "jelly-rainbow";
let selectedPhraseCard = "happy-birthday";
let selectedPhraseOrientation = "landscape";
const phraseBackgroundCache = new Map();
const alphabetReturnStorageKey = "bubbleAlphabetReturnPath";
let lastAlphabetHash = window.location.hash;
let alphabetAutoScrollToken = 0;
let alphabetManualScrollAt = 0;
let customFontColor = normalizeHexColor(fontColorInput?.value || fontHexInput?.value || "#f699ed") || "#f699ed";
let currentBubbleSvg = null;

const scriptBaseUrl = document.currentScript?.src || window.location.href;

const generatorColorPresets = {
  "pink-jelly": "#ff66a8",
  "orange-jelly": "#ff941f",
  "yellow-jelly": "#ffd83f",
  "blue-jelly": "#55d5e9",
  "purple-jelly": "#b86eff",
  rainbow: "#ff66a8",
  pastel: "#ffa5cb",
  "black-white-outline": "#fffdf8",
  traceable: "#fffdf8"
};

function assetUrl(path) {
  return new URL(path, scriptBaseUrl).href;
}

const fontSources = [
  ["Cherry Bomb One", assetUrl("../fonts/CherryBombOne-Regular.ttf")],
  ["Chewy", assetUrl("../fonts/Chewy-Regular.ttf")],
  ["DynaPuff", assetUrl("../fonts/DynaPuff.ttf")],
  ["Luckiest Guy", assetUrl("../fonts/LuckiestGuy-Regular.ttf")]
];

const phraseCards = {
  "happy-birthday": {
    title: "Happy Birthday",
    label: "Party banner",
    theme: "birthday",
    fontFamily: "Cherry Bomb One",
    fills: ["#ff6fae", "#ffc344", "#54c7ff"],
    fallback: ["#fff1f8", "#fff2c9", "#e8f7ff"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/happy-birthday-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/happy-birthday-final-portrait.png")
    },
    backgrounds: {
      landscape: assetUrl("../images/printable-banners/happy-birthday-landscape.png"),
      portrait: assetUrl("../images/printable-banners/happy-birthday-portrait.png")
    },
    lines: {
      landscape: ["Happy Birthday"],
      portrait: ["Happy", "Birthday"]
    },
    traceLines: {
      landscape: ["Happy", "Birthday"],
      portrait: ["Happy", "Birthday"]
    }
  },
  "get-well-soon": {
    title: "hope you get well soon",
    label: "Get-well card",
    theme: "get-well",
    fontFamily: "DynaPuff",
    fills: ["#32b6a9", "#ff9f7c", "#79bfff"],
    fallback: ["#e9fff8", "#fff0e7", "#eef8ff"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/get-well-soon-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/get-well-soon-final-portrait.png")
    },
    backgrounds: {
      landscape: assetUrl("../images/printable-banners/get-well-soon-landscape.png"),
      portrait: assetUrl("../images/printable-banners/get-well-soon-portrait.png")
    },
    lines: {
      landscape: ["hope you get", "well soon"],
      portrait: ["hope you", "get well", "soon"]
    }
  },
  congratulations: {
    title: "Congratulations",
    label: "Celebration sign",
    theme: "congrats",
    fontFamily: "Luckiest Guy",
    fills: ["#3977d8", "#f4b83d"],
    fallback: ["#fff2c9", "#e5edff", "#fff9e8"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/congratulations-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/congratulations-final-portrait.png")
    },
    backgrounds: {
      landscape: assetUrl("../images/printable-banners/congratulations-landscape.png"),
      portrait: assetUrl("../images/printable-banners/congratulations-portrait.png")
    },
    lines: {
      landscape: ["Congratulations"],
      portrait: ["Congratulations"]
    }
  },
  "merry-christmas": {
    title: "Merry Christmas",
    label: "Seasonal banner",
    theme: "christmas",
    fontFamily: "Cherry Bomb One",
    fills: ["#208c4f", "#e5524a", "#f2c94c"],
    fallback: ["#e7f8e9", "#fff0ef", "#fff8d8"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/merry-christmas-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/merry-christmas-final-portrait.png")
    },
    lines: {
      landscape: ["Merry Christmas"],
      portrait: ["Merry", "Christmas"]
    },
    traceLines: {
      landscape: ["Merry", "Christmas"],
      portrait: ["Merry", "Christmas"]
    }
  },
  "mothers-day": {
    title: "happy mother's day",
    label: "Mother's Day card",
    theme: "mom",
    fontFamily: "Chewy",
    fills: ["#f06fae", "#c78cff", "#ff9f7c"],
    fallback: ["#ffeaf4", "#f0e8ff", "#e8fff3"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/mothers-day-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/mothers-day-final-portrait.png")
    },
    lines: {
      landscape: ["happy mother's", "day"],
      portrait: ["happy", "mother's", "day"]
    },
    traceLines: {
      landscape: ["Happy", "Mother's", "Day"],
      portrait: ["Happy", "Mother's", "Day"]
    }
  },
  "fathers-day": {
    title: "happy father's day",
    label: "Father's Day card",
    theme: "dad",
    fontFamily: "DynaPuff",
    fills: ["#1c7fa0", "#2d62b5", "#e7a93b"],
    fallback: ["#e7f7ff", "#edf2ff", "#fff2cf"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/fathers-day-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/fathers-day-final-portrait.png")
    },
    lines: {
      landscape: ["happy father's", "day"],
      portrait: ["happy", "father's", "day"]
    },
    traceLines: {
      landscape: ["Happy", "Father's", "Day"],
      portrait: ["Happy", "Father's", "Day"]
    }
  },
  "happy-halloween": {
    title: "Happy Halloween",
    label: "Party decoration",
    theme: "halloween",
    fontFamily: "Cherry Bomb One",
    fills: ["#ff8a2a", "#7c56d9", "#54c482"],
    fallback: ["#fff0d8", "#efe3ff", "#e8fff0"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/happy-halloween-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/happy-halloween-final-portrait.png")
    },
    lines: {
      landscape: ["Happy Halloween"],
      portrait: ["Happy", "Halloween"]
    }
  },
  "thank-you": {
    title: "Thank You",
    label: "Card or poster",
    theme: "thanks",
    fontFamily: "Chewy",
    fills: ["#ff8b58", "#33b8aa", "#f5c84c"],
    fallback: ["#fff3dc", "#e7f8ff", "#ffeaf4"],
    finalImages: {
      landscape: assetUrl("../images/printable-banners/thank-you-final-landscape.png"),
      portrait: assetUrl("../images/printable-banners/thank-you-final-portrait.png")
    },
    backgrounds: {
      landscape: assetUrl("../images/printable-banners/thank-you-landscape.png"),
      portrait: assetUrl("../images/printable-banners/thank-you-portrait.png")
    },
    lines: {
      landscape: ["Thank You"],
      portrait: ["Thank", "You"]
    },
    traceLines: {
      landscape: ["Thank", "You"],
      portrait: ["Thank", "You"]
    }
  },
  welcome: {
    title: "Welcome",
    label: "Classroom sign",
    theme: "welcome",
    fontFamily: "Cherry Bomb One",
    fills: ["#1f1b19"],
    fallback: ["#ffffff", "#ffffff", "#ffffff"],
    lines: {
      landscape: ["Welcome"],
      portrait: ["Welcome"]
    },
    traceLines: {
      landscape: ["Welcome"],
      portrait: ["Welcome"]
    }
  }
};

const alphabetRows = {
  lowercase: ["abcdef", "ghijklm", "nopqrst", "uvwxyz"],
  uppercase: ["ABCDEF", "GHIJKL", "MNOPQ", "RSTUV", "WXYZ"]
};
const alphabetUppercaseOnlyFonts = new Set(["Luckiest Guy"]);
const printablePalettes = {
  "jelly-rainbow": [
    { base: "#ff6fae", shine: "#fff1f8", shadow: "#d94f8c" },
    { base: "#ffd25e", shine: "#fff7cc", shadow: "#e0a932" },
    { base: "#5fe0a8", shine: "#e9fff5", shadow: "#39b981" },
    { base: "#58cafa", shine: "#eefbff", shadow: "#2f9ed4" },
    { base: "#bb8dff", shine: "#f8f1ff", shadow: "#8a65d8" },
    { base: "#ff9064", shine: "#fff1e9", shadow: "#df6841" }
  ],
  "candy-pop": [
    { base: "#ff4fa2", shine: "#ffeaf5", shadow: "#bd2f75" },
    { base: "#3fd7ff", shine: "#eafaff", shadow: "#1999c6" },
    { base: "#ffe35a", shine: "#fff9c8", shadow: "#d6b629" },
    { base: "#8ef05c", shine: "#f0ffe8", shadow: "#57b938" },
    { base: "#ff8ed8", shine: "#fff0fb", shadow: "#c75aa9" }
  ],
  "fruit-gummy": [
    { base: "#ff7676", shine: "#fff0f0", shadow: "#d84b4b" },
    { base: "#ffb347", shine: "#fff2db", shadow: "#dc8127" },
    { base: "#ffe66d", shine: "#fff9d2", shadow: "#d7bd34" },
    { base: "#78e08f", shine: "#ecfff0", shadow: "#43b95b" },
    { base: "#70a1ff", shine: "#edf4ff", shadow: "#4375d8" }
  ],
  "ocean-gel": [
    { base: "#42e8d4", shine: "#e9fffb", shadow: "#20aea0" },
    { base: "#55d6ff", shine: "#effbff", shadow: "#26a8d7" },
    { base: "#7aa7ff", shine: "#eef4ff", shadow: "#5279d9" },
    { base: "#b7f7ff", shine: "#ffffff", shadow: "#6fc8d4" },
    { base: "#8dffcf", shine: "#edfff7", shadow: "#51c998" }
  ],
  "sunset-party": [
    { base: "#ff7b54", shine: "#fff0ea", shadow: "#d85333" },
    { base: "#ffb84d", shine: "#fff3d8", shadow: "#db872c" },
    { base: "#ffe66d", shine: "#fff9d2", shadow: "#cfb73a" },
    { base: "#ff6fb3", shine: "#fff0f7", shadow: "#cf3f88" },
    { base: "#9d7bff", shine: "#f5f0ff", shadow: "#7354d4" }
  ]
};

function selectedValue(selector, fallback) {
  return document.querySelector(selector)?.value || fallback;
}

async function loadFonts() {
  if (!("FontFace" in window)) return;

  await Promise.all(
    fontSources.map(async ([family, source]) => {
      const face = new FontFace(family, `url(${source})`);
      const loadedFace = await face.load();
      document.fonts.add(loadedFace);
    })
  );
}

function drawBubblePreview() {
  if ((!context || !canvas) && !svgPreview) return;

  applyCanvasSize();
  updateRangeLabels();

  const textLimit = Number(textInput?.dataset.maxLength || textInput?.getAttribute("maxlength") || 18);
  const lines = prepareLines(textInput?.value || "Hello", textLimit);
  const activeStyle = selectedValue("input[name='bubble-style']:checked", "outline");
  const fontFamily = selectedValue("input[name='bubble-font']:checked", "Cherry Bomb One");
  const useJellySvg = fontFamily === "Jelly";
  const useCanvasJelly = !useJellySvg && jellyEffectInput?.checked !== false;
  const fontColor = getActiveFontColor();
  const backgroundColor = normalizeHexColor(backgroundColorInput?.value) || "#34a4a9";
  const outlineColor = normalizeHexColor(outlineColorInput?.value) || "#1f1b19";
  const outlineEnabled = outlineEnabledInput?.checked !== false;
  const width = canvas?.width || 1200;
  const height = canvas?.height || 620;
  const maxFontSize = Number(fontSizeInput?.value || 180);

  if (useJellySvg && window.JellyGlyphRenderer && svgPreview) {
    if (canvas) canvas.hidden = true;
    svgPreview.hidden = false;
    downloadSvgButton?.removeAttribute("disabled");
    downloadSvgButton?.removeAttribute("title");

    const result = window.JellyGlyphRenderer.renderTextSvg(textInput?.value || "ABC abc 012", {
      width,
      height,
      fontSize: maxFontSize,
      letterSpacing: Math.max(2, maxFontSize * 0.018),
      colorStyle: colorStyleInput?.value || "custom",
      customColor: fontColor,
      backgroundColor,
      outlineColor: outlineEnabled ? outlineColor : backgroundColor,
      outlineWidth: outlineWidthInput ? Number(outlineWidthInput.value) : 14,
      showGrid: gridEnabledInput?.checked !== false,
      activeStyle
    });
    currentBubbleSvg = result.svg;
    svgPreview.replaceChildren(result.svg);

    if (glyphSupportNote) {
      glyphSupportNote.textContent = result.unsupported.length
        ? `SVG glyphs support A-Z, a-z, and 0-9. Not rendered yet: ${result.unsupported.join(" ")}.`
        : "Rendered with reusable SVG glyph data for A-Z, a-z, and 0-9.";
    }

    return;
  }

  if (!context || !canvas) return;

  currentBubbleSvg = null;
  if (svgPreview) {
    svgPreview.replaceChildren();
    svgPreview.hidden = true;
  }
  canvas.hidden = false;
  if (downloadSvgButton) {
    downloadSvgButton.disabled = true;
    downloadSvgButton.title = "SVG download is available for the Jelly glyph set.";
  }
  if (glyphSupportNote) {
    glyphSupportNote.textContent = useCanvasJelly
      ? `Rendered as editable jelly canvas text with local Google Font: ${fontFamily}.`
      : `Rendered with the original local Google Font style: ${fontFamily}.`;
  }

  const drawingFontFamily = fontFamily === "Sticker Bubble" ? "Chewy" : fontFamily;
  const letterSpacingRatio = getGeneratorFontLetterSpacingRatio(drawingFontFamily);
  const fontSize = fitFontSize(lines, drawingFontFamily, width - 140, height - 120, maxFontSize, letterSpacingRatio);
  const letterSpacing = fontSize * letterSpacingRatio;
  const autoStroke = activeStyle === "trace" ? Math.max(5, fontSize * 0.045) : Math.max(13, fontSize * 0.105);
  const strokeWidth = outlineWidthInput ? Number(outlineWidthInput.value) : autoStroke;
  const effectiveOutline = outlineEnabled && strokeWidth > 0;
  const lineHeight = fontSize * 1.08;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.08;

  context.clearRect(0, 0, width, height);
  drawBackground(backgroundColor, width, height, gridEnabledInput?.checked !== false);

  context.save();
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineCap = "round";

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;

    context.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;

    if (activeStyle === "outline" && useCanvasJelly) {
      drawEditableJellyFontText(
        line,
        fontFamily,
        colorStyleInput?.value || "custom",
        fontColor,
        outlineColor,
        effectiveOutline,
        width / 2,
        y,
        width,
        height,
        fontSize,
        strokeWidth,
        letterSpacing
      );
    } else if (activeStyle === "coloring") {
      drawSpacedTextLayer(line, width / 2, y, "#fffefb", outlineColor, effectiveOutline ? strokeWidth : 0, letterSpacing);
    } else {
      if (activeStyle === "outline") {
        drawSpacedTextLayer(line, width / 2, y, fontColor, outlineColor, effectiveOutline ? strokeWidth : 0, letterSpacing);
      } else {
        context.strokeStyle = effectiveOutline ? outlineColor : "#1f1b19";
        context.lineWidth = Math.max(2, strokeWidth || autoStroke);
        strokeSpacedText(line, width / 2, y, letterSpacing);
      }
    }
  });

  context.restore();
}

function getActiveFontColor() {
  const selectedStyle = colorStyleInput?.value || "custom";
  return generatorColorPresets[selectedStyle] || customFontColor;
}

function getGeneratorFontLetterSpacingRatio(fontFamily) {
  if (fontFamily === "Chewy") return 0.065;
  if (fontFamily === "Luckiest Guy") return 0.06;
  if (fontFamily === "Cherry Bomb One") return 0.025;
  if (fontFamily === "DynaPuff") return 0.02;
  return 0;
}

function mixHexColor(hex, targetHex, amount) {
  const from = hexToRgb(hex);
  const to = hexToRgb(targetHex);
  if (!from || !to) return normalizeHexColor(hex) || "#ff66a8";

  const mixed = [from.r, from.g, from.b].map((channel, index) => {
    const target = [to.r, to.g, to.b][index];
    return Math.round(channel + (target - channel) * amount);
  });

  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function normalizeHexColor(value) {
  const trimmed = String(value || "").trim();
  const match = trimmed.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return "";

  const raw = match[1];
  const expanded = raw.length === 3
    ? raw.split("").map((char) => char + char).join("")
    : raw;

  return `#${expanded.toLowerCase()}`;
}

function hexToRgb(hex) {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;

  const value = Number.parseInt(normalized.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function formatRgbColor(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
}

function rgbToHexColor(value) {
  const match = String(value || "").trim().match(/^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})(?:\s*[,/]\s*(?:0|1|0?\.\d+|100%))?\s*\)$/i)
    || String(value || "").trim().match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);

  if (!match) return "";

  const channels = match.slice(1, 4).map(Number);
  if (channels.some((channel) => channel < 0 || channel > 255)) return "";

  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function syncCustomColorControls(hex, source = "") {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return false;

  customFontColor = normalized;

  if (fontColorInput && source !== "picker") {
    fontColorInput.value = normalized;
  }
  if (fontHexInput && source !== "hex") {
    fontHexInput.value = normalized;
  }
  if (fontRgbInput && source !== "rgb") {
    fontRgbInput.value = formatRgbColor(normalized);
  }

  return true;
}

function syncHexPair(colorInput, hexInput, hex, source = "") {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return false;

  if (colorInput && source !== "picker") {
    colorInput.value = normalized;
  }
  if (hexInput && source !== "hex") {
    hexInput.value = normalized;
  }

  return true;
}

function updateCustomColorVisibility() {
  const isCustom = !colorStyleInput || colorStyleInput.value === "custom";
  if (customColorControls) customColorControls.hidden = !isCustom;
}

function prepareLines(rawText, limit) {
  const clippedText = [...(rawText.trim() || "Hello")].slice(0, limit).join("");
  const lines = clippedText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  return lines.length ? lines : ["Hello"];
}

function applyCanvasSize() {
  if (!canvasSizeInput || !canvas) return;
  const [width, height] = canvasSizeInput.value.split("x").map(Number);

  if (width && height && (canvas.width !== width || canvas.height !== height)) {
    canvas.width = width;
    canvas.height = height;
  }
}

function updateRangeLabels() {
  if (fontSizeInput && fontSizeValue) {
    fontSizeValue.textContent = `${fontSizeInput.value}px`;
  }
  if (outlineWidthInput && outlineWidthValue) {
    outlineWidthValue.textContent = `${outlineWidthInput.value}px`;
  }
}

function drawBackground(color, width, height, showGrid = true) {
  context.fillStyle = color;
  context.fillRect(0, 0, width, height);

  if (!showGrid) return;

  context.save();
  context.globalAlpha = 0.12;
  context.strokeStyle = "#ffffff";
  context.lineWidth = 2;
  for (let x = 0; x < width; x += 52) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += 52) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function fitFontSize(lines, fontFamily, maxWidth, maxHeight, maxFontSize, letterSpacingRatio = 0) {
  let size = maxFontSize;
  while (size > 46) {
    context.font = `900 ${size}px "${fontFamily}", sans-serif`;
    const widestLine = Math.max(...lines.map((line) => {
      const gaps = Math.max(0, [...line].length - 1);
      return context.measureText(line).width + gaps * size * letterSpacingRatio;
    }));
    const totalHeight = lines.length * size * 1.08;
    if (widestLine <= maxWidth && totalHeight <= maxHeight) return size;
    size -= 5;
  }
  return size;
}

function drawTextLayer(text, x, y, fill, stroke, strokeWidth) {
  context.fillStyle = fill;
  if (strokeWidth > 0) {
    context.lineWidth = strokeWidth;
    context.strokeStyle = stroke;
    context.strokeText(text, x, y);
  }
  context.fillText(text, x, y);
}

function drawSpacedTextLayer(text, x, y, fill, stroke, strokeWidth, letterSpacing = 0) {
  if (!letterSpacing) {
    drawTextLayer(text, x, y, fill, stroke, strokeWidth);
    return;
  }

  const chars = [...text];
  const width = measureSpacedText(context, text, letterSpacing);
  let cursor = x - width / 2;

  context.save();
  context.textAlign = "left";
  context.fillStyle = fill;
  chars.forEach((char) => {
    if (strokeWidth > 0) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = stroke;
      context.strokeText(char, cursor, y);
    }
    context.fillText(char, cursor, y);
    cursor += context.measureText(char).width + letterSpacing;
  });
  context.restore();
}

function strokeSpacedText(text, x, y, letterSpacing = 0) {
  if (!letterSpacing) {
    context.strokeText(text, x, y);
    return;
  }

  const width = measureSpacedText(context, text, letterSpacing);
  let cursor = x - width / 2;

  context.save();
  context.textAlign = "left";
  [...text].forEach((char) => {
    context.strokeText(char, cursor, y);
    cursor += context.measureText(char).width + letterSpacing;
  });
  context.restore();
}

function drawEditableJellyFontText(text, fontFamily, colorStyle, customColor, outlineColor, outlineEnabled, x, y, width, height, fontSize, strokeWidth, letterSpacing = 0) {
  const runs = measureCharacterRuns(text, fontSize, fontFamily, x, letterSpacing);
  const effectiveStroke = Math.max(4, strokeWidth || fontSize * 0.08);

  context.save();
  context.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineCap = "round";
  context.miterLimit = 2;

  runs.forEach((metrics, index) => {
    const { char, left, width: charWidth } = metrics;
    if (!char.trim()) return;

    const swatch = getGeneratorJellySwatch(colorStyle, customColor, index);
    const fill = getJellyFontFillStyle(swatch, y, fontSize);
    const outerStroke = outlineEnabled ? effectiveStroke : Math.max(2, effectiveStroke * 0.18);

    context.save();
    context.globalAlpha = 0.2;
    context.lineWidth = outerStroke;
    context.strokeStyle = "#000000";
    context.strokeText(char, left + fontSize * 0.018, y + fontSize * 0.04);
    context.restore();

    if (outlineEnabled) {
      context.lineWidth = outerStroke;
      context.strokeStyle = outlineColor;
      context.strokeText(char, left, y);
    }

    context.save();
    context.globalAlpha = 0.46;
    context.lineWidth = Math.max(2, outerStroke * 0.36);
    context.strokeStyle = swatch.shadow;
    context.strokeText(char, left, y + fontSize * 0.018);
    context.restore();

    context.fillStyle = fill;
    context.fillText(char, left, y);

    context.save();
    context.globalAlpha = 0.38;
    context.lineWidth = Math.max(1.5, outerStroke * 0.18);
    context.strokeStyle = swatch.shine;
    context.strokeText(char, left, y - fontSize * 0.025);
    context.restore();

    drawEditableFontHighlights(char, fontFamily, left, y, charWidth, fontSize, width, height);
  });

  context.restore();
}

function getGeneratorJellySwatch(colorStyle, customColor, index) {
  if (colorStyle === "rainbow") return getPrintableSwatch("jelly-rainbow", index);

  if (colorStyle === "pastel") {
    const pastelBases = ["#ffa5cb", "#ffc780", "#ffeb8d", "#9cf0bd", "#91e6f2", "#d7adff"];
    const base = pastelBases[index % pastelBases.length];
    return {
      base,
      shine: mixHexColor(base, "#ffffff", 0.64),
      shadow: mixHexColor(base, "#211d1b", 0.22)
    };
  }

  if (colorStyle === "black-white-outline" || colorStyle === "traceable") {
    return {
      base: "#fffdf8",
      shine: "#ffffff",
      shadow: "#d8d1c8"
    };
  }

  const base = colorStyle === "custom"
    ? normalizeHexColor(customColor) || "#f699ed"
    : generatorColorPresets[colorStyle] || customFontColor;

  return {
    base,
    shine: mixHexColor(base, "#ffffff", 0.66),
    shadow: mixHexColor(base, "#211d1b", 0.26)
  };
}

function getJellyFontFillStyle(swatch, y, fontSize) {
  const gradient = context.createLinearGradient(0, y - fontSize * 0.55, 0, y + fontSize * 0.5);
  gradient.addColorStop(0, swatch.shine);
  gradient.addColorStop(0.22, swatch.base);
  gradient.addColorStop(0.72, swatch.base);
  gradient.addColorStop(1, swatch.shadow);
  return gradient;
}

function drawEditableFontHighlights(char, fontFamily, left, y, charWidth, fontSize, width, height) {
  const highlightCanvas = document.createElement("canvas");
  highlightCanvas.width = width;
  highlightCanvas.height = height;
  const highlightContext = highlightCanvas.getContext("2d");
  const strokeWidth = Math.max(5, fontSize * 0.052);
  const startX = left + charWidth * 0.18;
  const endX = left + charWidth * 0.66;
  const shineY = y - fontSize * 0.28;

  highlightContext.save();
  highlightContext.strokeStyle = "rgba(255, 255, 255, 0.88)";
  highlightContext.fillStyle = "rgba(255, 255, 255, 0.82)";
  highlightContext.lineWidth = strokeWidth;
  highlightContext.lineCap = "round";
  highlightContext.lineJoin = "round";
  highlightContext.beginPath();
  highlightContext.moveTo(startX, shineY);
  highlightContext.quadraticCurveTo(left + charWidth * 0.38, y - fontSize * 0.38, endX, y - fontSize * 0.3);
  highlightContext.stroke();

  highlightContext.beginPath();
  highlightContext.ellipse(left + charWidth * 0.14, y - fontSize * 0.04, strokeWidth * 0.58, strokeWidth * 0.82, -0.28, 0, Math.PI * 2);
  highlightContext.fill();
  highlightContext.restore();

  highlightContext.globalCompositeOperation = "destination-in";
  highlightContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  highlightContext.textAlign = "left";
  highlightContext.textBaseline = "middle";
  highlightContext.fillText(char, left, y);

  context.drawImage(highlightCanvas, 0, 0);
}

function drawStickerBubbleText(text, activeStyle, fill, outlineColor, outlineEnabled, x, y, width, height, fontSize, strokeWidth) {
  const stickerFont = "Chewy";
  const effectiveStroke = Math.max(2, strokeWidth || fontSize * 0.08);

  context.font = `900 ${fontSize}px "${stickerFont}", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineCap = "round";

  if (activeStyle === "trace") {
    context.lineWidth = Math.max(2, effectiveStroke * 0.55);
    context.strokeStyle = outlineEnabled ? outlineColor : "#1f1b19";
    context.strokeText(text, x, y);
    return;
  }

  if (activeStyle === "coloring") {
    context.lineWidth = outlineEnabled ? effectiveStroke : 0;
    context.strokeStyle = outlineColor;
    context.fillStyle = "#fffefb";
    if (outlineEnabled) context.strokeText(text, x, y);
    context.fillText(text, x, y);
    return;
  }

  if (outlineEnabled && outlineColor.toLowerCase() !== fill.toLowerCase()) {
    context.lineWidth = effectiveStroke;
    context.strokeStyle = outlineColor;
    context.strokeText(text, x, y);
  }

  context.fillStyle = fill;
  context.fillText(text, x, y);
  drawStickerHighlights(text, x, y, fontSize, stickerFont, width, height);
}

function drawStickerHighlights(text, x, y, fontSize, fontFamily, width, height) {
  const highlightCanvas = document.createElement("canvas");
  highlightCanvas.width = width;
  highlightCanvas.height = height;
  const highlightContext = highlightCanvas.getContext("2d");
  const metrics = measureCharacterRuns(text, fontSize, fontFamily, x);

  highlightContext.fillStyle = "rgba(255, 255, 255, 0.88)";
  metrics.forEach(({ left, width: charWidth }, index) => {
    if (!charWidth) return;

    const shineX = left + charWidth * 0.3;
    const shineY = y - fontSize * 0.22 + (index % 2) * fontSize * 0.03;
    const shineWidth = Math.max(7, charWidth * 0.13);
    const shineHeight = Math.max(14, fontSize * 0.15);

    highlightContext.save();
    highlightContext.translate(shineX, shineY);
    highlightContext.rotate(-0.35);
    highlightContext.beginPath();
    highlightContext.ellipse(0, 0, shineWidth, shineHeight, 0, 0, Math.PI * 2);
    highlightContext.fill();
    highlightContext.restore();
  });

  highlightContext.globalCompositeOperation = "destination-in";
  highlightContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  highlightContext.textAlign = "center";
  highlightContext.textBaseline = "middle";
  highlightContext.fillText(text, x, y);

  context.drawImage(highlightCanvas, 0, 0);
}

function measureCharacterRuns(text, fontSize, fontFamily, centerX, letterSpacing = 0) {
  const measuringCanvas = document.createElement("canvas");
  const measuringContext = measuringCanvas.getContext("2d");
  measuringContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;

  const chars = [...text];
  const totalWidth = chars.reduce((sum, char) => sum + measuringContext.measureText(char).width, 0)
    + letterSpacing * Math.max(0, chars.length - 1);
  let cursor = centerX - totalWidth / 2;

  return chars.map((char) => {
    const width = measuringContext.measureText(char).width;
    const result = { char, left: cursor, width };
    cursor += width + letterSpacing;
    return result;
  });
}

function drawAlphabetSheet() {
  if (!alphabetSheetCanvas || !alphabetSheetContext) return;

  syncAlphabetFontAvailability();
  updateAlphabetSheetLabels();

  const letterCase = selectedValue("input[name='alphabet-case']:checked", "lowercase");
  const fontFamily = selectedValue("input[name='alphabet-font']:checked", "Cherry Bomb One");
  const backgroundColor = alphabetBackgroundColorInput?.value || "#ffffff";
  const outlineColor = alphabetOutlineColorInput?.value || "#1f1b19";
  const colorStyle = alphabetColorStyleInput?.value || (isTracePage ? "low-ink" : "jelly-rainbow");
  const preferredFontSize = Number(alphabetFontSizeInput?.value || (isTracePage ? 230 : 250));
  const outlineWidth = Number(alphabetOutlineWidthInput?.value || 4);
  const rows = alphabetRows[letterCase] || alphabetRows.lowercase;
  const width = alphabetSheetCanvas.width;
  const height = alphabetSheetCanvas.height;
  const lineHeightRatio = letterCase === "uppercase" ? 1.14 : 1.2;
  const fontSize = fitAlphabetSheetSize(rows, fontFamily, width - 130, height - 170, preferredFontSize, lineHeightRatio);
  const letterSpacing = getAlphabetLetterSpacing(rows, fontFamily, fontSize, width - 130);
  const lineHeight = fontSize * lineHeightRatio;
  const startY = height / 2 - ((rows.length - 1) * lineHeight) / 2;

  alphabetSheetContext.clearRect(0, 0, width, height);
  alphabetSheetContext.fillStyle = backgroundColor;
  alphabetSheetContext.fillRect(0, 0, width, height);

  if (isTracePage) {
    alphabetSheetContext.save();
    alphabetSheetContext.strokeStyle = "#e5d9cc";
    alphabetSheetContext.lineWidth = Math.max(2, width * 0.002);
    alphabetSheetContext.setLineDash([16, 16]);
    rows.forEach((row, index) => {
      const y = startY + index * lineHeight;
      [y - fontSize * 0.34, y, y + fontSize * 0.34].forEach((lineY) => {
        alphabetSheetContext.beginPath();
        alphabetSheetContext.moveTo(width * 0.09, lineY);
        alphabetSheetContext.lineTo(width * 0.91, lineY);
        alphabetSheetContext.stroke();
      });
    });
    alphabetSheetContext.setLineDash([12, 14]);
    alphabetSheetContext.strokeRect(width * 0.06, height * 0.055, width * 0.88, height * 0.89);
    alphabetSheetContext.restore();
  }

  alphabetSheetContext.save();
  alphabetSheetContext.textAlign = "center";
  alphabetSheetContext.textBaseline = "middle";
  alphabetSheetContext.lineJoin = "round";
  alphabetSheetContext.lineCap = "round";
  alphabetSheetContext.miterLimit = 2;
  alphabetSheetContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  alphabetSheetContext.lineWidth = outlineWidth;
  alphabetSheetContext.strokeStyle = outlineColor;
  alphabetSheetContext.fillStyle = backgroundColor;
  alphabetSheetContext.shadowColor = colorStyle === "low-ink" || isTracePage ? "transparent" : "rgba(33, 29, 27, 0.16)";
  alphabetSheetContext.shadowBlur = 0;
  alphabetSheetContext.shadowOffsetX = 0;
  alphabetSheetContext.shadowOffsetY = Math.max(2, outlineWidth * 1.1);

  rows.forEach((row, index) => {
    const y = startY + index * lineHeight;
    const rowOffset = rows.slice(0, index).join("").length;
    drawSpacedOutlinedText(
      alphabetSheetContext,
      row,
      width / 2,
      y,
      letterSpacing,
      (charIndex, char, metrics) => getPrintableFillStyle(alphabetSheetContext, colorStyle, backgroundColor, rowOffset + charIndex, metrics),
      {
        jelly: colorStyle !== "low-ink" && !isTracePage,
        fontSize
      }
    );
  });

  alphabetSheetContext.restore();
  updateAlphabetPresetState();
}

function fitAlphabetSheetSize(rows, fontFamily, maxWidth, maxHeight, preferredFontSize, lineHeightRatio) {
  let size = preferredFontSize;

  while (size > 54) {
    alphabetSheetContext.font = `900 ${size}px "${fontFamily}", sans-serif`;
    const widestLine = Math.max(...rows.map((row) => alphabetSheetContext.measureText(row).width));
    const totalHeight = rows.length * size * lineHeightRatio;
    if (widestLine <= maxWidth && totalHeight <= maxHeight) return size;
    size -= 3;
  }

  return size;
}

function getAlphabetLetterSpacing(rows, fontFamily, fontSize, maxWidth) {
  alphabetSheetContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  const desiredWidth = maxWidth * 0.9;
  const widestRow = rows.reduce((widest, row) => {
    const width = alphabetSheetContext.measureText(row).width;
    return width > widest.width ? { row, width } : widest;
  }, { row: rows[0], width: 0 });
  const gaps = Math.max(1, [...widestRow.row].length - 1);
  const neededSpacing = (desiredWidth - widestRow.width) / gaps;

  return Math.max(0, Math.min(fontSize * 0.35, neededSpacing));
}

function measureSpacedText(contextToMeasure, text, letterSpacing) {
  const chars = [...text];
  const lettersWidth = chars.reduce((sum, char) => sum + contextToMeasure.measureText(char).width, 0);
  return lettersWidth + letterSpacing * Math.max(0, chars.length - 1);
}

function drawSpacedOutlinedText(contextToDraw, text, centerX, y, letterSpacing, fillColor, options = {}) {
  const chars = [...text];
  const width = measureSpacedText(contextToDraw, text, letterSpacing);
  let cursor = centerX - width / 2;
  const originalLineWidth = contextToDraw.lineWidth;
  const originalStrokeStyle = contextToDraw.strokeStyle;

  contextToDraw.save();
  contextToDraw.textAlign = "left";

  chars.forEach((char, index) => {
    const charWidth = contextToDraw.measureText(char).width;
    const metrics = {
      left: cursor,
      width: charWidth,
      y,
      fontSize: options.fontSize || charWidth
    };
    contextToDraw.strokeText(char, cursor, y);
    contextToDraw.fillStyle = typeof fillColor === "function" ? fillColor(index, char, metrics) : fillColor;
    contextToDraw.fillText(char, cursor, y);

    if (options.jelly) {
      contextToDraw.save();
      contextToDraw.shadowColor = "transparent";
      contextToDraw.globalAlpha = 0.55;
      contextToDraw.lineWidth = Math.max(1.2, originalLineWidth * 0.28);
      contextToDraw.strokeStyle = "#fff";
      contextToDraw.strokeText(char, cursor, y - metrics.fontSize * 0.025);
      contextToDraw.restore();
    }

    cursor += charWidth + letterSpacing;
  });

  contextToDraw.lineWidth = originalLineWidth;
  contextToDraw.strokeStyle = originalStrokeStyle;
  contextToDraw.restore();
}

function getPrintableSwatch(colorStyle, index) {
  const palette = printablePalettes[colorStyle] || printablePalettes["jelly-rainbow"];
  return palette[index % palette.length];
}

function getPrintableFillStyle(contextToUse, colorStyle, backgroundColor, index, metrics) {
  if (colorStyle === "low-ink") return backgroundColor;
  const swatch = getPrintableSwatch(colorStyle, index);
  const gradient = contextToUse.createLinearGradient(
    0,
    metrics.y - metrics.fontSize * 0.55,
    0,
    metrics.y + metrics.fontSize * 0.48
  );

  gradient.addColorStop(0, swatch.shine);
  gradient.addColorStop(0.22, swatch.base);
  gradient.addColorStop(0.72, swatch.base);
  gradient.addColorStop(1, swatch.shadow);

  return gradient;
}

function getPrintableFillColor(colorStyle, backgroundColor, index) {
  if (colorStyle === "low-ink") return backgroundColor;
  return getPrintableSwatch(colorStyle, index).base;
}

function updateAlphabetSheetLabels() {
  if (alphabetFontSizeInput && alphabetFontSizeValue) {
    alphabetFontSizeValue.textContent = `${alphabetFontSizeInput.value}px`;
  }

  if (alphabetOutlineWidthInput && alphabetOutlineWidthValue) {
    alphabetOutlineWidthValue.textContent = `${alphabetOutlineWidthInput.value}px`;
  }
}

function syncAlphabetFontAvailability() {
  const letterCase = selectedValue("input[name='alphabet-case']:checked", "lowercase");
  const selectedFont = selectedValue("input[name='alphabet-font']:checked", "Cherry Bomb One");
  const lowercaseMode = letterCase === "lowercase";

  alphabetFontInputs.forEach((input) => {
    const unavailable = lowercaseMode && alphabetUppercaseOnlyFonts.has(input.value);
    input.disabled = unavailable;
    input.closest("label")?.classList.toggle("is-disabled", unavailable);
  });

  if (lowercaseMode && alphabetUppercaseOnlyFonts.has(selectedFont)) {
    setCheckedRadio("alphabet-font", "Cherry Bomb One");
  }
}

function setCheckedRadio(name, value) {
  const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (input) input.checked = true;
}

function updateAlphabetPresetState() {
  if (!alphabetPresetButtons.length) return;

  const letterCase = selectedValue("input[name='alphabet-case']:checked", "lowercase");
  const fontFamily = selectedValue("input[name='alphabet-font']:checked", "Cherry Bomb One");

  alphabetPresetButtons.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.alphabetCase === letterCase && button.dataset.alphabetFont === fontFamily
    );
  });
}

function downloadAlphabetSheet() {
  if (!alphabetSheetCanvas) return;

  const letterCase = selectedValue("input[name='alphabet-case']:checked", "lowercase");
  const fontFamily = selectedValue("input[name='alphabet-font']:checked", "Cherry Bomb One");
  const fontSlug = fontFamily.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const link = document.createElement("a");

  const prefix = isTracePage ? "traceable" : "";
  link.download = `${prefix ? `${prefix}-` : ""}${letterCase}-bubble-letter-alphabet-${fontSlug}.png`;
  link.href = alphabetSheetCanvas.toDataURL("image/png");
  link.click();
}

function getSinglePrintableConfig(value = selectedSingleLetter) {
  const isNumber = /^\d$/.test(value);
  const singleFontFamily = selectedSingleCase === "lowercase" && alphabetUppercaseOnlyFonts.has(selectedSingleFont)
    ? "Cherry Bomb One"
    : selectedSingleFont;
  const displayValue = isNumber
    ? value
    : selectedSingleCase === "lowercase"
      ? value.toLowerCase()
      : value.toUpperCase();

  return {
    isNumber,
    displayValue,
    fontFamily: isNumber ? selectedNumberFont : singleFontFamily,
    colorStyle: isNumber ? selectedNumberColorStyle : selectedSingleColorStyle
  };
}

function updateSingleStyleState() {
  if (selectedSingleCase === "lowercase" && alphabetUppercaseOnlyFonts.has(selectedSingleFont)) {
    selectedSingleFont = "Cherry Bomb One";
  }

  singleCaseInputs.forEach((input) => {
    input.checked = input.value === selectedSingleCase;
  });

  singleStyleButtons.forEach((button) => {
    const unavailable = selectedSingleCase === "lowercase" && alphabetUppercaseOnlyFonts.has(button.dataset.singleFont);
    const isActive = button.dataset.singleFont === selectedSingleFont;
    button.disabled = unavailable;
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-disabled", unavailable);
    button.setAttribute("aria-pressed", String(isActive));
  });

  singleColorButtons.forEach((button) => {
    const isActive = button.dataset.singleColorStyle === selectedSingleColorStyle;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  numberStyleButtons.forEach((button) => {
    const isActive = button.dataset.numberFont === selectedNumberFont;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  numberColorButtons.forEach((button) => {
    const isActive = button.dataset.numberColorStyle === selectedNumberColorStyle;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateSinglePrintableCards() {
  singleLetterButtons.forEach((button) => {
    const value = button.dataset.singleLetter || "A";
    const { isNumber, displayValue, fontFamily, colorStyle } = getSinglePrintableConfig(value);
    const glyph = button.querySelector("span");
    const label = button.querySelector("small");

    if (glyph) {
      glyph.textContent = displayValue;
      glyph.style.fontFamily = `"${fontFamily}", "Cherry Bomb One", "Arial Rounded MT Bold", sans-serif`;
      glyph.style.color = getPrintableFillColor(colorStyle, "#ffffff", getSingleLetterColorIndex(value));
    }

    if (label) {
      const labelPrefix = isTracePage
        ? isNumber ? "Trace Number" : "Trace Letter"
        : isNumber ? "Bubble Number" : "Bubble Letter";
      label.textContent = `${labelPrefix} ${displayValue}`;
    }
  });
}

function selectSingleLetter(letter, shouldScroll = false) {
  selectedSingleLetter = letter || "A";
  const { isNumber, displayValue } = getSinglePrintableConfig(selectedSingleLetter);
  const labelPrefix = isTracePage
    ? isNumber ? "Trace Number" : "Trace Letter"
    : isNumber ? "Bubble Number" : "Bubble Letter";

  if (selectedSingleLabelOutput) {
    selectedSingleLabelOutput.textContent = labelPrefix;
  }

  if (selectedSingleLetterOutput) {
    selectedSingleLetterOutput.textContent = displayValue;
  }

  if (singleLetterModalTitle) {
    singleLetterModalTitle.textContent = `${labelPrefix} ${displayValue}`;
  }

  singleLetterButtons.forEach((button) => {
    const isActive = button.dataset.singleLetter === selectedSingleLetter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  drawSingleLetterSheet();
  updateSinglePrintableCards();
  updateSingleStyleState();

  if (shouldScroll) {
    document.querySelector("#single-letter-print-area")?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

function drawSingleLetterSheet() {
  if (!singleLetterCanvas || !singleLetterContext) return;

  drawSingleLetterOnCanvas(singleLetterCanvas, singleLetterContext);

  if (singleLetterModalCanvas && singleLetterModalContext) {
    drawSingleLetterOnCanvas(singleLetterModalCanvas, singleLetterModalContext);
  }
}

function drawSingleLetterOnCanvas(targetCanvas, targetContext) {
  const width = targetCanvas.width;
  const height = targetCanvas.height;
  const { displayValue, fontFamily, colorStyle } = getSinglePrintableConfig(selectedSingleLetter);
  const fontSize = fitSingleLetterSize(displayValue, fontFamily, width * 0.78, height * 0.7, 820, targetContext);
  const y = height / 2 + fontSize * 0.03;
  const fillStyle = getPrintableFillStyle(targetContext, colorStyle, "#ffffff", getSingleLetterColorIndex(selectedSingleLetter), {
    left: width * 0.1,
    width: width * 0.8,
    y,
    fontSize
  });

  targetContext.clearRect(0, 0, width, height);
  targetContext.fillStyle = "#ffffff";
  targetContext.fillRect(0, 0, width, height);

  if (isTracePage) {
    targetContext.save();
    targetContext.strokeStyle = "#e5d9cc";
    targetContext.lineWidth = Math.max(2, width * 0.002);
    targetContext.setLineDash([14, 16]);
    [0.32, 0.5, 0.68].forEach((position) => {
      targetContext.beginPath();
      targetContext.moveTo(width * 0.12, height * position);
      targetContext.lineTo(width * 0.88, height * position);
      targetContext.stroke();
    });
    targetContext.restore();
  }

  targetContext.save();
  targetContext.textAlign = "center";
  targetContext.textBaseline = "middle";
  targetContext.lineJoin = "round";
  targetContext.lineCap = "round";
  targetContext.font = `900 ${fontSize}px "${fontFamily}", sans-serif`;
  targetContext.lineWidth = isTracePage ? Math.max(6, fontSize * 0.014) : Math.max(8, fontSize * 0.018);
  targetContext.strokeStyle = "#1f1b19";
  targetContext.shadowColor = colorStyle === "low-ink" || isTracePage ? "transparent" : "rgba(33, 29, 27, 0.16)";
  targetContext.shadowBlur = 0;
  targetContext.shadowOffsetY = Math.max(4, fontSize * 0.018);
  targetContext.fillStyle = fillStyle;
  targetContext.strokeText(displayValue, width / 2, y);
  targetContext.fillText(displayValue, width / 2, y);

  if (colorStyle !== "low-ink") {
    targetContext.save();
    targetContext.shadowColor = "transparent";
    targetContext.globalAlpha = 0.6;
    targetContext.lineWidth = Math.max(2, fontSize * 0.007);
    targetContext.strokeStyle = "#fff";
    targetContext.strokeText(displayValue, width / 2, y - fontSize * 0.025);
    targetContext.restore();
  }

  targetContext.restore();
}

function getSingleLetterColorIndex(value) {
  if (/^\d$/.test(value)) return Number(value);
  return Math.max(0, value.toUpperCase().charCodeAt(0) - 65);
}

function fitSingleLetterSize(letter, fontFamily, maxWidth, maxHeight, preferredFontSize, measuringContext = singleLetterContext) {
  let size = preferredFontSize;

  while (size > 120) {
    measuringContext.font = `900 ${size}px "${fontFamily}", sans-serif`;
    const metrics = measuringContext.measureText(letter);
    const textHeight = (metrics.actualBoundingBoxAscent || size * 0.76) + (metrics.actualBoundingBoxDescent || size * 0.24);
    if (metrics.width <= maxWidth && textHeight <= maxHeight) return size;
    size -= 8;
  }

  return size;
}

function downloadSingleLetterSheet() {
  const sourceCanvas = singleLetterCanvas || singleLetterModalCanvas;
  if (!sourceCanvas) return;

  const { displayValue, isNumber } = getSinglePrintableConfig(selectedSingleLetter);
  const link = document.createElement("a");
  const kind = isNumber ? "number" : "letter";
  const prefix = isTracePage ? "traceable-bubble" : "bubble";
  link.download = `${prefix}-${kind}-${displayValue.toLowerCase()}.png`;
  link.href = sourceCanvas.toDataURL("image/png");
  link.click();
}

function getPhraseCard(slug = selectedPhraseCard) {
  return phraseCards[slug] || phraseCards["happy-birthday"];
}

function initializePhraseCards() {
  phraseCardButtons.forEach((button) => {
    const card = getPhraseCard(button.dataset.phraseCard);
    const preview = button.querySelector(".phrase-card-preview");

    button.querySelector(".banner-title")?.style.setProperty("color", card.fills[0]);
    button.style.setProperty("--phrase-text", card.fills[0]);
    button.style.setProperty("--phrase-shadow", card.fills[1] || "#ffd86b");
    button.style.setProperty("--phrase-fallback", `linear-gradient(135deg, ${card.fallback.join(", ")})`);
    button.classList.toggle("has-final-art", Boolean(card.finalImages?.landscape));

    if (preview && (card.finalImages?.landscape || card.backgrounds?.landscape)) {
      const imageUrl = card.finalImages?.landscape || card.backgrounds?.landscape;
      const overlay = card.finalImages?.landscape
        ? "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02))"
        : "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))";
      preview.style.backgroundImage = `${overlay}, url("${imageUrl}")`;
    }
  });
}

async function loadPhraseBackground(src) {
  if (!src) return null;
  if (phraseBackgroundCache.has(src)) return phraseBackgroundCache.get(src);

  const promise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

  phraseBackgroundCache.set(src, promise);
  return promise;
}

function drawImageCover(targetContext, image, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  targetContext.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawRoundedRectPath(targetContext, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  targetContext.beginPath();
  targetContext.moveTo(x + r, y);
  targetContext.lineTo(x + width - r, y);
  targetContext.quadraticCurveTo(x + width, y, x + width, y + r);
  targetContext.lineTo(x + width, y + height - r);
  targetContext.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  targetContext.lineTo(x + r, y + height);
  targetContext.quadraticCurveTo(x, y + height, x, y + height - r);
  targetContext.lineTo(x, y + r);
  targetContext.quadraticCurveTo(x, y, x + r, y);
  targetContext.closePath();
}

function drawPhraseFallbackBackground(targetContext, card, width, height, orientation) {
  const gradient = targetContext.createLinearGradient(0, 0, width, height);
  card.fallback.forEach((color, index) => {
    gradient.addColorStop(index / Math.max(1, card.fallback.length - 1), color);
  });

  targetContext.fillStyle = gradient;
  targetContext.fillRect(0, 0, width, height);
  drawPhraseDecorations(targetContext, card, width, height, orientation);
}

function drawPhraseCleanCenter(targetContext, width, height, orientation) {
  const panelWidth = width * (orientation === "portrait" ? 0.82 : 0.74);
  const panelHeight = height * (orientation === "portrait" ? 0.4 : 0.32);
  const x = (width - panelWidth) / 2;
  const y = (height - panelHeight) / 2;

  targetContext.save();
  targetContext.fillStyle = "rgba(255, 255, 255, 0.28)";
  drawRoundedRectPath(targetContext, x, y, panelWidth, panelHeight, 52);
  targetContext.fill();
  targetContext.restore();
}

function drawPhraseDecorations(targetContext, card, width, height, orientation) {
  const colors = card.fills;
  const top = height * 0.11;
  const bottom = height * 0.88;
  const left = width * 0.11;
  const right = width * 0.88;

  targetContext.save();
  targetContext.lineWidth = Math.max(3, width * 0.004);
  targetContext.strokeStyle = "#1f1b19";

  drawStar(targetContext, left, top, width * 0.034, colors[1] || "#ffd86b");
  drawStar(targetContext, right, bottom, width * 0.03, colors[0]);
  drawBubbleDot(targetContext, right, top, width * 0.032, colors[2] || colors[1]);
  drawBubbleDot(targetContext, left, bottom, width * 0.026, colors[1] || colors[0]);

  if (["birthday", "congrats", "thanks"].includes(card.theme)) {
    drawRibbon(targetContext, width * 0.18, height * 0.78, width * 0.14, height * 0.055, colors[1] || "#ffd86b");
    drawConfetti(targetContext, width, height, colors);
  }

  if (card.theme === "birthday") {
    drawBalloon(targetContext, width * 0.82, height * 0.2, width * 0.05, colors[0]);
    drawBalloon(targetContext, width * 0.9, height * 0.26, width * 0.044, colors[1]);
  }

  if (card.theme === "get-well" || card.theme === "mom") {
    drawFlower(targetContext, width * 0.16, height * 0.22, width * 0.04, colors[0]);
    drawFlower(targetContext, width * 0.86, height * 0.78, width * 0.038, colors[1] || colors[0]);
    drawHeart(targetContext, width * 0.84, height * 0.18, width * 0.034, colors[2] || colors[0]);
  }

  if (card.theme === "dad") {
    drawRibbon(targetContext, width * 0.82, height * 0.2, width * 0.16, height * 0.06, colors[2] || "#ffd86b");
    drawStar(targetContext, width * 0.16, height * 0.76, width * 0.038, colors[1] || colors[0]);
  }

  if (card.theme === "christmas") {
    drawTree(targetContext, width * 0.15, height * 0.2, width * 0.09, colors[0]);
    drawBubbleDot(targetContext, width * 0.86, height * 0.2, width * 0.035, colors[1]);
    drawStar(targetContext, width * 0.88, height * 0.78, width * 0.034, colors[2] || "#f2c94c");
  }

  if (card.theme === "halloween") {
    drawPumpkin(targetContext, width * 0.84, height * 0.22, width * 0.09, colors[0]);
    drawCrescent(targetContext, width * 0.16, height * 0.18, width * 0.054, colors[2] || "#f2c94c");
    drawStar(targetContext, width * 0.18, height * 0.8, width * 0.034, colors[1]);
  }

  targetContext.restore();
}

function drawBubbleDot(targetContext, x, y, radius, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  targetContext.arc(x, y, radius, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.stroke();
  targetContext.restore();
}

function drawStar(targetContext, x, y, radius, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? radius : radius * 0.42;
    const pointX = x + Math.cos(angle) * r;
    const pointY = y + Math.sin(angle) * r;
    if (i === 0) targetContext.moveTo(pointX, pointY);
    else targetContext.lineTo(pointX, pointY);
  }
  targetContext.closePath();
  targetContext.fill();
  targetContext.stroke();
  targetContext.restore();
}

function drawHeart(targetContext, x, y, size, color) {
  targetContext.save();
  targetContext.translate(x, y);
  targetContext.rotate(-Math.PI / 4);
  targetContext.fillStyle = color;
  drawRoundedRectPath(targetContext, -size * 0.45, -size * 0.45, size * 0.9, size * 0.9, size * 0.22);
  targetContext.fill();
  targetContext.beginPath();
  targetContext.arc(-size * 0.22, -size * 0.45, size * 0.24, 0, Math.PI * 2);
  targetContext.arc(size * 0.22, -size * 0.45, size * 0.24, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.stroke();
  targetContext.restore();
}

function drawFlower(targetContext, x, y, radius, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  for (let i = 0; i < 6; i += 1) {
    const angle = (i * Math.PI * 2) / 6;
    targetContext.beginPath();
    targetContext.ellipse(x + Math.cos(angle) * radius * 0.7, y + Math.sin(angle) * radius * 0.7, radius * 0.46, radius * 0.28, angle, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.stroke();
  }
  drawBubbleDot(targetContext, x, y, radius * 0.28, "#ffd86b");
  targetContext.restore();
}

function drawRibbon(targetContext, x, y, width, height, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  targetContext.moveTo(x - width / 2, y - height / 2);
  targetContext.lineTo(x + width / 2, y - height / 2);
  targetContext.lineTo(x + width * 0.38, y);
  targetContext.lineTo(x + width / 2, y + height / 2);
  targetContext.lineTo(x - width / 2, y + height / 2);
  targetContext.lineTo(x - width * 0.38, y);
  targetContext.closePath();
  targetContext.fill();
  targetContext.stroke();
  targetContext.restore();
}

function drawBalloon(targetContext, x, y, radius, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  targetContext.ellipse(x, y, radius * 0.72, radius, 0, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.stroke();
  targetContext.beginPath();
  targetContext.moveTo(x, y + radius);
  targetContext.quadraticCurveTo(x - radius * 0.4, y + radius * 1.45, x + radius * 0.18, y + radius * 1.9);
  targetContext.stroke();
  targetContext.restore();
}

function drawTree(targetContext, x, y, size, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  targetContext.moveTo(x, y - size * 0.75);
  targetContext.lineTo(x + size * 0.62, y + size * 0.26);
  targetContext.lineTo(x + size * 0.24, y + size * 0.26);
  targetContext.lineTo(x + size * 0.58, y + size * 0.72);
  targetContext.lineTo(x - size * 0.58, y + size * 0.72);
  targetContext.lineTo(x - size * 0.24, y + size * 0.26);
  targetContext.lineTo(x - size * 0.62, y + size * 0.26);
  targetContext.closePath();
  targetContext.fill();
  targetContext.stroke();
  targetContext.restore();
}

function drawPumpkin(targetContext, x, y, size, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  for (let i = -1; i <= 1; i += 1) {
    targetContext.beginPath();
    targetContext.ellipse(x + i * size * 0.22, y, size * 0.34, size * 0.42, 0, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.stroke();
  }
  targetContext.strokeStyle = "#1f1b19";
  targetContext.beginPath();
  targetContext.moveTo(x, y - size * 0.44);
  targetContext.quadraticCurveTo(x + size * 0.08, y - size * 0.7, x + size * 0.28, y - size * 0.58);
  targetContext.stroke();
  targetContext.restore();
}

function drawCrescent(targetContext, x, y, radius, color) {
  targetContext.save();
  targetContext.fillStyle = color;
  targetContext.beginPath();
  targetContext.arc(x, y, radius, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.stroke();
  targetContext.fillStyle = "rgba(255, 240, 216, 0.96)";
  targetContext.beginPath();
  targetContext.arc(x + radius * 0.35, y - radius * 0.1, radius * 0.88, 0, Math.PI * 2);
  targetContext.fill();
  targetContext.restore();
}

function drawConfetti(targetContext, width, height, colors) {
  for (let i = 0; i < 22; i += 1) {
    const x = ((i * 83) % 1000) / 1000 * width;
    const y = (i % 2 === 0 ? height * 0.08 : height * 0.88) + ((i * 37) % 80) - 40;
    targetContext.save();
    targetContext.translate(x, y);
    targetContext.rotate((i % 7) * 0.35);
    targetContext.fillStyle = colors[i % colors.length];
    drawRoundedRectPath(targetContext, -width * 0.012, -height * 0.005, width * 0.024, height * 0.01, 4);
    targetContext.fill();
    targetContext.stroke();
    targetContext.restore();
  }
}

function getTracePhraseLines(card, orientation) {
  return card.traceLines?.[orientation]
    || card.traceLines?.landscape
    || card.lines?.[orientation]
    || [card.title];
}

function drawTraceDoodle(targetContext, type, x, y, size) {
  targetContext.save();
  targetContext.translate(x, y);
  targetContext.lineWidth = Math.max(3, size * 0.08);
  targetContext.strokeStyle = "#1f1b19";
  targetContext.fillStyle = "#fff";
  targetContext.lineJoin = "round";
  targetContext.lineCap = "round";

  if (type === "star") {
    targetContext.translate(-x, -y);
    drawStar(targetContext, x, y, size * 0.56, "#fff");
  } else if (type === "heart") {
    targetContext.translate(-x, -y);
    drawHeart(targetContext, x, y, size * 0.72, "#fff");
  } else if (type === "triangle") {
    targetContext.beginPath();
    targetContext.moveTo(0, -size * 0.46);
    targetContext.lineTo(size * 0.5, size * 0.42);
    targetContext.lineTo(-size * 0.5, size * 0.42);
    targetContext.closePath();
    targetContext.fill();
    targetContext.stroke();
  } else if (type === "diamond") {
    targetContext.beginPath();
    targetContext.moveTo(0, -size * 0.5);
    targetContext.lineTo(size * 0.5, 0);
    targetContext.lineTo(0, size * 0.5);
    targetContext.lineTo(-size * 0.5, 0);
    targetContext.closePath();
    targetContext.fill();
    targetContext.stroke();
  } else if (type === "square") {
    drawRoundedRectPath(targetContext, -size * 0.42, -size * 0.42, size * 0.84, size * 0.84, size * 0.14);
    targetContext.fill();
    targetContext.stroke();
  } else if (type === "flower") {
    for (let i = 0; i < 6; i += 1) {
      const angle = (Math.PI * 2 * i) / 6;
      targetContext.beginPath();
      targetContext.ellipse(Math.cos(angle) * size * 0.23, Math.sin(angle) * size * 0.23, size * 0.18, size * 0.31, angle, 0, Math.PI * 2);
      targetContext.fill();
      targetContext.stroke();
    }
    targetContext.beginPath();
    targetContext.arc(0, 0, size * 0.12, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.stroke();
  } else if (type === "wave") {
    targetContext.beginPath();
    targetContext.moveTo(-size * 0.5, 0);
    targetContext.quadraticCurveTo(-size * 0.25, -size * 0.32, 0, 0);
    targetContext.quadraticCurveTo(size * 0.25, size * 0.32, size * 0.5, 0);
    targetContext.stroke();
  } else if (type === "circle") {
    targetContext.beginPath();
    targetContext.arc(0, 0, size * 0.42, 0, Math.PI * 2);
    targetContext.fill();
    targetContext.stroke();
  } else {
    targetContext.beginPath();
    targetContext.moveTo(0, -size * 0.55);
    targetContext.lineTo(0, size * 0.55);
    targetContext.moveTo(-size * 0.55, 0);
    targetContext.lineTo(size * 0.55, 0);
    targetContext.moveTo(-size * 0.34, -size * 0.34);
    targetContext.lineTo(size * 0.34, size * 0.34);
    targetContext.moveTo(size * 0.34, -size * 0.34);
    targetContext.lineTo(-size * 0.34, size * 0.34);
    targetContext.stroke();
  }

  targetContext.restore();
}

function drawTracePhraseDecorations(targetContext, card, width, height, orientation) {
  const isPortrait = orientation === "portrait";
  const size = Math.min(width, height) * (isPortrait ? 0.075 : 0.065);
  const insetX = width * (isPortrait ? 0.16 : 0.12);
  const insetY = height * (isPortrait ? 0.14 : 0.15);
  const themes = {
    birthday: ["star", "triangle", "square", "circle"],
    christmas: ["star", "diamond", "triangle", "star"],
    thanks: ["heart", "sparkle", "flower", "heart"],
    mom: ["flower", "heart", "heart", "flower"],
    dad: ["star", "wave", "square", "star"],
    welcome: ["diamond", "circle", "sparkle", "diamond"]
  };
  const doodles = themes[card.theme] || ["star", "circle", "square", "sparkle"];
  const positions = [
    [insetX, insetY],
    [width - insetX, insetY],
    [insetX, height - insetY],
    [width - insetX, height - insetY]
  ];

  doodles.forEach((type, index) => {
    drawTraceDoodle(targetContext, type, positions[index][0], positions[index][1], size);
  });
}

function drawTracePhraseWorksheetOnCanvas(targetCanvas, targetContext, card, orientation) {
  const isPortrait = orientation === "portrait";
  const width = isPortrait ? 1000 : 1400;
  const height = isPortrait ? 1400 : 1000;
  const lines = getTracePhraseLines(card, orientation);
  const fontFamily = card.fontFamily || "Cherry Bomb One";
  const maxTextWidth = width * (isPortrait ? 0.78 : 0.82);
  const maxTextHeight = height * (isPortrait ? 0.46 : 0.44);
  const preferredSize = isPortrait ? 196 : 214;
  const margin = Math.min(width, height) * 0.06;
  const verticalOffset = card.theme === "mom" || card.theme === "dad"
    ? -height * (isPortrait ? 0.022 : 0.034)
    : 0;

  targetCanvas.width = width;
  targetCanvas.height = height;
  targetContext.clearRect(0, 0, width, height);
  targetContext.fillStyle = "#fff";
  targetContext.fillRect(0, 0, width, height);

  targetContext.save();
  targetContext.strokeStyle = "#eadfd3";
  targetContext.lineWidth = 2;
  for (let y = height * 0.18; y < height * 0.86; y += height * 0.12) {
    targetContext.beginPath();
    targetContext.moveTo(margin * 1.2, y);
    targetContext.lineTo(width - margin * 1.2, y);
    targetContext.stroke();
  }
  targetContext.setLineDash([14, 12]);
  targetContext.strokeStyle = "#d8cec3";
  targetContext.strokeRect(margin, margin, width - margin * 2, height - margin * 2);
  targetContext.restore();

  drawTracePhraseDecorations(targetContext, card, width, height, orientation);

  const fontSize = fitPhraseFontSize(targetContext, lines, fontFamily, maxTextWidth, maxTextHeight, preferredSize);
  const lineHeight = fontSize * 0.92;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + (isPortrait ? height * 0.02 : 0) + verticalOffset;

  targetContext.save();
  targetContext.textAlign = "center";
  targetContext.textBaseline = "middle";
  targetContext.lineJoin = "round";
  targetContext.lineCap = "round";
  targetContext.miterLimit = 2;
  targetContext.font = `900 ${fontSize}px "${fontFamily}", "Cherry Bomb One", sans-serif`;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    targetContext.lineWidth = Math.max(8, fontSize * 0.056);
    targetContext.strokeStyle = "#1f1b19";
    targetContext.fillStyle = "#fff";
    targetContext.strokeText(line, width / 2, y);
    targetContext.fillText(line, width / 2, y);
  });

  targetContext.restore();
}

async function drawPhraseCardOnCanvas(targetCanvas, targetContext, card, orientation) {
  if (!targetCanvas || !targetContext || !card) return;

  if (isTracePage) {
    drawTracePhraseWorksheetOnCanvas(targetCanvas, targetContext, card, orientation);
    return;
  }

  const isPortrait = orientation === "portrait";
  const width = isPortrait ? 1000 : 1400;
  const height = isPortrait ? 1400 : 1000;
  const finalArtwork = await loadPhraseBackground(card.finalImages?.[orientation]);
  const background = await loadPhraseBackground(card.backgrounds?.[orientation]);

  targetCanvas.width = width;
  targetCanvas.height = height;
  targetContext.clearRect(0, 0, width, height);

  if (finalArtwork) {
    targetContext.drawImage(finalArtwork, 0, 0, width, height);
    return;
  }

  if (background) {
    drawImageCover(targetContext, background, width, height);
  } else {
    drawPhraseFallbackBackground(targetContext, card, width, height, orientation);
  }

  drawPhraseCleanCenter(targetContext, width, height, orientation);
  drawPhraseText(targetContext, card, width, height, orientation);
}

function fitPhraseFontSize(targetContext, lines, fontFamily, maxWidth, maxHeight, preferredSize) {
  let size = preferredSize;

  while (size > 62) {
    targetContext.font = `900 ${size}px "${fontFamily}", "Cherry Bomb One", sans-serif`;
    const widestLine = Math.max(...lines.map((line) => targetContext.measureText(line).width));
    const totalHeight = lines.length * size * 0.94;
    if (widestLine <= maxWidth && totalHeight <= maxHeight) return size;
    size -= 4;
  }

  return size;
}

function drawPhraseText(targetContext, card, width, height, orientation) {
  const lines = card.lines?.[orientation] || [card.title];
  const fontFamily = card.fontFamily || "Cherry Bomb One";
  const isPortrait = orientation === "portrait";
  const maxTextWidth = width * (isPortrait ? 0.78 : 0.82);
  const maxTextHeight = height * (isPortrait ? 0.44 : 0.34);
  const preferredSize = isPortrait ? 174 : 180;
  const fontSize = fitPhraseFontSize(targetContext, lines, fontFamily, maxTextWidth, maxTextHeight, preferredSize);
  const lineHeight = fontSize * 0.94;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

  targetContext.save();
  targetContext.textAlign = "center";
  targetContext.textBaseline = "middle";
  targetContext.lineJoin = "round";
  targetContext.lineCap = "round";
  targetContext.miterLimit = 2;
  targetContext.font = `900 ${fontSize}px "${fontFamily}", "Cherry Bomb One", sans-serif`;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    const fill = card.fills[index % card.fills.length];
    const strokeWidth = Math.max(9, fontSize * 0.07);

    targetContext.save();
    targetContext.shadowColor = "rgba(33, 29, 27, 0.22)";
    targetContext.shadowBlur = 0;
    targetContext.shadowOffsetX = Math.max(3, fontSize * 0.035);
    targetContext.shadowOffsetY = Math.max(5, fontSize * 0.045);
    targetContext.lineWidth = strokeWidth;
    targetContext.strokeStyle = "#1f1b19";
    targetContext.fillStyle = fill;
    targetContext.strokeText(line, width / 2, y);
    targetContext.fillText(line, width / 2, y);
    targetContext.restore();

    targetContext.save();
    targetContext.globalAlpha = 0.72;
    targetContext.lineWidth = Math.max(2, fontSize * 0.014);
    targetContext.strokeStyle = "#fff";
    targetContext.strokeText(line, width / 2, y - fontSize * 0.028);
    targetContext.restore();
  });

  targetContext.restore();
}

async function updatePhraseCardPreview() {
  const card = getPhraseCard();

  if (phraseCardModalTitle) {
    phraseCardModalTitle.textContent = isTracePage && card.traceLines
      ? getTracePhraseLines(card, selectedPhraseOrientation).join(" ")
      : card.title;
  }

  phraseOrientationButtons.forEach((button) => {
    const isActive = button.dataset.phraseOrientation === selectedPhraseOrientation;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  await Promise.all([
    drawPhraseCardOnCanvas(phraseCardCanvas, phraseCardContext, card, selectedPhraseOrientation),
    drawPhraseCardOnCanvas(phrasePrintCanvas, phrasePrintContext, card, selectedPhraseOrientation)
  ]);
}

async function openPhraseCardModal(slug) {
  if (!phraseCardModal) return;

  selectedPhraseCard = slug || "happy-birthday";
  selectedPhraseOrientation = "landscape";
  phraseCardModal.hidden = false;
  document.body.classList.add("modal-open");
  await updatePhraseCardPreview();
  phraseCardModal.querySelector(".letter-modal-close")?.focus();
}

function closePhraseCardModal() {
  if (!phraseCardModal) return;

  phraseCardModal.hidden = true;
  document.body.classList.remove("modal-open");
}

async function downloadPhraseCard() {
  const card = getPhraseCard();
  if (!phraseCardCanvas) return;

  await drawPhraseCardOnCanvas(phraseCardCanvas, phraseCardContext, card, selectedPhraseOrientation);
  const link = document.createElement("a");
  const slug = card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  link.download = isTracePage
    ? `traceable-${slug}-${selectedPhraseOrientation}-worksheet.png`
    : `${slug}-${selectedPhraseOrientation}-bubble-card.png`;
  link.href = phraseCardCanvas.toDataURL("image/png");
  link.click();
}

async function printPhraseCard() {
  const card = getPhraseCard();
  await drawPhraseCardOnCanvas(phrasePrintCanvas, phrasePrintContext, card, selectedPhraseOrientation);
  printWithTarget("phrase-card");
}

function openSingleLetterModal() {
  if (!singleLetterModal) return;

  singleLetterModal.hidden = false;
  document.body.classList.add("modal-open");
  singleLetterModal.querySelector(".letter-modal-close")?.focus();
}

function closeSingleLetterModal() {
  if (!singleLetterModal) return;

  const returnPath = getSafeReturnPath();
  if (returnPath) {
    const referrerUrl = getSameOriginUrl(document.referrer);
    const returnUrl = getSameOriginUrl(returnPath);

    if (returnUrl?.pathname === "/bubble-letter-alphabet/") {
      storeAlphabetReturnPath(`${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`);

      if (referrerUrl?.pathname === "/bubble-letter-alphabet/" && window.history.length > 1) {
        window.history.back();
        return;
      }
    }

    window.location.replace(returnPath);
    return;
  }

  singleLetterModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function printWithTarget(target) {
  document.body.dataset.printTarget = target;
  window.addEventListener(
    "afterprint",
    () => {
      delete document.body.dataset.printTarget;
    },
    { once: true }
  );
  window.print();
}

function getBubbleDownloadName(extension) {
  const rawName = (textInput?.value.trim() || "bubble-letters")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${rawName || "bubble-letters"}.${extension}`;
}

function downloadSvg() {
  if (!currentBubbleSvg || !window.JellyGlyphRenderer) return;

  const link = document.createElement("a");
  const source = window.JellyGlyphRenderer.serializeSvg(currentBubbleSvg);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  link.download = getBubbleDownloadName("svg");
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

async function downloadPng() {
  const link = document.createElement("a");
  link.download = getBubbleDownloadName("png");

  if (currentBubbleSvg && window.JellyGlyphRenderer) {
    link.href = await window.JellyGlyphRenderer.svgToPngDataUrl(
      currentBubbleSvg,
      canvas?.width || Number(currentBubbleSvg.getAttribute("width")) || 1200,
      canvas?.height || Number(currentBubbleSvg.getAttribute("height")) || 620
    );
    link.click();
    return;
  }

  if (!canvas) return;

  link.href = canvas.toDataURL("image/png");
  link.click();
}

function getCurrentQueryParams() {
  return new URLSearchParams(window.location.search);
}

function getSafeReturnPath() {
  const params = getCurrentQueryParams();
  const returnPath = params.get("return") || params.get("returnTo") || "";

  if (!returnPath.startsWith("/") || returnPath.startsWith("//")) return "";
  return returnPath;
}

function getSameOriginUrl(path) {
  if (!path) return null;

  try {
    const url = new URL(path, window.location.origin);
    return url.origin === window.location.origin ? url : null;
  } catch {
    return null;
  }
}

function storeAlphabetReturnPath(returnPath) {
  try {
    window.sessionStorage.setItem(alphabetReturnStorageKey, returnPath);
  } catch {}
}

function takeAlphabetReturnPath() {
  try {
    const returnPath = window.sessionStorage.getItem(alphabetReturnStorageKey) || "";
    if (returnPath) window.sessionStorage.removeItem(alphabetReturnStorageKey);
    return returnPath;
  } catch {
    return "";
  }
}

function applyAlphabetQueryParams() {
  if (!alphabetBrowserCaseInputs.length) return;

  const requestedCase = getCurrentQueryParams().get("case");
  if (requestedCase === "uppercase" || requestedCase === "lowercase") {
    setCheckedRadio("alphabet-browser-case", requestedCase);
  }
}

function applyGeneratorQueryParams() {
  if (!canvas) return;

  const params = getCurrentQueryParams();
  const requestedStyle = params.get("style");
  const requestedText = params.get("text");

  if (requestedStyle && [...styleInputs].some((input) => input.value === requestedStyle)) {
    setCheckedRadio("bubble-style", requestedStyle);
    applyGeneratorTraceOutlineDefault();
  }

  if (requestedText && textInput) {
    textInput.value = requestedText.slice(0, Number(textInput.dataset.maxLength || 80));
  }
}

function applyGeneratorTraceOutlineDefault() {
  if (!isGeneratorPage || !outlineWidthInput) return;

  const activeStyle = selectedValue("input[name='bubble-style']:checked", "outline");
  if (activeStyle !== "trace") return;

  outlineWidthInput.value = "2";
  updateRangeLabels();
}

applyGeneratorQueryParams();

function updateAlphabetBrowser() {
  if (!alphabetBrowserCards.length) return;

  const selectedCase = selectedValue("input[name='alphabet-browser-case']:checked", "uppercase");
  const isLowercase = selectedCase === "lowercase";

  alphabetBrowserCards.forEach((card) => {
    const baseLetter = (card.dataset.alphabetCard || "A").toUpperCase();
    const displayLetter = isLowercase ? baseLetter.toLowerCase() : baseLetter;
    const encodedLetter = encodeURIComponent(displayLetter);
    const anchorId = `bubble-letter-${baseLetter.toLowerCase()}`;
    const returnPath = encodeURIComponent(`/bubble-letter-alphabet/?case=${selectedCase}#${anchorId}`);
    const title = card.querySelector("h3");
    const preview = card.querySelector(".alphabet-letter-preview");
    const printLink = card.querySelector("[data-print-letter]");
    const traceLink = card.querySelector("[data-trace-letter]");
    const generatorLink = card.querySelector("[data-generator-letter]");
    const actions = card.querySelector(".alphabet-letter-actions");

    card.id = anchorId;
    if (preview) preview.textContent = displayLetter;
    if (title) title.textContent = `Bubble Letter ${displayLetter}`;
    if (actions) actions.dataset.selectedLabel = `${displayLetter} selected`;
    if (printLink) printLink.href = `/printable-bubble-letters/?letter=${encodedLetter}&case=${selectedCase}&open=1&return=${returnPath}`;
    if (traceLink) traceLink.href = `/bubble-letters-to-trace/?letter=${encodedLetter}&case=${selectedCase}&open=1&return=${returnPath}`;
    if (generatorLink) generatorLink.href = `/bubble-letter-generator/?text=${encodedLetter}`;
  });

  scrollAlphabetHashIntoView();
}

function scrollAlphabetHashIntoView() {
  if (!alphabetBrowserCards.length || !window.location.hash) return;

  const targetId = window.location.hash.slice(1);
  if (!/^bubble-letter-[a-z]$/.test(targetId)) return;

  const target = document.getElementById(targetId);
  if (!target) return;
  if (Date.now() - alphabetManualScrollAt < 4000) return;

  const token = ++alphabetAutoScrollToken;
  const startedAt = Date.now();

  const scrollToTarget = () => {
    if (token !== alphabetAutoScrollToken || alphabetManualScrollAt > startedAt) return;

    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
  };

  requestAnimationFrame(scrollToTarget);
  window.setTimeout(scrollToTarget, 150);
  window.setTimeout(scrollToTarget, 500);
  window.setTimeout(scrollToTarget, 1000);
  window.setTimeout(scrollToTarget, 2500);
}

function cancelAlphabetAutoScroll() {
  alphabetManualScrollAt = Date.now();
  alphabetAutoScrollToken += 1;
}

function consumeAlphabetReturnPath() {
  if (!isAlphabetPage) return;

  const returnPath = takeAlphabetReturnPath();
  const returnUrl = getSameOriginUrl(returnPath);
  if (!returnUrl || returnUrl.pathname !== "/bubble-letter-alphabet/") return;

  const nextPath = `${returnUrl.pathname}${returnUrl.search}${returnUrl.hash}`;
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextPath !== currentPath) {
    window.history.replaceState(null, "", nextPath);
  }

  applyAlphabetQueryParams();
  updateAlphabetBrowser();
}

function applySingleLetterQueryParams() {
  if (!singleLetterButtons.length) return;

  const params = getCurrentQueryParams();
  const rawLetter = params.get("letter");
  if (!rawLetter || !/^[a-z0-9]$/i.test(rawLetter)) return;

  const requestedCase = params.get("case");
  const isNumber = /^\d$/.test(rawLetter);
  const normalizedLetter = isNumber ? rawLetter : rawLetter.toUpperCase();
  const targetButton = [...singleLetterButtons].find((button) => button.dataset.singleLetter === normalizedLetter);
  if (!targetButton) return;

  if (!isNumber) {
    selectedSingleCase = requestedCase === "lowercase" || rawLetter === rawLetter.toLowerCase()
      ? "lowercase"
      : "uppercase";
  }

  selectSingleLetter(normalizedLetter, false);

  if (["1", "true", "yes"].includes((params.get("open") || "").toLowerCase())) {
    openSingleLetterModal();
  }
}

[
  textInput,
  backgroundColorInput,
  outlineColorInput,
  outlineEnabledInput,
  jellyEffectInput,
  fontSizeInput,
  outlineWidthInput,
  canvasSizeInput,
  gridEnabledInput,
  ...styleInputs,
  ...fontInputs
].forEach((element) => {
  element?.addEventListener("input", drawBubblePreview);
  element?.addEventListener("change", drawBubblePreview);
});

styleInputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (!input.checked || input.value !== "trace") return;
    applyGeneratorTraceOutlineDefault();
    drawBubblePreview();
  });
});

colorStyleInput?.addEventListener("input", () => {
  updateCustomColorVisibility();
  drawBubblePreview();
});

colorStyleInput?.addEventListener("change", () => {
  updateCustomColorVisibility();
  drawBubblePreview();
});

fontColorInput?.addEventListener("input", () => {
  syncCustomColorControls(fontColorInput.value, "picker");
  drawBubblePreview();
});

fontHexInput?.addEventListener("input", () => {
  if (syncCustomColorControls(fontHexInput.value, "hex")) {
    drawBubblePreview();
  }
});

fontRgbInput?.addEventListener("input", () => {
  const hex = rgbToHexColor(fontRgbInput.value);
  if (syncCustomColorControls(hex, "rgb")) {
    drawBubblePreview();
  }
});

backgroundColorInput?.addEventListener("input", () => {
  syncHexPair(backgroundColorInput, backgroundHexInput, backgroundColorInput.value, "picker");
});

backgroundHexInput?.addEventListener("input", () => {
  if (syncHexPair(backgroundColorInput, backgroundHexInput, backgroundHexInput.value, "hex")) {
    drawBubblePreview();
  }
});

outlineColorInput?.addEventListener("input", () => {
  syncHexPair(outlineColorInput, outlineHexInput, outlineColorInput.value, "picker");
});

outlineHexInput?.addEventListener("input", () => {
  if (syncHexPair(outlineColorInput, outlineHexInput, outlineHexInput.value, "hex")) {
    drawBubblePreview();
  }
});

[
  alphabetBackgroundColorInput,
  alphabetOutlineColorInput,
  alphabetColorStyleInput,
  alphabetFontSizeInput,
  alphabetOutlineWidthInput,
  ...alphabetCaseInputs,
  ...alphabetFontInputs
].forEach((element) => {
  element?.addEventListener("input", drawAlphabetSheet);
  element?.addEventListener("change", drawAlphabetSheet);
});

alphabetPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCheckedRadio("alphabet-case", button.dataset.alphabetCase);
    setCheckedRadio("alphabet-font", button.dataset.alphabetFont);
    drawAlphabetSheet();
  });
});

singleCaseInputs.forEach((input) => {
  input.addEventListener("change", () => {
    selectedSingleCase = input.value || selectedSingleCase;
    if (selectedSingleCase === "lowercase" && alphabetUppercaseOnlyFonts.has(selectedSingleFont)) {
      selectedSingleFont = "Cherry Bomb One";
    }
    selectSingleLetter(selectedSingleLetter, false);
  });
});

singleStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    selectedSingleFont = button.dataset.singleFont || selectedSingleFont;
    selectSingleLetter(selectedSingleLetter, false);
  });
});

singleColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSingleColorStyle = button.dataset.singleColorStyle || selectedSingleColorStyle;
    selectSingleLetter(selectedSingleLetter, false);
  });
});

numberStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedNumberFont = button.dataset.numberFont || selectedNumberFont;
    selectSingleLetter(selectedSingleLetter, false);
  });
});

numberColorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedNumberColorStyle = button.dataset.numberColorStyle || selectedNumberColorStyle;
    selectSingleLetter(selectedSingleLetter, false);
  });
});

alphabetBrowserCaseInputs.forEach((input) => {
  input.addEventListener("change", updateAlphabetBrowser);
});

window.addEventListener("pageshow", () => {
  consumeAlphabetReturnPath();
  applyAlphabetQueryParams();
  updateAlphabetBrowser();
});

window.addEventListener("hashchange", scrollAlphabetHashIntoView);

if (isAlphabetPage) {
  window.addEventListener("wheel", cancelAlphabetAutoScroll, { passive: true });
  window.addEventListener("touchstart", cancelAlphabetAutoScroll, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
      cancelAlphabetAutoScroll();
    }
  });

  window.setInterval(() => {
    consumeAlphabetReturnPath();

    if (!window.location.hash || window.location.hash === lastAlphabetHash) return;
    lastAlphabetHash = window.location.hash;
    applyAlphabetQueryParams();
    updateAlphabetBrowser();
  }, 250);
}

singleLetterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    selectSingleLetter(button.dataset.singleLetter, false);
    openSingleLetterModal();
  });
  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    selectSingleLetter(button.dataset.singleLetter, false);
    openSingleLetterModal();
  });
});

singleLetterModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeSingleLetterModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSingleLetterModal();
    closePhraseCardModal();
  }
});

phraseCardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openPhraseCardModal(button.dataset.phraseCard);
  });

  if (button.tagName !== "BUTTON") {
    button.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPhraseCardModal(button.dataset.phraseCard);
    });
  }
});

phraseCardModalCloseButtons.forEach((button) => {
  button.addEventListener("click", closePhraseCardModal);
});

phraseOrientationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPhraseOrientation = button.dataset.phraseOrientation || "landscape";
    updatePhraseCardPreview();
  });
});

sectionLinks.forEach((section) => {
  section.addEventListener("click", () => {
    window.location.href = section.dataset.sectionHref;
  });
  section.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.location.href = section.dataset.sectionHref;
  });
});

printButton?.addEventListener("click", () => {
  if (isHomePage || isGeneratorPage) {
    printWithTarget("bubble-preview");
    return;
  }
  window.print();
});
downloadButton?.addEventListener("click", downloadPng);
downloadSvgButton?.addEventListener("click", downloadSvg);
alphabetDownloadButton?.addEventListener("click", downloadAlphabetSheet);
alphabetPrintButton?.addEventListener("click", () => printWithTarget("alphabet-sheet"));
singleLettersPrintButton?.addEventListener("click", () => printWithTarget("single-letters"));
bubbleNumbersPrintButton?.addEventListener("click", () => printWithTarget("bubble-numbers"));
singleLetterPrintButton?.addEventListener("click", () => printWithTarget("single-letter-sheet"));
singleLetterDownloadButton?.addEventListener("click", downloadSingleLetterSheet);
singleLetterModalPrintButton?.addEventListener("click", () => printWithTarget("single-letter-sheet"));
singleLetterModalDownloadButton?.addEventListener("click", downloadSingleLetterSheet);
phrasePrintButton?.addEventListener("click", printPhraseCard);
phraseDownloadButton?.addEventListener("click", downloadPhraseCard);

applyAlphabetQueryParams();
updateAlphabetBrowser();
consumeAlphabetReturnPath();
syncCustomColorControls(customFontColor);
syncHexPair(backgroundColorInput, backgroundHexInput, backgroundColorInput?.value || "#34a4a9");
syncHexPair(outlineColorInput, outlineHexInput, outlineColorInput?.value || "#1f1b19");
updateCustomColorVisibility();

loadFonts().finally(() => {
  drawBubblePreview();
  drawAlphabetSheet();
  selectSingleLetter(selectedSingleLetter);
  applySingleLetterQueryParams();
  updateAlphabetBrowser();
  initializePhraseCards();
  updatePhraseCardPreview();
});
