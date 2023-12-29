FROM debian

# Installation de nginx
RUN apt-get update && apt-get install -y nginx

# Met a l'heure le container
ENV TZ=Europe/Paris 
RUN apt install tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Ajoute les differents fichier de conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY site.conf /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/

# Ajoute le bulid
COPY front/build /usr/share/nginx/html

# Commande de lancement de nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]