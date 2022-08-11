import {bindData} from './bindData.js';

console.log(bindData);
let a = [
    {
        c:[
            {
                c:[
                    {
                        c:[],
                        f:3,
                        b:2
                    }
                ],
                f:2,
                b:2
            },
            {
                c:[
                    {
                        c:[],
                        f:3,
                        b:2
                    }
                ],
                f:4,
                b:1,
            }
        ],
        f:1,
        b:2,
    }
];

let b = new bindData(a,'c',['f','b']);

b.setPropFromChild('countB',(p,c)=>p+c.b , 0)

let data = b.getData();

console.log(data);

let f1,b2;
console.log('f===1',f1 = b.find('f',1));
console.log('b===2',b2 = b.findAll('b',2));


console.log('f===1 && b====2',b.intersection(b2,'f',1));

f1.b = 3;

console.log(data[0]);

console.log('f===1=>c && b====2',b.intersection(f1.c,'b',2));

let f3 = b.find('f',3);
console.log('f====3=>p',b.getParent(f3));