# Party Voting Web Application

This project is a simple web application that demonstrates asynchronous programming in JavaScript using HTML5 Drag and Drop functionality and Local Storage. It allows users to drag and drop senators into their respective voting areas based on party affiliation, and the voting data is saved in the browser's local storage.

## Project Structure

The project consists of the following files:

- `partyWise.html`: HTML file containing the structure of the web page.
- `partyWise.js`: JavaScript file containing the logic for fetching senator data asynchronously, implementing drag-and-drop functionality, and managing local storage.
- `partyList.xml`: XML file containing the list of senators and their party affiliations.
- `README.md`: This file providing information about the project.
- `License.txt`: It contains details about the license.

## Setup

To run this project locally, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the project directory
3. Open the partyWise.html file in your web browser.

## Usage

Once the project is set up and the partyWise.html file is opened in a web browser, the web page will display a list of senators fetched asynchronously from the partyList.xml file. Users can drag and drop the senators into two separate areas, one for Democrats and one for Republicans. The senators' vote status is updated in the browser's local storage under the key senators_yourLastName.

When the page is reloaded, the voting data is automatically restored from local storage.

## Drag and Drop Rules

1. Democrats can only be dropped into the Democrats area.
2. Republicans can only be dropped into the Republicans area.
3. Senators who have already voted cannot be dragged and dropped again.

## Local Storage

The senator list is first fetched from partyList.xml using an AJAX call and stored in the local storage.
On page reload, if the data exists in local storage, it is loaded from there instead of making another AJAX call.
The local storage key is named senators_yourLastName (replace yourLastName with your actual last name).

## Persistence

When the application is refreshed or reloaded, the senators' drag-and-drop actions persist from the last session using local storage.

## Author

[AARTHI NANDHAKUMAR]

## License

This project is licensed under the MIT License - see the [LICENSE](License.txt) file for details.
