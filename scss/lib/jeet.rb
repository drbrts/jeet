require "jeet/version"

module Jeet
  class << self
    # Stolen with <3 from Bootstrap Sass which was inspired by Kaminari
    def load!
      register_compass_extension if compass?

      if rails?
        register_rails_engine
      end

      configure_sass
    end

    # Paths
    def gem_path
      @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
    end

    def assets_path
      @assets_path ||= File.join gem_path, 'jeet'
    end

    # Environment detection helpers
    def asset_pipeline?
      defined?(::Sprockets)
    end

    def compass?
      defined?(::Compass)
    end

    def rails?
      defined?(::Rails)
    end

    private

    def configure_sass
      ::Sass.load_paths << assets_path

      # jeet probably requires minimum precision of 10, see https://github.com/twbs/bootstrap-sass/issues/409
      ::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
    end

    def register_compass_extension
      ::Compass::Frameworks.register(
        'jeet',
        :path                  => gem_path,
        :stylesheets_directory => assets_path
      )
    end

    def register_rails_engine
      require 'jeet/engine'
    end
  end
end

Jeet.load!
