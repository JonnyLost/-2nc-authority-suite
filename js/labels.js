(function () {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const subgenreLine = row => [row.primarySubgenre || row.subgenre, row.secondarySubgenre].filter(Boolean).join(' • ');
  const instrumentLogoUrl = new URL('assets/2nc-logo-white.png', window.location.href).href;
  const treasuresHeaderUrl = new URL('assets/treasures-header.png', window.location.href).href;

  function printStyles() {
    return `<style>
@page vinylPage{size:letter landscape;margin:.2in .5in}
@page comicPage{size:letter landscape;margin:.2in .5in}
@page cdPage{size:letter portrait;margin:.25in}
@page instrumentPage{size:letter portrait;margin:.25in}
@page treasurePage{size:letter portrait;margin:.25in}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
html,body{margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif}
.printNotice{padding:12px 16px;font-size:14px;background:#fff3cd;border:1px solid #e5c76b;margin:12px auto;width:calc(100% - 24px);max-width:900px}
.sheet{break-after:page;page-break-after:always;display:grid;align-content:start;justify-content:center;margin:0 auto}
.sheet:last-child{break-after:auto;page-break-after:auto}
.sheet.vinyl{page:vinylPage;width:10in;height:8.1in;grid-template-columns:repeat(2,5in);grid-template-rows:repeat(12,.675in)}
.sheet.comic{page:comicPage;width:7in;height:8.1in;grid-template-columns:repeat(2,3.5in);grid-template-rows:repeat(12,.675in)}
.sheet.cd{page:cdPage;width:8in;height:10.125in;grid-template-columns:repeat(4,2in);grid-template-rows:repeat(15,.675in)}
.sheet.instrument{page:instrumentPage;width:6in;grid-template-columns:6in;grid-auto-rows:4in;gap:.25in}
.sheet.treasure{page:treasurePage;width:7.25in;height:10.25in;grid-template-columns:repeat(2,3.5in);grid-template-rows:repeat(2,5in);gap:.25in}
.pl{height:.675in;border:.5pt dashed #999;display:flex;align-items:center;justify-content:center;text-align:center;padding:.0625in;overflow:hidden;line-height:1}
.pl.vinyl{width:5in}.pl.cd{width:2in}.pl.comic{width:3.5in;flex-direction:column}
.pl.vinyl,.pl.cd{flex-direction:column;justify-content:space-between;padding:.045in .0625in}
.pl .musicGenre{font-weight:700;color:#555;line-height:1;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl .musicSubgenres{color:#707070;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl.vinyl .musicGenre{font-size:6.5pt}.pl.vinyl b{font-size:15.5pt;line-height:1}.pl.vinyl .musicSubgenres{font-size:6pt}
.pl.cd .musicGenre{font-size:5.5pt}.pl.cd b{font-size:10pt;line-height:1}.pl.cd .musicSubgenres{font-size:5pt}
.pl.comic small{font-size:7pt;color:#666;margin-bottom:2pt}.pl.comic b{font-size:16pt}
.tag{width:6in;height:4in;position:relative;overflow:hidden;border:.5pt dashed #999;color:#df7748;background:#fff}
.orange{position:absolute;left:0;top:0;width:2in;height:4in;border-radius:0 100% 100% 0;background:#df7748;color:white;overflow:hidden}
.orange span{position:absolute;font-size:42pt;transform:rotate(-90deg);left:-.2in;top:1.55in;white-space:nowrap}
.orange .brandLogo{position:absolute;bottom:.12in;left:.14in;width:.68in;height:auto;object-fit:contain}
.prod{position:absolute;left:2.1in;right:.2in;top:.25in;bottom:.5in;display:flex;align-items:center;justify-content:center;text-align:center;font-size:29pt;font-weight:bold;line-height:1.05}
.tag footer{position:absolute;right:.15in;bottom:.12in;color:#555;font-size:7pt}
.treasureTagPrint{width:3.5in;height:5in;position:relative;overflow:hidden;border:.5pt dashed #999;background:#f58220;padding:.16in}
.treasureInner{width:100%;height:100%;background:#fff;position:relative;overflow:hidden}
.treasureHeaderPrint{display:block;width:100%;height:1.72in;object-fit:cover;object-position:center 45%}
.treasureProductPrint{position:absolute;left:.18in;right:.18in;top:1.72in;bottom:.22in;display:flex;align-items:center;justify-content:center;text-align:center;color:#202020;font-family:Impact,'Arial Narrow',Arial,sans-serif;font-size:29pt;line-height:1.28;text-transform:uppercase}
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
            pages += `<div class="pl comic">${row.primary ? `<b>${escapeHtml(row.name)}</b>` : `<small>${escapeHtml(row.parent)}</small><b>${escapeHtml(row.printedTitle || row.series)}</b>`}</div>`;
          } else if (kind === 'instrument') {
            pages += `<div class="tag"><div class="orange"><span>${escapeHtml(row.price)}</span><img class="brandLogo" src="${instrumentLogoUrl}" alt="2nd & Charles"></div><div class="prod">${escapeHtml(row.product).replace(/\n/g, '<br>')}</div><footer>2ndandcharles.com</footer></div>`;
          } else if (kind === 'treasure') {
            pages += `<div class="treasureTagPrint"><div class="treasureInner"><img class="treasureHeaderPrint" src="${treasuresHeaderUrl}" alt="2nd & Charles Treasures"><div class="treasureProductPrint">${escapeHtml(row.product).replace(/\n/g, '<br>')}</div></div></div>`;
          } else {
            pages += `<div class="pl ${kind}"><div class="musicGenre">${escapeHtml(row.genre || '')}</div><b>${escapeHtml(row.name)}</b><div class="musicSubgenres">${escapeHtml(subgenreLine(row))}</div></div>`;
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

  function openPrintWindow(html) {
    const popup = window.open('', '_blank');
    if (!popup) throw new Error('Pop-ups are blocked. Allow pop-ups for this site so the print sheet can open.');
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    setTimeout(() => popup.print(), 700);
  }

  function printQueue(queue) {
    if (!queue.length) throw new Error('Add at least one item to the print queue.');
    const groups = { vinyl: [], cd: [], comic: [], instrument: [], treasure: [] };
    queue.forEach(row => { if (groups[row.mode]) groups[row.mode].push(row); });
    openPrintWindow(buildPrintDocument(groups));
  }

  function printCalibration(mode) { openPrintWindow(buildCalibrationDocument(mode)); }
  window.LabelEngine = { printQueue, printCalibration, buildPrintDocument, buildCalibrationDocument, subgenreLine };
})();
