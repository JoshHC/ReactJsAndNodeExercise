# ReactJsAndNodeExercise
React Js and Node Js Exercise, the purpose of the application is search in base of an Ip adress the geolocation data like latitude and longitude using the Maxmind database.

For test the project manually you can use the following test data:
 - ip: 31.204.2.1
 - ip: 60.54.95.1
 - ip: 71.9.92.129

The steps for test the project are the following:
1. Clone repository
2. Run the npm install commands to install the node modules
3. Rum both, the backend and the frontend projects (the .csv archive of the Maxmind database is included in the repo, so you don’t have to download nothing)
4. write the indicated ip in the input field
5. Click in the "Get latitude and longitude button"
6. The latitude and longitude of the ip will be displayed below the input control

Another way to test the project is access to the following link in dockerhub and download the docker images and run it in containers:
https://hub.docker.com/repository/docker/joshhc/exercise-ip-address/general
