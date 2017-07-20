function Process(previousArray, currentValue) {
    var nextArray;
    if (currentValue >= 1 && currentValue <= 10)
        nextArray = previousArray.concat(currentValue);
    else
        nextArray = previousArray;

    return nextArray;
}


var numbers = [20, 1, -5, 6, 50, 3];

var emptyArray = new Array();
var resultArray = numbers.reduce(Process, emptyArray);

console.log("result array=" +resultArray);

Function.prototype.call1=function (context) {
    var context = context || window;
    context.fn=this;
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    console.log(args);
    let result= context.fn(...args);
    delete context.fn;
    if(result){
        return result;
    }

}

var foo={
    value:1
}

function bar(name,title) {
    console.log(this.value);
    console.log(name);
    return {
        value: this.value,
        name: name
    }
}

//console.log(bar.call1(null,'xx','xxx'));


Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

console.log(bar.apply(foo,['xx','xxx']));
