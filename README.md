# ember-webpack

This is an experiment to see if I could create a decent alternative to
`ember-cli`. It uses pretty much the same folder structure. It currently uses
`require-globify` and `underscore.inflection` to traverse all the folders
within `app` and register everything it finds with the Ember.Application
`register` function. Models, routes, controllers, templates, everything. See
`app/register.js` for details.

It uses [webpack][1] so different loaders can be switched in and out in a very
flexible manner. I can use CoffeeScript in files I need it. I can use full ES6
syntax with any number of transpilers such as `6to5`. I can `require` YAML
files. And this all gets done at compile time. Genius.

## Struggles

The part I'm currently struggling with is being able to optimize the build
process. If an existing file changes, I want to do a webpack incremental build
so it only takes a few milliseconds. If a new file gets added, I want to be
able to recognize that and only build the files necessary to get everything
up-to-date.

I'm currently handling watching for new files by using `grunt-contrib-watch`
and doing a complete webpack re-build, which takes 2+ seconds. Not ideal. (I
can switch to using minified versions of jQuery, Ember, and Ember Data and gain
~1.5 seconds per re-build, but then I lose the ability to have good call stacks
when I run into errors.)

If I switch to using webpack for managing this, I get incremental re-builds but
I lose the ability to see when new files appear in `app/*/**`.

Will have to dig into how `ember-cli` deals with this. (Maybe it's by
separating out jQuery, Ember, and Ember Data into a completely separate
"vendor" target, and assuming those libraries assign variables in the global
browser namespace on `window`, which is one way to go.)

# Conclusion

Overall I love the flexibility this structure gives. The ability to pull in any
package from NPM or Bower and include it in my client-side app is great. This
could work with potentially any other package manager, too, like JSPM. It could
also work with any future-looking code that is ES6 by default, by using webpack
to transpile it and include it.

Ember, as of this writing, lacks server-side support so trying to get
"isomorphic" working in this setup is a moot point.
