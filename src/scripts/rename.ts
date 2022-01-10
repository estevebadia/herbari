// Usage: 
// 1) Add "type"="module" in package.json
// 2) Add "target": "es2017" in tsconfig.json/compilerOptions
// 3) run node --loader="ts-node/esm" .\src\scripts\rename.ts

import slugify from 'slugify'
import fs from 'fs'

const path = 'C:/Users/Personal/projects/herbari/public/original'
const dest = 'C:/Users/Personal/projects/herbari/public/images'

function rename() {
  fs.mkdirSync(dest, {recursive: true});
  fs.readdirSync(path).forEach(f1 => {
    f1 = path + '/' + f1
    if (fs.lstatSync(f1).isDirectory()) {
      fs.readdirSync(f1).forEach(f2 => {
        f2 = f1 + '/' + f2
        if (fs.lstatSync(f2).isDirectory()) {
          fs.readdirSync(f2).forEach(f3 => {
            f3 = f2 + '/' + f3
            if (fs.lstatSync(f3).isDirectory()) {
              fs.readdirSync(f3).forEach(f4 => {
                f4 = f3 + '/' + f4
                if (fs.lstatSync(f4).isDirectory()) {
                  fs.readdirSync(f4).forEach(filename => {
                    const renamed = slugify(filename)
                    fs.copyFileSync(f4 + '/' + filename, dest + '/' + renamed)
                    console.log('.')
                  })
                }
              })
            }
          })
        }
      })
    }
  });
}

console.log('Start:')
rename()
console.log('Done!')