module Actions
  module Pulp
    module Repository
      class Create < Pulp::Abstract
        include Helpers::Presenter

        input_format do
          param :content_type
          param :pulp_id
          param :name
          param :feed
          param :ssl_ca_cert
          param :ssl_client_cert
          param :ssl_client_key
          param :unprotected
          param :checksum_type
          param :path
          param :with_importer
          param :docker_upstream_name
          param :download_policy
          param :capsule_id
        end

        def run
          output[:response] = pulp_extensions.repository.
              create_with_importer_and_distributors(input[:pulp_id],
                                                    importer,
                                                    distributors,
                                                    display_name: input[:name])
        end

        # rubocop:disable MethodLength
        def importer
          importer = case input[:content_type]
                     when ::Katello::Repository::YUM_TYPE
                       Runcible::Models::YumImporter.new
                     when ::Katello::Repository::FILE_TYPE
                       Runcible::Models::IsoImporter.new
                     when ::Katello::Repository::PUPPET_TYPE
                       Runcible::Models::PuppetImporter.new
                     when ::Katello::Repository::DOCKER_TYPE
                       Runcible::Models::DockerImporter.new
                     end

          if input[:with_importer]
            case input[:content_type]
            when ::Katello::Repository::YUM_TYPE
              importer.feed            = input[:feed]
              importer.ssl_ca_cert     = input[:ssl_ca_cert]
              importer.ssl_client_cert = input[:ssl_client_cert]
              importer.ssl_client_key  = input[:ssl_client_key]
              importer.download_policy = input[:download_policy]
            when ::Katello::Repository::FILE_TYPE
              importer.feed            = input[:feed]
              importer.ssl_ca_cert     = input[:ssl_ca_cert]
              importer.ssl_client_cert = input[:ssl_client_cert]
              importer.ssl_client_key  = input[:ssl_client_key]
            when ::Katello::Repository::PUPPET_TYPE
              importer.feed            = input[:feed]
              importer.ssl_ca_cert     = input[:ssl_ca_cert]
              importer.ssl_client_cert = input[:ssl_client_cert]
              importer.ssl_client_key  = input[:ssl_client_key]
            when ::Katello::Repository::DOCKER_TYPE
              importer.upstream_name   = input[:docker_upstream_name] if input[:docker_upstream_name]
              importer.feed            = input[:feed]
              importer.enable_v1       = false
            end
          end
          importer
        end

        def distributors
          case input[:content_type]
          when ::Katello::Repository::YUM_TYPE
            distributors = [yum_distributor, yum_clone_distributor]
          when ::Katello::Repository::FILE_TYPE
            distributors = [iso_distributor]
          when ::Katello::Repository::PUPPET_TYPE
            distributors = input[:path].blank? ? [] : [puppet_install_distributor]
            distributors << puppet_distributor
          when ::Katello::Repository::DOCKER_TYPE
            distributors =  [docker_distributor]
          else
            fail _("Unexpected repo type %s") % input[:content_type]
          end

          distributors
        end

        def yum_distributor
          yum_dist_options = { protected: true,
                               id: input[:pulp_id],
                               auto_publish: true }
          yum_dist_options[:checksum_type] = input[:checksum_type] if input[:checksum_type]
          Runcible::Models::YumDistributor.new(input[:path],
                                               input[:unprotected] || false,
                                               true,
                                               yum_dist_options)
        end

        def yum_clone_distributor
          Runcible::Models::YumCloneDistributor.new(id: "#{input[:pulp_id]}_clone",
                                                    destination_distributor_id: input[:pulp_id])
        end

        def iso_distributor
          Runcible::Models::IsoDistributor.new(true, true).tap do |dist|
            dist.auto_publish = true
          end
        end

        def puppet_distributor
          options = { id: "#{input[:pulp_id]}_puppet", auto_publish: true }
          Runcible::Models::PuppetDistributor.new(nil,
                                                  input[:unprotected] || false,
                                                  true,
                                                  options)
        end

        def puppet_install_distributor
          Runcible::Models::PuppetInstallDistributor.new(input[:path],
                                                         id: input[:pulp_id],
                                                         auto_publish: true)
        end

        def docker_distributor
          options = { protected: !input[:unprotected] || false,
                      id: input[:pulp_id],
                      auto_publish: true }
          Runcible::Models::DockerDistributor.new(options)
        end
      end
    end
  end
end
