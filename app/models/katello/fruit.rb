module Katello
  class Fruit < Katello::Model
    scoped_search :on => :name, :complete_value => true
    scoped_search :on => :color, :complete_value => true
  end
end
