# Real-TimeTaskManagement
This project is an Angular app that uses a .NET API to manage a database of tasks.

Prerequisites
Before you can run this project, you need to have the following software installed on your computer:

Node.js (v18.16.0 or later)
Angular CLI (v13.0.4 or later)
.NET SDK (v6.0.0 or later)
Getting Started
To get started, follow these steps:

Clone this repository to your local machine.

Open a command prompt or terminal window and navigate to the root directory of the project.

Run the following command to install the required dependencies:

npm install
```

Open the appsettings.json file in the TaskManager.API project and update the connection string to point to your SQL Server instance.

Open a command prompt or terminal window and navigate to the TaskManager.API project directory.

Run the following command to update the database:

dotnet ef database update
```

This will create the necessary tables and other database objects in your SQL Server instance.

Start the API by running the following command:

dotnet run
```

This will start the .NET API on port 7240 by default.

Open a new command prompt or terminal window and navigate to the root directory of the project.

Run the following command to start the Angular app:

ng serve
```

This will start the Angular app on port 4200 by default.

Open a web browser and navigate to http://localhost:4200 to view the app.

Troubleshooting
If you encounter any issues while running this project, try the following steps:

Make sure you have installed all the required software and dependencies.
Check the console output for error messages or warnings.
Make sure the connection string in appsettings.json is correct.
Make sure the API is running on the correct port (7240 by default).
Make sure the Angular app is running on the correct port (7240 by default).
Try clearing your browser cache and restarting the app.
Credits
This project was created by Amir Hossein Javaheri Kian. If you have any questions or feedback, please contact me at javaheri_kian@yahoo.com.
