import expect from 'expect';
import {JsonProperty, MapperEntity} from "../src/json-mapper-object";

class Student {
    @JsonProperty('name')
    fullName=void 0;

    constructor() {
        this.fullName = void 0;
    }
}

class Address {
    @JsonProperty('first-line')
    firstLine;
    @JsonProperty('second-line')
    secondLine;
    @JsonProperty({clazz: Student})
    student;
    city;

    constructor() {
        this.firstLine = void 0;
        this.secondLine = void 0;
        this.city = void 0;
        this.student = void 0
    }
}

class Person {
    @JsonProperty('Name')
    name=null;
    @JsonProperty('xing')
    surname=null;
    age;
    //@JsonProperty({clazz: Address, name: 'AddressArr'})
    addressArr;
   // @JsonProperty({clazz: Address, name: 'Address'})
    address;

    constructor() {
        this.name = void 0;
        this.surname = void 0;
        this.age = void 0;
        this.addressArr = void 0;
        this.address = void 0;
    }
}
class Math {
    @log
    add(a, b) {
        return a + b;
    }
    //add=0;
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value;
   // console.log(descriptor.initializer());
    descriptor.value = function() {
        console.log(`Calling "${name}" with`, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}


describe('json-mapper', () => {
    it('simple json object #1', () => {
        let json = {
            "Name": "Mark",
            "xing": "Galea",
            "age": 30,
            "AddressArr": [],
            "Address": null
        };
        //const math = new Math();

// passed parameters should get logged now
        //console.log(math.add(2, 4));
        const person = MapperEntity(Person, json);
        console.log(person);
        //expect(person.address).toEqual(void 0);
       // expect(person.name).toEqual("Mark");
        //expect(person.surname).toEqual("Galea");
        //expect(person.addressArr).toEqual(null);
    });
});
