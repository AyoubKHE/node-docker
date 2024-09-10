# commandes exécuter par docker pour créer une image personnalisé et cette image elle va contenir toute l'application avec ces dépendances

# télécharger et utiliser une image de base depuis le dépot officiel de node sur docker hub
FROM node:18

WORKDIR /app

# copier le fichier package.json a /app qui est spécifier dans WORKDIR /app
# copier le package.json en premier apres tous les fichiers pour des raisons de performmance et de cache
# si on change pas dans package.json et on fais rebuild il va charger uniquement les fichiers changer depuis la coucher COPY . ./
COPY package.json ./

# RUN npm install

# on passe la valeur de NODE_ENV dans docker-compose.yml
ARG NODE_ENV 
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

#copier tous les fichier vers /app
COPY . ./

ENV PORT 3000

# listening on port 3000
EXPOSE $PORT

CMD ["node", "index.js"]