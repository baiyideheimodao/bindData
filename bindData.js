class bindData {
    constructor(a, c, i) {
        this.data = a;
        this.children = c;
        this.index = i;
        this.map = new Map(
            i.map(v => [v, new Map()])
        )
        this.memory = new Map();
    }
    reduceData(a, c, m) {
        if (a.map) {
            let b = a.map((v, k) => {
                let sv = JSON.stringify(v);
                if (c in v) {
                    v[c] = this.reduceData(v[c], c, m);
                }
                // .toString();
                if (!this.memory.has(sv)) this.memory.set(sv, v);
                m.forEach((value, key) => {
                    value.set(v[key], this.memory.get(sv))
                })
                return [k, this.memory.get(sv)];
            })
            return new Proxy(new Map(b), {
                get(t, p, r) {
                    if (!t[p]) {
                        if (!isNaN(p)) {
                            let n = Number(p);
                            return t.has(n) ? t.get(n) : undefined;
                        }
                        if (p in []) {
                            return [...t][p]
                        }
                    }
                    return t[p].bind ? t[p].bind(t) : t[p];
                }
            })
        }
        return a
    }
    getData() {
        return [...this.reduceData(this.data, this.children, this.map)];
    }
    find(a, b) {
        if (!this.map.has(a)) {
            throw new RangeError('find first param must be index：find方法第一个参数必须是在constuctor时传入的某个索引')
        }
        return this.map.get(a).get(b)
    }
}

export { bindData }