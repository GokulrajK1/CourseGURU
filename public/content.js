
function scrapeSelectSectionsPage() {

    const targetHash = "#Page_CSPSelectSectionTab";
    if (window.location.hash !== targetHash) { return null;}   

    const unitCode = document.querySelector('span.unit-code');
    const subject = document.querySelector('span.subject')
    const number = document.querySelector('span.number')

    return {
        course : "CROSS-CULTURAL COMPETENCY",
        type : "Course Code",
        data : unitCode.textContent + ":" + subject.textContent + ":" + number.textContent
    }

}

scrapeSelectSectionsPage();

  
  