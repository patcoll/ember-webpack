WFLAGS=--progress --colors
WFLAGSDEV=--debug --devtool source-map --output-pathinfo

deps:
	bower install
	npm install
prod:
	NODE_ENV=production webpack $(WFLAGS)
default:
	webpack $(WFLAGS) $(WFLAGSDEV)
watch:
	webpack $(WFLAGS) $(WFLAGSDEV) --watch
start:
	webpack-dev-server $(WFLAGS) $(WFLAGSDEV)
shrinkwrap:
	rm -f npm-shrinkwrap.json
	rm -r node_modules
	npm install >/dev/null
	npm shrinkwrap
	node shrinkwrap-fix.js
	rm -r node_modules
	npm install >/dev/null
run: start
clean:
	rm -rf build dist
update:
	git pull
	npm install
