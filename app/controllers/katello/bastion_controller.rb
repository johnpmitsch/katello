module Katello
  class BastionController < ::ApplicationController
    skip_before_action :authorize

    include Rails.application.routes.url_helpers

    def bastion_config
      consumer_cert_rpm = 'katello-ca-consumer-latest.noarch.rpm'
      consumer_cert_rpm = SETTINGS[:katello][:consumer_cert_rpm] if SETTINGS.key?(:katello)

      db_migrated = !Foreman.in_setup_db_rake? && ActiveRecord::Base.connection.table_exists?(Setting.table_name)

      {
        'consumerCertRPM' => consumer_cert_rpm,
        'defaultDownloadPolicy' => !Foreman.in_rake? && db_migrated && Setting['default_download_policy'],
        'remoteExecutionPresent' => ::Katello.with_remote_execution?,
        'remoteExecutionByDefault' => ::Katello.with_remote_execution? &&
                                      db_migrated && Setting['remote_execution_by_default']
      }
    end

    def index
      render 'katello/layouts/bastion', :layout => false, :locals => { bastion_config: bastion_config }
    end
  end
end