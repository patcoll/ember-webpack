require 'public/index.html'

require 'console-shim'
require 'es5-shim'
require 'es5-shim/es5-sham'
require 'json3'

App = require './app'
app = App.create()
