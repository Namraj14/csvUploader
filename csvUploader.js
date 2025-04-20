import { LightningElement } from 'lwc';
import uploadCSV from '@salesforce/apex/CSVUploader.uploadCSV';

export default class CsvUploader extends LightningElement {
    errorMessage = '';
    successMessage = '';

    handleFileUpload(event) {
        const file = event.target.files[0]; // Get the first file selected
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const csvContent = reader.result; // Get file content as text
                uploadCSV({ csvContent }) // Call Apex method
                    .then(() => {
                        this.successMessage = 'CSV uploaded successfully!';
                        this.errorMessage = '';
                    })
                    .catch((error) => {
                        this.errorMessage = 'Error uploading CSV: ' + error.body.message;
                        this.successMessage = '';
                    });
            };

            reader.readAsText(file); // Read file content as text
        }
    }
}