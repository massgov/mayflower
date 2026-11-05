# Setting up your environment

In order to run Mayflower locally, you need to have some things installed and set up on your machine:

1. Install PHP ([v5.6.4](https://secure.php.net/get/php-5.6.4.tar.bz2/from/a/mirror))
    - See steps for [windows](https://www.sitepoint.com/how-to-install-php-on-windows/) || [mac os](https://ryanwinchester.ca/posts/install-php-5-6-in-osx-10-with-homebrew)
2. Install Node.js 24.22.1.
    - From the repository root, run `nvm install && nvm use` to use the version pinned in `.nvmrc`, or allow Volta to select the version pinned in `package.json`.
3. Install Rush globally by running `npm install -g @microsoft/rush`.
    - Rush installs the repository's pinned pnpm version and exposes package scripts through `rushx`; a global Gulp installation is not required.
