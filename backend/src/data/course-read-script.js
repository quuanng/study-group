/**
 * Courses CSV -> Filtered Courses JSON
 */

import fs from 'fs'
import csv from 'csv-parser'

const inputFile = '' // Replace with filepath of the courses csv file
const outputFile = ''

const records = new Map()

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { SUBJECT, CATALOG_NBR, FULL_NAME, DESCR, GRADE_HDCNT } = row
    const count = parseInt(GRADE_HDCNT, 10) || 0
    
    if (FULL_NAME) {
      if (records.has(FULL_NAME)) {
        records.get(FULL_NAME).COUNT += count
      } else {
        records.set(FULL_NAME, { SUBJECT, CATALOG_NBR, FULL_NAME, DESCR, COUNT: count })
      }
    }
  })
  .on('end', () => {
    fs.writeFile(outputFile, JSON.stringify([...records.values()], null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON:', err)
      } else {
        console.log('Filtered JSON file successfully written.')
      }
    })
  })
  .on('error', (err) => console.error('Error reading CSV:', err))
