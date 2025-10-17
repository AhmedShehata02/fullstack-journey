/********************************************************************
 🧩 LESSON 3 — ASYNC, AWAIT, PROMISES & EVENT LOOP
 📘 الهدف:
 فهم كيفية تنفيذ JavaScript للعمليات غير المتزامنة (Asynchronous)
 وتعلم استخدام Promise و async/await بشكل عملي.
********************************************************************/


/********************************************************************
 ✅ 1. Synchronous vs Asynchronous
 --------------------------------------------------------------------
 - JavaScript لغة single-threaded (يعني بتنّفذ سطر بس في كل لحظة).
 - أي كود عادي بيتنفذ بالترتيب (Synchronous).
 - لكن بعض العمليات (زي الشبكة أو التايمر) بتشتغل بشكل غير متزامن
   عن طريق الـ Web APIs → Event Loop → Callback Queue.
********************************************************************/

console.log("---- 1. Sync vs Async ----");

console.log("Start");

setTimeout(() => console.log("Async: setTimeout done ✅"), 1000);

console.log("End");

/*
النتيجة:
Start
End
Async: setTimeout done ✅

🧠 ليه؟ لأن setTimeout بيروح للـ Web API، وبيتنفذ بعد باقي الكود.
*/


/********************************************************************
 ✅ 2. The Event Loop (حلقة الأحداث)
 --------------------------------------------------------------------
 - هي الآلية اللي بتخلي JS تشتغل كأنها "متعددة المهام".
 - أي كود async بيروح للـ Web APIs.
 - لما يخلص، بيرجع للـ Callback Queue.
 - الـ Event Loop بينقله من الـ Queue إلى الـ Call Stack لما تفضى.
********************************************************************/

console.log("---- 2. Event Loop Visualization ----");

console.log("1️⃣ First log");

setTimeout(() => console.log("2️⃣ Timeout finished"), 0);

console.log("3️⃣ Last log");

/*
🔍 التنفيذ:
 1️⃣ → يدخل الـ Stack ويتنفذ فورًا.
 2️⃣ → يتحط في Web API.
 3️⃣ → يتحط في Queue بعد ما الكود الأساسي يخلص.
*/


/********************************************************************
 ✅ 3. Promises — حل مشكلة "Callback Hell"
 --------------------------------------------------------------------
 Promise = كائن يمثل عملية قد تكتمل في المستقبل أو تفشل.
********************************************************************/

console.log("---- 3. Promises ----");

const fetchData = (success) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve("✅ Data loaded!") : reject("❌ Error loading data!");
    }, 1000);
  });

fetchData(true)
  .then((data) => console.log("Promise resolved:", data))
  .catch((err) => console.log("Promise rejected:", err))
  .finally(() => console.log("Promise finished"));

/*
🧠 الحالات:
 - Pending → العملية لسه شغالة
 - Fulfilled → تمت بنجاح (resolve)
 - Rejected → فشلت (reject)
*/


/********************************************************************
 ✅ 4. Chaining Promises
 --------------------------------------------------------------------
 ممكن نربط ورا بعض .then() علشان ننفذ أكتر من خطوة بالتسلسل.
********************************************************************/

console.log("---- 4. Promise Chaining ----");

fetchData(true)
  .then((msg) => {
    console.log(msg);
    return "➡ Next step after data";
  })
  .then((step) => console.log(step))
  .catch((err) => console.log("Error:", err));


/********************************************************************
 ✅ 5. async / await
 --------------------------------------------------------------------
 - أسلوب أحدث (ES8) بيخلي الكود الأسنكرون شكله شبه الكود العادي.
 - await لازم تستخدمها جوا دالة متعرفة بـ async.
********************************************************************/

console.log("---- 5. async / await ----");

async function loadData() {
  console.log("Fetching...");
  try {
    const result = await fetchData(true);
    console.log("Result:", result);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Done!");
  }
}

loadData();

/*
💡 await بتوقف التنفيذ مؤقتًا لحد ما الـ Promise يخلص.
الكود بيبان كأنه متزامن بس فعليًا هو async بالكامل.
*/


/********************************************************************
 ✅ 6. Error Handling in async/await
 --------------------------------------------------------------------
 - نستخدم try/catch بدل .catch()
********************************************************************/

console.log("---- 6. async/await Error Handling ----");

async function loadWithError() {
  try {
    const data = await fetchData(false);
    console.log(data);
  } catch (error) {
    console.error("Caught error:", error);
  }
}

loadWithError();


/********************************************************************
 ✅ 7. Parallel Execution — Promise.all
 --------------------------------------------------------------------
 - لتشغيل أكتر من عملية async في نفس الوقت.
 - Promise.all ينتظر كل الوعود مع بعض.
********************************************************************/

console.log("---- 7. Promise.all ----");

const task1 = fetchData(true);
const task2 = fetchData(true);
const task3 = fetchData(true);

Promise.all([task1, task2, task3])
  .then((res) => console.log("All done:", res))
  .catch((err) => console.log("One failed:", err));


/********************************************************************
 ✅ 8. Promise.race
 --------------------------------------------------------------------
 - بتاخد أول Promise يخلص سواء نجح أو فشل.
********************************************************************/

console.log("---- 8. Promise.race ----");

const fast = new Promise((res) => setTimeout(() => res("🚀 Fast!"), 300));
const slow = new Promise((res) => setTimeout(() => res("🐢 Slow!"), 1000));

Promise.race([fast, slow]).then((result) => console.log(result));


/********************************************************************
 ✅ 9. Practical Example — Fetch API (محاكاة)
 --------------------------------------------------------------------
 مثال يشبه استدعاء API حقيقي.
********************************************************************/

console.log("---- 9. Practical Example ----");

async function getUser() {
  console.log("Loading user...");
  const user = await fetchData(true);
  console.log("User loaded:", user);
}

getUser();

/*
🧠 في الواقع، هنستخدم:
  const res = await fetch("https://api.example.com/user");
  const data = await res.json();
*/


/********************************************************************
 ✅ 10. Event Loop & Microtasks (Promises vs setTimeout)
 --------------------------------------------------------------------
 Promises بتتنفذ في الـ Microtask Queue
 setTimeout في الـ Macrotask Queue
********************************************************************/

console.log("---- 10. Microtasks vs Macrotasks ----");

setTimeout(() => console.log("Timeout callback"), 0);
Promise.resolve().then(() => console.log("Promise callback"));

console.log("Main script end");

/*
🧠 الترتيب الفعلي:
 Main script end
 Promise callback
 Timeout callback
*/


/********************************************************************
 💪 تمارين عملية
 --------------------------------------------------------------------
 1️⃣ اكتب async function تجيب بيانات مستخدم من API (باستخدام fetch).
 2️⃣ جرّب Promise.all و Promise.race مع دوال وهمية بتاخد وقت مختلف.
 3️⃣ اعمل دالة بتستخدم try/catch جوه async لتتعامل مع أخطاء الشبكة.
 4️⃣ جرّب بنفسك مقارنة التنفيذ بين setTimeout و Promise.resolve().
********************************************************************/


/********************************************************************
 🧩 Quick Summary
 --------------------------------------------------------------------
 ✅ JS بتنفذ كود واحد في كل لحظة (single-threaded)
 ✅ Async operations بتروح للـ Web APIs
 ✅ Event Loop بيسمح بتعدد المهام الظاهري
 ✅ Promise → تمثل عملية مستقبلية (resolve/reject)
 ✅ async/await → Syntax أنظف لكتابة الكود غير المتزامن
 ✅ Promise.all → تنتظر الكل
 ✅ Promise.race → أول واحد يخلص
 ✅ Microtasks (Promises) تسبق Macrotasks (setTimeout)
********************************************************************/
