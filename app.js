/* ============================================================================
   Manon Contrino — CV onepage
   ----------------------------------------------------------------------------
   Aucune dépendance, aucun réseau. Neuf mécanismes :

     1. découpe du titre en lettres
     2. photos manquantes remplacées par un cadre dessiné à la volée
     3. rideau d'entrée
     4. apparition au défilement
     5. parallaxe des photos (une seule boucle rAF partagée)
     6. jauge de progression + point de section actif + fond clair/sombre
     7. filtre des techniques
     8. visionneuse d'image
     9. défilement animé vers les ancres, impression, formulaire

   Tout le mouvement est court-circuité si le système demande moins
   d'animation : le script ne pose alors aucun état de départ et laisse le CSS
   afficher la page telle quelle.
   ============================================================================ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Découpe du titre en lettres
     Chaque lettre devient un span portant son rang (--i), que le CSS traduit en
     retard. Le nom complet reste lisible par les lecteurs d'écran grâce à
     aria-label.
     ========================================================================== */

  $$('[data-split]').forEach(function (el) {
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';

    var i = 0;
    text.split(/\s+/).forEach(function (word, w) {
      // Chaque mot est une boîte insécable : sans ça, des lettres en
      // inline-block se coupent n'importe où en fin de ligne.
      var box = document.createElement('span');
      box.className = 'split-word';
      box.setAttribute('aria-hidden', 'true');

      word.split('').forEach(function (ch) {
        var span = document.createElement('span');
        span.className = 'split-char';
        span.style.setProperty('--i', i++);
        span.textContent = ch;
        box.appendChild(span);
      });

      if (w > 0) el.appendChild(document.createTextNode(' '));
      el.appendChild(box);
    });
  });

  /* ==========================================================================
     1 bis. Le nom doit tenir dans sa colonne

     La taille d'affichage du nom est calculée sur la largeur de l'ÉCRAN
     (`clamp(..., 7.4vw, ...)`), alors que le nom, lui, est enfermé dans une
     colonne de 34 rem. Tant que le patronyme était court, les deux allaient de
     pair. « VANBASTELAER » fait douze lettres : sur grand écran le mot mesurait
     plus large que sa colonne, et comme un mot ne se coupe pas, il passait sous
     le portrait et s'y faisait rogner.

     On mesure donc le mot le plus large et on abaisse la taille jusqu'à ce
     qu'il tienne. Mesuré, pas deviné : la largeur dépend de la police, qui
     n'est pas la même avant et après son chargement.
     ========================================================================== */

  var nameEl = $('.intro__name');

  function fitName() {
    if (!nameEl) return;

    // On repart toujours de la taille du CSS, sinon les réductions
    // successives s'empilent à chaque redimensionnement.
    nameEl.style.fontSize = '';

    var words = $$('.split-word', nameEl);
    if (!words.length) return;

    /* La place disponible se mesure avec un corps minuscule. Sans ça, la mesure
       tourne en rond : un élément de grille peut s'élargir sous la poussée de
       son propre contenu, il rend donc exactement la largeur du mot le plus
       long — jamais celle de la colonne — et la réduction n'a jamais lieu. */
    nameEl.style.fontSize = '1px';
    var avail = nameEl.clientWidth;
    nameEl.style.fontSize = '';
    if (!avail) return;

    var widest = 0;
    words.forEach(function (w) {
      var x = w.getBoundingClientRect().width;
      if (x > widest) widest = x;
    });

    if (widest <= avail) return;

    // L'interlettrage est exprimé en em : la largeur est donc proportionnelle à
    // la taille, et une seule passe suffit. Le 0.995 laisse un cheveu de marge
    // pour les arrondis de rendu.
    var size = parseFloat(getComputedStyle(nameEl).fontSize);
    nameEl.style.fontSize = Math.floor(size * (avail / widest) * 0.995) + 'px';
  }

  fitName();
  addEventListener('resize', fitName);
  addEventListener('load', fitName);
  // La police de titrage arrive après le premier rendu : tant qu'elle n'est pas
  // là, on mesure les lettres d'une police de substitution, aux dimensions
  // différentes. On remesure donc une fois qu'elle est posée.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);

  /* ==========================================================================
     2. Photos manquantes

     Le CV est livré sans ses photos : elles seront déposées une à une dans
     assets/images/. En attendant, une image absente laisserait une icône de
     fichier cassé — la pire chose sur un CV. On dessine donc à la place un
     cadre à la charte du site, portant l'intitulé de la photo attendue
     (data-ph). Le jour où le fichier existe, il s'affiche et ce code ne fait
     plus rien.

     Le script est chargé en fin de page : certaines images ont donc déjà
     échoué avant qu'on ne pose le gestionnaire. On teste aussi l'état courant.
     ========================================================================== */

  function placeholder(label, dark) {
    var bg    = dark ? '#262323' : '#e9e7e4';
    var line  = dark ? '#333030' : '#dcd8d3';
    var text  = dark ? '#7d7671' : '#a09a94';
    var sub   = dark ? '#5c5652' : '#b9b3ad';

    // Hachures diagonales : le même vide que sur une planche de contact.
    var hatch = '';
    for (var x = -600; x < 800; x += 26) {
      hatch += '<line x1="' + x + '" y1="0" x2="' + (x + 600) + '" y2="600" stroke="' + line + '" stroke-width="1"/>';
    }

    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">' +
        '<rect width="800" height="600" fill="' + bg + '"/>' +
        hatch +
        '<rect x="40" y="40" width="720" height="520" fill="none" stroke="' + line + '" stroke-width="2"/>' +
        '<text x="400" y="292" text-anchor="middle" fill="' + text + '" ' +
          'font-family="Helvetica,Arial,sans-serif" font-size="30" font-weight="700" letter-spacing="7">' +
          label.toUpperCase().replace(/[<>&]/g, '') +
        '</text>' +
        '<text x="400" y="332" text-anchor="middle" fill="' + sub + '" ' +
          'font-family="Helvetica,Arial,sans-serif" font-size="16" letter-spacing="4">' +
          'PHOTO A AJOUTER' +
        '</text>' +
      '</svg>';

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function fallback(img) {
    // Premier repli : l'illustration livrée avec le CV, sous le même nom en
    // .svg. C'est ce qui s'affiche tant qu'aucune vraie photo n'a été déposée ;
    // le jour où le .jpg existe, il gagne et on ne passe jamais ici.
    if (!img.dataset.tried) {
      img.dataset.tried = '1';
      var src = img.getAttribute('src') || '';
      if (/\.(jpe?g|png|webp)$/i.test(src)) {
        img.src = src.replace(/\.[a-z0-9]+$/i, '.svg');
        return;
      }
    }

    // Second repli : même l'illustration manque. On dessine un cadre plutôt que
    // de laisser une icône de fichier cassé sur un CV.
    if (img.dataset.failed) return;
    img.dataset.failed = '1';
    var dark = !!img.closest('.chapter--dark');
    img.src = placeholder(img.getAttribute('data-ph') || 'photo', dark);
    // Un cadre vide n'a rien à montrer en grand : on lui retire son rôle
    // cliquable plutôt que d'ouvrir une visionneuse sur rien.
    img.removeAttribute('data-zoom');
    img.style.cursor = 'default';
  }

  $$('img[data-ph]').forEach(function (img) {
    img.addEventListener('error', function () { fallback(img); });
    // Déjà chargée et vide : l'erreur est passée avant nous.
    if (img.complete && img.naturalWidth === 0) fallback(img);
  });

  /* ==========================================================================
     3. Rideau d'entrée
     Il se lève dès que la page est prête — ou au bout de 1,8 s si une image
     traîne, pour ne jamais retenir quelqu'un devant un écran noir.
     ========================================================================== */

  var opened = false;

  function open() {
    if (opened) return;
    opened = true;
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-open');
    // Le premier écran s'anime dès l'ouverture, sans attendre le défilement.
    reveal($('#intro'));
    onScroll();
  }

  if (reduced) {
    document.body.classList.add('is-open');
  } else {
    document.body.classList.add('is-locked');
    addEventListener('load', function () { setTimeout(open, 220); });
    setTimeout(open, 1800);
  }

  /* ==========================================================================
     4. Apparition au défilement

     Le contrôle se fait dans la boucle de défilement, pas avec un
     IntersectionObserver : un élément masqué par `clip-path: inset(0 0 100%)`
     a une surface rendue nulle, l'observateur ne le « voit » donc jamais et ne
     le révélerait jamais. Ici on teste les rectangles à chaque image tant qu'il
     reste des éléments en attente ; la liste se vide, le coût tend vers zéro.

     Filet complémentaire : les états de départ ne s'appliquent que sous
     `html.anim`, classe posée ci-dessous. Si le script échoue avant, le CV
     s'affiche entièrement, sans animation.
     ========================================================================== */

  // `[data-split]` compte parmi les cibles : il ne bouge pas lui-même, mais
  // c'est sa classe `is-in` qui déclenche la montée de ses lettres.
  var SELECTOR = '[data-reveal], [data-unmask], [data-split]';

  var pending = $$(SELECTOR);

  pending.forEach(function (el) {
    var d = parseInt(el.getAttribute('data-delay'), 10);
    if (d) el.style.setProperty('--d', 'calc(' + d + ' * var(--step))');
  });

  if (!reduced) document.documentElement.classList.add('anim');

  function reveal(scope) {
    if (!scope) return;
    var inside = $$(SELECTOR, scope);
    if (scope.matches && scope.matches(SELECTOR)) inside.push(scope);
    inside.forEach(function (el) {
      el.classList.add('is-in');
      var i = pending.indexOf(el);
      if (i !== -1) pending.splice(i, 1);
    });
  }

  function sweep(vh) {
    // Rien ne se révèle tant que le rideau est là : sinon l'entrée du premier
    // écran se joue derrière lui et personne ne la voit.
    if (!opened) return;

    for (var i = pending.length - 1; i >= 0; i--) {
      var r = pending[i].getBoundingClientRect();
      // Une fiche masquée par le filtre a un rectangle nul : elle reste en
      // attente et sera révélée quand elle reviendra.
      if (r.width === 0 && r.height === 0) continue;
      // On déclenche un peu avant le bas de l'écran : le mouvement a le temps
      // de se finir pendant que l'élément monte.
      if (r.top < vh * 0.88 && r.bottom > 0) {
        pending[i].classList.add('is-in');
        pending.splice(i, 1);
      }
    }
  }

  /* ==========================================================================
     5. Parallaxe
     Les photos remontent plus lentement que la page. Un seul rAF pour tout le
     monde, uniquement sur les images visibles, et rien d'autre que `transform`
     — donc pas de recalcul de mise en page.
     ========================================================================== */

  var parallax = $$('[data-parallax]').map(function (img) {
    return {
      el: img,
      // On mesure le CADRE, pas l'image : l'image est justement ce qu'on
      // déplace, lire sa position reviendrait à se mordre la queue.
      frame: img.parentElement,
      rate: parseFloat(img.getAttribute('data-parallax')) || 0.1,
      amp: 0,
      scale: 1
    };
  });

  /* L'amplitude est une fraction de la hauteur de l'image, pas de celle de
     l'écran : sinon une petite vignette devrait être agrandie de moitié pour
     couvrir le même déplacement qu'une grande photo. Le surdimensionnement se
     déduit du taux — il couvre exactement la course, plus 2 % de marge. */
  function measure() {
    parallax.forEach(function (p) {
      p.amp = p.frame.getBoundingClientRect().height * p.rate;
      p.scale = 1 + 2 * p.rate + 0.02;
      p.el.style.transform = 'translate3d(0,0,0) scale(' + p.scale.toFixed(4) + ')';
    });
  }

  if (!reduced && parallax.length) {
    measure();
    addEventListener('resize', measure);
    addEventListener('load', measure);
  }

  /* ==========================================================================
     6. Jauge, section active, inversion de la navigation
     ========================================================================== */

  var bar = $('.progress__bar');
  var dots = $('.dots');
  var dotLinks = $$('.dots a');
  var sections = dotLinks.map(function (a) { return $(a.getAttribute('href')); });
  var darkSections = $$('.chapter--dark, .strip');
  var toTop = $('.totop');

  // Y a-t-il une section sombre à cette hauteur de l'écran ?
  function darkAt(y) {
    return darkSections.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
  }

  function frame() {
    var vh = innerHeight;

    if (!reduced && pending.length) sweep(vh);

    // Jauge : part de la position réelle, pas d'un compteur qui dérive.
    if (bar) {
      var max = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
    }

    // Parallaxe. `progress` vaut -1 quand le cadre entre par le bas, +1 quand
    // il sort par le haut ; l'image parcourt donc au plus ±amp, ce que le
    // surdimensionnement calculé dans measure() couvre exactement.
    if (!reduced) {
      parallax.forEach(function (p) {
        var r = p.frame.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;  // hors champ : on passe
        var span = (vh + r.height) / 2;
        var progress = span > 0 ? (r.top + r.height / 2 - vh / 2) / span : 0;
        if (progress > 1) progress = 1; else if (progress < -1) progress = -1;
        p.el.style.transform =
          'translate3d(0,' + (progress * p.amp).toFixed(2) + 'px,0) scale(' + p.scale.toFixed(4) + ')';
      });
    }

    // Section active : celle qui occupe le tiers haut de l'écran.
    var line = vh * 0.34;
    var current = 0;
    sections.forEach(function (s, i) {
      if (s && s.getBoundingClientRect().top <= line) current = i;
    });
    dotLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });

    // Les commandes du bord droit s'inversent au-dessus des sections sombres.
    // On teste les rectangles plutôt que elementFromPoint, qui tombe sur la
    // barre de défilement et force un recalcul de style à chaque image. Chacune
    // est jaugée à SA hauteur : les points sont au milieu, la flèche en bas.
    if (dots) dots.classList.toggle('on-dark', darkAt(vh / 2));
    if (toTop) toTop.classList.toggle('on-dark', darkAt(vh - 48));

    ticking = false;
  }

  // La flèche apparaît une fois le premier écran passé. Réglée directement dans
  // le gestionnaire de défilement et non dans la boucle d'animation : c'est une
  // simple comparaison, et Safari iOS suspend requestAnimationFrame pendant le
  // défilement inertiel — la flèche répond donc même à ce moment-là.
  function showToTop() {
    if (toTop) toTop.classList.toggle('is-visible', scrollY > innerHeight * 0.6);
  }

  var ticking = false;
  function onScroll() {
    showToTop();
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(frame);
  }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  // Un onglet caché suspend requestAnimationFrame. Sans ces rattrapages, revenir
  // sur l'onglet laisserait à l'écran ce qui n'avait pas encore été révélé.
  addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') onScroll();
  });
  addEventListener('pageshow', onScroll);
  addEventListener('load', onScroll);

  onScroll();

  // Dernier filet : si requestAnimationFrame ne tourne pas (onglet non peint,
  // moteur qui l'a suspendu), un battement lent garantit quand même que le
  // contenu apparaît. Il s'arrête dès qu'il n'y a plus rien à révéler.
  if (!reduced) {
    var heartbeat = setInterval(function () {
      if (!pending.length) { clearInterval(heartbeat); return; }
      sweep(innerHeight);
    }, 400);
  }

  /* ==========================================================================
     7. Filtre des techniques
     Les fiches écartées sortent en fondu puis quittent le flux, sinon la grille
     garderait des trous. Rien n'est supprimé : tout revient au filtre suivant.
     ========================================================================== */

  var chips = $$('.chip');
  var tiles = $$('#techniques-grid .tile');
  var empty = $('#techniques-empty');
  var hideTimer = null;

  function applyFilter(cat) {
    var shown = 0;

    tiles.forEach(function (tile) {
      var match = (cat === 'tout' || tile.getAttribute('data-cat') === cat);
      if (match) {
        shown++;
        tile.hidden = false;
        // Un reflow entre `hidden = false` et le retrait de `is-out` : sans lui
        // le navigateur regroupe les deux et le fondu d'entrée n'a pas lieu.
        void tile.offsetWidth;
        tile.classList.remove('is-out');
      } else {
        tile.classList.add('is-out');
      }
    });

    // On attend la fin du fondu avant de retirer les fiches du flux.
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      tiles.forEach(function (tile) {
        if (tile.classList.contains('is-out')) tile.hidden = true;
      });
      onScroll();
    }, reduced ? 0 : 360);

    if (empty) empty.hidden = shown > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        var on = (c === chip);
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  /* ==========================================================================
     7 bis. Plans

     Le plan Google n'est chargé qu'au clic. Deux raisons : la page n'appelle
     alors aucun serveur extérieur tant que personne ne le demande — donc aucun
     cookie tiers déposé à l'insu du visiteur — et le CV reste entièrement
     lisible hors ligne. Avant le clic, le cadre affiche un plan schématique
     dessiné en CSS, exactement à la taille de la carte : rien ne saute.
     ========================================================================== */

  $$('.place__load').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var frame = btn.parentElement;
      var query = btn.getAttribute('data-query') || '';

      var map = document.createElement('iframe');
      map.src = 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
      map.title = btn.getAttribute('data-title') || 'Plan';
      map.loading = 'lazy';
      map.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      map.setAttribute('allowfullscreen', '');

      frame.textContent = '';
      frame.classList.add('is-loaded');
      frame.appendChild(map);
    });
  });

  /* ==========================================================================
     8. Visionneuse
     Ouvre la photo cliquée en grand. Flèches pour passer d'une photo à l'autre
     parmi celles actuellement visibles, Échap pour fermer, et le focus revient
     là où il était.
     ========================================================================== */

  var box = $('#lightbox');
  var boxImg = $('.lightbox__img', box);
  var boxCap = $('.lightbox__caption', box);
  var boxClose = $('.lightbox__close', box);
  var lastFocus = null;
  var zoomList = [];
  var zoomIndex = 0;

  function zoomables() {
    // Recalculé à chaque ouverture : le filtre change ce qui est à l'écran.
    return $$('img[data-zoom]').filter(function (img) {
      return img.getBoundingClientRect().width > 0;
    });
  }

  function show(i) {
    if (!zoomList.length) return;
    zoomIndex = (i + zoomList.length) % zoomList.length;
    var img = zoomList[zoomIndex];
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
    boxCap.textContent = img.alt || '';
  }

  function openBox(img) {
    zoomList = zoomables();
    var i = zoomList.indexOf(img);
    if (i === -1) { zoomList = [img]; i = 0; }

    lastFocus = document.activeElement;
    box.hidden = false;
    show(i);
    void box.offsetWidth;
    box.classList.add('is-open');
    document.body.classList.add('is-locked');
    boxClose.focus();
  }

  function closeBox() {
    box.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(function () {
      box.hidden = true;
      boxImg.removeAttribute('src');
    }, reduced ? 0 : 400);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest ? e.target.closest('img[data-zoom]') : null;
    if (img) { openBox(img); return; }
    // Cliquer à côté de la photo ferme, comme partout ailleurs.
    if (!box.hidden && (e.target === box || e.target.closest('.lightbox__close'))) closeBox();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') { closeBox(); }
    else if (e.key === 'ArrowRight') { show(zoomIndex + 1); }
    else if (e.key === 'ArrowLeft')  { show(zoomIndex - 1); }
    else if (e.key === 'Tab') {
      // Deux éléments focalisables seulement : on garde le focus sur la
      // fermeture plutôt que de laisser partir dans la page du dessous.
      e.preventDefault();
      boxClose.focus();
    }
  });

  /* ==========================================================================
     9. Ancres, impression, formulaire
     ========================================================================== */

  // Même courbe que le CV d'origine — cubique symétrique — portée à 1,1 s, les
  // distances étant grandes sur une page continue.
  function scrollToY(y, duration) {
    var start = Date.now();
    var from = scrollY;
    var delta = y - from;
    var ease = function (t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    (function step() {
      var t = Date.now() - start;
      if (t >= duration) { scrollTo(0, y); return; }
      scrollTo(0, from + delta * ease(t / duration));
      requestAnimationFrame(step);
    })();
  }

  addEventListener('click', function (event) {
    var a = event.target.closest ? event.target.closest('a[href^="#"]') : null;
    if (!a) return;

    var id = a.getAttribute('href');
    if (id === '#' || id.length < 2) return;

    var target = $(id);
    if (!target) return;

    event.preventDefault();
    history.replaceState(null, '', id);

    if (reduced) { target.scrollIntoView(); return; }
    scrollToY(target.getBoundingClientRect().top + scrollY, 1100);
  });

  // Impression : la feuille de style @media print fait le reste. On révèle
  // d'abord tout ce qui ne l'a pas encore été, au cas où le navigateur
  // capturerait la page dans son état courant.
  var printBtn = $('#print-cv');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      reveal(document.body);
      print();
    });
  }

  /* Formulaire : rien n'est envoyé à un serveur, donc rien ne prétend avoir été
     reçu. Le bouton prépare un courriel dans le logiciel de messagerie. */

  var CONTACT_EMAIL = 'prenom.nom@exemple.be';

  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var message = form.elements['message'].value.trim();

      var subject = name ? 'Message de ' + name : 'Message depuis le CV';
      var body = message + '\n\n—\n' + name + '\n' + email;

      location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

})();
