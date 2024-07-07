# Fancode Movie List

## Topics Covered

- **Popular Movies by Year**: Displays a list of popular movies organized by year.
- **Smooth Pagination**: Enables seamless scrolling pagination.
- **Genre-Based Filtering**: Allows filtering of movies based on the selected genre.
- **Search Functionality**: Includes a search bar for finding movies, with infinite scrolling for search results.
- **Movie Cards**: Each movie card displays the title, a short description, and associated genres.
- **Custom Styling**: All styling is custom-built without using third-party tools.

## Libraries Used

- **Axios**: For making HTTP requests.
- **React Infinite Scroll Component**: For infinite scrolling functionality.

## Logic Used

- **Debounce Effect**: Implemented within the search bar to minimize API calls during user input.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the dependencies and generate node_modules.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
