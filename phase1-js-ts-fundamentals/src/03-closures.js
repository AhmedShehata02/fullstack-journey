/********************************************************************
 🧩 LESSON 3 — CLOSURES, SCOPE CHAIN & EXECUTION STACK
 📘 الهدف:
 - تفهّم إزاي JavaScript بتنفّذ الكود فعليًا (Execution Context)
 - تفهم فكرة الـ Scope Chain (سلسلة الوصول)
 - تتقن مفهوم الـ Closure (وهو واحد من أهم مفاهيم JS)
********************************************************************/


/********************************************************************
 ✅ 1. مقدمة — كيف بتنفّذ JavaScript الكود؟
 --------------------------------------------------------------------
 أي برنامج JavaScript بيتنفذ على مرحلتين داخل ما يسمى:

 👉 Execution Context (سياق التنفيذ)

 وكل Execution Context بيتكوّن من مرحلتين:
 1️⃣ Creation Phase (مرحلة الإنشاء)
   - بيتم فيها إنشاء الـ Scope
   - وتسجيل المتغيرات والدوال في الذاكرة
 2️⃣ Execution Phase (مرحلة التنفيذ)
   - الكود بيتنفذ فعليًا خطوة بخطوة

 وكل دالة جديدة بتُنشئ Execution Context جديد خاص بيها.
********************************************************************/

console.log("---- 1. Execution Context ----");

function outer() {
  console.log("Inside outer()");
  inner(); // نداء لدالة داخلية

  function inner() {
    console.log("Inside inner()");
  }
}

outer();

/*
🧠 تحت الكواليس:
- JavaScript بتبدأ بإنشاء Global Execution Context.
- لما تنادي outer() → بيُنشأ Execution Context جديد خاص بالدالة.
- داخل outer() لما تنادي inner() → بيتعمل Context جديد لها كمان.
*/


/********************************************************************
 ✅ 2. Scope & Scope Chain
 --------------------------------------------------------------------
 - Scope = "النطاق" أو "المدى" اللي بيحدد منين تقدر تشوف المتغير.
 - Scope Chain = سلسلة الربط بين الـ Scopes للوصول للمتغيرات.
********************************************************************/

console.log("---- 2. Scope Chain Example ----");

let globalVar = "🌍 Global";

function firstLevel() {
  let firstVar = "1️⃣ First Level";

  function secondLevel() {
    let secondVar = "2️⃣ Second Level";

    console.log(globalVar);  // ✅ يشوف من الـ global scope
    console.log(firstVar);   // ✅ يشوف من الـ parent scope
    console.log(secondVar);  // ✅ يشوف من نفس الـ scope
  }

  secondLevel();
}

firstLevel();

/*
🔍 المبدأ:
- لو متغير مش موجود في الـ scope الحالي،
  JS بتدور عليه في الـ scope الأعلى (parent),
  وهكذا لحد الـ global.

ده اسمه 🔗 Scope Chain.
*/


/********************************************************************
 ✅ 3. Lexical Scope
 --------------------------------------------------------------------
 - الكلمة "Lexical" معناها إن الـ scope بيتحدد أثناء كتابة الكود،
   مش أثناء التشغيل.
********************************************************************/

console.log("---- 3. Lexical Scope Example ----");

function outerFunc() {
  const outerMsg = "I'm outer variable";

  function innerFunc() {
    console.log(outerMsg); // ✅ شايف المتغير اللي في outerFunc
  }

  return innerFunc;
}

const fn = outerFunc();
fn(); // ✅ still remembers outerMsg even بعد انتهاء outerFunc!

/*
🧠 ده هو أساس الـ Closure:
الدالة بتتذكر المتغيرات اللي كانت حوالينها وقت إنشائها،
حتى بعد انتهاء الـ scope الأصلي.
*/


/********************************************************************
 ✅ 4. Closures (الإغلاق)
 --------------------------------------------------------------------
 - Closure = لما دالة "تحتفظ" بالوصول إلى متغيرات خارج نطاقها.
 - مثال كلاسيكي جدًا 👇
********************************************************************/

console.log("---- 4. Closure Example ----");

function makeCounter() {
  let count = 0; // متغير خاص داخل الدالة

  return function () {
    count++;
    console.log("Current count:", count);
  };
}

const counter1 = makeCounter();
counter1(); // 1
counter1(); // 2
counter1(); // 3

const counter2 = makeCounter();
counter2(); // 1 (مستقل عن الأول)

/*
🧠 لاحظ:
كل نداء لـ makeCounter() بيكوّن بيئة مستقلة فيها متغير count خاص بيها.
كل closure بيفضل محتفظ بنسخته الخاصة من count.
*/


/********************************************************************
 ✅ 5. Practical Example — Private Variables (باستخدام Closures)
 --------------------------------------------------------------------
 Closures بتسمحلك تعمل data hiding (زي private fields في OOP)
********************************************************************/

console.log("---- 5. Closure for Private Data ----");

function createUser(name) {
  let balance = 0; // متغير خاص

  return {
    getName: () => name,
    deposit: (amount) => (balance += amount),
    getBalance: () => balance,
  };
}

const user1 = createUser("Ahmed");
user1.deposit(100);
console.log(user1.getName(), "balance:", user1.getBalance()); // Ahmed balance: 100

const user2 = createUser("Mona");
console.log(user2.getBalance()); // 0 (منفصل تمامًا)

/*
💡 الفكرة:
المتغير balance "خاص" لا يمكن الوصول له من الخارج،
لكن الدوال الداخلية (closures) تقدر تشوفه وتعدّل عليه.
*/


/********************************************************************
 ✅ 6. Closures inside loops (مشكلة var)
 --------------------------------------------------------------------
 - عند استخدام var داخل loop، كل الدوال بتشير لنفس المتغير.
 - الحل → استخدام let (لكل دورة نسخة جديدة).
********************************************************************/

console.log("---- 6. Closure in Loops ----");

// ❌ باستخدام var → الكل هيتطبع آخر قيمة فقط
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var loop i:", i), 10);
}

// ✅ باستخدام let → كل واحدة ليها نسخة خاصة
for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log("let loop j:", j), 10);
}

/*
📦 ليه كده؟
- var بيكون له Scope واحد على مستوى الدالة.
- let بيعمل Scope جديد في كل iteration.
*/


/********************************************************************
 ✅ 7. Execution Stack Visualization (تخيل التنفيذ)
 --------------------------------------------------------------------
 JS تستخدم Stack (المكدس) لتتبع التنفيذ:
 - Global context يدخل الأول
 - كل دالة جديدة تدخل فوقه
 - بعد انتهاء الدالة → تخرج من الـ stack
********************************************************************/

console.log("---- 7. Execution Stack Simulation ----");

function A() {
  console.log("Inside A");
  B();
}
function B() {
  console.log("Inside B");
  C();
}
function C() {
  console.log("Inside C");
}

A();

/*
🧠 Stack وقت التنفيذ:
  |   |
  | C | ← تنفيذ C()
  | B |
  | A |
  | Global |
*/


/********************************************************************
 ✅ 8. Mini Project — Counter with Reset & Private State
 --------------------------------------------------------------------
 تمرين على الـ Closures + Scope
********************************************************************/

console.log("---- 8. Mini Project: Counter ----");

function createAdvancedCounter() {
  let value = 0;

  return {
    inc: () => ++value,
    dec: () => --value,
    reset: () => (value = 0),
    get: () => value,
  };
}

const counter = createAdvancedCounter();
counter.inc();
counter.inc();
console.log("Counter value:", counter.get()); // 2
counter.reset();
console.log("Counter after reset:", counter.get()); // 0


/********************************************************************
 💪 تمارين عملية (جرب بنفسك)
 --------------------------------------------------------------------
 1️⃣ اكتب دالة makeMultiplier(n) تعيد دالة تضرب أي رقم في n.
     const double = makeMultiplier(2);
     console.log(double(5)); // 10

 2️⃣ اكتب createBankAccount() فيها:
     - deposit(amount)
     - withdraw(amount)
     - getBalance()
     (كلهم يستخدموا closure عشان يحافظوا على الرصيد)

 3️⃣ جرّب تعمل loop بـ var و let وشوف الفرق في closure.

 4️⃣ اشرح لنفسك بصوت عالي: ليه closure مهم في React أو Node.js؟
********************************************************************/


/********************************************************************
 🧩 Quick Summary
 --------------------------------------------------------------------
 ✅ Execution Context → كل دالة ليها بيئة تنفيذ مستقلة
 ✅ Scope Chain → البحث عن المتغيرات يتم من الداخل للخارج
 ✅ Lexical Scope → بيتحدد وقت كتابة الكود، مش وقت التشغيل
 ✅ Closure → الدالة تتذكر بيئتها الأصلية حتى بعد انتهاء التنفيذ
 ✅ Useful for: data hiding, counters, event handlers, async logic
********************************************************************/
