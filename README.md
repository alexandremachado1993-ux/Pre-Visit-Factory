# Pré-visite usine – Auxiliar Conservera

Application web de **pré-visite usine (homologation phase 0)** chez les nouveaux clients : questionnaire Oui / Peut-être / Non, commentaires et photos par question, export **PDF A4** en français, anglais, espagnol ou portugais.

Installable sur téléphone et tablette (application web progressive), utilisable **hors connexion** après une première ouverture en ligne.

## Fonctionnalités

- 15 chapitres, 55 questions (réception → stockage produit fini, décision phase 0 / PSW)
- Réponses colorées : Oui (vert), Peut-être (jaune), Non (rouge)
- Photos et commentaire par question, notes et photos par chapitre, questions ajoutées sur place
- Liste des intervenants (fonction + nom)
- Interface et PDF en 4 langues (FR, EN, ES, PT) ; la langue du PDF est demandée à la validation
- À la validation : confirmation que les questions sans réponse sont « non nécessaires », sinon retour à la première question sans réponse
- Brouillon enregistré automatiquement sur l’appareil

## Structure

```
index.html              Application complète (HTML, CSS, JavaScript)
manifest.webmanifest    Déclaration de l’application installable
sw.js                   Service worker : mise en cache et fonctionnement hors connexion
image-application/      Icône d’installation (écran d’accueil)
  icone-installation-192.png
  icone-installation-512.png
image-document/         Logo de l’en-tête et du PDF
  logo-ac.png
```

## Déploiement

Hébergement : **Netlify**, relié à ce dépôt GitHub.

- Commande de build : *(vide)*
- Répertoire de publication : *(vide)*, c’est-à-dire la racine du dépôt

Chaque modification envoyée sur la branche principale est publiée automatiquement.

## Mettre à jour l’application

1. Modifier les fichiers concernés.
2. **Toujours** incrémenter la version dans `sw.js` (`previsite-v6` → `previsite-v7`), sinon les appareils gardent l’ancienne version en cache.
3. Envoyer les fichiers sur GitHub.

## Changer une image

Remplacer le fichier **en gardant exactement le même nom** dans le bon dossier, puis incrémenter la version de `sw.js`. Aucune modification du code n’est nécessaire.

Après un changement d’icône d’installation, désinstaller puis réinstaller l’application sur les appareils (le lanceur Android ou iOS ne met pas toujours l’icône à jour seul).

## Données

Aucune donnée n’est envoyée sur un serveur : réponses, commentaires et photos restent dans le navigateur de l’appareil (IndexedDB) jusqu’à l’export du PDF.

## Limites connues

- Le brouillon est propre à chaque appareil (pas de synchronisation entre téléphone et tablette).
- Les textes saisis (commentaires, notes, questions ajoutées) ne sont pas traduits.
- Ouvert en local (`file://`), le PDF est généré sans logo ; en ligne, il est complet.
