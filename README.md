UXFirst
=======

Use this script to detect slow users on your website, so you can improve their navigation.

```Speed = User Experience```

```Slowness = Frustration```

**Think UX First!** Remove non-important things from your pages when the user has already been waiting for ages.

## Usage

1) Include the `uxfirst.min.js` script in every page of your site. It simply saves the page load time in the user's localStorage. As it is tiny (less than 700 bytes before gzip), it is better if you inline it or concatenate with another script.

2) Then, use this global function in your code: **uxFirst()**. It returns the average load time in milliseconds, for all the pages the user loaded on your site in the last 2 hours.

Before the first page is fully loaded, the average will be `null` (and `null` is the same as 0 when testing if it is > or < than a value).

## Example

```html
<script>
	if (uxFirst() < 10000) {
		// Load ads for users having pages loading faster than 10 seconds
		...
	}
</script>
```

## Use cases

- Don't load ads for users already having a slow navigation
- Don't load some slow widgets
- Use lower definition images or videos
- Don't load custom fonts
- Anything you can imagine to reduce user frustration


## How slow is too slow?

Under 3 seconds, it is the ideal load time.

The average load time is near 7 seconds on the web.

Above 12 seconds, this is very slow and no-one should have to wait that long.


## Compatibility

The script will work on E9+ and every other browser. When used on IE8 or IE7, the function uxFirst() will respond `null`, so you don't have to care about them not being supported.

This script uses the Navigation Timing API when it is available and has a fallback (less accurate) when it is not.


## Contributing

Feedback is very precious and any help is more than welcome!


## Author

Gaël Métais. I'm a webperf freelance based in Paris.
If you understand french, you can visit [my website](http://www.gaelmetais.com).