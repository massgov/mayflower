# Demo Install

Follow these steps to get up and running to *demo* or *test* Mayflower.  Developers should see our [Contribute docs](/.github/CONTRIBUTING.md) for directions on how to set up your repo for development and contribution purposes.

1. Clone this repo `git clone git@github.com:massgov/mayflower.git`
1. Move into the styleguide directory `cd mayflower/styleguide`
1. Generate pattern lab default files `php core/console --generate`
1. Install npm dependencies `npm install`
1. Run `gulp`
1. Browse to [http://localhost:3000/](http://localhost:3000/) (or port shown in gulp output if you've configured it differently)
1. Take a look through Mayflower!  
    - You can use the menu to look at whole page layouts (pages), templates, components (organisms and molecules), child elements (molecules and atoms), and some nuts and bolts (base).
    - You can emulate different device sizes by using the size buttons at the top right of the menu bar (S M L FULL RANDOM DISCO).  
    - You can learn about patterns by clicking the top right COG icon, then selecting "Show Pattern Info" from the drop down.
1. When you're done looking, type `CTRL` + `C`  from your active terminal session to kill the `gulp` task.  You can always run `gulp` again from the `mayflower/styleguide` directory to get it back up and running.
1. We're constantly working to add new features, so if you want to make sure you have the latest and greatest remember to run `git pull` before you run `gulp`!
