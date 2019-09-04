# Brett Front End Test

## Development Prerequisites

### Install Node and NPM

**Installing Node.js via package manager:** https://nodejs.org/en/download/package-manager/

*or*

**Download and Install Node.js:** https://nodejs.org/en/download/

### Install Node Modules
In the project root directory, run:
```
npm install
```

## Development
In the project root directory, run:
```
npm start
```
Visit http://localhost:3000


## Build Production

### Build the Project
In the project root directory, run:
```
npm run build
```
The generated **/build** folder is ready to be deployed.

### Preview the Production Locally Before Your Deployment

*Install **serve** if it is not in your machine, run:* 

```
sudo npm install -g serve
```

In the project root directory, run:
```
serve -s build
```
Visit http://localhost:5000



