# Keystone Custom Homes - Take Home Coding Assessment

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Other notes

* I wasn't sure if the categories and products would have an `Id` or not. The `CategoryNode` interface listed one, but it was not in the example data.
* The `<product-tree>` component utilizes custom properties. They can be changed to customize the animation.
* The Select Product event is shown via `console.log`, but I put it on the screen as well.
* The LRU mock service call also shows each name/endpoint call through `console.log`.
* Smaller screen sizes have an optional layout for the table. Can be useful in case of very wide, or large number of, columns.
* Dark Mode support!
