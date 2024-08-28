# QuickHomeServices
## Installation de Node.js sur Ubuntu

Avant de lancer l'application, vous devez installer Node.js. Voici comment le faire sur Ubuntu :

### Étape 1 : Mettre à Jour les Paquets

Ouvrez un terminal et mettez à jour les listes de paquets :

```bash
sudo apt update
```

### Étape 2 : Installer Node.js et npm
#### Installer Node.js à partir des Dépôts Officiels d'Ubuntu

Cette méthode installe la version fournie par les dépôts officiels d'Ubuntu, qui peut ne pas être la version la plus récente :

```bash
sudo apt install nodejs npm
```
### Vérifiez l'Installation
Assurez-vous que Node.js et npm sont correctement installés en vérifiant leurs versions :

```bash

node -v
npm -v
```

### Installation de l'Application

Après avoir installé Node.js, suivez les instructions ci-dessous pour installer et lancer l'application :

    Clonez le dépôt si ce n'est pas déjà fait :

```bash
    git clone https://github.com/Masnssen/QuickHomeServices.git
    cd <nom-du-repository>
```

Installez les dépendances :

```bash
npm install
```

Démarrez l'application :

```bash
npm start
```


## Installation du serveur sur un environement virtuel
### Créez un environnement virtuel
sudo apt install python3.10-venv
python3 -m venv venv

### Activez l'environnement virtuel
#### Sur Windows :
venv\Scripts\activate
#### Sur macOS/Linux :
source venv/bin/activate

### Installez Flask et les autres dépendances
pip install Flask flask-mysqldb flask-bcrypt flask-jwt-extended
pip install flask-cors


## Ya deux sous dossier le premier c'est le back-end y'aura un readme file pour les étapes a suivre pour l'installation et 
## Et le deuxième le front-end en React y'aura aussi un readme file pour les étapes d'installation. 