# Cryptocli

This is a crypto price CLI created with Node.js and JavaScript. You can get the price by crypto, by currency, and get the top 10 cryptos by trade volume across markets.

### Prerequisites

The things you need before installing the software.

* Node
* Npm
* API key on (It's free): https://min-api.cryptocompare.com/pricing

### Installation

A step by step guide that will tell you how to get the development environment up and running.

* Get this repository (Fork, clone or download)
* Run npm to install all packages
  ```
  npm install
  ```
* Run `npm link` to use this project as a CLI (You need to do this in the root of the repository)
  ```
  npm link
  ```
* By doing this, you will have the command to run the project
  ```
  cryptocli
  ```

Now the project is running on your machine. When you restart your machine, everything will be removed from `npm link`, and you will need to run `npm link` again.

## Usage

A few examples of useful commands.

* Ask for help, and you will see all commands
  ```
  cryptocli -h
  ```
* Ask for help with selected command 
  ```
  cryptocli <command> -h
  ```
  You can get help with a command of the command, example with `key` command:
    ```
    cryptocli key <command> -h
    ```

* Get crypto prices (We provide default crypto and currencies)
  ```
  cryptocli check price
  ```
    You can change the cryptos and the currencies (No spaces, only commas):
    ```
    cryptocli check price --coin=BTC,ETH --cur=CAD
    ```

* Get top 10 cryptos (USD as default currency)
  ```
  cryptocli check top
  ```
    You can change the currency (Only one per time):
    ```
    cryptocli check price --cur=BRL
    ```
