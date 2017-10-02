# web-client

http://menternship.org

## Technologies
- [ ] react
- [ ] redux
- [ ] flowtype
- [ ] jest
- [ ] webpack
- [ ] postcss
- [ ] immutablejs
- [ ] react-toolbox
## Setup

```npm i```

Create a .env file in root directory of project and include the following env variables
```
API_CONNECTION=http://api.menternship.org/ (or if you're running the server locally, point to your server)
PORT=3000
```

For development mode
```npm run dev```

For production mode 
```npm start```

## Key Philosophies

### Use the ui-kit as much as possible

There should be little to no custom styling for React components. Instead, lean on the ui-kit as much as possible, and use custom styles as a last resort. This will keep the site DRY and the design uniform.

### Everything is normalized

All external data brought into the application is completely normalized. That means when you have a deeply nested object, the object is broken down into its relationships, and its entities. See https://github.com/paularmstrong/normalizr for an example of this process.

### Everything in redux store is immutable

We use the immutablejs library extensively throughout the redux store. This is very important because it's a sophisticated and optimized change manager for javascript objects, and react performance is deeply tied to minimizing changes in objects.

### erschema-suite utility library

I built a custom library for this project called erschema-suite that goes over some of the finer points of the application and have schemas, reducers, selectors, and actions all come together. https://github.com/l2silver/erschema-suite
