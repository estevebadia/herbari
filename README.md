# Herbari del Bages - Font i Quer

Web de l'herbari de la flora del Bages que va fer Pius Font i Quer entre 1909 i 1912. Treball fet per a l'ICHN Bages.

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

```
