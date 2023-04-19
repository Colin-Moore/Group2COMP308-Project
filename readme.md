Group Project – Developing Apps Using Emerging Web Technologies
Due Date: Group presentation and demonstration in Week 14

Purpose: The purpose of this project is to:
  • Design and code web apps using emerging web frameworks
  • Build a Graph QL API using Express, Next.js, or Gatsby
  • Build a Front-End (React or Svelte) that utilizes the Graph QL API
  • Apply appropriate design patterns and principles
  • Use Deep Learning to make intelligent use of data
References: Read the reference textbooks, lecture slides, class examples, and additional references provided here. This material provides the necessary information that you need to complete the project. You may need to read and use more materials and tools to implement a good solution.
Be sure to read the following general instructions carefully:
  - This Project may be completed in groups of 5-6 students.
  - This project can be replaced with your capstone project (COMP-231 or COMP-313), if you use and implement the same front-end/back-end technologies shown in this document.
  - You will have to present and demonstrate your solution in Week 14 and upload the solution on eCentennial through the assignment link on D2L. Bonus marks will be given if you also publish the app on Heroku, Microsoft Azure, Amazon, or another Cloud platform.
  - Your VS Code project should be named “YourGroupNameCOMP308Project” and should be zipped in a file YourGroupNameCOMP308Project.zip.
Project Specifications
Your client needs an application to help nurse practitioners to monitor patients during the first weeks of their release from the hospital and also help the patients to monitor their daily activities. Develop a modern web app that implements the following functionalities:
  1. User registration/login
  2. If the user is a nurse:
    a. Allow the user to enter vital signs: body temperature, heart rate, blood pressure, or respiratory rate.
    b. Allow the user to access information captured during a previous clinical visit, vital signs: body temperature, heart rate, blood pressure, or respiratory rate.
    c. Allow the user to send daily motivational tips to the patient (by storing them in the database and providing a daily tips page for the patient to view, etc.).
    d. Allow the user to generate a list of possible medical conditions, and advise the patient to see a doctor if necessary - intelligent use of symptoms or other data using deep learning and publicly available datasets.
Emerging Technologies COMP-308
Group Project Page 2 of 4
  3. If the user is a patient:
    a. Allow the user to create and send an emergency alert to first responders (by storing this in a separate collection)
    b. Allow the user to access fitness games page designed to encourage patients to exercise at home. The Gaming students are encouraged to design/incorporate their own games/interactive pages.
    c. Allow the user to enter daily information as specified by the nurse practitioner (for example pulse rate, blood pressure, weight, temperature, respiratory rate).
    d. Allow the user to use a checklist of common signs and symptoms (COVID-19 for example), and submit the choices.
  4. Use MongoDB for storing the information.
  5. Use Express to implement Graph QL API. Alternatively, use Next.js or Gatsby to implement the Graph QL API.
    a. Choices for front-end frameworks:
      i. React 18 or higher, using functional components
      ii. Next.js 12 or higher
      iii. Svelte 3.x (https://v2.svelte.dev/)
Apply MVC for the Express part and responsive web design principles. Use CSS and React Bootstrap to create a nice look and feel of your app. Display the logo for the application, other images, game objects, etc. (100 marks)
