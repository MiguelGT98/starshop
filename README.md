# Starshop storefront

## Overview

This is a simple storefront application which allows you to add and remove products from star wars to a cart.

## Try it out!

You can try the app online [https://vigorous-ardinghelli-0b9231.netlify.app](https://vigorous-ardinghelli-0b9231.netlify.app) or just follow the installation steps.

### Installation

To run this app locally, you'll need to have Node (>=12.13.0) and the [netlify-cli](https://docs.netlify.com/cli/get-started/) installed and perform the following steps:

Clone this repository.

```
git clone https://github.com/MiguelGT98/starshop.git
```

After doing that, move into the newly created folder.

```
cd reponame
```

Now, install dependencies using your favorite package manager (I use yarn).

```
yarn install
```

Run the app.

```
netlify dev
```

## External dependencies

Client was built using React and bootstrapped with create-react-app. Due to time constraints it uses Tailwind CSS as a CSS framework.

## Future work

If I had more time for this assignment I would definetly add a few functionalities to make it easier for the user to use it:

1. Allow users to set a quantity for an item and add that directly to the cart.

2. A product page which displays more detailed information about the product.

3. I would have loved to implement tests for the UI.
