# Telegram Stock Exchange Bot – NodeJS

## 1. Open up Google Shell Editor

pushed to [Docker Hub
](https://hub.docker.com/r/yizhunsim/telegramapp)

Run with:

`docker run -d -p 8080:8080 yizhunsim/telegram`

Steps:

## 1: Get Source

`git clone https://github.com/yizhunsim/Telegram_Stock_Bot`

## 2: Make changes

modify files app.js,workflow

## 3: Build Container

change into the directory: 
`cd Telegram_Stock_Bot`

`docker build -t Telegram_Stock_Bot .`

## 4: Run Container

`docker run -d -p 8080:8080 Telegram_Stock_Bot`

If you experience an error message, you may have another (the previous?) container running on the same port. In this case use this command to kill all running containers:

`docker kill $(docker ps -q)`

and then try again :-)

## 5: Optional: Publish to Dockerhub

For this you need to sign up at https://hub.docker.com/ – and get a little familiar with it as well. If you're completely new to this, please ignore this part for now.

`docker tag myhello <YOUR_USERNAME>/hello:<VERSION_NUMBER>`

`docker tag myhello <YOUR_USERNAME>/hello:latest`

`docker login`

`docker push <YOUR_USERNAME>/hello:<VERSION_NUMBER>`

`docker push <YOUR_USERNAME>/hello:latest`

