This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Locally run TicTacToe

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `docker-compose up`

Launches docker compose to locally launch docker container with TicTacToe

## Deploy docker swarm stack (TickTackToe + Cat/DogVoting components)

### `docker swarm init`

Init the docker swarm

### `docker stack deploy --compose-file docker-stack.yml lab`

Deploying all the services to docker swarm stack and launches it.

To access different apps use following urls:

`localhost:4200` - TicTacToe

`localhost:5000` - Voting app

`localhost:5001` - Voting Results 