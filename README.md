# OpenStreamExam 
OpenStreamExam is a simple mobile application 

## Brief Introduction

OpenStreamExam includes all prerequisites as expected in the requirements and beyond. 

***What does it mean beyond?*** I also included bonuses for ***animation*** with ***react-native-reanimated*** and ***dark mode*** appearance, also a ***patch file*** for react-reanimation to work in ***debugging mode/environment***.

In particular I've cared a lot for ***performance*** so I used all methods of optimisation from caching function, caching value decreasing re-render cost.

For ***services*** I used a base service which I’ve created in my free time. Based on axios with implementation of request and response interceptor and a base service which has some general post,get,put,delete messages.

***Logging*** is very important to get involved faster in a situation. I created a basic Logging system which is based on 3 types (info,warn.error). I didn't have time to place it around the screens.

***Note***: Because I was developing this project in my MacBookPro M1 chipset I had some problems which I couldn’t fix to emulate in android devices.

## Getting started
To install this project in your own machine you have to go through this guidelines of installation and write step by step in your terminal.

Install the dependencies/node_modules

> npm install

Apply the patches in your node_modules directory
> postinstall

Install pods. Make sure you are in ios directory then write the command
> cd ./ios && pod install 

Congratulations you have installed the project on your machine. Now time is for running!🎉🎉
> npm run ios 

## User Experience

This project has mainly two screens, the first one is the home page. Includes all users which are fetched from API and you can click details to show a modal with a blur background. This modal includes all necessary details of a user.

## Functionalities/Properties

Here I’ll count some of the functionalities/properties.

1. List all users
    1. full name
    2. Phone number
    3. Button for opening modal
    4. If there is no image for a specific user there will be shown their full name initials.
    5. Fetching status PENDING, FAILED, SUCCESS. Depending on statuses in your screen will be shown different scenarios screen.
    6. Generate random colors for user initials if there isn't any image provided for a specific user.
2. Modal/Profile
    1. Blur background
    2. Animation
    3. Avatar
    4. Inputs
    5. Full name, gender, date of birth, username, email, address


## What I would do better if this would be a real project

Surely I consider this as a real project but if I would have more time these are my thoughts on what I would Improve.

1. Styling: Create a typography with standardisation of fonts, sizes.
2. Install navigation stack if there are more than two screens.
3. Use React Context for theme especially Dark mode functionality.
4. Create a general theme with standardisation of buttons, inputs, sized even that I tried a lot to keep consistency.
