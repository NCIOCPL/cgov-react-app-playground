const plugins = [];
if (process.env.NODE_ENV === 'test') {
	plugins.push(['istanbul']);
}

module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react'],
	plugins,
};
