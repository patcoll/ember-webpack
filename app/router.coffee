Ember = require 'ember'

AppRouter = Ember.Router.extend({
  location: 'hash'
  # init: ->
  #   @_super()
  #   console.log 'AppRouter init'
})

AppRouter.map ->
  # overview is index
  @route 'sign-in'
  @route 'home'

  @resource 'person', path: '/person/:person:id', ->
    @route 'home', path: '/'
    @route 'subscriptions'
    @resource 'orders', ->
      @route 'new', path: 'new/:order_type:id'
    @resource 'order', path: 'order/:order_id', ->
      @route 'friends'
      @route 'box-selection'
      @route 'build-box'
      @route 'checkout'
      @route 'confirmation'

module.exports = AppRouter
