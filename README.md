# vue_databind

## 安装

`npm install vue_databind`

## 方法说明

### construct(data , childrenName , index)

new 时调用的方法

* data【any】：需要绑定的数据
* childrenName【string】：子结点的名称
* index【array】：用于从data中查找数据的字段们

### getData()

获取绑定后的数据

### find(indexName , value)

查找需要更改的数据

* indexName【string】：用于查找的字段
* value【any】：字段的值

## 示例

如下示例更改了userNo为'1'的数据的onlineStatus的值，将其改为'on'

`import {bindData} from bind_data`  
`let b = new bindData(this.data,'children',['labelName','userNo'])`  
`this.data = b.getData()`  
`find('userNo','1').onlineStatus = 'on'`  
