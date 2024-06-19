# Utiliser une image Node.js comme image de base
FROM node:16.20

# Définir le répertoire de travail dans le conteneur Docker
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code source de l'application dans le conteneur Docker
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Définir la commande pour exécuter l'application
CMD [ "npm", "run", "start" ]
