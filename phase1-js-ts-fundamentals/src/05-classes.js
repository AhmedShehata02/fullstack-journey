/********************************************************************
 🧩 LESSON 5 — CLASSES & OBJECT-ORIENTED PROGRAMMING (OOP)
 📘 الهدف:
 فهم نظام الـ Classes في JavaScript (ES6)
 وكيفية التعامل مع الـ constructor, this, inheritance, و static methods.
********************************************************************/




/********************************************************************
 ✅ 1. Class Declaration
 --------------------------------------------------------------------
 - الكلاسات هي مجرد طريقة أحدث لتعريف كائنات (Objects)
 - تحت الكواليس، هي مبنية على الـ Prototype system القديم.
********************************************************************/
console.log("---- 1. Class Declaration ----");

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}, and I'm ${this.age} years old.`;
  }
}

const p1 = new Person("Ahmed", 25);
console.log(p1.greet()); // ✅ Hello, my name is Ahmed, and I'm 25 years old.

/*
🧠 ملاحظات:
- الـ constructor بيتنفذ تلقائيًا لما تعمل new Person().
- this بيرمز للكائن الجديد اللي بيتنشأ من الكلاس.
*/


/********************************************************************
 ✅ 2. Class Expression (زي Function Expression)
********************************************************************/
console.log("---- 2. Class Expression ----");

const Car = class {
  constructor(model) {
    this.model = model;
  }

  start() {
    console.log(`🚗 ${this.model} started!`);
  }
};

const car1 = new Car("Tesla");
car1.start();


/********************************************************************
 ✅ 3. Methods & this keyword
 --------------------------------------------------------------------
 - this جوا الميثود بيرمز للكائن نفسه.
********************************************************************/
console.log("---- 3. this keyword ----");

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, ${this.name}!`);
  }
}

const user = new User("Mona");
user.sayHi(); // ✅ Hi, Mona!


/********************************************************************
 ✅ 4. Getters & Setters
 --------------------------------------------------------------------
 - بتخليك تتحكم في الوصول وتعديل القيم الخاصة.
********************************************************************/
console.log("---- 4. Getters & Setters ----");

class Account {
  constructor(owner, balance) {
    this.owner = owner;
    this._balance = balance; // نستخدم "_" للدلالة على خاصية داخلية
  }

  get balance() {
    return `$${this._balance}`;
  }

  set balance(value) {
    if (value < 0) throw new Error("❌ Balance cannot be negative");
    this._balance = value;
  }
}

const acc = new Account("Omar", 1000);
console.log(acc.balance); // ✅ $1000
acc.balance = 1500;
console.log(acc.balance); // ✅ $1500
// ❌ acc.balance = -10; // Error


/********************************************************************
 ✅ 5. Static Methods
 --------------------------------------------------------------------
 - methods بتتعلق بالكلاس نفسه مش بالـ instance.
 - بتستخدمها للدوال المساعدة (Utility methods).
********************************************************************/
console.log("---- 5. Static Methods ----");

class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.add(5, 10)); // ✅ 15
// ❌ const m = new MathUtils(); m.add(); // Error


/********************************************************************
 ✅ 6. Inheritance (الوراثة)
 --------------------------------------------------------------------
 - كلاس يرث خصائص ودوال من كلاس تاني باستخدام extends.
********************************************************************/
console.log("---- 6. Inheritance ----");

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // لازم تستدعي super() لاستدعاء constructor الأب
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks! 🐶`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // ✅ Buddy barks!


/********************************************************************
 ✅ 7. super keyword
 --------------------------------------------------------------------
 - بتستخدمها عشان تنادي ميثود أو constructor من الكلاس الأب.
********************************************************************/
console.log("---- 7. super keyword ----");

class Employee {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `Employee: ${this.name}`;
  }
}

class Manager extends Employee {
  constructor(name, department) {
    super(name);
    this.department = department;
  }

  describe() {
    return `${super.describe()} (Dept: ${this.department})`;
  }
}

const manager = new Manager("Sara", "IT");
console.log(manager.describe()); // ✅ Employee: Sara (Dept: IT)


/********************************************************************
 ✅ 8. Private Fields (#)
 --------------------------------------------------------------------
 - ميزة حديثة (ES2022)
 - الخصائص اللي بتبدأ بـ # تعتبر خاصة (Private)
********************************************************************/
console.log("---- 8. Private Fields ----");

class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(500);
console.log(account.getBalance()); // ✅ 500
// ❌ console.log(account.#balance); // SyntaxError


/********************************************************************
 ✅ 9. instanceof Operator
 --------------------------------------------------------------------
 - بتتحقق إذا كان الكائن معمول من كلاس معين.
********************************************************************/
console.log("---- 9. instanceof ----");

console.log(p1 instanceof Person); // ✅ true
console.log(dog instanceof Animal); // ✅ true
console.log(dog instanceof Person); // ❌ false


/********************************************************************
 💪 تمارين عملية
 --------------------------------------------------------------------
 1️⃣ أنشئ كلاس Student يحتوي على:
     - خصائص name و grade
     - ميثود describe() ترجع جملة فيها الاسم والدرجة

 2️⃣ اعمل كلاس GradStudent يرث من Student ويضيف:
     - خاصية field (تخصص الطالب)
     - override للـ describe()

 3️⃣ استخدم static method لحساب متوسط درجات الطلاب.

 4️⃣ جرّب استخدام getter/setter لحماية قيمة grade (بين 0 و 100 فقط).
********************************************************************/


/********************************************************************
 🧩 Quick Summary
 --------------------------------------------------------------------
 ✅ class → شكل جديد للـ prototype القديم
 ✅ constructor() → بيشتغل وقت إنشاء الكائن
 ✅ this → بيرمز للـ instance الحالي
 ✅ getter/setter → للتحكم في الوصول للقيم
 ✅ static → دوال للكلاس نفسه مش للـ instance
 ✅ extends → للوراثة بين الكلاسات
 ✅ super() → لاستدعاء الأب (constructor أو method)
 ✅ #field → خاصية خاصة (private)
********************************************************************/
