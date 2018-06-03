
## Prerequisites:

1. Gulp is a build system, which will assist in running the test code as part of the build. It can watch  
   for file changes and trigger test automatically.

2. Mocha is a test framework, which gives the instruments we need to test our code. Mocha is a
   feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.

3. Http and Https are one of the most popular modules that can handle HTTP/HTTPS request/response.

4. Gulp-Mocha is one of the modules which pipelines a mocha test as a gulp task.


# Manual testing:


## The Node.js app to:

We have taken a simple node js Hello World program which creates a server on localhost (127.0.0.1) and displays "Hello World" when it listens to the default port 3000. The code can be available by cloning the bitbuc
We shall test whether the page loads properly with the expected text in the body, "Hello World". aaa

## Setting Up Mocha:

In order to set up Mocha for our tests, first let us make a folder named 'test' in our root directory and create a file test.js in it.

code to install Mocha through command line:

  - npm install mocha --save-dev
  - npm install mocha --global(to give global access to mocha command)

We shall send the hello.js app to test.js as a module by adding the following line to our hello.js file :-

  - module.exports = app;

This will run the app as a module before testing the code.

The unit testing for our app includes:

1. Testing of the response statuscode, which must be 200 for success.
2. Testing whether the request to http://localhost:3000 produces "Hello World" text as a response.

The test.js file is available in the repository.


## CF push:

After testing the app, we must push the app to SAP HANA cloud platform. The following codes will push the app to the cloudfoundry.

  - cf api api.cf.us10.hana.ondemand.com
  - cf login -u username -p password
  - cf push helloworldcf -c "node hello.js"

* Assuming 'helloworldcf' as the app root folder name.

After the app is started in Cloud Foundry, we shall get an unique URL like "helloworldcf.cf.us10.hana.ondemand.com". We must use this URL in order to test the connection between the app and CF. In other words, we must see whether the app is running fine after the deployment. We shall use Gulp to run this task.


## Gulp to test connection between app and cloud foundry:

Gulp is essentially a task runner. It can run defined tasks. We must create a file gulpfile.js and download a few dependancies:

  - npm install gulp --save-dev
  - npm install gulp --global
  - npm install gulp-mocha --save-dev
  - npm install https --save-dev


### Prerequisites:

  1. We must create another test file 'testcf.js' and pass the URL we got after CF push as the base_url  
    and check the same way we checked in 'test.js' file for mocha.
  2. We must pass the 'testcf.js' file as source to the gulp task 'test'.
  3. The gulp-mocha will pipeline another mocha test for testing the connection between app and      
     cloudfoundry after the app is successfully pushed to the SAP HANA cloud platform.

* If 'gulp' command is executed, it will search for 'default' task and execute that. Since, we did not declare any 'default' task in our gulpfile.js, rather 'test' task, we need to specify the task name as parameter, for example, �gulp test� on the command line in order to achieve the result for the given URL, like we did with mocha.

# Summary:

The above steps sum up the procedure of manually testing the node.js backend app using mocha, pushing the app to SAP HANA Cloud Foundry and testing whether the app running properly in Cloud using Gulp. Manually it requires a lot of steps to be done if there are too many components in the program. So we must find out a way to implement all these steps automatically using continuous integration. The next part of this documentation deals with automatic build process of our app.


# Automatic Build Process:

In order to make all the above mentioned processes automatic, we must use a continuous integration and continuous deployment tool. Here we are using CodeShip as our tool because it can be easily integrated with the Github account with some very easy steps. Let us find out how!

1. Open https://codeship.com/ and select signup with Github.
2. Give your login credentials
3. Create a new project page will pop up. We have to select Github as our SCM(Software Configuration
   Management).
4. We must give the link to our Github repository holding our app.
5. Select codeship basic.
6. In project settings, we first select the 'test' option. A terminal box will open up where we can write
   our custom commands to be executed. The setup commands are
	   - nvm install stable
	   - npm install stable
	   - npm install mocha
	   - npm install gulp
   The test commands under Configure Test Pipelines are:
	   - mocha
7. Then under project settings again, we must select the deployment option and give master/branchname for continuous deployment.
8. Then we must select custom script forour deployment to SAP HANA Cloud Platform. The commands to be
   written are as follows:
	   - cf api api.cf.us10.hana.ondemand.com
	   - cf login -u username -p password
	   - cf push helloworldcf -c "node hello.js"
	   - gulp test
   The gulp test in the end will check whether the app is running perfectly after the deployment.
9. Now as we integrated the Github repository with this codeship account, any push to the repository
   will trigger the whole build process and the whole process will be done automatically from checking the app using mocha, cf push and checking the app-cloud foundry connection using gulp.
10. So we open our command propmt, go to our app folder and git push our repo and thats it!

So all we have to do now is push any update to our app in Github and codeship will take care of the rest.
