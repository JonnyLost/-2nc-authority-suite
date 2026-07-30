(function () {
  const PT = 72;
  const LETTER = [8.5 * PT, 11 * PT];
  const LANDSCAPE = [11 * PT, 8.5 * PT];

  function ascii(value) {
    return String(value ?? '')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[•·]/g, ' / ').replace(/[–—]/g, '-')
      .replace(/[^\x20-\x7E\n]/g, '').trim();
  }

  function fitSize(font, text, maxWidth, preferred, minimum) {
    let size = preferred;
    while (size > minimum && font.widthOfTextAtSize(text, size) > maxWidth) size -= .5;
    return size;
  }

  function drawCentered(page, font, text, centerX, y, maxWidth, preferred, minimum, color) {
    text = ascii(text);
    const size = fitSize(font, text, maxWidth, preferred, minimum);
    const width = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: centerX - width / 2, y, size, font, color });
    return size;
  }

  function drawRight(page, font, text, rightX, y, maxWidth, preferred, minimum, color) {
    text = ascii(text).toUpperCase();
    const size = fitSize(font, text, maxWidth, preferred, minimum);
    const width = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: rightX - width, y, size, font, color });
    return size;
  }

  function wrap(font, text, maxWidth, size, maxLines = 7) {
    const manual = ascii(text).split(/\n/);
    const lines = [];
    manual.forEach(part => {
      const words = part.trim().split(/\s+/).filter(Boolean);
      let line = '';
      words.forEach(word => {
        const candidate = line ? `${line} ${word}` : word;
        if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
          lines.push(line);
          line = word;
        } else line = candidate;
      });
      if (line) lines.push(line);
    });
    return lines.slice(0, maxLines);
  }

  function drawCutBox(page, x, y, width, height, gray) {
    page.drawRectangle({ x, y, width, height, borderColor: gray, borderWidth: .5, borderDashArray: [3, 2] });
  }

  function drawMusicLabel(page, item, kind, x, y, width, height, fonts, colors) {
    drawCutBox(page, x, y, width, height, colors.guide);
    page.drawLine({ start: { x: x + 7.2, y: y + 3.25 }, end: { x: x + width - 7.2, y: y + 3.25 }, thickness: .3, color: colors.light });
    page.drawLine({ start: { x: x + 7.2, y: y + height - 3.25 }, end: { x: x + width - 7.2, y: y + height - 3.25 }, thickness: .3, color: colors.light });
    const genreSize = kind === 'vinyl' ? 6.2 : 5.1;
    const subSize = kind === 'vinyl' ? 5.8 : 4.7;
    const mainSize = kind === 'vinyl' ? 16 : 10.4;
    const centerX = x + width / 2;
    const genre = ascii(item.genre || '').toUpperCase();
    const sub = ascii([item.primarySubgenre || item.subgenre, item.secondarySubgenre].filter(Boolean).join(' / '));
    drawCentered(page, fonts.bold, genre, centerX, y + height - genreSize - 5, width - 12, genreSize, 4, colors.muted);
    const fitted = fitSize(fonts.bold, ascii(item.name), width - 12, mainSize, kind === 'vinyl' ? 8 : 6);
    drawCentered(page, fonts.bold, item.name, centerX, y + (height - fitted) / 2 - 1, width - 12, mainSize, kind === 'vinyl' ? 8 : 6, colors.black);
    drawCentered(page, fonts.regular, sub, centerX, y + 5, width - 12, subSize, 3.5, colors.muted);
  }

  function drawComicLabel(page, item, x, y, width, height, fonts, colors) {
    drawCutBox(page, x, y, width, height, colors.guide);
    page.drawLine({ start: { x: x + 7.2, y: y + 3.25 }, end: { x: x + width - 7.2, y: y + 3.25 }, thickness: .3, color: colors.light });
    page.drawLine({ start: { x: x + 7.2, y: y + height - 3.25 }, end: { x: x + width - 7.2, y: y + height - 3.25 }, thickness: .3, color: colors.light });
    const title = item.primary ? item.name : (item.printedTitle || item.series);
    const centerX = x + width / 2;
    if (item.primary) {
      const fitted = fitSize(fonts.bold, ascii(title).toUpperCase(), width - 14, 16.5, 8);
      drawCentered(page, fonts.bold, ascii(title).toUpperCase(), centerX, y + (height - fitted) / 2 - 1, width - 14, 16.5, 8, colors.black);
    } else {
      const marker = item.publishingLine || item.publishingEra || '';
      drawCentered(page, fonts.bold, ascii(item.parent).toUpperCase(), centerX, y + height - 12, width - 14, 6.4, 4.5, colors.muted);
      const fitted = fitSize(fonts.bold, ascii(title), width - 14, 16.5, 7);
      drawCentered(page, fonts.bold, title, centerX, y + (marker ? 13 : 8), width - 14, 16.5, 7, colors.black);
      if (marker) drawRight(page, fonts.bold, marker, x + width - 7.2, y + 4.5, width - 14.4, 5, 4, colors.muted);
    }
  }

  function drawInstrument(page, item, x, y, fonts, colors) {
    const width = 6 * PT, height = 4 * PT, strip = 1.55 * PT;
    page.drawRectangle({ x, y, width, height, color: colors.white });
    page.drawRectangle({ x, y, width: strip, height, color: colors.instrument });
    drawCutBox(page, x, y, width, height, colors.guide);
    const price = ascii(item.price || '');
    const priceSize = fitSize(fonts.bold, price, height - 30, 49, 26);
    page.drawText(price, { x: x + strip / 2 + priceSize * .35, y: y + (height - fonts.bold.widthOfTextAtSize(price, priceSize)) / 2, size: priceSize, font: fonts.bold, color: colors.white, rotate: PDFLib.degrees(90) });
    drawCentered(page, fonts.bold, '2ND & CHARLES', x + strip / 2, y + 13, strip - 12, 9, 6, colors.white);
    let size = 30;
    let lines = wrap(fonts.bold, item.product, width - strip - 28, size);
    while (size > 14 && (lines.length * size * 1.05 > height - 55 || lines.some(line => fonts.bold.widthOfTextAtSize(line, size) > width - strip - 28))) {
      size -= 1;
      lines = wrap(fonts.bold, item.product, width - strip - 28, size);
    }
    const centerX = x + strip + (width - strip) / 2;
    const total = lines.length * size * 1.05;
    lines.forEach((line, index) => drawCentered(page, fonts.bold, line, centerX, y + (height + total) / 2 - (index + 1) * size * 1.05 + 5, width - strip - 28, size, 12, colors.instrument));
    drawCentered(page, fonts.regular, '2ndandcharles.com', x + width - 52, y + 9, 96, 7, 5, colors.muted);
  }

  function drawTreasure(page, item, x, y, fonts, colors) {
    const width = 3.5 * PT, height = 5 * PT, inset = .16 * PT;
    page.drawRectangle({ x, y, width, height, color: colors.orange });
    page.drawRectangle({ x: x + inset, y: y + inset, width: width - inset * 2, height: height - inset * 2, color: colors.white });
    drawCutBox(page, x, y, width, height, colors.guide);
    drawCentered(page, fonts.bold, '2ND & CHARLES', x + width / 2, y + height - 45, width - 45, 16, 10, colors.orange);
    drawCentered(page, fonts.bold, 'TREASURES', x + width / 2, y + height - 85, width - 30, 34, 22, colors.orange);
    let size = 29;
    let lines = wrap(fonts.bold, String(item.product || '').toUpperCase(), width - 50, size, 7);
    while (size > 15 && (lines.length * size * 1.2 > 205 || lines.some(line => fonts.bold.widthOfTextAtSize(line, size) > width - 50))) {
      size -= 1;
      lines = wrap(fonts.bold, String(item.product || '').toUpperCase(), width - 50, size, 7);
    }
    const total = lines.length * size * 1.2;
    lines.forEach((line, index) => drawCentered(page, fonts.bold, line, x + width / 2, y + 34 + (205 + total) / 2 - (index + 1) * size * 1.2, width - 50, size, 13, colors.black));
  }

  async function createPdf(queue) {
    if (!Array.isArray(queue) || !queue.length) throw new Error('Add at least one item to the print queue.');
    if (!window.PDFLib) throw new Error('The PDF component did not load. Refresh the app and try again.');
    const document = await PDFLib.PDFDocument.create();
    document.setTitle('2NC Authority Suite Print Packet');
    document.setCreator('2NC Authority Suite');
    const fonts = {
      regular: await document.embedFont(PDFLib.StandardFonts.Helvetica),
      bold: await document.embedFont(PDFLib.StandardFonts.HelveticaBold)
    };
    const colors = {
      black: PDFLib.rgb(.08, .08, .08), muted: PDFLib.rgb(.40, .42, .45),
      guide: PDFLib.rgb(.62, .62, .62), light: PDFLib.rgb(.82, .82, .82),
      white: PDFLib.rgb(1, 1, 1), instrument: PDFLib.rgb(.875, .467, .282),
      orange: PDFLib.rgb(.96, .42, .10)
    };
    const groups = { vinyl: [], cd: [], comic: [], instrument: [], treasure: [] };
    queue.forEach(item => { if (groups[item.mode]) groups[item.mode].push(item); });
    const configs = {
      vinyl: { page: LANDSCAPE, perPage: 24, cols: 2, rows: 12, w: 5 * PT, h: .675 * PT, x: .5 * PT, y: .2 * PT },
      comic: { page: LANDSCAPE, perPage: 24, cols: 2, rows: 12, w: 3.5 * PT, h: .675 * PT, x: 2 * PT, y: .2 * PT },
      cd: { page: LETTER, perPage: 60, cols: 4, rows: 15, w: 2 * PT, h: .675 * PT, x: .25 * PT, y: .25 * PT },
      instrument: { page: LETTER, perPage: 2, cols: 1, rows: 2, w: 6 * PT, h: 4 * PT, x: 1.25 * PT, y: .25 * PT, gapY: .25 * PT },
      treasure: { page: LETTER, perPage: 4, cols: 2, rows: 2, w: 3.5 * PT, h: 5 * PT, x: .625 * PT, y: .25 * PT, gapX: .25 * PT, gapY: .25 * PT }
    };
    Object.entries(groups).forEach(([kind, items]) => {
      const config = configs[kind];
      for (let start = 0; start < items.length; start += config.perPage) {
        const page = document.addPage(config.page);
        items.slice(start, start + config.perPage).forEach((item, index) => {
          const col = index % config.cols;
          const row = Math.floor(index / config.cols);
          const x = config.x + col * (config.w + (config.gapX || 0));
          const y = config.page[1] - config.y - config.h - row * (config.h + (config.gapY || 0));
          if (kind === 'vinyl' || kind === 'cd') drawMusicLabel(page, item, kind, x, y, config.w, config.h, fonts, colors);
          else if (kind === 'comic') drawComicLabel(page, item, x, y, config.w, config.h, fonts, colors);
          else if (kind === 'instrument') drawInstrument(page, item, x, y, fonts, colors);
          else drawTreasure(page, item, x, y, fonts, colors);
        });
      }
    });
    return new Blob([await document.save()], { type: 'application/pdf' });
  }

  function filename() {
    const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
    return `2NC_Print_Packet_${stamp}.pdf`;
  }

  function download(blob, name) {
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(anchor.href), 1500);
  }

  async function share(queue) {
    const blob = await createPdf(queue);
    const name = filename();
    const file = new File([blob], name, { type: 'application/pdf' });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share({ title: '2NC Print Packet', text: 'Print at Actual Size / 100%.', files: [file] });
      return { shared: true, name };
    }
    download(blob, name);
    return { shared: false, name };
  }

  window.PrintPacket = { createPdf, share, download: async queue => {
    const blob = await createPdf(queue);
    const name = filename();
    download(blob, name);
    return name;
  } };
})();
