/********************************************************************
 🧩 LESSON 2 — FUNCTIONS & ARROW FUNCTIONS
 📘 الهدف:
 فهم أنواع الدوال في JavaScript، والفرق بينهم في الذاكرة (Memory)
 والسلوك (Scope / this / Hoisting)
********************************************************************/



/********************************************************************
 ✅ 1. Function Declaration (التصريح الكلاسيكي)
 --------------------------------------------------------------------
 - الطريقة الكلاسيكية لتعريف الدوال.
 - بتـHoist بالكامل → ممكن تستدعيها قبل تعريفها.
********************************************************************/
console.log("---- Function Declaration Example ----");

// ممكن نستدعيها قبل تعريفها بسبب الـ Hoisting:
console.log(greet("Ahmed")); // ✅ Hello, Ahmed!

function greet(name) {
  return `Hello, ${name}!`;
}

/*
🧠 تحت الكواليس:
- في Memory Creation Phase، JavaScript تحفظ الدالة كاملة (object function).
- علشان كده ممكن تستعملها في أي مكان داخل نفس الـ scope قبل أو بعد تعريفها.

📦 استخدام شائع:
- Utilities مثل formatDate(), calculateTax(), getUserData().
*/



/********************************************************************
 ✅ 2. Function Expression (دالة مخزّنة في متغير)
 --------------------------------------------------------------------
 - الدالة هنا مخزنة في متغير (غالبًا const).
 - ما بتتـHoistش زي declaration (المتغير قد يظهر كـ undefined أو في TDZ).
 - لازم تعرفها قبل ما تستخدمها.
********************************************************************/
console.log("---- Function Expression Example ----");

// ❌ لو مناديتها قبلها هتجيب Error (لو const/let) أو undefined لو var.
// console.log(add(2,3)); // Error (لو استخدمت const/let)

const add = function (a, b) {
  return a + b;
};
console.log(add(5, 3)); // ✅ 8

/*
🔍 ملاحظات مهمة:
- المتغير add يتعرّف (يُحل) في الذاكرة لكن ما ياخد القيمة إلا عند الوصول لسطر التعريف.
- Function Expression مفيدة لما تحب تمرر الدوال كقيم أو تحفظها في متغيرات/خصائص.
- لو استخدمت var مع expression فالمتغير هيكون موجود بـ undefined قبل التنفيذ.
*/



/********************************************************************
 ✅ 3. Arrow Function (ES6)
 --------------------------------------------------------------------
 - صيغة مختصرة وحديثة للدوال.
 - لا تملك this خاص بها — تأخذ this من السياق الخارجي.
 - لا تملك binding للـ arguments.
********************************************************************/
console.log("---- Arrow Function Example ----");

const multiply = (a, b) => a * b;
console.log(multiply(4, 2)); // ✅ 8

/*
🔹 ملاحظات:
- ممتازة كـ callbacks أو one-liners داخل map/filter.
- لا يمكن استخدامها كـ constructor (new MyArrow() خطأ).
- لا يوجد لديها 'arguments' داخلي (لو محتاج تستخدم 'arguments' استخدم دالة عادية أو rest).
*/



/********************************************************************
 ✅ 4. الفرق بين Regular Function و Arrow Function مع this
 --------------------------------------------------------------------
 - regular function لها this محلية تشير إلى الكائن الذي استُدعت منه (context).
 - arrow function تأخذ this من السياق الخارجي lexical this (لا تعمل كـ method this الخاص).
********************************************************************/
console.log("---- this in Regular vs Arrow Function ----");

const person = {
  name: "Ahmed",

  // Regular function → this يشير للـ person
  regularFunc: function () {
    console.log("Regular:", this.name); // ✅ Ahmed
  },

  // Arrow function → this لا يشير للـ person بل للسياق الخارجي (عادة global/undefined)
  arrowFunc: () => {
    console.log("Arrow:", this.name); // ❌ undefined (in strict modules) أو global name
  },

  // طريقة شائعة لاستخدام arrow داخل method لتجنب تغيير this عند inner callbacks:
  delayedGreeting() {
    setTimeout(() => {
      // هذا الـ arrow يأخذ this من delayedGreeting (أي person)
      console.log("Delayed (arrow) this.name:", this.name);
    }, 10);
  },

  delayedGreetingRegular() {
    setTimeout(function () {
      // هذه الدالة العادية لديها this مختلف → لازم نحفظ this في متغير أو نعمل bind
      console.log("Delayed (regular) this.name:", this.name); // غالبًا undefined
    }, 10);
  },
};

person.regularFunc();
person.arrowFunc();
person.delayedGreeting();
person.delayedGreetingRegular();

/*
🧠 خلاصة:
- استخدم regular function عندما تحتاج this يشير للـ object.
- استخدم arrow عندما تحتاج lexical this (مثلاً داخل callbacks للحفاظ على this).
*/



/********************************************************************
 ✅ 5. Default Parameters
 --------------------------------------------------------------------
 - تعيين قيم افتراضية للـ parameters لتفادي checks داخل الدالة.
********************************************************************/
console.log("---- Default Parameters Example ----");

function greetWithCountry(name = "Guest", country = "Egypt") {
  return `Hello ${name} from ${country}`;
}

console.log(greetWithCountry());               // Hello Guest from Egypt
console.log(greetWithCountry("Sara", "UAE"));  // Hello Sara from UAE



/********************************************************************
 ✅ 6. Rest Parameters (...) vs arguments
 --------------------------------------------------------------------
 - rest params (...args) تتحول لـ Array فعلية.
 - arguments هو object شبيه بالمصفوفة (array-like) متاح في الدوال العادية فقط.
********************************************************************/
console.log("---- Rest Parameters Example ----");

function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// مقارنة مع arguments:
console.log("---- Arguments vs Rest Example ----");

function showArguments() {
  console.log("arguments instanceof Array:", Array.isArray(arguments)); // false
  console.log("arguments:", arguments);
}
showArguments(1, 2, 3);

function showRest(...values) {
  console.log("rest instanceof Array:", Array.isArray(values)); // true
  console.log("rest:", values);
}
showRest(1, 2, 3);

/*
🔍 ملاحظات:
- arguments: لديك وصول لكنه ليس Array حقيقي (لكن له length).
- rest: Array حقيقي يمكنك تشغيل map/filter/reduce عليه مباشرة.
- arrow functions لا تمتلك arguments داخليًا.
*/



/********************************************************************
 ✅ 7. Anonymous & Callback Functions
 --------------------------------------------------------------------
 - anonymous: دالة بدون اسم.
 - callback: دالة تُمرّر كوسيط لدالة أخرى لتنفيذ لاحقًا.
********************************************************************/
console.log("---- Callback Functions Example ----");

function processUserInput(callback) {
  const name = "Ahmed";
  callback(name);
}

// تمرير anonymous function
processUserInput(function (n) {
  console.log("Hello from callback,", n);
});

// تمرير arrow function
processUserInput((n) => console.log("Hello again,", n));



/********************************************************************
 ✅ 8. Function Hoisting Comparison
 --------------------------------------------------------------------
 - function declaration → يتم Hoist بالكامل (الاسم + الجسم).
 - function expression / arrow function → لا يتم Hoist للقيمة.
********************************************************************/
console.log("---- Function Hoisting Comparison ----");

sayHi(); // Works fine because sayHi is declaration
function sayHi() {
  console.log("Hi there!");
}

// sayBye(); // لو حاولت الاستدعاء هنا مع expression → Error
const sayBye = function () {
  console.log("Bye!");
};



/********************************************************************
 ✅ 9. Advanced Hoisting Example (تفصيل الذاكرة)
********************************************************************/
console.log("---- Advanced Hoisting Example ----");

console.log(typeof declared);   // "function"
console.log(typeof expressed);  // "undefined"
// console.log(typeof expressedLet); // لو استخدمت let هنا → ReferenceError (TDZ)

function declared() {}
var expressed = function () {};

/*
📦 Memory Phase (قبل التنفيذ):
  declared → function {...}
  expressed → undefined
  (لو كان let/const متغير → يظهر الاسم لكن في TDZ وغير قابل للوصول)

⚙️ Execution Phase:
  expressed = function {...}
*/



/********************************************************************
 💪 Practice Exercises (تمارين عملية مع حلول مبسطة تحت)
 --------------------------------------------------------------------
 1) اكتب دالة calculateAverage(...nums) تستخدم rest وتعيد المتوسط.
 2) اكتب دالة greetUser(name="Guest", country="Egypt") تعيد رسالة ترحيب.
 3) جرب استدعاء function expression قبل تعريفها ولاحظ النتيجة وعلّق.
 4) اشرح لماذا arrow functions ليس لديها arguments داخليًا (بكلماتك).
********************************************************************/
console.log("---- Practice Exercises ----");

// الحل 1:
function calculateAverage(...nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}
console.log("calculateAverage(10,20,30) =>", calculateAverage(10, 20, 30)); // 20

// الحل 2:
function greetUser(name = "Guest", country = "Egypt") {
  return `Welcome ${name} from ${country}!`;
}
console.log(greetUser("Omar")); // Welcome Omar from Egypt!
console.log(greetUser());       // Welcome Guest from Egypt!

// الحل 3 (تجربة — فك التعليق لتشوف الخطأ):
// console.log(beforeDef(2,3)); // لو جربتها هنا 🔴 هتجيب Error لأن قبل تعريفها ما فيش قيمة
const beforeDef = function (a, b) { return a + b; };
console.log("afterDef beforeDef(2,3) =>", beforeDef(2,3)); // 5

// الحل 4: (تفسير مختصر)
// arrow functions ليس لديها arguments لأن تصميمها جعلها تأخذ السلوك اللِكسيكال (lexical)
// للخصائص مثل this و arguments — أي أنها تعتمد على السياق الخارجي بدلًا من إنشاء scope داخلي خاص بها.



/********************************************************************
 🧩 Quick Summary (ملخّص سريع)
 --------------------------------------------------------------------
 - Declaration → Hoisted (يمكن الاستدعاء قبل التعريف)
 - Expression / Arrow → لا تُ-hoist للقيمة (لا يمكن الاستدعاء قبل التعريف)
 - Arrow → lexical this, no arguments binding
 - rest (...) → Array حقيقية، arguments → array-like
********************************************************************/

console.log("********************************************************************");
console.log("********************************************************************");
console.log("********************************************************************");
console.log("********************************************************************");

