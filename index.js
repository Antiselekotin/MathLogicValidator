export default class ValidationOfFormulas {
    constructor() {
        this._maxOrderFinder = (str) => {
            let maxCounter = 0;
            let currentCounter = 0;
            let index = 0;
            for (let i = 0; i < str.length; i++) {
                if (str[i] === '(') {
                    currentCounter++;
                    if (maxCounter < currentCounter) {
                        maxCounter = currentCounter;
                        index = i;
                    }
                } else if (str[i] === ')') {
                    currentCounter--;
                }
            }
            return index;
        };

        this._deleter = (str, start) => {
            let end = start;
            while (str[end] !== ')') {
                end++;
                if (end > str.length) {
                    return new Error();
                }
            }
            if (start+1 === end || start+2 === end) {
                return false;
            }

            return (str.slice(0, start) + 'p' + str.slice(++end));
        };

        this.check = (formula) => {
            let str = formula;
            let lastStr;
            while (str !== 'p') {
                lastStr = str;
                str = this._deleter(str, this._maxOrderFinder(str));
                if (lastStr === str || !str) {
                    return false;
                }
            }
            return true;
        };
    }
}

//Usage
//const usage = new ValidationOfFormulas();
//usage.check('(p && p)');
