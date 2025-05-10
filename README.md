README for Assignment 1 and Assignment 2

Assignment 1: Playwright UI Tests
    1. Credentials Configuration
    Username and password can be updated in the credentials.json file located under test-data.
    
    2. Data Ingestion
    The data ingested in the application is also present in the test-data directory. This is the same data as mentioned in the setup document, but with a few additions to better fit the use case. Please use this data file.
    
    3. Test Case Specification
    The test case is defined in the spec file named dashboardFlow.spec.ts located under the tests directory.
    
    4. Helper Files
    There are two helper files located under the pages folder:
    
    LoginPage.ts: Contains functions used to perform actions related to login on the UI.
    
    DashboardHelper.ts: Contains functions used to perform actions related to the dashboard on the UI.
    
    These files are called in the main spec file.
    
    5. Configuration Files
    Playwright Config: The Playwright configuration file contains all configuration-related information.
    
    Test Setup: The test-setup.ts file contains the global login and logout code.
    
    6. Prerequisites to Run the Tests
    Step 1: Ensure that the OpenObserve client is hosted locally and running on your localhost:5080 port. This will affect the URL, which is also present in the credentials.json file.
    
    Step 2: Ensure that you have entered your username and password in the credentials.json file.
    
    Step 3: Ensure that you have a workspace saved and data ingested. Please use the test data present in my codebase.
    
    7. Recommended IDE
    VS Code is the recommended IDE for running the tests.
    
    8. Tag-Based System for Running Tests
    A tag-based system has been implemented to run the scripts, providing better control over tests:
    
    For the dashboard creation flow, the tag is @dashboardCreationFlow.
    
    For negative validation (invalid login) scenarios, the tag is @invalidLogin.
    
    You can run all tests by using the all tag.
    
    9. Command Line Arguments
    To run the scripts with the appropriate tag, use the following commands:
    
    Run the dashboard creation flow:
    npx playwright test --grep=@dashboardCreationFlow --project=chromium
    
    Run all tests in the browser (Chromium, Webkit, or Firefox):
    npx playwright test --grep=@all --project=chromium --headed
    npx playwright test --grep=@all --project=webkit --headed
    npx playwright test --grep=@all --project=firefox
    
    Run the invalid login scenario:
    npx playwright test --grep=@invalidLogin --project=firefox


Assignment 2: API Test using pytest/Python
    1. Location of API Assignment Code
    The API assignment code is located under the API_Testing_Assignment folder within the Playwright workspace.
    
    2. Prerequisites to Run the Tests
    Ensure you have Python and pytest installed on your system.
    
    3. Command Line Argument to Run the Tests
    
    To run the API tests, use the following command:
    python -m pytest -s .\API_Assignment.py
