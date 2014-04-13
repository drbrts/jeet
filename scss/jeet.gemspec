# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'jeet/version'

Gem::Specification.new do |spec|
  spec.name          = "jeet"
  spec.version       = Jeet::VERSION
  spec.authors       = ["MojoTech | Cory Simmons"]
  spec.email         = ["cory@mojotech.com"]
  spec.summary       = "A grid system for humans"
  spec.description   = "A ratio grid system that allows users to pass fractions, decimals, or whole numbers as context to container widths, making for the cleanest, most flexible (yet intuitive) grid you'll ever use."
  spec.homepage      = "http://jeet.gs"
  spec.license       = "GPL"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.require_paths = ["lib"]

  s.add_runtime_dependency 'sass', '~> 3.0'
end
