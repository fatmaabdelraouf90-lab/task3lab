// بنجيب الفورم من الصفحة
const form = document.getElementById("regForm");

// دالة بتعرض رسالة الخطأ تحت الحقل (أو تمسحها لو الرسالة فاضية)
function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", message !== "");
}

// الكود ده بيشتغل لما المستخدم يدوس Sign up
form.addEventListener("submit", function (event) {
  event.preventDefault(); // يمنع إرسال الفورم/إعادة تحميل الصفحة

  // بناخد القيم (trim بتشيل المسافات من الأول والآخر)
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const age = document.getElementById("age").value;

  let valid = true; // نفترض إن كله صح، ولو لقينا غلط نخليها false

  // الاسم
  if (name === "") {
    setError("name", "Name is required.");
    valid = false;
  } else {
    setError("name", "");
  }

  // الإيميل: pattern بسيط = حاجة@حاجة.حاجة
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError("email", "Enter a valid email like name@example.com.");
    valid = false;
  } else {
    setError("email", "");
  }

  // الباسورد
  if (password.length < 8) {
    setError("password", "Password must be at least 8 characters.");
    valid = false;
  } else {
    setError("password", "");
  }

  // تأكيد الباسورد
  if (confirm === "" || confirm !== password) {
    setError("confirm", "Passwords do not match.");
    valid = false;
  } else {
    setError("confirm", "");
  }

  // السن: لازم رقم صحيح بين 1 و120
  const ageNumber = Number(age);
  if (age === ""  !Number.isInteger(ageNumber)  ageNumber < 1 || ageNumber > 120) {
    setError("age", "Age must be a whole number between 1 and 120.");
    valid = false;
  } else {
    setError("age", "");
  }

  // لو كله صح نعرض رسالة نجاح، لو لأ نمسحها
  document.getElementById("success").textContent = valid ? "Registration successful!" : "";
});