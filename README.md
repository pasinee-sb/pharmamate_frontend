
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
- **oai-widget:** A way to embed custom GPT
- **Bootstrap** CSS framework



## API used

#### Get autocomplete drug list


[DailyMed API](https://newsapi.org/docs/endpoints/everything)

```http
GET https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name={drug_name}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `drug_name` | `string` | **Required**. |

#### Get drug interaction check and vaccine recommendation utilizing Assistant GPT

[Assistant API](https://platform.openai.com/docs/assistants/overview)


```http
The Assistant GPT feature is incorporated outside of the primary codebase of this project. 
 It is integrated using the oai-widget, which facilitates seamless interaction with OpenAI's Assistant API. 
 For a comprehensive understanding of the Assistant GPT feature and its capabilities, refer to the Assistant API Overview.
```

#### Incorporate Assistant GPT with OAI widget

[OAI-widget API](https://www.oai-widget.com/)


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `REACT_APP_CHATBOT_API_KEY`      | `string` | **Required**.  Your API key |





## Installation


Clone the repository to your local machine using the command  
```bash 
    git clone https://github.com/pasinee-sb/pharmamate_frontend
  ```

Navigate to the project directory.
```bash 
    cd .../pharmamate_frontend
```

Install the required npm packages using  
```bash 
    npm i
  ```
 
Connect database (Assuming an installation of back-end code base and database is successful)
```bash 
    psql
  ```
  ```bash 
    \c pharmamate
  ```
Run the application
```bash 
    npm start 
  ```


When run locally, please go to 

```bash 
    /src/api/api.js
  ```

and uncomment  
```bash 
    "http://localhost:3001";
  ```
## Deployment

To deploy this project run 

```bash
  npm start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_CHATBOT_API_KEY` 

And your own Assistant API key, OAI-widget key



