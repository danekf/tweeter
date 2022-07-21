# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Tweeter is AJAX based and uses jQuery, HTML and CSS to display dynamically fetched tweets from the server and display them to the client.
The page resizes elements dynamically and has unique display paradigms for various display resolutions.

It also implements a dynamically adjusting input box that increases in size to match the users desired tweet. Users are promted to correct mistakesin a dynamic fashion when their input is blank or exceeds a pre-determined character count.

Safeguards against cross site scripting have been implemented.

## Steps to use repo

1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>
3. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Body-Parser
- Chance
- #DEV : Nodemon (automatic server restart on save)

## Additional resources used
- Font Awesome 
- Automatic resizing of text area: sourced from https://www.techiedelight.com/automatically-resize-textarea-height-javascript/

## Future features to be implemented
- More fully featured desktop client view 
- SASS to replace CSS
- "Return to top" button when user has scrolled down.

## Additional goals
- User log in-out
- Multiple Users
- Links to retweet, like, or flag.
- More featured user profile page. (About me, friends, etc...)

## Screenshots

!["Example mobile view](https://github.com/danekf/tweeter/blob/master/screenshots/Tweeter-mobile.png)
!["Example tablet view](https://github.com/danekf/tweeter/blob/master/screenshots/Tweeter-Tablet.png)
!["Example desktop view](https://github.com/danekf/tweeter/blob/master/screenshots/Tweeter-Desktop.png)
!["Example user input error](https://github.com/danekf/tweeter/blob/master/screenshots/tweet-exceeds-limt.png)