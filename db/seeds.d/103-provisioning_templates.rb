# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# !!! PLEASE KEEP THIS SCRIPT IDEMPOTENT !!!
#

::User.current = ::User.anonymous_api_admin

# Provisioning Templates

kinds = [:provision, :finish, :user_data].inject({}) do |hash, kind|
  hash[kind] = TemplateKind.find_by_name(kind)
  hash
end

defaults = {:vendor => "Katello", :default => true, :locked => true}

templates = [{:name => "Katello Kickstart Default",           :source => "kickstart-katello.erb",      :template_kind => kinds[:provision]},
             {:name => "Katello Kickstart Default User Data", :source => "userdata-katello.erb",       :template_kind => kinds[:user_data]},
             {:name => "Katello Kickstart Default Finish",    :source => "finish-katello.erb",         :template_kind => kinds[:finish]},
             {:name => "subscription_manager_registration",   :source => "snippets/_subscription_manager_registration.erb", :snippet => true}]

templates.each do |template|
  template[:template] = File.read(File.join(Katello::Engine.root, "app/views/foreman/unattended", template.delete(:source)))
  ProvisioningTemplate.find_or_create_by_name(template).update_attributes(defaults.merge(template))
end

# Ensure all default templates are seeded into the first org and loc
ProvisioningTemplate.where(:default => true).each do |template|
  template.organizations << Organization.first unless template.organizations.include?(Organization.first) || Organization.count.zero?
  if Location.exists? && Location.default_location && !template.locations.include?(Location.default_location)
    template.locations << Location.default_location
  end
end

::User.current = nil