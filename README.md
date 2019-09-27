# Katello Challenge


## Goal

To display the fruits returned by `/katello/api/v2/fruits` on the `/fruits` page using React and Redux


## Setup

1. Checkout this branch on a Katello devel box
```
cd ~/katello
git remote add jomitsch https://github.com/johnpmitsch/katello.git
git fetch jomitsch
git checkout jomitsch/katello_challenge
```
2. `cd ../foreman && bundle exec rake db:migrate` to migrate the database
3. `bundle exec rake katello:seed_fruits` to seed them fruits
4. Start a server
5. Ensure you can call the fruits API endpoint and fruits are returned `curl -u admin:changeme -H "Content-Type: application/json" localhost:3000/katello/api/v2/fruits`
6. The backend and the routing has already been set up for `$FOREMAN_URL/fruits`.

## Task

- In `~/katello/webpack/scenes/Fruits` you will see the file structure to add the Fruits page. A basic Table is included, but doesn't have any REAL fruit info!  Fill in these files with the appropriate React and Redux code to call the fruits API and display a list of fruit with _name_ and _color_ columns. Some boilerplate code and dummy data has been filled in for you, so be sure to read through the files and the comments to see what is there!

- If you finish early (congratulations smarty-pants!), here are some stretch goals:
  - Can you use react-bootstrap style components to give the page a better layout?
  - Try to implement a details page for each fruit and display the id, created at, and updated at values
  - Add more columns to the table to show the same additional details (same idea as the details page, but on the index page, you can repeat the data for practice)
  - Implement search functionality
  - Get creative! Can you implement a spinner? A modal pop-up?


Tip: Use examples of other pages in Katello!

## Solutions

There are two branches with solutions that you can use if you get stuck or want to check your work:
- [solution using "classic" React](https://github.com/jeremylenz/katello/tree/fruit-challenge-solution)
- [solution using React hooks](https://github.com/jeremylenz/katello/tree/fruit-challenge-solution-hooks)
