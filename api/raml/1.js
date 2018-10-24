const raml2html = require('raml2html');
const configWithDefaultTheme = raml2html.getConfigForTheme();
const configForDifferentTheme = raml2html.getConfigForTheme('raml2html-markdown-theme');
const configWithCustomTemplate = raml2html.getConfigForTemplate('~/path/to/my-custom-template.nunjucks');

// source can either be a filename, url, or parsed RAML object
raml2html.render(source, configWithDefaultTheme).then(function(result) {
    // Save the result to a file or do something else with the result
}, function(error) {
    // Output error
});