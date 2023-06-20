#!/bin/bash

# Mettre à jour le code source
git pull

# Construire l'image Docker
docker build --no-cache -t loc-mns-front .

# Arreter le conteneur existant
docker stop conteneur-loc-mns-front

# Supprimer le conteneur existant
docker rm conteneur-loc-mns-front

# Lancer un nouveau conteneur
docker run -d --name=conteneur-loc-mns-front -p 4200:80 loc-mns-front
