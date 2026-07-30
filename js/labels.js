(function () {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const subgenreLine = row => [row.primarySubgenre || row.subgenre, row.secondarySubgenre].filter(Boolean).join(' • ');
  const instrumentLogoUrl = new URL('assets/2nc-logo-white.png', window.location.href).href;
  const lengthClass = value => { const n = String(value || '').length; return n > 34 ? ' tight' : n > 22 ? ' compact' : ''; };

  function printStyles() {
    return `<style>
@page vinylPage{size:letter landscape;margin:.2in .5in}
@page comicPage{size:letter landscape;margin:.2in .5in}
@page cdPage{size:letter portrait;margin:.25in}
@page instrumentPage{size:letter portrait;margin:.25in}
@page treasurePage{size:letter portrait;margin:.25in}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;padding:0;background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}
.printNotice{padding:12px 16px;font-size:14px;background:#fff3cd;border:1px solid #e5c76b;margin:12px auto;width:calc(100% - 24px);max-width:900px}
.sheet{break-after:page;page-break-after:always;display:grid;align-content:start;justify-content:center;margin:0 auto;position:relative}
.sheet:last-child{break-after:auto;page-break-after:auto}
.sheet.vinyl{page:vinylPage;width:10in;height:8.1in;grid-template-columns:repeat(2,5in);grid-template-rows:repeat(12,.675in)}
.sheet.comic{page:comicPage;width:7in;height:8.1in;grid-template-columns:repeat(2,3.5in);grid-template-rows:repeat(12,.675in)}
.sheet.cd{page:cdPage;width:8in;height:10.125in;grid-template-columns:repeat(4,2in);grid-template-rows:repeat(15,.675in)}
.sheet.instrument{page:instrumentPage;width:6in;grid-template-columns:6in;grid-auto-rows:4in;gap:.25in}
.sheet.treasure{page:treasurePage;width:7.25in;height:10.25in;grid-template-columns:repeat(2,3.5in);grid-template-rows:repeat(2,5in);gap:.25in}
.sheet.vinyl:after,.sheet.comic:after,.sheet.treasure:after{content:"";position:absolute;top:0;bottom:0;left:50%;border-left:.65pt dashed #999;pointer-events:none;z-index:5}
.pl{height:.675in;border:.5pt dashed #999;display:flex;align-items:center;justify-content:center;text-align:center;padding:.0625in;overflow:hidden;line-height:1;position:relative;font-family:'Arial Narrow','Avenir Next Condensed',Arial,sans-serif}.pl:before,.pl:after{content:'';position:absolute;left:.10in;right:.10in;height:.35pt;background:#d0d0d0}.pl:before{top:.045in}.pl:after{bottom:.045in}
.pl.vinyl{width:5in}.pl.cd{width:2in}.pl.comic{width:3.5in;flex-direction:column}
.pl.vinyl,.pl.cd{flex-direction:column;justify-content:center;gap:1.2pt;padding:.045in .075in}
.pl .musicGenre{font-family:Arial,Helvetica,sans-serif;font-weight:700;color:#5f6368;line-height:1;text-transform:uppercase;letter-spacing:.65pt;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl .musicSubgenres{font-family:Arial,Helvetica,sans-serif;color:#777b80;letter-spacing:.12pt;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl.vinyl .musicGenre{font-size:6.2pt}.pl.vinyl b{font-size:16pt;line-height:.92;font-weight:800;letter-spacing:.2pt}.pl.vinyl .musicSubgenres{font-size:5.8pt}
.pl.cd .musicGenre{font-size:5.1pt}.pl.cd b{font-size:10.4pt;line-height:.92;font-weight:800;letter-spacing:.1pt}.pl.cd .musicSubgenres{font-size:4.7pt}
.pl.comic{gap:1.3pt}.pl.comic small{font-family:Arial,Helvetica,sans-serif;font-size:6.4pt;font-weight:650;text-transform:uppercase;letter-spacing:.55pt;color:#6d7176;margin-bottom:0}.pl.comic b{font-size:16.5pt;font-weight:800;letter-spacing:.15pt;line-height:.92}.pl.comic.primary b{text-transform:uppercase;letter-spacing:.7pt}.pl.compact b{font-size:13.5pt!important}.pl.tight b{font-size:11.3pt!important;letter-spacing:0!important}
.pl.comic .comicEra{position:absolute;right:.10in;bottom:.065in;font-family:Arial,Helvetica,sans-serif;font-size:5pt;font-weight:700;text-transform:uppercase;letter-spacing:.45pt;color:#747980;line-height:1}
.tag{width:6in;height:4in;position:relative;overflow:hidden;color:#df7748;background:#fff}
.tag:after{content:"";position:absolute;inset:0;border:.75pt dashed #777;pointer-events:none;z-index:20}
.orange{position:absolute;left:0;top:0;width:1.55in;height:4in;background:#df7748;color:white;overflow:hidden}
.orange span{position:absolute;left:50%;top:1.66in;transform:translate(-50%,-50%) rotate(-90deg);font-size:49pt;font-weight:800;line-height:1;letter-spacing:-.7pt;white-space:nowrap;text-align:center}
.orange .brandLogo{position:absolute;bottom:.12in;left:.18in;width:.78in;height:auto;object-fit:contain}
.prod{position:absolute;left:1.72in;right:.2in;top:.25in;bottom:.5in;display:flex;align-items:center;justify-content:center;text-align:center;font-family:'Arial Narrow','Avenir Next Condensed',Arial,sans-serif;font-size:30pt;font-weight:800;letter-spacing:.25pt;line-height:1.02}
.tag footer{position:absolute;right:.15in;bottom:.12in;color:#555;font-size:7pt}
.treasureTagPrint{width:3.5in;height:5in;position:relative;overflow:hidden;border:.5pt dashed #999;background:#f58220;padding:.16in}
.treasureInner{width:100%;height:100%;background:#fff;position:relative;overflow:hidden}
.treasureHeaderGeneratedPrint{position:absolute;left:.26in;right:.26in;top:.20in;height:1.40in;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f58220;text-align:center}
.treasureBrandPrint{display:flex;flex-direction:column;align-items:center;line-height:.88;margin-bottom:.04in}.treasure2ndPrint{font-family:Impact,'Arial Black',Arial,sans-serif;font-size:25pt;letter-spacing:-1.2pt;border:2.2pt solid #f58220;border-bottom-width:1.7pt;padding:0 5pt;line-height:.82}.treasureAndPrint{font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:10pt;letter-spacing:.2pt;margin-top:2pt}.treasureWordPrint{font-family:Georgia,'Times New Roman',serif;font-size:38pt;font-weight:900;line-height:.86;letter-spacing:-2.1pt;color:#f58220;-webkit-text-stroke:.7pt #1f1f1f;text-shadow:.7pt .7pt 0 #1f1f1f,1.4pt 1.4pt 0 #1f1f1f}.treasureProductPrint{position:absolute;left:.18in;right:.18in;top:1.60in;bottom:.22in;display:flex;align-items:center;justify-content:center;text-align:center;color:#202020;font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:29pt;line-height:1.28;text-transform:uppercase}
.calibrationLabel{position:relative;background:#fff}.calibrationLabel:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent calc(50% - .25pt),#bbb calc(50% - .25pt),#bbb calc(50% + .25pt),transparent calc(50% + .25pt)),linear-gradient(0deg,transparent calc(50% - .25pt),#bbb calc(50% - .25pt),#bbb calc(50% + .25pt),transparent calc(50% + .25pt));pointer-events:none}.calibrationLabel b{z-index:1}.ruler{position:absolute;left:.1in;bottom:.03in;font-size:6pt;color:#555}
@media screen{body{padding:12px}.sheet{outline:1px solid #ddd;margin:12px auto}.printNotice{display:block}}
@media print{.printNotice{display:none}body{padding:0}.sheet{outline:none;margin:0 auto}}
</style>`;
  }

  function buildPrintDocument(groups) {
    let pages = '';
    const perPage = { vinyl: 24, cd: 60, comic: 24, instrument: 2, treasure: 4 };
    Object.entries(groups).forEach(([kind, items]) => {
      if (!items.length) return;
      for (let index = 0; index < items.length; index += perPage[kind]) {
        pages += `<section class="sheet ${kind}">`;
        items.slice(index, index + perPage[kind]).forEach(row => {
          if (kind === 'comic') {
            const title = row.primary ? row.name : (row.printedTitle || row.series);
            const marker = row.publishingLine || row.publishingEra || '';
            pages += `<div class="pl comic${row.primary ? ' primary' : ''}${lengthClass(title)}">${row.primary ? `<b>${escapeHtml(row.name)}</b>` : `<small>${escapeHtml(row.parent)}</small><b>${escapeHtml(row.printedTitle || row.series)}</b>${marker ? `<span class="comicEra">${escapeHtml(marker)}</span>` : ''}`}</div>`;
          } else if (kind === 'instrument') {
            pages += `<div class="tag"><div class="orange"><span>${escapeHtml(row.price)}</span><img class="brandLogo" src="${instrumentLogoUrl}" alt="2nd & Charles"></div><div class="prod">${escapeHtml(row.product).replace(/\n/g, '<br>')}</div><footer>2ndandcharles.com</footer></div>`;
          } else if (kind === 'treasure') {
            pages += `<div class="treasureTagPrint"><div class="treasureInner"><div class="treasureHeaderGeneratedPrint" aria-label="2nd & Charles Treasures"><div class="treasureBrandPrint"><span class="treasure2ndPrint">2ND</span><span class="treasureAndPrint">&amp; CHARLES</span></div><div class="treasureWordPrint">TREASURES</div></div><div class="treasureProductPrint">${escapeHtml(row.product).replace(/\n/g, '<br>')}</div></div></div>`;
          } else {
            pages += `<div class="pl ${kind}${lengthClass(row.name)}"><div class="musicGenre">${escapeHtml(row.genre || '')}</div><b>${escapeHtml(row.name)}</b><div class="musicSubgenres">${escapeHtml(subgenreLine(row))}</div></div>`;
          }
        });
        pages += '</section>';
      }
    });
    return `<!doctype html><html><head><meta charset="utf-8"><title>2NC Labels</title>${printStyles()}</head><body><div class="printNotice"><strong>Print setting:</strong> choose Actual Size / 100%. Do not use Fit to Page or Scale to Fit.</div>${pages}</body></html>`;
  }

  function buildCalibrationDocument(mode) {
    const config = {
      vinyl: { count: 24, label: 'VINYL 5.00 × 0.675 IN' },
      cd: { count: 60, label: 'CD 2.00 × 0.675 IN' },
      comic: { count: 24, label: 'COMIC 3.50 × 0.675 IN' },
      instrument: { count: 2, label: 'INSTRUMENT TAG 6.00 × 4.00 IN' },
      treasure: { count: 4, label: 'TREASURES TAG 3.50 × 5.00 IN' }
    }[mode] || { count: 24, label: 'VINYL 5.00 × 0.675 IN' };
    let labels = '';
    for (let i = 0; i < config.count; i += 1) {
      labels += mode === 'instrument'
        ? `<div class="tag calibrationLabel"><div class="prod">${config.label}</div><div class="ruler">Measure the dashed edge after printing</div></div>`
        : mode === 'treasure'
        ? `<div class="treasureTagPrint calibrationLabel"><div class="treasureInner"><div class="treasureProductPrint">${config.label}</div><div class="ruler">Measure the dashed edge after printing</div></div></div>`
        :
        `<div class="pl ${mode} calibrationLabel"><b>${config.label}</b><span class="ruler">Actual size</span></div>`;
    }
    return `<!doctype html><html><head><meta charset="utf-8"><title>2NC Calibration</title>${printStyles()}</head><body><div class="printNotice"><strong>Calibration:</strong> print at Actual Size / 100%, then measure one dashed box.</div><section class="sheet ${mode}">${labels}</section></body></html>`;
  }

  function openPrintWindow(html, targetWindow) {
    const popup = targetWindow || window.open('', '_blank');
    if (!popup) throw new Error('Pop-ups are blocked. Allow pop-ups for this site so the print sheet can open.');
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    setTimeout(() => popup.print(), 700);
  }

  function printQueue(queue, targetWindow) {
    if (!queue.length) throw new Error('Add at least one item to the print queue.');
    const groups = { vinyl: [], cd: [], comic: [], instrument: [], treasure: [] };
    queue.forEach(row => { if (groups[row.mode]) groups[row.mode].push(row); });
    openPrintWindow(buildPrintDocument(groups), targetWindow);
  }

  function printCalibration(mode) { openPrintWindow(buildCalibrationDocument(mode)); }
  window.LabelEngine = { printQueue, printCalibration, buildPrintDocument, buildCalibrationDocument, subgenreLine };
})();
