/* Prantik Dutta | Aerospace Engineering Portfolio
   Arranges the pages that Jekyll renders from the Markdown files.
   The Markdown files stay as they are: this script reads their structure
   (headings, paragraphs, images, tables) and adds the layout around it. */

(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var main = document.getElementById('main');
  if (!main) { root.classList.add('ready'); return; }

  var siteRoot = body.getAttribute('data-root') || '/';

  /* Project pages without a thumbnail on the homepage (file name without .md) */
  var NO_THUMB = ['publications'];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  /* A paragraph that holds one element and no other text */
  function onlyChild(p, tag) {
    if (!p || p.tagName !== 'P') return null;
    var kids = p.children;
    if (kids.length !== 1 || kids[0].tagName !== tag) return null;
    return p.textContent.trim() === kids[0].textContent.trim() ? kids[0] : null;
  }

  /* ---------- links to other sites open in a new tab ---------- */
  function externalLinks(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('a[href^="http"]'), function (a) {
      if (a.hostname && a.hostname !== location.hostname) {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    });
  }

  /* ---------- tables: scroll sideways on narrow screens ---------- */
  function wrapTables(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll('table'), function (t) {
      var w = el('div', 'table-wrap');
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
  }

  /* ---------- figure viewer ---------- */
  var viewer, viewerImg, viewerText, viewerBtn, lastFocus;

  function closeViewer() {
    if (!viewer || viewer.hidden) return;
    viewer.hidden = true;
    body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  function openViewer(src, caption, from) {
    if (!viewer) {
      viewer = el('div', 'lightbox');
      viewer.setAttribute('role', 'dialog');
      viewer.setAttribute('aria-modal', 'true');
      viewer.setAttribute('aria-label', 'Figure');
      viewerBtn = el('button', '', 'Close');
      viewerBtn.type = 'button';
      viewerImg = el('img');
      viewerText = el('p');
      var pane = el('div', 'lightbox-pane');
      pane.appendChild(viewerImg);
      viewer.appendChild(viewerBtn);
      viewer.appendChild(pane);
      viewer.appendChild(viewerText);
      viewer.addEventListener('click', closeViewer);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeViewer(); });
      body.appendChild(viewer);
    }
    lastFocus = from;
    viewerImg.src = src;
    viewerImg.alt = caption;
    viewerText.textContent = caption;
    viewer.hidden = false;
    body.style.overflow = 'hidden';
    viewerBtn.focus();
  }

  /* ---------- images become numbered figures with a caption ---------- */
  function buildFigures(scope) {
    var n = 0;
    Array.prototype.forEach.call(scope.querySelectorAll('p'), function (p) {
      var img = onlyChild(p, 'IMG');
      if (!img) return;
      n += 1;

      var fig = el('figure');
      var btn = el('button', 'zoom');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Enlarge figure ' + n);
      var cap = el('figcaption');
      cap.appendChild(el('span', 'fig-no', 'Figure ' + n));

      /* an italic line directly below the image is its caption; otherwise the image description is used */
      var next = p.nextElementSibling;
      var em = onlyChild(next, 'EM');
      var text;
      if (em) {
        text = em.textContent.trim();
        next.parentNode.removeChild(next);
      } else {
        text = (img.getAttribute('alt') || '').trim();
      }
      cap.appendChild(document.createTextNode(text));

      p.parentNode.insertBefore(fig, p);
      btn.appendChild(img);
      fig.appendChild(btn);
      fig.appendChild(cap);
      p.parentNode.removeChild(p);

      btn.addEventListener('click', function () { openViewer(img.currentSrc || img.src, text, btn); });
    });
  }

  /* ---------- homepage photo: two photos joined by a white strip become two framed photos ----------
     The image is read once to find the white strip between the photos. Each half is then shown
     in its own frame, with its part of the caption ("Left: ... Right: ...") written on the photo.
     An image without such a strip stays one framed photo with the caption below it. */
  function framePhotos(fig) {
    var img = fig.querySelector('img');
    var W = img.naturalWidth, H = img.naturalHeight;
    var cut = null;
    try {
      var cw = Math.min(W, 1200), ch = Math.max(1, Math.round(cw * H / W));
      var cv = document.createElement('canvas');
      cv.width = cw; cv.height = ch;
      var ctx = cv.getContext('2d');
      ctx.drawImage(img, 0, 0, cw, ch);
      var px = ctx.getImageData(0, 0, cw, ch).data;
      var run = 0, best = 0, bestEnd = -1;
      for (var x = Math.round(cw * 0.15); x < Math.round(cw * 0.85); x += 1) {
        var white = true;
        for (var y = 0; y < ch; y += 3) {
          var i = (y * cw + x) * 4;
          if (px[i] < 238 || px[i + 1] < 238 || px[i + 2] < 238) { white = false; break; }
        }
        run = white ? run + 1 : 0;
        if (run > best) { best = run; bestEnd = x; }
      }
      if (best >= 2) cut = { a: (bestEnd - best) / cw, b: (bestEnd + 2) / cw };   /* one pixel of margin on each side */
    } catch (err) { cut = null; }
    if (!cut) return;

    var capEl = fig.querySelector('figcaption');
    var capText = capEl ? capEl.textContent.trim() : '';
    var parts = /^left:\s*(.+?)\.?\s+right:\s*(.+?)\.?$/i.exec(capText);
    var alt = img.getAttribute('alt') || '';

    function tile(from, to, label, first) {
      var t = el('div', 'photo');
      var w = (to - from) * W;
      t.style.flex = Math.round(w) + ' 1 0';
      t.style.aspectRatio = Math.round(w) + ' / ' + H;
      var pic = first ? img : img.cloneNode(false);
      pic.alt = first ? alt : '';
      /* each half is anchored to its outer edge */
      pic.style.left = first ? '0' : 'auto';
      pic.style.right = first ? 'auto' : '0';
      t.appendChild(pic);
      if (label) t.appendChild(el('span', 'photo-label', label.charAt(0).toUpperCase() + label.slice(1)));
      return t;
    }

    var row = el('div', 'photo-row');
    var right = tile(cut.b, 1, parts && parts[2], false);   /* made first: it copies the image before the left half moves it */
    row.appendChild(tile(0, cut.a, parts && parts[1], true));
    row.appendChild(right);
    fig.insertBefore(row, fig.firstChild);
    fig.classList.add('is-split');
    if (parts && capEl) fig.removeChild(capEl);
  }

  /* ====================================================================
     Homepage
     ==================================================================== */
  function buildHome() {
    var kids = Array.prototype.slice.call(main.children);
    var firstH2 = kids.findIndex(function (k) { return k.tagName === 'H2'; });
    if (firstH2 < 0) firstH2 = kids.length;

    /* --- hero: name, role, links, photo --- */
    var hero = el('section', 'hero');
    var photo = null;
    kids.slice(0, firstH2).forEach(function (k) {
      if (k.tagName === 'HR') { k.parentNode.removeChild(k); return; }

      if (k.tagName === 'P' && onlyChild(k, 'IMG')) {
        photo = el('figure', 'hero-photo');
        photo.appendChild(k.querySelector('img'));
        k.parentNode.removeChild(k);
        return;
      }
      if (photo && k.tagName === 'P' && onlyChild(k, 'EM')) {
        var fc = el('figcaption', '', k.textContent.trim());
        photo.appendChild(fc);
        k.parentNode.removeChild(k);
        return;
      }
      if (k.tagName === 'P' && onlyChild(k, 'STRONG')) {
        /* "Aerospace Engineer: A · B · C" becomes a small role line above the name and a line of focus areas below it */
        var t = k.textContent.trim();
        var cut = t.indexOf(':');
        if (cut > 0 && cut < 40) {
          hero.insertBefore(el('p', 'eyebrow', t.slice(0, cut)), hero.firstChild);
          /* each focus area stays on one line; lines break only after a separator dot */
          var areas = t.slice(cut + 1).split('\u00b7').map(function (x) { return x.trim().replace(/ /g, '\u00a0'); });
          hero.appendChild(el('p', 'focus', areas.join('\u00a0\u00b7 ')));
          k.parentNode.removeChild(k);
        } else {
          k.className = 'focus';
          hero.appendChild(k);
        }
        return;
      }
      if (k.tagName === 'P' && k.querySelectorAll('a').length > 1 && !k.querySelector('img')) {
        /* the row of contact links: keep the links, drop the separators */
        Array.prototype.slice.call(k.childNodes).forEach(function (c) { if (c.nodeType === 3) k.removeChild(c); });
        k.className = 'links';
      }
      hero.appendChild(k);
    });
    if (photo) {
      hero.appendChild(photo);
      var shot = photo.querySelector('img');
      if (shot.complete && shot.naturalWidth) framePhotos(photo);
      else shot.addEventListener('load', function () { framePhotos(photo); });
    }
    main.insertBefore(hero, main.firstChild);

    /* --- sections: one per second-level heading --- */
    var sections = [];
    var current = null;
    Array.prototype.slice.call(main.children).forEach(function (k) {
      if (k === hero) return;
      if (k.tagName === 'HR') { k.parentNode.removeChild(k); return; }
      if (k.tagName === 'H2') {
        current = el('section', 'sec');
        current.id = k.id || slugify(k.textContent);
        k.removeAttribute('id');
        main.insertBefore(current, k);
        sections.push(current);
      }
      if (current) current.appendChild(k);
    });

    var firstCategory = null;
    sections.forEach(function (sec) {
      var h2 = sec.querySelector('h2');
      var heads = sec.querySelectorAll('h3');

      if (!heads.length) {              /* About, Tools */
        sec.classList.add('rule', 'sec-' + sec.id);
        /* "Experimental:" reads as a label, so the colon goes */
        Array.prototype.forEach.call(sec.querySelectorAll('p > strong:first-child'), function (s) {
          if (s.parentNode.firstChild === s) s.textContent = s.textContent.replace(/:\s*$/, '');
        });
        return;
      }

      /* a project category */
      sec.classList.add('rule', 'sec-cat');
      if (!firstCategory) firstCategory = sec;
      var head = el('div', 'sec-head');
      sec.insertBefore(head, h2);
      head.appendChild(h2);

      var entry = null, bodyBox = null;
      Array.prototype.slice.call(sec.children).forEach(function (k) {
        if (k === head) return;
        if (k.tagName === 'H3') {
          entry = el('article', 'entry no-thumb');
          bodyBox = el('div', 'entry-body');
          entry.appendChild(bodyBox);
          sec.insertBefore(entry, k);
        }
        if (bodyBox) bodyBox.appendChild(k);
      });

      var linked = 0;
      Array.prototype.forEach.call(sec.querySelectorAll('.entry'), function (entry) {
        var link = entry.querySelector('.entry-body p:last-child a[href]');
        if (!link) return;
        linked += 1;
        entry.classList.add('has-link');
        var p = link.parentNode;
        p.className = 'entry-more';
        /* drop the document symbol in front of the link */
        Array.prototype.slice.call(p.childNodes).forEach(function (c) { if (c.nodeType === 3) p.removeChild(c); });

        /* thumbnail: images/cards/<page name>.jpg; the row falls back to text only if that file does not exist */
        var name = link.getAttribute('href').replace(/[?#].*$/, '').replace(/\/$/, '').split('/').pop().replace(/\.html?$/, '');
        if (!name || NO_THUMB.indexOf(name) > -1) return;
        var thumb = el('div', 'entry-thumb');
        var img = el('img');
        img.alt = '';
        img.addEventListener('error', function () {
          if (thumb.parentNode) thumb.parentNode.removeChild(thumb);
          entry.classList.add('no-thumb');
        });
        thumb.appendChild(img);
        entry.insertBefore(thumb, entry.firstChild);
        entry.classList.remove('no-thumb');
        img.src = siteRoot + 'images/cards/' + name + '.jpg';
      });

      /* project count beside the heading, where every entry in the section is a project page */
      if (linked > 1 && linked === heads.length && !/publication/i.test(h2.textContent)) {
        head.appendChild(el('span', 'sec-count', linked + ' projects'));
      }
    });

    /* the "Projects" link in the header points to the first category */
    if (firstCategory) {
      var mark = el('span');
      mark.id = 'projects';
      firstCategory.insertBefore(mark, firstCategory.firstChild);
    }

    /* About and Tools side by side */
    var about = document.getElementById('about');
    var tools = document.getElementById('tools');
    if (about && tools && about.nextElementSibling === tools) {
      var grid = el('div', 'about-grid');
      main.insertBefore(grid, about);
      grid.appendChild(about);
      grid.appendChild(tools);
    }
  }

  /* ====================================================================
     Project pages
     ==================================================================== */
  function buildProject() {
    var doc = el('article', 'doc');
    while (main.firstChild) doc.appendChild(main.firstChild);
    main.appendChild(doc);

    var kids = Array.prototype.slice.call(doc.children);
    var firstH2 = kids.findIndex(function (k) { return k.tagName === 'H2'; });
    if (firstH2 < 0) firstH2 = kids.length;

    /* back links at the top and the bottom */
    kids.forEach(function (k, i) {
      var a = onlyChild(k, 'A');
      if (a && /^\.\.\/?$/.test(a.getAttribute('href') || '')) {
        k.className = i > firstH2 ? 'back end' : 'back';
      }
    });

    kids.slice(0, firstH2).forEach(function (k) {
      if (k.tagName !== 'P' || k.className) return;

      /* the line with course, year and team */
      if (onlyChild(k, 'EM')) { k.className = 'meta'; return; }

      /* keyword lines: "**Label:** a · b · c" become a label and a row of tags */
      var lead = k.firstElementChild;
      if (lead && lead.tagName === 'STRONG' && k.firstChild === lead && k.textContent.indexOf('·') > -1) {
        var label = lead.textContent.replace(/:\s*$/, '');
        var rest = k.textContent.slice(lead.textContent.length);
        var box = el('div', 'keys');
        box.appendChild(el('span', 'keys-label', label));
        var list = el('div', 'keys-list');
        rest.split('·').forEach(function (item) {
          item = item.trim();
          if (item) list.appendChild(el('span', 'tag', item));
        });
        box.appendChild(list);
        doc.replaceChild(box, k);
      }
    });

    /* the "My role" line */
    Array.prototype.forEach.call(doc.querySelectorAll('p'), function (p) {
      var s = p.firstElementChild;
      if (s && s.tagName === 'STRONG' && p.firstChild === s && /^my role/i.test(s.textContent)) p.className = 'role';
    });

    buildFigures(doc);
    main.classList.add('has-toc');   /* the text keeps the same column on every project page */

    /* page contents from the second-level headings */
    var heads = doc.querySelectorAll('h2');
    if (heads.length >= 3) {
      var toc = el('nav', 'toc');
      toc.setAttribute('aria-label', 'On this page');
      toc.appendChild(el('p', 'toc-title', 'On this page'));
      var ol = el('ol');
      var links = [];
      Array.prototype.forEach.call(heads, function (h) {
        if (!h.id) h.id = slugify(h.textContent);
        var li = el('li');
        var a = el('a', '', h.textContent);
        a.href = '#' + h.id;
        li.appendChild(a);
        ol.appendChild(li);
        links.push(a);
      });
      toc.appendChild(ol);
      main.insertBefore(toc, doc);

      /* mark the section that is being read */
      var mark = function () {
        var line = window.innerHeight * 0.3;
        var on = 0;
        for (var i = 0; i < heads.length; i += 1) {
          if (heads[i].getBoundingClientRect().top < line) on = i;
        }
        links.forEach(function (a, i) { a.classList.toggle('on', i === on); });
      };
      var waiting = false;
      window.addEventListener('scroll', function () {
        if (waiting) return;
        waiting = true;
        window.requestAnimationFrame(function () { waiting = false; mark(); });
      }, { passive: true });
      mark();
    }
  }

  try {
    if (body.classList.contains('home')) buildHome(); else buildProject();
    wrapTables(main);
    externalLinks(document);
  } catch (err) {
    if (window.console) console.error(err);
  }
  root.classList.add('ready');

  /* a link such as /#about, opened from another page, lands on the right section */
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView();
  }
})();
