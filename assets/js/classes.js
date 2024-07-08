export {Fruit, SortAlgo}

class Fruit {
    kind = '';
    color = '';
    weight = 0;

    static CreateHybrid(src1, src2) {
        const hyb = new Fruit();
        hyb.kind = `${src1.kind}-${src2.kind}`;
        hyb.color = src1.color;
        hyb.weight = Math.floor((src1.weight + src2.weight) / 2);

        return hyb;
    }
}

class SortAlgo {
    name = '';
    _algo = undefined;
    _duration = 0;
    _isPerformed = false;

    constructor(name, algo) {
        this.name = name;
        this._algo = algo;

        this.reset();
    }

    reset() {
        this._duration = 0;
        this._isPerformed = false;
    }

    perform(arr, comparation)  {
        const start = new Date().getTime();

        this._algo(arr, comparation);
        
        const end = new Date().getTime();
        this._duration = end - start;
        this._isPerformed = true;
    }

    get isPerformed() {
        return this._isPerformed;
    }    

    get duration_ms() {
        return this._duration;
    }    


}