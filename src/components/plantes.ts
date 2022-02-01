import { parse, ParseResult } from 'papaparse'
import slugify from 'slugify'

export interface Planta {
  code: string
  index: string
  tom: string
  mostra: string
  nomFQ: string
  famFQ: string
  nom: string
  fam: string
  nomVulgar: string
  img1200: string
  img: string
  search: string
  linkMNB: string
  comentari: string
}

// Global cache
let plantes: Planta[]
let index: Map<string, number>

export async function getPlantes(): Promise<Planta[]> {
  return new Promise((resolve, reject) => {
    if (plantes !== undefined) {
      //Copy array, but not inner objects.
      resolve([...plantes])
      return
    }
    // get herbari CSV file.
    parse('/herbari.csv', {
      download: true,
      complete: function(results: ParseResult<string[]>) {
        // Handle errors
        if (results.errors && results.errors.length > 0) {
          reject(results.errors)
        }
        // Handle result
        index = new Map<string, number>()
        plantes =  [] as Planta[]

        const rows: string[][] = results.data
        rows.forEach((record, i) => {
          // skip headers.
          if (i == 0) {
            return
          }
          // skip comments
          if ((record.length < 7) || (record[6] == '')) {
            return
          }
          // skip rows with "amagar"=true
          if (record.length >= 11 && record[10] && 'true' == record[10].toLowerCase()) {
            return
          }
          const item = {
            index: record[0],
            tom: record[1],
            mostra: record[2],
            nomFQ: record[3],
            famFQ: record[4],
            nom: record[5],
            fam: record[6],
            nomVulgar: record[7],
            linkMNB: record[8],
            comentari: record[9]
          } as Planta
          item.code = slugify(item.nomFQ)
          item.img = '/images/' + item.code + '.jpg'
          item.img1200 = '/images-1200/' + item.code + '.jpg'
          item.search = normalizeQuery([item.nomFQ, item.nom, item.fam, item.famFQ, item.nomVulgar].join(' '))
          plantes.push(item)
          index.set(item.code, i-1)
        })
        resolve([...plantes])
      }
    });
  })
}

export async function getPlanta(code: string): Promise<Planta> {
  plantes = await getPlantes()
  const i = index.get(code)
  if (i !== undefined) {
    return plantes[i]
  }
  throw `Could not find ${code}.`;
}

export function normalizeQuery(text: string): string {
  return slugify(text, {
    lower: true,
    trim: true
  });
}


