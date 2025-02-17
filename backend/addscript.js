import axios from "axios";
import fs from "fs/promises";

const callAddRoute = async () => {
  try {
    // Read the JSON data from the file
    const data = await fs.readFile("courses.json", "utf-8");
    const jsonData = JSON.parse(data);

    // Iterate over each course and its instructors
    for (const course of jsonData.courses) {
      const { course_code, instructors } = course;

      for (const instructor of instructors) {
        try {
          const response = await axios.post("http://localhost:8240/api/class/add", {
            className: course_code,
            instructor: instructor
          });
          console.log(`Successfully added: ${course_code} - ${instructor}`, response.data);
        } catch (error) {
          console.error(`Failed to add: ${course_code} - ${instructor}`, error.response?.data || error.message);
        }
      }
    }
  } catch (error) {
    console.error("Error reading or processing courses.json:", error.message);
  }
};

// Call the function
callAddRoute();
