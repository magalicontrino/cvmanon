# CV de Manon Vanbastelaer — mode d'emploi

Site en une seule page, sans dépendance et sans serveur : il suffit d'ouvrir
`index.html` dans un navigateur. Même identité graphique que
[cv.magalicontrino.com](https://cv.magalicontrino.com) — mêmes polices, même
grammaire d'animation — mais en clair de bout en bout, avec des cartes très
arrondies, des boutons en gélule, et une teinte bleutée très pâle sur une
section sur deux pour qu'on repère les chapitres d'un coup d'œil.

Dépôt : <https://github.com/magalicontrino/cvmanon>

---

## 1. Les photos : comment ça marche

Chaque emplacement d'image suit **trois niveaux**, dans cet ordre :

1. `assets/images/<nom>.jpg` — la vraie photo. C'est celle qui s'affiche dès
   qu'elle existe.
2. `assets/images/<nom>.svg` — l'illustration au trait livrée avec le CV. Elle
   s'affiche tant que le `.jpg` n'est pas là.
3. Un cadre gris dessiné à la volée, si les deux manquent.

**Donc pour remplacer une illustration par une vraie photo : déposez le fichier
`.jpg` au même nom, dans le même dossier. Rien d'autre à modifier.** Ne
supprimez pas le `.svg` : il reprend la main si vous retirez la photo.

Les images d'attente sont des **pictogrammes de [game-icons.net](https://game-icons.net)**
posés sur un fond à la charte du site : couteaux pour les taillages, casserole
pour les sauces, fouet pour les crèmes, crevette pour les croquettes. Elles
tiennent la page en attendant, mais elles ne remplacent pas des photos d'elle en
tenue — c'est ça qui fera la différence auprès d'un patron.

Ces pictogrammes sont sous licence **CC BY 3.0** : le crédit en pied de page
(auteurs + lien vers game-icons.net) n'est pas décoratif, c'est la condition
d'utilisation. Ne le retirez pas tant qu'il reste une seule de ces images sur le
site. Quand toutes seront remplacées par de vraies photos, le crédit pourra
partir avec elles — sauf le favicon, qui vient de la même banque.

**Noms attendus**

| Fichier | Sujet |
|---|---|
| `portrait.jpg` | ✅ déjà en place — la photo que vous avez déposée |
| `technique-01.jpg` → `technique-14.jpg` | Les 14 techniques, dans l'ordre des fiches |

**Formation et Expérience n'attendent plus de photos.** Ces deux chapitres sont
passés en listes compactes pour qu'on embrasse le parcours d'un regard&nbsp;: ils
n'ont plus que de petits pictos de 2 rem, où une photo serait illisible. Si vous
voulez y remettre des photos d'elle en tenue, dites-le — il faudra rouvrir la
mise en page de ces sections, ce n'est pas un simple dépôt de fichier.

L'ordre des techniques : 01 taillages · 02 sauces mères · 03 cuissons ·
04 poisson et volaille · 05 dressage · 06 mise en place · 07 pâtes de base ·
08 crèmes · 09 chocolat · 10 mise en place salle · 11 service à l'assiette ·
12 découpe et flambage · 13 accueil · 14 boissons.

La section **Plats signature** est **retirée de la page pour l'instant**. Elle
n'est pas supprimée : son code est mis de côté dans `_plats-signature.html.retire`,
et son CSS, ses huit pictos et sa fiche dans `PICTOS.md` sont intacts. Pour la
remettre, recollez le contenu de ce fichier juste avant le commentaire
« compétences » dans `index.html`, rendez son point de navigation et son bouton
d'accueil, et renumérotez les chapitres.

**Prise de vue** — cadrez à l'horizontale, largeur 1600 px environ, lumière du
jour. Les vignettes sont recadrées au centre : laissez de l'air autour du sujet.
Le portrait, lui, est recadré en hauteur avec l'ancrage réglé sur le visage.

---

## 2. À vérifier avant de l'envoyer

Le nom et l'âge sont maintenant exacts. Le reste, je l'ai déduit ou inventé :

| Où | Quoi | Actuellement |
|---|---|---|
| Formation | **Années antérieures** | Seuls la 4ᵉ terminée en juin 2026 et l'entrée en 5ᵉ en septembre sont notées. Les années d'avant ne sont pas indiquées, faute d'information |
| Expérience | **Dates des postes** | 2025 → en cours à la Brasserie, stage en 2025 |
| Expérience — Transind | **Année, durée, intitulé** | « Été », « Magasinière ». Vous m'avez donné l'entreprise et les tâches, pas les dates |
| Expérience — All Ride | **Année, durée, commune** | « Été ». Je n'ai trouvé aucune société belge de ce nom&nbsp;: ni commune ni secteur ne sont affirmés, seulement « skateboard » |
| Plats signature | **Les cinq derniers** | Les trois premiers viennent de vous. Les cinq autres sont tirés de la carte de la Brasserie des Artistes et restent à confirmer |

Le mot **traiteur** apparaît dans l'accroche, dans les compétences et dans les
banquets de l'école. Elle n'a pas travaillé chez un traiteur : ce sont les
banquets scolaires qui relèvent du même registre, et la fiche le formule comme
une comparaison, pas comme un emploi. Si un jour elle en fait vraiment, ça
mérite sa propre ligne dans l'expérience.

Le **stage** est décrit de façon volontairement générale : je ne savais ni où il
a eu lieu ni ce qu'elle y a fait. C'est le passage à réécrire en premier, c'est
celui qu'un patron lira le plus attentivement.

Les deux adresses vérifiées :

- **Institut d'Enseignement Cardinal Mercier**, Chaussée de Mont-Saint-Jean 83,
  1420 Braine-l'Alleud — section hôtelière.
- **Brasserie des Artistes**, Rue Basse 11, 1460 Ittre.

---

## 3. Ce que le site sait faire

- **Rideau d'entrée**, apparition progressive de chaque bloc au défilement,
  léger décalage des photos par rapport au texte.
- **Navigation par points** au bord droit, qui s'inverse en blanc sur les
  sections sombres ; jauge de progression en haut, flèche de retour en bas.
- **Filtre des techniques** : Tout / Salle / Cuisine / Pâtisserie.
- **Étoile sur les fiches techniques** : elle marque les gestes tenus en
  autonomie. C'est ce qui a remplacé le chapitre Compétences, dont les langues
  et les disponibilités ont rejoint le bas de la section Contact.
- **Visionneuse** : un clic sur une image l'ouvre en grand. Flèches ← → pour
  passer à la suivante, Échap pour fermer.
- **Plans Google Maps** de la brasserie et de l'école, en bas de la section
  Expérience. Ils ne se chargent **qu'au clic** : tant que personne ne le
  demande, la page n'appelle aucun serveur extérieur et ne dépose aucun cookie.
  Avant le clic, le cadre affiche un plan schématique dessiné en CSS.
- **Formulaire de contact** : il n'envoie rien à un serveur, il ouvre le logiciel
  de courrier avec le message déjà rempli.
- **Impression** : le bouton « Imprimer le CV » sort une version papier propre —
  noir sur blanc, sans les images des grilles, sur trois colonnes, en cinq pages.
- **Sans JavaScript**, tout le contenu reste lisible : aucune information n'est
  cachée derrière une animation.
- **Mouvement réduit** : si le système le demande, plus rien ne bouge.

---

## 4. En ligne

Adresse du CV : <https://manonvanbastelaer.magalicontrino.com>

Publié par **GitHub Pages** depuis la branche `main` du dépôt. Le fichier
`CNAME` à la racine réclame le sous-domaine&nbsp;; c'est lui qui dit à GitHub que
ce nom mène à ce dépôt. Ne le supprimez pas, sinon le site retombe sur
`magalicontrino.github.io/cvmanon/`.

Côté DNS, le sous-domaine passe par le wildcard `*.magalicontrino.com` déjà en
place chez GoDaddy. Un enregistrement explicite serait plus propre&nbsp;:
type `CNAME`, nom `manonvanbastelaer`, valeur `magalicontrino.github.io` — c'est
exactement ce que fait déjà `cv.magalicontrino.com`.

Avant de publier : la page rend public le nom complet, la photo, le téléphone et
l'email d'une mineure, et Google les indexera. Beaucoup de familles préfèrent
envoyer le lien directement aux restaurants plutôt que de le laisser trouvable —
ou garder le dépôt privé et n'envoyer qu'un PDF imprimé depuis le site. C'est
votre décision, mais elle se prend avant la mise en ligne, pas après.

---

## 5. Les fichiers

**Un détail à connaître si vous modifiez `style.css` ou `app.js`** : leurs liens
dans `index.html` portent un numéro de version (`?v=20260722a`). GitHub Pages dit
aux navigateurs de garder ces fichiers dix minutes en cache&nbsp;; sans ce numéro,
un visiteur peut se retrouver avec le nouveau HTML et l'ancienne feuille de
style, ce qui donne une page désarticulée. **Changez le numéro à chaque
modification de ces deux fichiers** — n'importe quelle valeur différente suffit.

```
index.html   le contenu — c'est ici qu'on modifie les textes
style.css    la mise en forme, commentée section par section
app.js       animations, filtre, visionneuse, plans, impression
favicon.ico  l'icône d'onglet — toque crème sur disque noir
assets/
  favicon.svg      la même icône, en vectoriel
  favicon-180.png  la même, pour l'écran d'accueil d'un iPhone
  fonts/           les trois polices (Bai Jamjuree, Raleway, Source Sans Pro)
  images/          le portrait, et les 20 images à remplacer par des photos
  pictos/          les 8 petits pictos de la liste des plats
```
