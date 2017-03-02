require File.expand_path("../engine", File.dirname(__FILE__))

namespace :katello do
  desc "Runs a katello ping and prints out the statuses of each service"
  task :reindex => [] do
    deprecation_warning = "DEPRECATION WARNING: katello:reindex is now katello:reimport, katello:reindex will be" \
                          " removed in 6.3\n"
    print deprecation_warning
    Rake::Task["katello:reimport"].invoke()
    print deprecation_warning
  end
end

