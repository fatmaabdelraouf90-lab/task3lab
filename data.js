// الداتا: Array فيها Objects
const people = [
  { name: "Fatma", age: 22, city: "Cairo" },
  { name: "Ahmed", age: 30, city: "Alexandria" },
  { name: "Sara", age: 25, city: "Giza" },
  { name: "Omar", age: 19, city: "Aswan" },
  { name: "Mona", age: 41, city: "Cairo" },
  { name: "Youssef", age: 28, city: "Mansoura" },
  { name: "Nour", age: 35, city: "Tanta" },
  { name: "Khaled", age: 23, city: "Luxor" }
];

const searchBox = document.getElementById("search");
const tableBody = document.getElementById("tableBody");

let sortBy = null; // بنفتكر آخر ترتيب اختاره المستخدم: "name" أو "age"

// الدالة الرئيسية: بتفلتر + ترتب + ترسم الجدول
function render() {
  const text = searchBox.value.toLowerCase().trim();

  // 1) الفلترة: نحتفظ بالشخص لو أي خاصية فيه فيها الكلمة
  let list = people.filter(function (p) {
    return p.name.toLowerCase().includes(text) ||
           String(p.age).includes(text) ||
           p.city.toLowerCase().includes(text);
  });

  // 2) الترتيب (على القايمة المفلترة)
  if (sortBy === "name") {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else if (sortBy === "age") {
    list.sort(function (a, b) { return a.age - b.age; });
  }

  // 3) الرسم: بنبني كل صف بالـ JavaScript
  tableBody.innerHTML = "";
  list.forEach(function (p) {
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + p.name + "</td><td>" + p.age + "</td><td>" + p.city + "</td>";
    tableBody.appendChild(row);
  });

  // لو مفيش نتايج
  if (list.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="3">No results found.</td></tr>';
  }
}

// حدث input: بيشتغل مع كل حرف بيتكتب (من غير زرار)
searchBox.addEventListener("input", render);

// زراير الترتيب
document.getElementById("sortName").addEventListener("click", function () {
  sortBy = "name";
  render();
});
document.getElementById("sortAge").addEventListener("click", function () {
  sortBy = "age";
  render();
});

// أول ما الصفحة تفتح نعرض الجدول
render();