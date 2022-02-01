# Herbari del Bages - Font i Quer

Web de l'herbari de la flora del Bages que va fer Pius Font i Quer entre 1909 i 1912. Treball fet per a l'ICHN Bages. Online a [https://herbarifontiquer.cat](https://herbarifontiquer.cat)

## Obtenir fotos
 - Baixar les fotos del Google drive i col·locar-les al directori `public/original`
 - Reanomenar les fotos amb l'script a `src/scripts/rename.ts`. Fa falta fer alguns canvis en el `package.json` per a que funcioni l'script.
 - Redimensionar totes les fotos a 1200x1600 i posarles a `public/images-1200`.

## Obtenir dades
 - Actualitzar l'arxiu `public/herbari.csv` a partir de l'`.xlsx` del Google drive.

## Baixar dependències
```bash
npm install
```

## Desenvolupar
```bash
quasar dev
```

### Build
```bash
quasar build
tar -cvzf herbari.tar.gz dist docker docker-compose.yml
```
### Run production
```bash
mkdir herbari
mv herbari.tar.gz herbari/
cd herbari
tar -xvzf herbari.tar.gz
rm herbari.tar.gz
docker-compose up -d
```

### Update code after build
```
rsync -r dist/spa webadmin@herbarifontiquer.cat:/opt/herbari/dist 
```
### Auto-update herbari.csv from git
```
$ sh docker/update-csv.sh
``` 
or visit http://herbarifontiquer.cat:9000/hooks/herbari-csv



