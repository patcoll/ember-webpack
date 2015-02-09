import Ember from 'ember';

export default Ember.Route.extend({
  model: () => [{id: 'hi'}, {id: 'there'}]
});
