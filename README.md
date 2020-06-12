![](assets/logo.png)

# Plant Doctor application based on the tutorial source code for "AWS Amplify React Native Authentication Starter".

![](assets/logo.png)

## This project includes:    
- Real world auth flow using React Navigation
- ...


## Setting up AWS services    
If you do not have your AWS services already created, follow these steps. If you already have your services set up, just configure your aws-exports.js file.    

1. From the root of the project, initialize the Amplify project    

```sh
amplify init
```

2. Create the resources in your account

```sh
amplify push
```

## Setting up the workong environment for React Native development

1. Make sure you are on a new version of the AWS Amplify CLI to be sure you have multiple environment support.

```sh
npm install -g @aws-amplify/cli
```

2. clone the project    

```sh
git clone https://github.com/catalyst17/cloud_prog_final_amplifyRN.git
```

3. install dependencies using npm or yarn    

```sh
yarn || npm i
```

4. For iOS, install the pods:

```sh
cd ios
pod install
cd ..
```

5. Start project    

```sh
expo start
```