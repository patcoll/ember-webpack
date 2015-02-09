Ember = require 'ember'

module.exports = Ember.Route.extend
  model: ->
    [
      {
        id: 'one'
        two: 'three'
        four: 'five'
      }
      {
        id: 'six'
        seven: 'eight'
        nine: 'ten'
      }
    ]
  # setupController: (controller, model) ->
  #   controller.set 'model', model
  #   console.log 'index route'

