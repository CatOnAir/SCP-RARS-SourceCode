// List of available PDFs in the PDFFiles directory
const availablePDFs = [
    'report_template_01.pdf',
    'report_template_02.pdf',
    'report_template_03.pdf',
    'report_template_04.pdf',
    'report_template_05.pdf'
];

// Function to select random PDF and store it
function selectRandomPDF() {
    const randomIndex = Math.floor(Math.random() * availablePDFs.length);
    const selectedPDF = availablePDFs[randomIndex];
    localStorage.setItem('selectedPDF', selectedPDF);
    return selectedPDF;
}

// Function to get the stored PDF filename
function getStoredPDF() {
    return localStorage.getItem('selectedPDF');
}
