# Build-Validation
This repository contains the code that validates the after the experiments are build.

## link_validation
This file has 2 functions:
1. `findFiles` : This function recursively finds all the html files in the directory, since the this repository is a plugin for the main repository the path to directory is hard-coded as `let testFolder = '../../../build/';`. 
2. `checkLinks`: This function checks if the links in the html files contains only valid links, i.e. the link must start with `https:` not with `http:`. For this purpose JSDOM is used.

# Plugin Information
1. This repository is acting like a plugin for the repository ph3-lab-mgmt.
2. It is integrated with the build process for that you could check the `validation-plugin-Aditya` branch.
3. For integrating this plugin a new pluginscope by the name `POSTBUILD` is created as well a new plugin function `processPostBuildPlugins` in plugin.js has been created.
4. The above function is called after experiment build in experiment.js.
5. The information of this plugin is in file `plugin-config.testing.js`

# How to Run it on a Local Machine
1. For running this you must have a node.js and npm installed on your local machine.
2. Preferred version of node.js is 16.14.2 and npm is 8.5.0.
3. Run the following command:
```
npm install
node node link_validation.js
```

## Eslint configuration
The repository `ph3-lab-mgmt` has an eslint configuration file `.eslintrc.js`. Click here for eslint documentation: [eslint.org](https://eslint.org/docs/latest/user-guide/configuring/).
Eslint is configured with the eslint recommended, with plugin as only warn, the warnings can be changed to error by adding it in the rules section of eslintrc.js. The command to run eslint is 
`npx eslint -c ./.eslintrc.js ../experiment` which is also added in the package.json.
