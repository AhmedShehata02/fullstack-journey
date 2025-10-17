/********************************************************************
 🧩 LESSON 1 — VARIABLES, SCOPE & HOISTING
 📘 الهدف:
 فهم طريقة تعامل JavaScript مع الذاكرة (Memory) والمتغيرات (Variables)
********************************************************************/


/********************************************************************
 ✅ 1. المتغيرات (Variables)
 --------------------------------------------------------------------
 - المتغير = صندوق بنخزن فيه قيمة علشان نستخدمها لاحقًا.
 - JavaScript بتتعامل مع المتغير كـ "اسم في الذاكرة" له قيمة.
********************************************************************/
console.log("---- Variables Example ----");

// ✅ 3 طرق للتعريف:
var oldName = "Ali";      // الطريقة القديمة (قبل ES6)
let modernName = "Ahmed"; // الطريقة الحديثة (من ES6)
const pi = 3.14;          // ثابت (لا يمكن تغيير قيمته بعد التعريف)

console.log(oldName);     // Ali
console.log(modernName);  // Ahmed
console.log(pi);          // 3.14


/********************************************************************
 ✅ 2. الفرق بين var / let / const
 --------------------------------------------------------------------
 الفرق بيظهر في:
   1️⃣ النطاق (Scope)
   2️⃣ طريقة التعامل في الذاكرة (Hoisting)
********************************************************************/
console.log("---- var vs let vs const ----");

// 🔹 var → له Function Scope فقط (مش Block Scope)
if (true) {
  var city = "Cairo";
}
console.log(city); // ✅ Cairo (متاحة خارج الـ if)

// 🔹 let → له Block Scope (محصور داخل الأقواس {})
if (true) {
  let country = "Egypt";
}
// console.log(country); // ❌ Error: country is not defined

// 🔹 const → نفس سلوك let لكن القيمة لا تتغير بعد تعريفها
const appName = "FullStack Journey";
// appName = "Another"; // ❌ Error: Assignment to constant variable.


/********************************************************************
 ✅ 3. أنواع الـ Scope
 --------------------------------------------------------------------
 🔸 Global Scope  → متاح في أي مكان في الكود.
 🔹 Function Scope → متاح فقط داخل الدالة.
 🔸 Block Scope   → متاح فقط داخل {}.
********************************************************************/
console.log("---- Scope Example ----");

// 🌐 متغير عام (Global)
let globalVar = "I'm Global!";

function testScope() {
  // 🔹 Function Scope
  let localVar = "I'm Local!";
  console.log(globalVar); // ✅ متاح داخل الدالة
  console.log(localVar);  // ✅ متاح داخل الدالة فقط
}

testScope();
// console.log(localVar); // ❌ Error: localVar is not defined


/********************************************************************
 ✅ 4. Hoisting (الرفع)
 --------------------------------------------------------------------
 💡 قبل تنفيذ الكود، JavaScript بتعمل ما يسمى بـ "Memory Creation Phase"
   - بتسجل أسماء المتغيرات والدوال في الذاكرة.
   - "var" بيُسجل بقيمة مبدئية undefined.
   - "let" و "const" بيتسجلوا لكن بيبقوا في منطقة اسمها TDZ
     (Temporal Dead Zone) → ممنوع الوصول ليهم قبل التعريف.
********************************************************************/
console.log("---- Hoisting Example ----");

console.log(hoistedVar); // ✅ undefined (لأن var اتعمله hoisting)
var hoistedVar = "Hello Var!";

// console.log(hoistedLet); // ❌ ReferenceError (TDZ)
let hoistedLet = "Hello Let!";

// console.log(hoistedConst); // ❌ ReferenceError (TDZ)
const hoistedConst = "Hello Const!";


/********************************************************************
 ✅ 5. Execution Context & Memory
 --------------------------------------------------------------------
 💡 عند تشغيل الكود:
   1️⃣ JavaScript بتنشئ "Global Execution Context" (GEC)
   2️⃣ كل دالة لما تتنفذ → بيُنشأ "Function Execution Context" (FEC) جديد
   3️⃣ كل Context ليه مرحلتين:
        🧠 Memory Phase → تخصيص الذاكرة (Hoisting)
        ⚙️ Execution Phase → تشغيل الكود خطوة بخطوة
********************************************************************/
console.log("---- Execution Context Example ----");

var movie = "Inception";

function playMovie() {
  var actor = "DiCaprio";
  console.log("Now playing:", movie, "starring", actor);
}

playMovie();

/*
🔍 وراء الكواليس في الذاكرة:

📦 Global Memory Phase:
   movie       → undefined
   playMovie   → function {...}

⚙️ Execution Phase:
   movie = "Inception"
   playMovie() يتم استدعاؤها ⤵
     → إنشاء Function Execution Context جديد:
         actor → undefined
     → ثم تشغيل الكود داخلها:
         actor = "DiCaprio"
         console.log(...) → Now playing: Inception starring DiCaprio
*/


/********************************************************************
 🧩 ملخص الدرس:
 --------------------------------------------------------------------
 ✅ var → Function Scope + بيتعمله Hoisting (قيمته undefined)
 ✅ let / const → Block Scope + بيقعوا في TDZ قبل تعريفهم
 ✅ Hoisting → JavaScript بترفع التعريفات قبل التنفيذ
 ✅ Execution Context → كل دالة ليها بيئة تنفيذ مستقلة
********************************************************************/

/********************************************************************
🧠 شرح إضافي (بالعربي البسيط):
--------------------------------------------------------------------
لما JavaScript تبدأ تقرأ الملف، ما بتنفذش فورًا،
لكن الأول بتعمل تحليل مبدأي (Memory Creation Phase)
وبتحجز أماكن لكل var و function.

الفرق الجوهري:

var بيكون موجود في الذاكرة بقيمة undefined.

let و const موجودين لكن مش متاحين (في TDZ).

function declaration بيتخزن ككل في الذاكرة (بجسمها كامل).

لما تيجي مرحلة التنفيذ، الكود بيتنفذ سطر بسطر،
ولو المتغير في TDZ → هيديلك ReferenceError.
********************************************************************/