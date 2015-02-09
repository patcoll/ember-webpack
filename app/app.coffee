Ember = require 'ember'

class App extends Ember.Application

register = require './register'
register(App)

module.exports = App
