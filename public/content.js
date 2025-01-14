function scrapeCourseNames() {
    console.log("Function scrapeCourseNames called.");

    // Find all elements with the class "title" (course names)
    const courseElements = document.querySelectorAll('span.title');
    if (!courseElements.length) {
        console.error("No course names found! Check the selector.");
        return [];
    }
    console.log(`Found ${courseElements.length} courses.`);

    // Initialize an array to store course data
    const courses = [];

    // Loop through each course element
    courseElements.forEach((courseElement, courseIndex) => {
        // Find the course name and code
        const courseName = courseElement?.textContent.trim() || "N/A";
        const courseCodeElement = courseElement.closest('.dijitTitlePane').querySelector('span[title="Course Number"]');
        const courseCode = courseCodeElement?.textContent.trim() || "Unknown";
        console.log(`Processing Course ${courseIndex + 1}: ${courseName} (${courseCode})`);

        // Find the associated dropdown container
        const dropdownContainer = courseElement.closest('.dijitTitlePane').querySelector('.dijitTitlePaneContentOuter');
        if (!dropdownContainer) {
            console.warn(`No dropdown content found for Course ${courseName}.`);
            courses.push({
                name: courseName,
                code: courseCode,
                sections: [] // Empty if no dropdown content
            });
            return;
        }

        // Find <tr> elements with dojoattachpoint="sectionMainArea"
        const sectionRows = dropdownContainer.querySelectorAll('tr[dojoattachpoint="sectionMainArea"]');
        if (!sectionRows.length) {
            console.warn(`No sections found for Course ${courseName}.`);
            courses.push({
                name: courseName,
                code: courseCode,
                sections: [] // Empty if no sections
            });
            return;
        }

        // Extract sections and their details
        const sections = Array.from(sectionRows).map((row, sectionIndex) => {
            // Extract details using specific title attributes
            const sectionElement = row.querySelector('td[title="Section Number"]');
            const statusElement = row.querySelector('td[title="Section Status"]');
            const indexElement = row.querySelector('td[title="Index Number"]');
            const meetingTimesElement = row.querySelector('td[title="Meeting Time"]');
            const instructorElement = row.querySelector('td[title="Instructor"]');

            const section = sectionElement?.textContent.trim() || "Unknown";
            const status = statusElement?.textContent.trim() || "Unknown";
            const index = indexElement?.textContent.trim() || "Unknown";

            // Parse meeting times (Meeting Time title tag)
            const meetingTimes = [];
            if (meetingTimesElement) {
                const weekdayElements = meetingTimesElement.querySelectorAll('td.weekday');
                const timeElements = meetingTimesElement.querySelectorAll('td.time');
                const locationElements = meetingTimesElement.querySelectorAll('td.location');
                const campusElements = meetingTimesElement.querySelectorAll('span.location3'); // Adjusted for campus

                const meetingCount = Math.max(
                    weekdayElements.length,
                    timeElements.length,
                    locationElements.length,
                    campusElements.length
                );

                for (let i = 0; i < meetingCount; i++) {
                    meetingTimes.push({
                        weekday: weekdayElements[i]?.textContent.trim() || "N/A",
                        time: timeElements[i]?.textContent.trim() || "N/A",
                        location: locationElements[i]?.textContent.trim() || "N/A",
                        campus: campusElements[i]?.textContent.trim() || "N/A",
                    });
                }
            }

            const professor = instructorElement?.textContent.trim() || "Unknown"; // Extract professor name

            return {
                section, // Updated variable name
                status,
                index,
                meetingTimes,
                professor, // Correctly extracted from the "Instructor" title
            };
        }).filter((section) => section !== null); // Exclude null sections

        // Add course and its sections to the courses array
        courses.push({
            name: courseName,
            code: courseCode,
            sections: sections,
        });
    });

    console.log("Scraping completed. Returning organized course data.");
    console.log("Final Scraped Courses Data:", JSON.stringify(courses, null, 2)); // Log the final data in JSON format
    return courses; // Return the array of course objects with sections and details
}
// Call the function to execute and store the result in a variable
scrapeCourseNames();

