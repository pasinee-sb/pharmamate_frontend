
# PharmaMate (Front-End) : A Comprehensive Medication Assistant 


## Key Features 

### Drug Label Search 
Retrieve detailed label information for drugs available in the US. including downloadable package inserts function powered by DailyMed and Open FDA APIs for reliable and up-to-date information.
### Updated Health Articles 
Get latest News: Regularly updated homepage with the most recent drug-related articles.
### AI-Powered Chatbot 
Get Drug Interactions and Vaccine Info: Get insights and guidance through an AI-driven chatbot, utilizing the ChatGPT Assistant API. 
### Medication Profile Management 
User Dashboard: After logging in, manage medication profiles with options to add, edit, or delete medications.
 Timeline Visualization: Track medication status updates and dates using ApexCharts for a clear view of medication timeline.
### Future Developments 
Health Journal: An upcoming feature to log symptoms and health experiences, enhancing user engagement and health tracking.

## Demo Link
 [PharmaMate Demo](https://www.youtube.com/watch?v=vqMhgQaoz9s)

## Live at
[PharmaMate](https://pharmamate.onrender.com/)


## Tech Stack

**Client:** React.js

## Tools and libraries
- **ApexCharts.js:** An open-source charting library 
- **MUI (Material-UI):** A React UI framework 
- **FontAwesome:** A font and icon toolkit 
- **DOMPurify:** A DOM-only, super-fast library that sanitizes HTML and prevents XSS attacks.
- **OAI-widget:** A tool used to embed custom GPT
- **Bootstrap** CSS framework



## API used

### Get Autocomplete Drug List
- **Source:** DailyMed API
- **Endpoint:** 
  ```bash 
  GET 
  https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json
  ```
- **Parameters:**
  - `drug_name`: (string) Required.

### Get Drug Interaction Check and Vaccine Recommendation
- **Source:** Assistant API
- **Integration:** oai-widget for interacting with OpenAI's Assistant API.

## Installation
1. **Clone the Repository**
   ```
   git clone https://github.com/pasinee-sb/pharmamate_frontend
   ```
2. **Navigate to Project Directory**
   ```
   cd .../pharmamate_frontend
   ```
3. **Install NPM Packages**
   ```
   npm i
   ```
4. **Connect to Database** (Assuming back-end codebase and database are set up)
   ```
   psql
   \c pharmamate
   ```

## Run the Application
```
npm start
```
- **Local Run Configuration:** Go to `/src/api/api.js` and uncomment `"http://localhost:3001"`.

## Deployment
To deploy this project, run:
```
npm start
```

## Environment Variables
Add the following environment variables to your `.env` file:
- `REACT_APP_CHATBOT_API_KEY`
- Your Assistant API key and OAI-widget key.



