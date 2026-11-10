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
    page.drawLine({ start: { x: x + 13, y: y + 8 }, end: { x: x + width - 13, y: y + 8 }, thickness: .3, color: colors.light });
    page.drawLine({ start: { x: x + 13, y: y + height - 8 }, end: { x: x + width - 13, y: y + height - 8 }, thickness: .3, color: colors.light });
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
      const fitted = fitSize(fonts.bold, ascii(title).toUpperCase(), width - 20, 16, 8);
      drawCentered(page, fonts.bold, ascii(title).toUpperCase(), centerX, y + (height - fitted) / 2 - 1, width - 20, 16, 8, colors.black);
    } else {
      const marker = item.showMarker === false ? '' : (item.publishingLine || item.publishingEra || '');
      const showAuthority = item.showAuthority !== false && item.parent;
      if (showAuthority) drawCentered(page, fonts.bold, ascii(item.parent).toUpperCase(), centerX, y + height - 10, width - 20, 6, 4.5, colors.muted);
      const fitted = fitSize(fonts.bold, ascii(title), width - 20, 14, 7);
      const titleY = showAuthority ? y + 14 : y + (height - fitted) / 2 - 1;
      drawCentered(page, fonts.bold, title, centerX, titleY, width - 20, 14, 7, colors.black);
      if (marker) drawRight(page, fonts.bold, marker, x + width - 8, y + 4, width - 16, 4.5, 3.5, colors.muted);
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

  async function embedTreasureHeader(pdfDocument) {
    try {
      const source = new URL('assets/treasures-header.svg', window.location.href).href;
      const image = new Image();
      image.src = source;
      await image.decode();
      const canvas = window.document.createElement('canvas');
      canvas.width = 1240;
      canvas.height = 500;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return await pdfDocument.embedPng(canvas.toDataURL('image/png'));
    } catch (error) {
      console.warn('Treasures vector header fallback', error);
      return null;
    }
  }

  function drawTreasure(page, item, x, y, fonts, colors, headerImage) {
    const width = 3.5 * PT, height = 5 * PT, inset = .16 * PT;
    page.drawRectangle({ x, y, width, height, color: colors.orange });
    page.drawRectangle({ x: x + inset, y: y + inset, width: width - inset * 2, height: height - inset * 2, color: colors.white });
    drawCutBox(page, x, y, width, height, colors.guide);
    if (headerImage) {
      const imageWidth = width - 34;
      const imageHeight = imageWidth * 500 / 1240;
      page.drawImage(headerImage, { x: x + (width - imageWidth) / 2, y: y + height - 18 - imageHeight, width: imageWidth, height: imageHeight });
    } else {
      drawCentered(page, fonts.bold, '2ND & CHARLES', x + width / 2, y + height - 45, width - 45, 16, 10, colors.orange);
      drawCentered(page, fonts.bold, 'TREASURES', x + width / 2, y + height - 85, width - 30, 34, 22, colors.orange);
    }
    const entries = Array.isArray(item.items) && item.items.length
      ? item.items.slice(0, 8).filter(entry => entry && String(entry.product || '').trim())
      : [{ product: item.product || '', price: '' }];
    const count = Math.max(1, entries.length);
    const subheader = ascii(item.subheader || '').toUpperCase();
    if (subheader) {
      const subWidth = width - 47;
      let subSize = 19;
      let subLines = wrap(fonts.bold, subheader, subWidth, subSize, 40);
      while (subSize > 8 && (subLines.length * subSize * 1.1 > 34 || subLines.some(line => fonts.bold.widthOfTextAtSize(line, subSize) > subWidth))) {
        subSize -= .5;
        subLines = wrap(fonts.bold, subheader, subWidth, subSize, 40);
      }
      const subLineHeight = subSize * 1.1;
      const subTotal = subLines.length * subLineHeight;
      const subCenterY = y + height - 137;
      subLines.forEach((line, index) => {
        const baseline = subCenterY + subTotal / 2 - (index + 1) * subLineHeight + 2;
        drawCentered(page, fonts.bold, line, x + width / 2, baseline, subWidth, subSize, 8, colors.black);
      });
    }
    const areaBottom = y + 25;
    const availableHeight = subheader ? 180 : 201;
    const slotHeight = availableHeight / count;
    entries.forEach((entry, slot) => {
      const text = (String(entry.product || '') + (entry.price ? ' ' + String(entry.price) : '')).toUpperCase();
      const maxWidth = width - 47;
      let size = count === 1 ? 30 : count === 2 ? 23 : count === 3 ? 18 : count === 4 ? 14 : count === 5 ? 12 : count === 6 ? 11 : count === 7 ? 10 : 9;
      let lines = wrap(fonts.bold, text, maxWidth, size, 25);
      while (size > 6 && (lines.length * size * 1.15 > slotHeight - 3 || lines.some(line => fonts.bold.widthOfTextAtSize(line, size) > maxWidth))) {
        size -= .5;
        lines = wrap(fonts.bold, text, maxWidth, size, 25);
      }
      const lineHeight = size * 1.15;
      const maxLines = Math.max(1, Math.floor((slotHeight - 3) / lineHeight));
      lines = lines.slice(0, maxLines);
      const totalHeight = lines.length * lineHeight;
      const slotBottom = areaBottom + availableHeight - (slot + 1) * slotHeight;
      lines.forEach((line, index) => {
        const baseline = slotBottom + (slotHeight + totalHeight) / 2 - (index + 1) * lineHeight + 2;
        drawCentered(page, fonts.bold, line, x + width / 2, baseline, maxWidth, size, 8, colors.black);
      });
    });
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
    const treasureHeaderImage = groups.treasure.length ? await embedTreasureHeader(document) : null;
    const configs = {
      vinyl: { page: LANDSCAPE, perPage: 24, cols: 2, rows: 12, w: 5 * PT, h: .675 * PT, x: .5 * PT, y: .2 * PT },
      comic: { page: LETTER, perPage: 30, cols: 2, rows: 15, w: 3.5 * PT, h: (2 / 3) * PT, x: .5 * PT, y: .5 * PT, gapX: .5 * PT },
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
          else drawTreasure(page, item, x, y, fonts, colors, treasureHeaderImage);
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
