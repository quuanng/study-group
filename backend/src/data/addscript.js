// Do not run - just kept here for the record - it adds all courses from a json file into the database

/*
import fs from "fs"
import axios from "axios"

const inputFile = ''
const apiUrl = ''

async function uploadToDatabase() {
  try {
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
    let count = 0
    for (const course of data) {
      try {
        await axios.post(apiUrl, {
          subject: course.SUBJECT,
          catalog_number: course.CATALOG_NBR,
          full_name: course.FULL_NAME,
          descr: course.DESCR,
          saves: 0 // Default value
        })
        count++
        console.log(`(${count}) Added: ${course.FULL_NAME}`)
      } catch (error) {
        console.error(`Error adding ${course.FULL_NAME}:`, error.response?.data || error.message)
      }
    }
    console.log(`Total courses added: ${count}`)
  } catch (err) {
    console.error('Error reading JSON file:', err)
  }
}

uploadToDatabase()
*/