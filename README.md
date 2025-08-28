# 🤖 ASENA_MD

ASENA_MD WhatsApp basé sur WhatsAsena, écrit par [DARLING HINUGERA](https://github.com/Darling237221).

---

## 📝 Sommaire

- [Console stylée et diagnostic rapide](#console-stylée-et-diagnostic-rapide)
- [Types de plugins](#types-de-plugins)
- [Exemples de commandes](#exemples-de-commandes)
- [Installation et configuration](#installation-et-configuration)
- [Déploiement en production](#déploiement-en-production)
- [Sauvegarde & sécurité](#sauvegarde--sécurité)
- [Monitoring & logs](#monitoring--logs)
- [Mises à jour](#mises-à-jour)
- [Dépannage](#dépannage)
- [Checklist avant production](#checklist-avant-production)
- [Exemple de config.env](#exemple-de-configenv)
- [Remerciements](#remerciements)
- [Support / Contact](#support--contact)

---

# Console stylée et diagnostic rapide

Lors du démarrage, le bot affiche des messages colorés et explicites dans la console pour chaque étape :

- 🔧 Chargement des utilitaires (modules internes)
- 📦 Chargement des plugins internes (SQL)
- 🌐 Chargement des plugins externes (téléchargés dynamiquement)
- 🧩 Chargement des plugins locaux (dans le dossier plugins)

Chaque succès est affiché en vert avec un emoji ✔️, chaque échec en rouge avec ❌, et chaque étape en cyan ou jaune pour la lisibilité.

Cela permet de repérer immédiatement si un utilitaire ou un plugin ne se charge pas, et d’identifier la source du problème (nom du module ou du plugin concerné).

**Exemple :**
```bash
🔧 Chargement des utilitaires...
✅ Utilitaires chargés avec succès.
📦 Chargement des plugins internes (SQL)...
  ✔️ Plugin SQL chargé : filters.js
  ✔️ Plugin SQL chargé : plugin.js
✅ Plugins internes (SQL) chargés.
🌐 Chargement des plugins externes...
⬇️ Téléchargement plugin externe : memes
  ✔️ Plugin externe chargé : memes
🧩 Chargement des plugins locaux...
  ✔️ Plugin local chargé : memes.js
✅ Plugins externes et locaux chargés.
```
En cas d’erreur, le message s’affiche en rouge avec le nom du module ou plugin concerné.

---

# Types de plugins

Le bot supporte trois types de plugins :

- **Plugins internes (SQL)** : scripts dans `plugins/sql/` chargés automatiquement au démarrage. Ils gèrent la persistance et les fonctionnalités de base.
- **Plugins externes** : téléchargés dynamiquement depuis une URL (stockée en base de données), puis chargés. Pratique pour ajouter des fonctionnalités sans redéployer le bot.
- **Plugins locaux** : scripts `.js` placés dans le dossier `plugins/`, chargés à chaque démarrage. Idéal pour tes propres ajouts rapides.

> ⚠️ **Sécurité** : N’installe que des plugins de sources fiables. Un plugin malveillant peut compromettre ton bot ou tes données.

---

# Exemples de commandes

<details>
<summary><strong>Voir la liste des commandes</strong></summary>
<p>

| Actif | Commandes de groupe |
| :---: | :------------------ |
| ✔️    | Kick                |
| ✔️    | Tag                 |
| ✔️    | Add                 |
| ✔️    | Warn                |
| ✔️    | Vote                |
| ✔️    | Invite              |
| ✔️    | Revoke              |
| ✔️    | Demote              |
| ✔️    | Promote             |
| ✔️    | Banbye              |
| ✔️    | Goodbye             |
| ✔️    | Welcome             |
| ✔️    | Schedule            |
| ✔️    | Auto-mute           |
| ✔️    | Mute/Unmute         |
| ✔️    | Common/Diff         |

| Actif | Commandes de téléchargement |
| :---: | :-------------------------- |
| ✔️    | Saavn                       |
| ✔️    | Upload                      |
| ✔️    | Yta/Ytv                     |
| ✔️    | Unsplash                    |
| ✔️    | Mediafire                   |
| ✔️    | Pinterest                   |
| ✔️    | SoundCloud                  |
| ✔️    | TikTok video                |
| ✔️    | Twitter video               |
| ✔️    | Facebook video              |
| ✔️    | Instagram story             |
| ✔️    | YouTube audio/video         |
| ✔️    | Instagram video/image       |

| Actif | Commandes diverses      | Usage                        |
| :---: | :---------------------- | :--------------------------- |
| ✔️    | Qr                      | Lit un QR code               |
| ✔️    | Ss                      | Capture d’écran web          |
| ✔️    | Url                     | Récupère l’URL d’un média    |
| ✔️    | Trt                     | Traduit des messages         |
| ✔️    | Mp3                     | Vidéo en mp3                 |
| ✔️    | Txt                     | Image en texte               |
| ✔️    | Afk                     | Absent du clavier            |
| ✔️    | Cut                     | Coupe un mp3                 |
| ✔️    | Pdf                     | Images en pdf                |
| ✔️    | Mp4                     | Sticker en vidéo             |
| ✔️    | Take                    | Change le pack sticker info  |
| ✔️    | Wiki                    | Recherche Wikipedia          |
| ✔️    | Meme                    | Texte sur photo              |
| ✔️    | Trim                    | Coupe une vidéo              |
| ✔️    | Find                    | Trouve une chanson           |
| ✔️    | Attp                    | Sticker texte coloré         |
| ✔️    | Alive                   | Vérifie si le bot est actif  |
| ✔️    | Whois                   | Infos groupe ou individu     |
| ✔️    | Movie                   | Infos film                   |
| ✔️    | Merge                   | Fusionne des vidéos          |
| ✔️    | Voice                   | Voix en mp3                  |
| ✔️    | Topdf                   | Document en pdf              |
| ✔️    | Emoji                   | Emoji en sticker             |
| ✔️    | Lydia                   | Chat IA automatique          |
| ✔️    | Sticker                 | Photo/vidéo en sticker       |
| ✔️    | Reverse                 | Inverse audio/vidéo          |
| ✔️    | Unvoice                 | Audio en voix                |
| ✔️    | Wasted                  | Effet "Wasted"               |
| ✔️    | Trigged                 | Effet "Triggered"            |
| ✔️    | Forward                 | Transfert de message         |
| ✔️    | Compress                | Compresse une vidéo          |
| ✔️    | Google                  | Recherche image inversée     |
| ✔️    | Upload                  | Télécharge depuis une URL    |
| ✔️    | Weather                 | Affiche la météo             |
| ✔️    | Getjids                 | Liste les jids des chats     |
| ✔️    | Removebg                | Supprime le fond d’une image |
| ✔️    | Setabout                | Définit la bio WhatsApp      |
| ✔️    | Setstatus               | Définit le statut WhatsApp   |
| ✔️    | Pitch/low/bass          | Effets audio                 |
| ✔️    | Histo/vector/aves       | Audio en vidéo               |
| ✔️    | Block/unblock           | Bloque/débloque un membre    |
| ✔️    | Broadcast               | Diffusion personnalisée      |

</p>
</details>

---

# Installation et configuration

## 1) Prérequis

- Node.js LTS (≥ 18 recommandé) : `node -v`
- npm (ou yarn) : `npm -v`
- Git (pour cloner le repo)
- Base de données (SQLite par défaut, MySQL/Postgres possible)
- Accès internet sortant (pour WhatsApp)

## 2) Installer le projet

```bash
git clone <ton-repo> whatsapp-bot
cd whatsapp-bot
npm install
```

## 3) Configuration (`config.env` ou `config.js`)

Exemple minimal :

```
ASENA_SESSION=            # Laisser vide pour appairage manuel
PAIR_NUMBER=              # ex. 237676xxx (laisser vide pour QR)
NODE_ENV=production
DEBUG=false
MIGRATE_SESSIONS=false
```

## 4) Générer ou récupérer la session

**A. Appairage par numéro (sans QR) :**
- Lance `node bot.js`, entre le numéro → WhatsApp donne un code à saisir dans l’app mobile.

**B. Générer une StringSession :**
- Exécute `node make_string_session_no_qr.js`
- Copie la valeur dans `ASENA_SESSION` de ton `config.env` ou `config.js`.

> ℹ️ La version améliorée du script sérialise correctement Buffer/Uint8Array en base64 pour éviter les erreurs courantes.

## 5) Démarrer le bot

```bash
node bot.js
# ou
npm start
```

Pour migrer d’anciennes sessions :

```bash
MIGRATE_SESSIONS=true node bot.js
```

---

# Déploiement en production

## a) Avec PM2

```bash
npm i -g pm2
pm2 start bot.js --name whatsapp-bot --watch
pm2 logs whatsapp-bot
pm2 save
pm2 startup
```

## b) Avec systemd (Debian/Ubuntu)

Créer `/etc/systemd/system/whatsapp-bot.service` :

```ini
[Unit]
Description=WhatsApp Bot
After=network.target

[Service]
Type=simple
User=botuser
WorkingDirectory=/home/botuser/whatsapp-bot
ExecStart=/usr/bin/node /home/botuser/whatsapp-bot/bot.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Puis :

```bash
systemctl daemon-reload
systemctl enable whatsapp-bot
systemctl start whatsapp-bot
journalctl -u whatsapp-bot -f
```

## c) Avec Docker

Exemple `Dockerfile` :

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "bot.js"]
```

Exemple `docker-compose.yml` :

```yaml
version: "3"
services:
  bot:
    build: .
    volumes:
      - ./auth:/usr/src/app/auth
      - ./logs:/usr/src/app/logs
    environment:
      - NODE_ENV=production
      - ASENA_SESSION=${ASENA_SESSION}
    restart: unless-stopped
```

---

# Sauvegarde & sécurité

- **Ne commite jamais** `./auth` ni `config.env` contenant `ASENA_SESSION`.
- Sauvegarde régulièrement la base de données (sqlite) et le dossier `./auth`.
- Lance le bot sous un utilisateur non root.
- Chiffre tes sauvegardes et limite l’accès SSH.

> ⚠️ **Rappel sécurité** : Toute fuite de session ou de fichier sensible peut compromettre ton compte WhatsApp. Vérifie toujours la provenance des plugins et garde tes accès privés.

---

# Monitoring & logs

- PM2 gère les logs et redémarre automatiquement le bot.
- Les logs sont dans `logs/bot.log` (pino). Configure une rotation si besoin.
- Ajoute un healthcheck HTTP si tu utilises un load balancer.

---

# Mises à jour

- `git pull`, `npm ci`, puis redémarrage via PM2 / systemd / docker-compose.
- Teste d’abord sur une instance de préproduction avant de mettre à jour Baileys ou d’autres dépendances.

---

# Dépannage

### a) Erreur WebSocket : `list[1] must be Buffer or Uint8Array`

- Normalise la session : `MIGRATE_SESSIONS=true node bot.js`
- Vérifie que `ASENA_SESSION` est bien une base64 d’un JSON sérialisé.

### b) `safeSendMessage erreur: Timed Out` ou `Connection Closed`

- Vérifie la connexion réseau et la validité de la session. PM2/systemd redémarrera le bot si besoin.

### c) `message.sendMessage is not a function`

- Utilise `msg.sendMessage(...)` uniquement après enrichissement du message (`enhanceMessage`).

---

# Checklist avant production

- [ ] Node et npm installés
- [ ] `config.env` / `config.js` correct (DB, PAIR_NUMBER / ASENA_SESSION)
- [ ] Session testée localement : `node bot.js` → connecté
- [ ] Activer `MIGRATE_SESSIONS` si tu as des anciennes sessions
- [ ] Configurer PM2 ou systemd / Docker
- [ ] Backups planifiés pour `./auth` et DB
- [ ] Logs surveillés

---

# Exemple de config.env

```env
ASENA_SESSION=
PAIR_NUMBER=
NODE_ENV=production
DEBUG=false
CLR_SESSION=false
DATABASE_URL=./whatsasena.db
# SEND_READ=false
# LANGUAGE=FR
# HANDLERS=^[.]
```

Ajoute bien `config.env` à ton `.gitignore`.

---

# Remerciements

- [Yusuf Usta](https://github.com/Quiec) pour [WhatsAsena](https://github.com/yusufusta/WhatsAsena)
- [@adiwajshing](https://github.com/adiwajshing) pour [Baileys](https://github.com/adiwajshing/Baileys)
- [Limule hinugera](https://wa.me/237673278970)pour le générateur de session et les clés API
---

# Support / Contact

Pour toute question, bug ou suggestion :
- [Groupe TeleGram](https://t.me/free_data_tools)
- [Issues GitHub](https://github.com/darling237221/ASENA_MD/issues)
- [Shika](https://wa.me/237673278970)
- [Chaîne WhatsApp](https://whatsapp.com/channel/0029VajBry5FnSzAqZxMhi1i)
- [Groupe WhatsApp](https://chat.whatsapp.com/G0lLULzahLN7XkWcGHliV7?mode=ems_copy_c)
