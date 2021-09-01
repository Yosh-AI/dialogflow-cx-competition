# COVID-19 vaccination registration bot 

### Description

This is a COVID-19 registration bot integrated with Google Business Messages that is available on ** mobile devices only**, submitted for Dialogflow CX Competition.

This chatbot is designed mainly as an automated registration system for a clinic/hospital/vaccination point, enhanced with FAQ capabilities. 

This bot is prepared for an integration with Business Messages, to make it available right from the selected locale's Google Maps page. 

With minor changes this system can be integrated with a clinic's contact center. 

### Rationale

This bot is designed to enable COVID-19 registration, while providing the end user with factual data on COVID-19 and vaccines. This is meant to lower the hesitance of end users reluctant to get vaccinated by allowing them to make a well-informed choice during the registration process. 

### Capabilities

1. FAQ on COVID-19 and vaccines
2. Presenting headlines on COVID-19 pandemic gathered from RSS feed. 
3. Authenticating the end-user (2-step verification) using external Google sheets "database"
4. Form-filling for desired vaccine  and vaccination date
5. Checking date availability
6. Saving the gathered data to external Google sheets "database"

### External data and info used

1. [CDC Vaccines info page](https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html) 
2. [WHO COVID-19 and vaccines info](https://www.who.int/emergencies/diseases/novel-coronavirus-2019) 
3. [NPR Covid news RSS feed](https://feeds.npr.org/816541428/rss.xml)

### This project contains:

1. Dialogflow CX project, repo [agent directory](https://github.com/Yosh-AI/dialogflow-cx-competition/tree/main/cx-agent)
2. "External database" - Google sheets file (with 3 tabs: 1. user data 2. available dates 3. Records )
[Link](https://docs.google.com/spreadsheets/d/1UWS0kNt2D2MZgoHwmF4gBpFHYZannSh9p5Nwwm6AutY/edit#gid=0)
3. Webhooks supporting some of the system's capabilities, repo [cx-webhook](https://github.com/Yosh-AI/dialogflow-cx-competition/tree/main/cx-webhook)
4. Business Messages integration, repo [business-messages-integration](https://github.com/Yosh-AI/dialogflow-cx-competition/tree/main/business-messages-integration)
5. Mock of Google Maps [Google Maps Mock](https://cx-covid19-bot.web.app) Chat button, repo [google-maps-mockup](https://github.com/Yosh-AI/dialogflow-cx-competition/tree/main/google-maps-mockup)

### "Happy path"

At the beginning of the conversation, user can either start the registration right away, go to the FAQ flow or ask the questions right away in the start flow. At any stage of the conversation in the FAQ flow, user can start the registration process. 

1. User goes to the registration flow (e.g., "Registration for vaccine")
2. User gives their email from the approved mails list (e.g., "example@example.com")
3. User gives their ZIP code form the approved ZIP codes list (e.g., "18-400")
4. User selects desired vaccine (e.g., "Pfizer")
5. User selects a date in a two-week span (weekends are unavailable), e.g., "next monday"
6. User selects whether they want to get vaccinated in the morning or in the afternoon (e.g., "afternoon")
7. User confirms the booking (e.g., "Yes")
8. User can either end the conversation now, or go to the FAQ flow for more information on the vaccine


