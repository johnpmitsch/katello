object @rule

attributes :id

node(:matching_content) do |_|
  @rule.class.name == Katello::ContentViewPackageFilterRule.to_s ? @rule.matching_rpms : []
end
