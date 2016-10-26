mkdir dist

NODE_ENV=production
rollup -c scripts/rollup.config.js -o dist/truncator.js
uglifyjs dist/truncator.js -mc warnings=false --comments -o dist/truncator.min.js
