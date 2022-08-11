let parent = Symbol('parent');
let propFromChild = Symbol('propFromChild');

class bindData {
    constructor(a, c, i) {
        this.data = a;
        this.children = c;
        this.index = i;
        this.map = new Map(
            i.map(v => [v, new Map()])
        )
        //通过索引记忆数据
        this.memory = new Map();
        //新增属性
        this[propFromChild] = new Map();
    }
    checkRange(name){
        if (!this.map.has(name)) {
            throw new RangeError('find first param must be index：find方法第一个参数必须是在constuctor时传入的某个索引')
        }
    }
    setPropFromChild(propName, porpfunc ,initialValue) {
        this[propFromChild].set(propName, {porpfunc,initialValue});
    }
    getParent(value) {
        return [...value[parent]].map(x=>this.memory.get(x));
    }
    reduceData(a, c, m, par = null) {
        //尝试非map形式的返回
        //检查a是否是数组，需要用别的方式
        if (a.map) {
            let b = a.map((v, k) => {
                let sv = JSON.stringify(v);
                //首次处理数据
                if (!this.memory.has(sv)) {
                    v[parent] = new Set;
                    this.memory.set(sv, v);
                }
                //处理父级相关
                if (par) {
                    this[propFromChild].forEach((porpInfo, propName) => {
                        this.memory.get(par)[propName] = porpInfo.porpfunc(
                            this.memory.get(par)[propName]
                                ? this.memory.get(par)[propName]
                                : porpInfo.initialValue
                            , v);
                    })
                    this.memory.get(sv)[parent].add(par);
                }
                //递归的处理子元素
                if (c in v) {
                    v[c] = this.reduceData(v[c], c, m, sv);
                }
                // this.setPropFromChild(this.memory.get(sv), v[c]);
                //改成可以findAll的形式
                m.forEach((value, key) => {
                    if (!value.has(v[key])) {
                        value.set(v[key], new Set)
                    }
                    value.get(v[key]).add(this.memory.get(sv));
                })
                //
                return  this.memory.get(sv);
            })
            return new Proxy(b, {
                get(t, p, r) {
                    if (!t[p]) {
                        if (p in a) {
                            return a[p]
                        }
                        return undefined;
                    }
                    return t[p].bind ? t[p].bind(t) : t[p];
                }
            })
        }
        return a
    }
    getData() {
        this.setPropFromChild = ()=>{
            throw new Error('请在getData之前调用setPropFromChild');
        }
        return [this.reduceData(this.data, this.children, this.map)[0]];
    }
    find(name, value) {
        this.checkRange(name);
        return Array.from(this.map.get(name).get(value))[0]
    }
    findAll(name, value) {
        this.checkRange(name);
        return Array.from(this.map.get(name).get(value))
    }
    intersection(array, name, value) {
        this.checkRange(name);
        return array.filter(x=>this.map.get(name).get(value).has(x))
    }
    difference(array ,name ,value){
        this.checkRange(name);
        return array.filter(x=>!this.map.get(name).get(value).has(x))
    }
}

export { bindData }