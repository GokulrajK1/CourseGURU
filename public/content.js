function scrapeCourseNames() {
    console.log("Function scrapeCourseNames called.");

    // Find all elements with the class "title"
    const courseNames = document.querySelectorAll('span.title');
    if (!courseNames.length) {
        console.error("No course names found! Check the selector.");
        return {};
    }
    console.log(`Found ${courseNames.length} course names.`);

    // Initialize an array to store course data
    const courses = [];

    // Loop through each course name and extract the text
    courseNames.forEach((el, index) => {
        const courseName = el?.textContent.trim() || "N/A"; // Extract course name text
        console.log(`Course ${index + 1}: ${courseName}`); // Log each course name

        // Store course data in the array as objects
        courses.push({
            id: index + 1,
            name: courseName
        });
    });

    console.log("Scraping completed. Returning course data.");
    return courses; // Return the array of course objects
}

// Call the function to execute and store the result in a variable

scrapeCourseNames();
