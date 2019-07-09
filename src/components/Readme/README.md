
## <P STYLE="text-align: center;">Tide Times Application</P>

### Introduction

Delivers Tide Times[^1] to a user. The user can select which sites are required.

### RCS and Deployment

Held on GitHub @ https://github.com/ianhunterpersonal/tide-times-react_NEW.git

Username ianhunterp****l
Password `****G`

To deploy:- 

1. In development project for tide-times-react run BASH script:-

unix> deploy.sh

This will create a new production build, place it in a project (../tide-times-deploy) and then check it in to GitHub.

2. Update Glitch project [https://glitch.com/edit/#!/chestnut-punishment?path=manifest.json:1:0] with latest on GitHub. Do this by import from GitHub which wipes out the current project and replaces old. The GitHub reference is ianhunterpersonal/tide-times-react_NEW

3. Job Done. Woohoo! Goto '[https://chestnut-punishment.glitch.me/]' to see the result


### i18n

Simply add messages for different languages in /messages.js and then  use <FormattedMessage/> as seen in App.js. 

---

[^1]: Data scraped from [Tide Times](https://www.tidetimes.org.uk/)