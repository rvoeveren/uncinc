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

### Why? In Dutch!

De opsplitsing tussen public en authenticated layouts vond ik netjes om te doen, maar was niet echt nodig.
Het menu had wellicht een gedeelde component kunnen zijn waar de logout knop alleen wordt getoond als de `isAuthenticated` authState true is.
Maar gezien de `isAuthenticated` state (`true`) al zorgt voor het tonen voor de authenticated layout, is het menu ook correct.

Wat betreft de store, heb ik voor dit project besloten alles in de `store` map te plaatsen in de root, vanwege de grootte van de app.
Bij een uitgebreidere app had ik iedere module een eigen store-map gegeven met daarin de `actions`, `reducers`, `selectors` en `effects`.
Dan was het mooier opgesplitst, met `StoreModule.forFeature` i.p.v. `StoreModule.forRoot` met daarin alle app states.

De enige state in de Ngrx store is `AuthState` en die bevat een paar parameters die sowieso nodig zijn.
De user zelf, of deze authenticated is en e.v.t. een error message. Deze is vooral voor het inloggen.
De `reducers` zijn er (uiteraard) om specifieke data terug te koppelen die relevant is. 

In dit geval is de 'auto login' niet gekoppeld aan de backend. Mocht een token expired zijn zou je dat ook in de `AuthState` errorMessage kunnen stoppen.
De opdracht is dat je ingelogd blijft als je ververst. Dit kan op verschillende manieren, zoals de store serialized lokaal opslaan en `rehydraten` en van daaruit afleiden of de `AuthState` authenticated aangeeft. Dit vind ik zelf niet helemaal binnen de scope passen. Misschien ben ik er ook niet 123 voorstander van. Deels wegens security, deels omdat ik gewend ben dat veel gegevens bijna real-time kunnen veranderen vanuit bijv een beheersysteem. Dan zou ik bij een refresh dus opteren om te store te vullen vanuit een soort van generieke call die alle up-to-date data ophaalt. Al kun je daar weer qua performance vraagtekens bij plaatsen.

In dit geval opteer ik om via de API de lokaal opgeslagen (JWT) token te gebruiken om uit te vragen of de User nog ingelogd mag zijn. Zo ja, verversen we de `AuthState` en is er niks aan de hand. En anders gaan we terug naar de login. De 'beveiligde' omgeving heb ik afgeschermd met een `guard`. 
Zodoende kunnen we via een `this.store.select(isAuthenticated)` met de `isAuthenticated` selector snel bepalen of iemand nog ingelogd is. Zo niet, dan kunnen we redirecten naar een gewenste pagina of de navigatie stoppen.

De auto-login heb ik vrij pontificaal in de `app.components.ts` gezet. Normaliter zou je dit wellicht in de error handling van een `interceptor` plaatsen mocht er een `400` error teruggegeven worden vanuit de API op basis van je huidige token die aan de request wordt toegevoegd. Of in een soort van algmeene bootstrap/initializer factory die bepaalde dingen afhandelt als de app wordt geboot.

#### Verbeterpunten

- AutoLogin had *wellicht* (deels) de actions van normale login kunnen hergebruiken
- De code een klein beetje meer opschonen, al was dat helaas een tijdkwestie
- Wat meer commentaar toevoegen bij verschillende functies, zeker bij een assessment
- Directory structuur heroverwegen met een store per module

#### Toevoegingen

In mijn huidige werk moet ik eerlijk bekennen dat Ngrx (nog) niet is geïmplementeerd. Al ben ik daar wel een groot voorstander van. We doen nu veel te veel losse API calls vanuit allerlei services waardoor er een wirwar van subscribers ontstaat, om maar niet te spreken over de `maintainability`. Zeker omdat er veel data rondgaat die ook nog eens vaak kan veranderen, waardoor cachen eigenlijk bijna uit den boze is en er veel realtime data benodigd is. En al die losse calls geven weer veel overhead, zeker met de `preflight` requests van de browser (eenmalig per route indien gecached) en het feit dat Laravel voor iedere request een nieuwe response moet maken. Ik ben dus geen guru in Ngrx implementatie maar het is makkelijk zat om beter te leren (sta ik ook voor open).



