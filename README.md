Vanilla JavaScript plugin to increase an element or number, with animation, when it becomes visible in the viewport.

# Installation

Download `counter.js` or the minified version `counter.min.js` and include it:
```html
<script src="counter.min.js">
```

# Usage

Create a new instance targetting an element, for example:

```html
<div class="counter" data-counter-target="100">0</div>
<script>
    new Counter('.counter');
</script>
```

# Options

Default options:
```js
    origin: 0,
    target: 100,
    type: 'numeric', // 'numeric', 'bar', 'both'
    duration: 1500,
    suffix: null,
    classes: {
        bar: 'counter-bar',
        number: 'counter-number'
    } 
```

You can set options when creating a new instance or directly in HTML:

```js
new Counter('.counter', {
    origin: 20,
    target: 100,
    suffix: '%',
});
```
```html
<div class="counter"
    data-counter-origin="20"
    data-counter-target="100"
    data-counter-suffix="%"
></div>
```

Take a look at the examples folder for more use cases.