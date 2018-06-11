# Setting up your environment

In order to run Mayflower locally, you need to have some things installed and set up on your machine:

1. Install PHP ([v5.6.4](https://secure.php.net/get/php-5.6.4.tar.bz2/from/a/mirror))
    - See steps for [windows](https://www.sitepoint.com/how-to-install-php-on-windows/) || [mac os](https://ryanwinchester.ca/posts/install-php-5-6-in-osx-10-with-homebrew)
2. Install NodeJS ([v6.9.4+](https://treehouse.github.io/installation-guides/mac/node-mac.html))
    - Switch Node Package Manager (NPM) to the correct directory `npm config set prefix /usr/local`
    - If you need a different version of NodeJS for another project, you can use a tool like [N](https://github.com/tj/n) or [NVM](https://github.com/creationix/nvm) to manage multiple versions.
3. Install GulpJS [globally](https://docs.npmjs.com/getting-started/installing-npm-packages-globally) 
    - Run `npm install -g gulp-cli` from your command line
