# supermvp


 This project is a web application built with Next.js that allows users to upload PDF files, extract text from them, and interact with an AI service using selected text as a prompt. The project leverages the pdfjs-dist library for PDF text extraction and integrates with an AI service for processing selected text prompts.

## Features
    PDF Upload: Users can upload PDF files directly through the web interface.
    Text Extraction: Extract text from uploaded PDFs using the pdfjs-dist library.
    Text Selection: Users can select any portion of the extracted text.
    AI Interaction: The selected text can be sent as a prompt to an AI service, and the response can be used as needed (e.g., for editing or inserting into the document).
    User-friendly Interface: The application provides an intuitive interface for uploading files, selecting text, and interacting with the AI.


## Install Dependecies
```
npm install
```

## Start the dev server
```
 npm run dev
```
 The application will be available at `http://localhost:3000`


## Project Structure
- `/components`: Contains reusable React components, such as the Modal for AI interaction and the text selection component.

- `/pages`: Contains the main pages of the application, and the API routes.
- `/hooks`: Custom React hooks for handling complex state management and logic, like useModal.
- `/public`: Static assets such as images and icons.
- `/styles`: Global styles and component-specific styles using CSS and Tailwind CSS.
## Libraries and Tools 
- Next.js: React framework for server-side rendering and building static web applications.
- React: JavaScript library for building user interfaces.
- pdfjs-dist: Library for extracting text and other content from PDF files.
- Tailwind CSS: Utility-first CSS framework for styling the application.
- AI Integration : Due to rate limits or API usage restrictions, the actual OpenAI API service is mocked in this project. You may need to purchase - additional quota or configure the API key correctly to enable full functionality. `This project is just for the deomnstration purposes to shocase the - frontend skills`

## Development Environment
- NodeJS - v20.17.0
- OS - Ubuntu 22