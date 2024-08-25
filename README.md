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