module Katello
  class BastionController < ::ApplicationController
    skip_before_action :authorize

    include Rails.application.routes.url_helpers

    def index
      render 'katello/layouts/bastion', :layout => false
    end
  end
end