document.addEventListener("DOMContentLoaded", function () {
  // Xử lý đăng nhập
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Kiểm tra thông tin đăng nhập
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "index.html";
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    });
  }

  // Xử lý đăng ký
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirmPassword =
        document.getElementById("regConfirmPassword").value;
      const phone = document.getElementById("regPhone").value;
      const address = document.getElementById("regAddress").value;

      // Kiểm tra mật khẩu
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }

      // Kiểm tra email đã tồn tại chưa
      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((u) => u.email === email)) {
        alert("Email đã được sử dụng!");
        return;
      }

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Đăng ký thành công! Bạn đã được đăng nhập tự động.");
      window.location.href = "index.html";
    });
  }
});
// Thêm hàm xử lý đăng xuất với xác nhận
function handleLogout() {
  const customConfirm = document.getElementById("customConfirm");
  const confirmCancel = document.querySelector(".confirm-btn-cancel");
  const confirmOk = document.querySelector(".confirm-btn-ok");

  // Hiển thị hộp thoại xác nhận tùy chỉnh
  customConfirm.style.display = "flex";

  // Xử lý khi nhấn hủy
  confirmCancel.addEventListener("click", function () {
    customConfirm.style.display = "none";
  });

  // Xử lý khi nhấn đăng xuất
  confirmOk.addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    customConfirm.style.display = "none";
    window.location.href = "index.html";
  });

  // Đóng khi click bên ngoài
  customConfirm.addEventListener("click", function (e) {
    if (e.target === customConfirm) {
      customConfirm.style.display = "none";
    }
  });
}

// Cập nhật phần kiểm tra trạng thái đăng nhập trong main.js
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.querySelector('nav ul li a[href="login.html"]');
  const registerLink = document.querySelector(
    'nav ul li a[href="register.html"]'
  );

  if (user) {
    if (loginLink) loginLink.textContent = user.name;
    if (registerLink) registerLink.textContent = "Đăng xuất";

    // Thêm sự kiện đăng xuất với xác nhận
    if (registerLink) {
      registerLink.href = "#";
      registerLink.addEventListener("click", function (e) {
        e.preventDefault();
        handleLogout();
      });
    }
  }
}
// Trong phần đăng ký, cập nhật tạo user mới
const newUser = {
  id: Date.now(),
  name,
  email,
  password,
  phone,
  address,
  avatar: "images/avatar-placeholder.png", // Thêm avatar mặc định
  addresses: [], // Thêm mảng địa chỉ
};
