(function (global) {
  const ns = "http://www.w3.org/2000/svg";
  const data = global.BubbleJellyGlyphData;

  if (!data) return;

  function createSvgElement(name, attributes = {}) {
    const element = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, String(value));
      }
    });
    return element;
  }

  function clamp(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function normalizeHexColor(value, fallback = "#ff66a8") {
    const match = String(value || "").trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!match) return fallback;

    const raw = match[1];
    const expanded = raw.length === 3
      ? raw.split("").map((char) => char + char).join("")
      : raw;
    return `#${expanded.toLowerCase()}`;
  }

  function hexToRgb(hex) {
    const normalized = normalizeHexColor(hex);
    const value = Number.parseInt(normalized.slice(1), 16);
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    };
  }

  function rgbToHex({ r, g, b }) {
    return `#${[r, g, b].map((channel) => clamp(channel).toString(16).padStart(2, "0")).join("")}`;
  }

  function mix(hex, target, amount) {
    const a = hexToRgb(hex);
    const b = hexToRgb(target);
    return rgbToHex({
      r: a.r + (b.r - a.r) * amount,
      g: a.g + (b.g - a.g) * amount,
      b: a.b + (b.b - a.b) * amount
    });
  }

  function getPreset(options) {
    if (options.activeStyle === "trace") return data.stylePresets.traceable;
    if (options.activeStyle === "coloring") return data.stylePresets["black-white-outline"];
    if (options.colorStyle === "custom") {
      return {
        label: "Custom",
        colors: [normalizeHexColor(options.customColor)],
        mode: "jelly"
      };
    }
    return data.stylePresets[options.colorStyle] || data.stylePresets.rainbow;
  }

  function splitLines(text) {
    const lines = String(text || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 3);

    return lines.length ? lines : ["ABC abc 012"];
  }

  function getGlyphBounds(glyph) {
    return glyph.bounds || [0, 0, glyph.advanceWidth || 100, 112];
  }

  function getGlyphVisualWidth(glyph) {
    const [left, , right] = getGlyphBounds(glyph);
    return Math.max(1, right - left);
  }

  function measureLine(line, letterSpacing) {
    let width = 0;
    [...line].forEach((char, index) => {
      if (char === " ") {
        width += 34;
      } else {
        const glyph = data.glyphs[char];
        width += glyph ? getGlyphVisualWidth(glyph) : 66;
      }
      if (index < line.length - 1) width += letterSpacing;
    });
    return width;
  }

  function makeGradient(defs, id, color) {
    const gradient = createSvgElement("linearGradient", {
      id,
      x1: 0,
      y1: 10,
      x2: 0,
      y2: 104,
      gradientUnits: "userSpaceOnUse"
    });

    [
      ["0%", mix(color, "#ffffff", 0.5)],
      ["44%", color],
      ["100%", mix(color, "#161312", 0.18)]
    ].forEach(([offset, stopColor]) => {
      gradient.append(createSvgElement("stop", { offset, "stop-color": stopColor }));
    });

    defs.append(gradient);
  }

  function makeSoftShadow(defs, id) {
    const filter = createSvgElement("filter", {
      id,
      x: "-25%",
      y: "-25%",
      width: "150%",
      height: "160%"
    });
    filter.append(createSvgElement("feGaussianBlur", { stdDeviation: 2.6 }));
    defs.append(filter);
  }

  function drawHole(group, hole, options) {
    const element = createSvgElement(hole.type === "path" ? "path" : "ellipse");
    if (hole.type === "path") {
      element.setAttribute("d", hole.d);
    } else {
      ["cx", "cy", "rx", "ry"].forEach((key) => element.setAttribute(key, hole[key]));
    }

    element.setAttribute("fill", options.backgroundColor);
    element.setAttribute("stroke", options.traceMode ? "#69615b" : options.outlineColor);
    element.setAttribute("stroke-width", options.traceMode ? 3.5 : 6);
    element.setAttribute("opacity", options.traceMode ? 0.62 : 0.98);
    group.append(element);
  }

  function drawSilhouetteGlyph(parent, defs, char, placement, options) {
    const glyph = data.glyphs[char];
    if (!glyph) return;

    const color = options.colors[placement.colorIndex % options.colors.length];
    const group = createSvgElement("g", {
      transform: `translate(${placement.x.toFixed(2)} ${placement.y.toFixed(2)}) scale(${placement.scale.toFixed(4)})`,
      style: `--jelly-fill: ${color}; --jelly-outline: ${options.outlineColor};`
    });
    const title = createSvgElement("title");
    title.textContent = `${char} jelly bubble letter`;
    group.append(title);

    const gradientId = `jellyGradient-${placement.id}`;
    const shadowId = `jellyShadow-${placement.id}`;
    const clipId = `jellyBodyClip-${placement.id}`;
    makeGradient(defs, gradientId, color);
    makeSoftShadow(defs, shadowId);
    const clipPath = createSvgElement("clipPath", { id: clipId });
    clipPath.append(createSvgElement("path", { d: glyph.outerPath }));
    defs.append(clipPath);

    const mode = options.mode;
    const traceMode = mode === "trace";
    const outlineMode = mode === "outline";
    const bodyPath = glyph.outerPath;

    if (!traceMode) {
      group.append(createSvgElement("path", {
        d: bodyPath,
        fill: "#000000",
        opacity: 0.14,
        transform: "translate(4 7)",
        filter: `url(#${shadowId})`
      }));
    }

    if (outlineMode || traceMode) {
      group.append(createSvgElement("path", {
        d: bodyPath,
        fill: options.backgroundColor,
        stroke: traceMode ? "#69615b" : options.outlineColor,
        "stroke-width": traceMode ? 4 : Math.max(6, options.outlineWidth * 0.45),
        "stroke-linejoin": "round",
        opacity: traceMode ? 0.68 : 1
      }));

      glyph.holes.forEach((hole) => drawHole(group, hole, {
        backgroundColor: options.backgroundColor,
        outlineColor: options.outlineColor,
        traceMode
      }));

      parent.append(group);
      return;
    }

    group.append(createSvgElement("path", {
      d: bodyPath,
      fill: options.outlineColor,
      stroke: options.outlineColor,
      "stroke-width": Math.max(8, options.outlineWidth * 0.6),
      "stroke-linejoin": "round"
    }));

    group.append(createSvgElement("path", {
      d: bodyPath,
      fill: mix(color, "#000000", 0.22),
      stroke: mix(color, "#000000", 0.26),
      "stroke-width": 2,
      "stroke-linejoin": "round"
    }));

    group.append(createSvgElement("path", {
      d: bodyPath,
      fill: mix(color, "#000000", 0.32),
      opacity: 0.34,
      transform: "translate(0 5)"
    }));

    group.append(createSvgElement("path", {
      d: bodyPath,
      fill: `url(#${gradientId})`,
      stroke: mix(color, "#ffffff", 0.2),
      "stroke-width": 1.4,
      "stroke-linejoin": "round",
      opacity: 0.98
    }));

    const highlightGroup = createSvgElement("g", { "clip-path": `url(#${clipId})` });
    glyph.highlightPaths.forEach((highlight) => {
      highlightGroup.append(createSvgElement("path", {
        d: highlight.d,
        fill: "none",
        stroke: "rgba(255,255,255,0.9)",
        "stroke-width": highlight.width,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: highlight.opacity
      }));
    });
    group.append(highlightGroup);

    glyph.holes.forEach((hole) => drawHole(group, hole, {
      backgroundColor: options.backgroundColor,
      outlineColor: options.outlineColor,
      traceMode: false
    }));

    parent.append(group);
  }

  function drawGlyph(parent, defs, char, placement, options) {
    const glyph = data.glyphs[char];
    if (!glyph) return;

    if (glyph.outerPath) {
      drawSilhouetteGlyph(parent, defs, char, placement, options);
      return;
    }

    const color = options.colors[placement.colorIndex % options.colors.length];
    const group = createSvgElement("g", {
      transform: `translate(${placement.x.toFixed(2)} ${placement.y.toFixed(2)}) scale(${placement.scale.toFixed(4)})`,
      style: `--jelly-fill: ${color}; --jelly-outline: ${options.outlineColor};`
    });
    const title = createSvgElement("title");
    title.textContent = `${char} jelly bubble letter`;
    group.append(title);

    const gradientId = `jellyGradient-${placement.id}`;
    const shadowId = `jellyShadow-${placement.id}`;
    makeGradient(defs, gradientId, color);
    makeSoftShadow(defs, shadowId);

    const mode = options.mode;
    const traceMode = mode === "trace";
    const outlineMode = mode === "outline";
    const outerWidth = traceMode ? 12 : Math.max(20, options.outlineWidth + 23);
    const rimWidth = traceMode ? 8 : Math.max(16, options.outlineWidth + 16);
    const coreWidth = traceMode ? 0 : Math.max(18, options.outlineWidth + 12);
    const shadeWidth = Math.max(15, coreWidth - 5);

    glyph.outerPaths.forEach((d) => {
      if (!traceMode) {
        const shadow = createSvgElement("path", {
          d,
          fill: "none",
          stroke: "#000000",
          "stroke-width": outerWidth,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: 0.14,
          transform: "translate(4 7)",
          filter: `url(#${shadowId})`
        });
        group.append(shadow);
      }

      const outer = createSvgElement("path", {
        d,
        fill: "none",
        stroke: traceMode ? "#69615b" : options.outlineColor,
        "stroke-width": outerWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        opacity: traceMode ? 0.54 : 1
      });
      group.append(outer);

      if (outlineMode || traceMode) {
        const inner = createSvgElement("path", {
          d,
          fill: "none",
          stroke: options.backgroundColor,
          "stroke-width": Math.max(1, outerWidth - (traceMode ? 4 : 8)),
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: traceMode ? 0.84 : 1
        });
        group.append(inner);
        return;
      }

      group.append(createSvgElement("path", {
        d,
        fill: "none",
        stroke: mix(color, "#000000", 0.2),
        "stroke-width": rimWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }));

      group.append(createSvgElement("path", {
        d,
        fill: "none",
        stroke: mix(color, "#000000", 0.32),
        "stroke-width": shadeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        transform: "translate(0 5)",
        opacity: 0.38
      }));

      group.append(createSvgElement("path", {
        d,
        fill: "none",
        stroke: `url(#${gradientId})`,
        "stroke-width": coreWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }));
    });

    glyph.holes.forEach((hole) => drawHole(group, hole, {
      backgroundColor: options.backgroundColor,
      outlineColor: options.outlineColor,
      traceMode
    }));

    if (!outlineMode && !traceMode) {
      glyph.highlightPaths.forEach((highlight) => {
        group.append(createSvgElement("path", {
          d: highlight.d,
          fill: "none",
          stroke: "rgba(255,255,255,0.9)",
          "stroke-width": highlight.width,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          opacity: highlight.opacity
        }));
      });
    }

    parent.append(group);
  }

  function drawGrid(svg, width, height) {
    const grid = createSvgElement("g", { opacity: 0.12, stroke: "#ffffff", "stroke-width": 2 });
    for (let x = 0; x < width; x += 52) {
      grid.append(createSvgElement("path", { d: `M${x} 0 V${height}` }));
    }
    for (let y = 0; y < height; y += 52) {
      grid.append(createSvgElement("path", { d: `M0 ${y} H${width}` }));
    }
    svg.append(grid);
  }

  function renderTextSvg(text, options = {}) {
    const width = Number(options.width || 1200);
    const height = Number(options.height || 620);
    const padding = Number(options.padding || 72);
    const letterSpacing = Number(options.letterSpacing || 5);
    const maxGlyphHeight = Number(options.fontSize || 180);
    const lineHeightUnits = 126;
    const lines = splitLines(text);
    const preset = getPreset(options);
    const backgroundColor = normalizeHexColor(options.backgroundColor, "#34a4a9");
    const outlineColor = normalizeHexColor(options.outlineColor, "#050505");
    const maxLineWidth = Math.max(...lines.map((line) => measureLine(line, letterSpacing)));
    const maxLineHeight = lines.length * lineHeightUnits;
    const requestedScale = maxGlyphHeight / 112;
    const fitScale = Math.min(
      requestedScale,
      (width - padding * 2) / Math.max(1, maxLineWidth),
      (height - padding * 2) / Math.max(1, maxLineHeight)
    );
    const scale = Math.max(0.28, fitScale);
    const totalHeight = maxLineHeight * scale;
    const startY = (height - totalHeight) / 2 + 6 * scale;
    const svg = createSvgElement("svg", {
      xmlns: ns,
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      role: "img",
      "aria-label": "Custom jelly bubble letter preview"
    });
    svg.dataset.renderer = "jelly-svg-phase-1";
    svg.append(createSvgElement("rect", { width, height, fill: backgroundColor }));

    if (options.showGrid) drawGrid(svg, width, height);

    const defs = createSvgElement("defs");
    svg.append(defs);

    const unsupported = new Set();
    let colorIndex = 0;
    let glyphId = 0;

    lines.forEach((line, lineIndex) => {
      const lineWidth = measureLine(line, letterSpacing) * scale;
      let x = (width - lineWidth) / 2;
      const y = startY + lineIndex * lineHeightUnits * scale;

      [...line].forEach((char) => {
        if (char === " ") {
          x += 34 * scale + letterSpacing * scale;
          return;
        }

        const glyph = data.glyphs[char];
        if (!glyph) {
          unsupported.add(char);
          x += 66 * scale + letterSpacing * scale;
          return;
        }
        const [left] = getGlyphBounds(glyph);
        const visualWidth = getGlyphVisualWidth(glyph);

        drawGlyph(svg, defs, char, {
          x: x - left * scale,
          y,
          scale,
          colorIndex,
          id: `${glyphId}-${char.charCodeAt(0)}`
        }, {
          colors: preset.colors,
          mode: preset.mode,
          outlineColor,
          outlineWidth: Number(options.outlineWidth || 14),
          backgroundColor
        });
        x += (visualWidth + letterSpacing) * scale;
        colorIndex += 1;
        glyphId += 1;
      });
    });

    return {
      svg,
      unsupported: [...unsupported],
      supportedChars: data.supportedChars,
      preset
    };
  }

  function serializeSvg(svg) {
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", ns);
    return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  }

  function svgToPngDataUrl(svg, width, height) {
    const source = serializeSvg(svg);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.decoding = "async";

    return new Promise((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width || Number(svg.getAttribute("width")) || 1200;
        canvas.height = height || Number(svg.getAttribute("height")) || 620;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unable to render SVG preview as PNG."));
      };
      image.src = url;
    });
  }

  global.JellyGlyphRenderer = {
    renderTextSvg,
    serializeSvg,
    svgToPngDataUrl,
    supportedChars: data.supportedChars,
    stylePresets: data.stylePresets
  };
})(window);
