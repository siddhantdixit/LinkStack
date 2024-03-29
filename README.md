[![Node.js CI](https://github.com/siddhantdixit/OOP-ProjectLinkedList/actions/workflows/node.js.yml/badge.svg)](https://github.com/siddhantdixit/OOP-ProjectLinkedList/actions/workflows/node.js.yml)
![GitHub issues](https://img.shields.io/github/issues/siddhantdixit/OOP-ProjectLinkedList)
![GitHub](https://img.shields.io/github/license/siddhantdixit/OOP-ProjectLinkedList)

<p align="center">
  <a href="http://project-linkedlist.herokuapp.com/">
    <img
      alt="Link List"
      src="docs/logos/colored_vector.svg"
      width="600"
    />
  </a>
</p>


Our Project is social media reference landing page that's a Bio Link tool(A single link for all your links and accounts). It will allow you to create a personalized and easily customizable page, that houses all the important links you want to share with your audience. It can be used on social platforms like Instagram, TikTok, Twitch, Facebook, YouTube, Twitter, or LinkedIn, or you can use it to aid discovery of your work, brand, or business.

You can get analytics of your profile and links.

![image](https://user-images.githubusercontent.com/22856752/196052557-15835172-f07c-42fb-b850-0389f0911284.png)



<br>

## UML

<p align="center">
    <img
      alt="Link List"
      src="docs/diagrams/UML Diagram.png"
    />
</p>


<br>

## Usecase Diagram

<p align="center">
    <img
      alt="Link List"
      src="docs/diagrams/usecase.svg"
    />
</p>




---
## Requirements

For development, you will only need Node.js and npm installed on your machine.
If you have already installed NodeJS Jump to [Project Setup](#project-setup)

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install nodejs
      sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    node --version

    npm --version

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g


## Project Setup

```
git clone https://github.com/siddhantdixit/OOP-ProjectLinkedList/

cd OOP-ProjectLinkedList
```

```
npm install
```

```
npm start
```



Create an .env files with the following parameters.

```
MID="PAYTM_MERCHANT_ID"
PAYTM_MERCHANT_KEY="PAYTM_MERCHANT_KEY"
WEBSITE=WEBSTAGING
CHANNEL_ID=WEB
INDUSTRY_TYPE_ID=Retail
PAYTM_FINAL_URL=https://securegw-stage.paytm.in/theia/processTransaction
CALLBACK_URL=http://localhost/dashboard/subscription/transaction
PORT=80
EMAILPASSWORD="EMAIL-PASSWORD-USED-IN-NODEMAILER"
JWTLOGINSECRET='128-Characters-Alphanumber-Random-Generated-Crypto-Key'
JWTVERIFICATIONSECRET='128-Characters-Alphanumber-Random-Generated-Crypto-Key'
MONGODBURL='mongodb+srv://YOUR-MONGODB-ONLINE-OR-LOCAL-CLUSTER/ProjectLinkedList?retryWrites=true&w=majority'
```
