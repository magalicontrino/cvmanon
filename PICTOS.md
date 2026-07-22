# Liste des pictogrammes à produire

28 pictos : 20 grandes images et 8 petits pictos de liste pour les plats.
Ceux en place viennent de game-icons.net et sont provisoires.

## Comment me les donner

**Le plus simple** : un fichier par ligne du tableau, **en SVG**, déposé dans
`assets/pictos/` sous le nom indiqué en 3ᵉ colonne. Je m'occupe de les poser sur
le fond du site, à la bonne taille et à la bonne couleur.

- **Forme pleine, noire, sur fond transparent.** Pas de contour, pas de gris, pas
  de dégradé : une silhouette. Tout le site est clair, elles restent noires
  partout.
- **Carré**, idéalement 512 × 512.
- Le tracé doit remplir le carré : pas de marge intérieure, je la gère.

Si vous préférez livrer des images finies plutôt que des pictos nus, déposez-les
directement dans `assets/images/` sous le nom de la 2ᵉ colonne, au format
1600 × 1067.

Dès qu'un picto game-icons est remplacé, dites-le moi. Quand ils seront tous
partis, le crédit CC BY en pied de page pourra disparaître avec eux.

---

## Techniques — 14 pictos

| # | Fichier | Nom du picto | Sujet à dessiner |
|---|---|---|---|
| 01 | `technique-01` | `taillages` | Un ou plusieurs couteaux de cuisine, ou un couteau sur une planche |
| 02 | `technique-02` | `sauces` | Une casserole avec sa queue |
| 03 | `technique-03` | `cuissons` | Un gril, une poêle, ou une cocotte sur le feu |
| 04 | `technique-04` | `poisson-volaille` | Un poisson entier, ou une volaille prête à rôtir |
| 05 | `technique-05` | `dressage` | Une assiette sous cloche, vue de côté |
| 06 | `technique-06` | `mise-en-place` | Une liste cochée, ou des bacs alignés |
| 07 | `technique-07` | `pates` | Un rouleau à pâtisserie |
| 08 | `technique-08` | `cremes` | Un fouet |
| 09 | `technique-09` | `chocolat` | Une praline, un bonbon de chocolat |
| 10 | `technique-10` | `couvert` | Un couvert dressé : fourchette, couteau, cuillère |
| 11 | `technique-11` | `service` | Une sonnette de comptoir, ou un plateau de service |
| 12 | `technique-12` | `flambage` | Une flamme |
| 13 | `technique-13` | `commande` | Un carnet de commande, ou un bloc et un crayon |
| 14 | `technique-14` | `boissons` | Un verre à vin, ou une bouteille et un verre |

## Plats préférés — 8 pictos

*Petits pictos de liste. Les plats sont ceux de la carte de la Brasserie des Artistes.*

| # | Fichier | Nom du picto | Sujet à dessiner |
|---|---|---|---|
| 01 | `plat-01` | `crevette` | Une crevette grise |
| 02 | `plat-02` | `fromage` | Une pointe de fromage |
| 03 | `plat-03` | `pates` | Un bol de pâtes, ou des tagliatelles |
| 04 | `plat-04` | `entrecote` | Une pièce de bœuf, vue de côté |
| 05 | `plat-05` | `jambonneau` | Un jambonneau, ou un jarret |
| 06 | `plat-06` | `burger` | Un hamburger |
| 07 | `plat-07` | `mousse` | Une coupe de dessert, ou une verrine |
| 08 | `plat-08` | `dame-blanche` | Une glace, ou une coupe glacée |

Ceux-là sont plus petits que les autres à l'écran (2 rem) : évitez les détails
fins, ils disparaîtront. Ils vont dans `assets/pictos/`, pas dans
`assets/images/`.

## Formation — 3 pictos

| Fichier | Nom du picto | Sujet à dessiner |
|---|---|---|
| `formation-01` | `ecole` | Un cuisinier en tenue, ou une toque |
| `formation-02` | `hygiene` | Un thermomètre, ou un flocon pour la chaîne du froid |
| `formation-03` | `restaurant` | Des convives autour d'une table, ou une salle dressée |

## Expérience — 3 pictos

| Fichier | Nom du picto | Sujet à dessiner |
|---|---|---|
| `experience-cuisine` | `marmite` | Une marmite, ou un piano de cuisine |
| `experience-salle` | `noeud-papillon` | Un nœud papillon, ou une cravate |
| `experience-stock` | `stock` | Un diable, une palette, ou des cartons empilés |

---

## Et les photos ?

Les pictos ne sont qu'une étape. Les vraies photos de Manon en tenue restent ce
qui fera la différence auprès d'un patron. La cascade est prévue pour ça : dès
qu'un `technique-01.jpg` existe dans `assets/images/`, il passe devant le picto,
sans qu'on touche à quoi que ce soit d'autre. Voir `A-LIRE.md`.
