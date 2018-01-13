# bulgarian-grain-exchange-ui-client

An AngularJS ui client for bulgarian-grain-exchange application, that makes available users to buy and sell 
grain also offers useful information about grain prices.

(Only admin ui client is implemented for now!)

# Running application
The following instructions are for running application on Windows and Wildfly application server:

1. Install npm

2. Install bower with following command: **npm install -g bower**

3. Run **bower install** in <project root>\WebContent directory

4. **mvn clean install** will build the project

5. Download WildFly 10 (http://wildfly.org/downloads/) and extract it somewhere.

6. Run Wildfly server WildFlyDirectory/bin/standalone.bat

7. Deploy generated war file on wildfly server

8. Open the web app at http://localhost:8080/bulgarian-grain-exchange-ui-client
