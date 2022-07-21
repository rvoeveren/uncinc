# Assessment for UncInc, TODO list

- Setup Angular app (version 14) and add Bootstrap + Ngrx package via Yarn.
- Add basic necessary modules, components and routing to get the app running
- Setup the basic NgRx store so we can setup the authentication part
- Create the auth module with services to check current auth status and add a login form
- Check login credentials and update the store when logging in via the form
- Persist session in (probably) local storage to keep user logged in (no JWT fancy stuff)
- Add some guards and resolvers to prevent access to dashboard without auth
- Fix navigation, pages etc. for the app flow and general esthetics

### How to use
Check out the repo, run `yarn install` and run `ng serve` in the root. That should do the trick.

If you now open `http://localhost:4200` in your browser, it should show the app.

