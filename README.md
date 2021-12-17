# Telegram Stock Exchange Bot – Devops

## Learning Objectives: 

### [A] Setup, Build, Publish, a NodeJS Application into a Docker image to DockerHub.

### [B] Setup, Build, Publish, and Deploy a NodeJS Application with Docker into Google Cloud Platform [Google Container Registry, Google Kubernetes Engine].


## Learning components: 
* Node.js Application
	* Telegraf
	* dotenv
* GitHub
	* Markdown language
	* GitHub Actions (Workflow) 
	* Working with yaml files
* Docker 
	* Dockerfile
	* DockerHub
* Google Cloud 
	* Google Cloud Platform
	* Google Cloud CLI (Command Line Interface) 
	* Google Container Registry (GCR)
	* Google Kubernates Cluster (GKE)
* Kubernetes (k8s)
	* Kubernetes configMap
	* Kubernetes secrets

## Demo
[Telegram Stock Bot](https://t.me/AhZhun_bot)

## Building the Telegram Stock Price Bot NodeJS

You can follow the steps from the guide below. 

[Building a stock price bot with telegram node js](https://blog.devgenius.io/building-a-stock-price-bot-with-telegram-node-js-ccc2d335995c)

Alternatively you can customize and setup your own Telegram bot based on what you want to achieve.
	
*	The tutorial did not indicate to use environment variables to hide your API token.
Here's a link to help you with that: 	
[Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)

## Push and publish code into Github repository

	Step 1: Create a new repository in your github
	- (Do not select any of the options.)
	
	Step 2: Open terminal run the following commands
	- echo "# [Your Github repository name]" >> README.md
	- git init
	- git add .
	- git commit -m "first commit"	
	- git branch -M main
	- git remote add origin https://github.com/YizhunSim/[Your Github repository name].git
	- git push -u origin main
	
	
##  [A] Setup, Build, Publish, a NodeJS Application into a Docker image to DockerHub.


### Step 1. Create a DockerHub account
Sign up for an account: [DockerHub](https://hub.docker.com/)

### Step 2. Install DockerHub on your machine
Once installed, verify that the command 'docker -v' can be run in your terminal.

### Step 3. Containerized Via Dockerfile
 
*	Create a Dockerfile in your project folder

Code can be found here:
	
	`https://github.com/YizhunSim/Telegram_Stock_Bot/blob/main/Dockerfile`

### Step 4. Build Docker Image

	`docker build -t [docker-image-name] .`
	
*	Verify Docker Image has been created

	`docker images`
	
### Step 5. Run Docker Image

`docker run -d --name telegrambot --env
TELEGRAM_API_KEY=[TELEGRAM_API_VALUE] --env ALPHAVANTAGE_API_KEY=[ALPHAVANTAGE_API_KEY] -p 8080:8080 telegrambot`

arguments --env is included in the command because in the nodejs application, it is expecting environment variables to be passed into the application. Since the .env file is not exposed in the public repository github. We will have to pass the arguments during the run process to verify that the Docker Image of our application can be run successfully.

*	Verify that Docker Image process is running

`docker ps`

*	Headover to your Telegram Bot. To test if your bot is working!


If you experience an error message, you may have another (the previous?) container running on the same port. In this case use this command to kill all running containers:

`docker kill $(docker ps -q)`

and then try again :-) - *Quote Uli*

### Step 4. Setup and configure Github Actions Worflow
1. Click on Github Actions
2. Create a New workflow
3. Code can be found here
[deploy.yml](https://github.com/YizhunSim/Telegram_Stock_Bot/blob/main/.github/workflows/deploy.yml)

### Step 5: Create Github secrets
1. Navigate to Github settings
2. Under left navigation panel 
	* Secrets
3. Click on 'New repository secret'
	*	DOCKERHUB_USERNAME (From your dockerhub account)
	* 	DOCKERHUB_PASSWORD (From your dockerhub account)

### Step 6. Modify and push code into your github repository

Each time code is pushed into the Github repository.

Github Actions will pick up the action and run the workflows.

Code that picks up the action .github/workflows/deploy.yaml

`on:
  push:
    branches:
      - 'main' `

### Step 7. Verify that Docker Image is publish in DockerHub repository

Congratulations you are done!

## [B] Setup, Build, Publish, and Deploy a NodeJS Application with Docker into Google Kubernetes Engine.

### Step 1. Setup and enable Google Container Registry
Search 'GCR' on the search bar of Google Cloud Platform
Enable the API (If its your first time)

### Step 2. Create Service account
* In Google Cloud Platform, under navigation panel 

 *	IAM & Admin
 
		* Service Accounts

	`+ CREATE SERVICE ACCOUNT`

* You can name the service account anything you want.

	`CREATE AND CONTINUE`

* Grant this service account access to the project (optional)

	`Select a role` I have given mine basic owner.

	`Continue`
* `ADD KEY` Create new Key -> JSON

		Save this key with you

* `Done`

### Step 3. Setup and enable Kubernetes Engine
*	Search 'GKE' on the search bar of Google Cloud Platform
Enable the API (If its your first time). 

	You will need to set up billing on your Google Cloud Platform.

*	Create Cluster. 
	* Both GKE Standard, GKE Autopilot is fine. I selected GKE Autopilot for my setup. 	
`Configure`

### Step 4. Setup and configure GitHub Actions Workflow
1. Click on Github Actions
2. Create a New workflow
3. Code can be found here
[google.yml](https://github.com/YizhunSim/Telegram_Stock_Bot/blob/main/.github/workflows/google.yml). Alternatively you can generate the default template by looking for google.yaml
I just made amendments for my project

### Step 5. Create the following yaml files
* kustomization.yaml
* deployment.yaml
* service.yaml
* configMap.yaml
* secret.yaml

### Step 6. Commit, push code into your github repository
Verify that GitHub actions workflow is running

1. Docker Image is publish on to Google Container Registry
2. Google Kubernetes Engine has your Docker image deployed into a Kubernetes engine instance
3. Click into the workload 
	* Verify that your kubernetes pods status is Running. 
	* Verify in 'Exposing services' you are able to view the webpage hosting with Google Kubernetes Engine

## Useful References

* [Deploy MEARN App to GKE with Github Actions](https://www.youtube.com/watch?v=SU1S6L0U3AE)
* [A simple Docker(React/Express) App to practice CI/CD)](https://github.com/SparkDevTeams/ds2020_mauricio)
* [Configmaps and Secrets of Kubernetes (k8s) with a NodeJs application: Hands on with JotaonCode](https://www.youtube.com/watch?v=0Zvmobgi308)
* [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/?ref=hackernoon.com)
* [Kubernetes Architecture explained | Kubernetes Tutorial 15](https://www.youtube.com/watch?v=umXEmn3cMWY)
* [Alpha Vantage API Documentation](https://www.alphavantage.co/documentation/)
* [How to base64 encode a string in terminal](https://dev.to/scrabill/how-to-base64-encode-a-string-in-terminal-327b)
* [https://github.com/SparkDevTeams/ds2020_mauricio](https://github.com/SparkDevTeams/ds2020_mauricio)