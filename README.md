# middle-core
 主要封装一些一些通用的工具函数方法，如http请求(get,post),react by router,实体映射，store操作类等。

 # use 
 ```
 npm install legions --save 
  or
yarn add legions
 ```
# API
- classnames
  ```
  import classnames from 'legions/classnames'
  ```
- [create](https://github.com/duanguang/brains.git)
  ```
  import create from 'legions';
  const app = create({router: true,history:false});//history :false createHashHistory
  app.start(App, '#app2'); //App 容器组件
  ```
- invariant
  ```
  import invariant from 'legions/invariant'
  ```  
- warning
  ```
  import warning from 'legions/warning'
  ```  
- store
  ```
  import {computed,action,observable,autorun,asMap} from 'middle-core/lib/store';//直接暴露mobx里面API接口
  ```
  ``` 
  import {Lifecycle} from 'legions/store'; //状态周期 {Application: 0, History: 1, Location: 2};
  ```
  ```
  import {resource} from 'legions/store';//事件操作类 一般我们定义事件操作有三种Created，Updated,Deleted
  ```    
- store-react
  ```
  import { observer , bind } from 'legions/store-react' ; 
  // bind 我们重写了mobx-react inject,observer 参考mobx-react
  ``` 
- request
  ```
  import {post,get} from 'legions/request';
  get('url',parms,headerOptions) //返回值:Promise
  post('url',parms,headerOptions) // 返回值:Promise
  ``` 
- [json-mapper-object](https://github.com/duanguang/json-mapper-object.git)
  ```
  import {JsonProperty,MapperEntity} from 'legions/json-mapper-object';
  ```
- [observableViewModel](https://github.com/duanguang/brain-store-utils.git)
  ```js
  import {observablePromise} from "legions/store-utils";
  ```  

# Licensing
MIT license
