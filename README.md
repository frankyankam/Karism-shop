# YANKI‑Tchoucka

**Plateforme e‑commerce de chaussures** intégrant une expérience de **réalité augmentée** (AR) pour essayer virtuellement les produits.

---

## 📖 Table des matières

1. [Présentation](#présentation)
2. [Fonctionnalités](#fonctionnalités)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration des variables d'environnement](#configuration-des-variables-denvironnement)
6. [Base de données & seed](#base-de-données--seed)
7. [Routes API](#routes-api)
8. [Frontend React](#frontend-react)
9. [Servir les images](#servir-les-images)
10. [Lancer le projet](#lancer-le-projet)
11. [Contribuer](#contribuer)
12. [Licence](#licence)

---

## Présentation

YANKI‑Tchoucka est une application full‑stack réalisée avec :

* **Backend :** Flask, SQLAlchemy, PostgreSQL, JWT, Flask‐Mail, Flask‐Migrate
* **Frontend :** React, Vite, Bootstrap, React‑Slick, MindAR.js pour AR

Cette plateforme permet aux utilisateurs de naviguer, ajouter des chaussures à leur panier, passer commande, et 👓 essayer les modèles en AR grâce au composant `<model-viewer>` ou MindAR.

---

## Fonctionnalités

* **Inscription & Connexion** (JWT)
* **Gestion du panier** (ajout, modification, suppression, vidage)
* **Consultation & création de commandes**
* **Réalité augmentée** : affichage 3D `.glb` et expérience AR
* **Réinitialisation de mot de passe** par email
* **Administration simplifiée** via endpoints REST

---

## Architecture

```
YANKI‑Tchoucka/
├── backend/                # API Flask
│   ├── app.py              # Création de l'app, routes globales
│   ├── auth.py             # Authentification
│   ├── products.py         # Routes produits
│   ├── cart.py             # Routes panier
│   ├── order.py            # Routes commandes
│   ├── models.py           # Définition des modèles SQLAlchemy
│   ├── extensions.py       # db, migrate, mail
│   ├── migrations/         # Migrations Alembic
│   └── static/image/       # Images produits
├── frontend/               # App React (Vite)
│   ├── public/             # Fichiers statiques
│   ├── src/
│   │   ├── api/            # services Axios
│   │   ├── components/     # Card, Modal, Navbar...
│   │   ├── pages/          # HomePage, Cart, Auth...
│   │   └── main.jsx        # Point d'entrée React
│   └── vite.config.js      # Configuration Vite
├── .env.example            # Fichier d'exemple des variables d'env
├── README.md               # Cette documentation
└── .gitignore
```

---

## Installation

### Prérequis

* Python 3.9+
* Node.js 16+
* PostgreSQL

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate         # Windows
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configuration des variables d'environnement

Copiez `.env.example` en `.env` dans le dossier `backend/` et renseignez :

```ini
DATABASE_URL=postgresql://user:****@localhost:5432/yanki_tchoucka
JWT_SECRET_KEY=une_cle_secrete
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre_email
MAIL_PASSWORD=votre_mdp_app
MAIL_USE_TLS=True
MAIL_USE_SSL=False
MAIL_DEFAULT_SENDER=votre_email
```

Pour le frontend, créez un fichier `.env` à la racine de `frontend/` :

```ini
VITE_API_URL=http://localhost:5000/api
```

---

## Base de données & seed

Initialisez et migrez :

```bash
flask db init
flask db migrate -m "Initial"
flask db upgrade
```

Puis lancez le seed (génère 10 clients, 20 produits, paniers & commandes aléatoires) :

```bash
python seed.py
```

---

## Routes API

| Méthode             | Endpoint                      | Description                      |
| ------------------- | ----------------------------- | -------------------------------- |
| GET                 | `/ping`                       | Vérifie que l'API tourne         |
| POST                | `/auth/register`              | Inscription client               |
| POST                | `/auth/login`                 | Authentification                 |
| GET                 | `/api/products/`              | Liste de tous les produits       |
| POST                | `/api/products/`              | Création d'un nouveau produit    |
| GET                 | `/api/cart/<client_id>`       | Récupère le panier d'un client   |
| POST                | `/api/cart/<client_id>/items` | Ajoute un item au panier         |
| PUT                 | `/api/cart/items/<item_id>`   | Met à jour la quantité d'un item |
| DELETE              | `/api/cart/items/<item_id>`   | Supprime un item du panier       |
| DELETE              | `/api/cart/<client_id>`       | Vide le panier                   |
| GET/POST/DELETE ... | `/api/orders/`                | Gestion des commandes            |

---

## Frontend React

* **Appel API** via Axios (`src/api/`) :

  * `products.js` : `fetchProducts()`
  * `cartServices.js` : `getCart()`, `addToCart()`...
* **Pages principales** :

  * `HomePage.jsx` : affichage des produits, slider, AR, ajout au panier
  * `Cart.jsx` : affichage et modification du panier
  * `Register.jsx`, `Login.jsx`, `ResetPassword.jsx`

---

## Servir les images

Placez vos images dans `backend/static/image/`. Elles seront disponibles à l'URL :

```
http://localhost:5000/image/<nom_fichier>  
```

Votre frontend doit alors charger :

```js
<img src={`http://localhost:5000/image/${filename}`} />
```

---

## Lancer le projet

### Lancer le backend

```bash
cd backend
flask run
```

### Lancer le frontend

```bash
cd frontend
npm run dev
```

Visitez ensuite :

* **Frontend :** [http://localhost:5173](http://localhost:5173)
* **Backend Ping :** [http://localhost:5000/ping](http://localhost:5000/ping)

---

## Contribuer

1. Forkez le projet
2. Créez une branche feature : `git checkout -b feature/nom-feature`
3. Commitez vos modifications : `git commit -m "feat: description courte"`
4. Pushez : `git push origin feature/nom-feature`
5. Ouvrez une Pull Request

---

## Licence

Ce projet est sous licence MIT. Voir `LICENSE` pour plus de détails.
