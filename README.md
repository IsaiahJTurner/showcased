# Showcased Landing Page

Designer: Mahad Qureshi
Developer: Isaiah Turner

## Heroku Setup Requirements
Heroku is only used for retrieving the data from Firebase in a usable (CSV) format and is not required for using this repository. This entire project can be run entirely with a Firebase app and a GitHub Pages site.

However, this app doubles as a heroku app. You must define the environment variable `FIREBASE_SECRET` in addition to changing the `firebase_app` in `_config.yml` when deploying to Heroku.

`heroku buildpacks:set heroku/nodejs`
`git push heroku gh-pages:master`
`heroku ps:scale web=1`

## Firebase Rules
For security, add these rules to Firebase.

```json
{
  "rules": {
    ".read": "auth != null",
    "submissions": {
			"$submission": {
        ".write": true,
          "isEventOrganizer": {
           	".validate": "newData.isBoolean()"
          },
          "email": {
            ".validate": "newData.isString() && newData.val().length < 500"
        }
   		}
    }
  }
}
```
