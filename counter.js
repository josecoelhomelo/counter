class Counter {
    constructor(element, options) {
        this.element = element;
        this.options = { ...{
            origin: 0,
            target: 100,
            type: 'numeric', // 'numeric', 'bar', 'both'
            duration: 1500,
            suffix: null,
            classes: {
                bar: 'counter-bar',
                number: 'counter-number'
            }
        }, ...options }
        this.init();
    }
    init() {
        document.querySelectorAll(this.element).forEach((element) => {
            const attributes = Object.keys(element.dataset)
                .filter(key => key.startsWith('counter'))
                .reduce((obj, key) => {     
                    obj[key.replace('counter', '').toLowerCase()] = key.includes('Origin') || key.includes('Target') || key.includes('Duration') ? +element.dataset[key] : element.dataset[key];
                    return obj;
                }, {});
            const options = { ...this.options, ...attributes };
            this.run(element, options);
            document.addEventListener('scroll', this.run.bind(this, element, options));
        });
    }
    run(element, options) { 
        const visibleTop = element.offsetTop - window.innerHeight;
        const visibleBottom = element.offsetTop + element.clientHeight;
        if (
            window.pageYOffset < visibleTop ||
            window.pageYOffset > visibleBottom ||
            element.hasAttribute('data-counter-complete')
        ) { return; }
        
        if (options.type == 'numeric') {
            this.startNumeric(element, options);
        } else if (options.type == 'bar') {
            this.startBar(element, options);
        } else if(options.type == 'both') {
            Object.values(options.classes).forEach(value => {
                if (!element.querySelector(`.${value}`)) {
                    element.innerHTML += `<div class="${value}"></div>`;
                }
            });
            this.startNumeric(element, options, true);
            this.startBar(element, options, true);                
        }  

        element.setAttribute('data-counter-complete', 'true'); 
    }
    startNumeric(element, options, child = false) {
        if (child) {
            element = element.querySelector(`.${options.classes.number}`);
        }

        const origin = +element.innerText || options.origin;
        let start;
        const step = (timestamp) => {
            start = start || timestamp;
            const progress = Math.min((timestamp - start) / options.duration, 1);        
            element.innerHTML = Math.floor(progress * (options.target - origin) + origin) + options.suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                window.cancelAnimationFrame(window.requestAnimationFrame(step));
            }
        }
        window.requestAnimationFrame(step);
    }
    startBar(element, options, child = false) {
        if (child) {
            element = element.querySelector(`.${this.options.classes.bar}`);
        }

        element.animate([
            { width: `${options.origin * 100 / options.target}%` },
            { width: '100%' }
        ], {
            duration: options.duration,
            iterations: 1
        });
    }
}
