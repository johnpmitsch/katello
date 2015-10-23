class AddVersionToContentViewVersion < ActiveRecord::Migration
  def change
    add_column :katello_content_view_versions, :version, :float
  end
end
