WFLAGS=--progress --colors
WFLAGSDEV=--debug --devtool source-map --output-pathinfo

all: deps
	webpack $(WFLAGS) $(WFLAGSDEV)
deps:
	bower install
	npm install
prod:
	NODE_ENV=production webpack $(WFLAGS)
watch: deps
	# webpack $(WFLAGS) $(WFLAGSDEV) --watch
	grunt dev
start:
	# webpack-dev-server $(WFLAGS) $(WFLAGSDEV)
	# grunt
	grunt dev
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
