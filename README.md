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

In `~/katello/webpack/scenes/Fruits` you will see the file structure to add the Fruits page. Fill in these files with the appropriate React and Redux code to call the fruits API and display a list of fruit with a name and color columns. Be sure to use the [Table](https://github.com/Katello/katello/tree/master/webpack/move_to_foreman/components/common/table) that Katello provides.

## Tips

- It may help to start with mocked data to set up the React side of things first before setting up Redux
- Use examples of other pages in Katello!
- If you finish early (congratulations smarty-pants!), try to implement a details page
