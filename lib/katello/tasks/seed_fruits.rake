namespace :katello do
  desc "Seed some fruits"
  task :seed_fruits => ["environment"] do
    fruits = [
      { name: "banana", color: "yellow" },
      { name: "strawberry", color: "red" },
      { name: "apple", color: "red" },
      { name: "avocado", color: "green" },
      { name: "orange", color: "orange" },
      { name: "clementine", color: "orange" },
      { name: "cranberries", color: "red" },
      { name: "grapes", color: "purple" },
      { name: "kiwi", color: "green" },
      { name: "pineapple", color: "yellow" },
      { name: "dragonfruit", color: "pink" },
      { name: "raspberries", color: "red" }
    ]
    
    fruits.map do |fruit|
      ::Katello::Fruit.find_or_create_by(fruit)
    end
  end
end
 