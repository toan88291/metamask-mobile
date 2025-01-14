const noop = () => ({});

export default {
	DocumentDir: noop,
	fetch: noop,
	base64: noop,
	android: noop,
	ios: noop,
	config: noop,
	session: noop,
	fs: {
		exists: () => Promise.resolve(),
		dirs: {
			CacheDir: noop,
			DocumentDir: noop
		}
	},
	wrap: noop
};
