// Hiển thị sản phẩm nổi bật trên trang chủ
document.addEventListener("DOMContentLoaded", function () {
  // Giả lập dữ liệu sản phẩm
  const featuredProducts = [
    {
      id: 1,
      name: "Bộ dụng cụ đa năng 32 chi tiết",
      price: 350000,
      image: "../img/DaNang32ChiTiet.jpg",
      category: "tools",
    },
    {
      id: 2,
      name: "Máy khoan động lực Bosch",
      price: 1250000,
      image: "../img/KhoanBosch.jpg",
      category: "power-tools",
    },
    {
      id: 3,
      name: "Bình xịt sơn cao cấp",
      price: 280000,
      image: "../img/BinhXitSon.jpg",
      category: "paint",
    },
    {
      id: 4,
      name: "Bộ cờ lê đầu miệng",
      price: 420000,
      image: "../img/CoLeDauMieng.jpg",
      category: "tools",
    },
  ];

  const productsContainer = document.getElementById("featured-products");

  if (productsContainer) {
    featuredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${product.price.toLocaleString()}đ</p>
                    <button class="btn add-to-cart" data-id="${
                      product.id
                    }">Thêm vào giỏ</button>
                </div>
            `;
      productsContainer.appendChild(productElement);
    });
  }

  // Kiểm tra trạng thái đăng nhập
  checkLoginStatus();
});

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginLink = document.querySelector('nav ul li a[href="login.html"]');
  const registerLink = document.querySelector(
    'nav ul li a[href="register.html"]'
  );

  if (user) {
    if (loginLink) {
      loginLink.textContent = user.name;
      loginLink.href = "profile.html"; // Có thể thêm trang profile sau
    }
    if (registerLink) registerLink.textContent = "Đăng xuất";

    if (registerLink) {
      // Thay đổi href thành # để không bị chuyển trang, và thêm sự kiện click
      registerLink.removeAttribute("href");
      registerLink.addEventListener("click", function (e) {
        e.preventDefault(); // Ngừng hành động mặc định
        handleLogout();
      });
    }
  } else {
    if (loginLink) {
      loginLink.textContent = "Đăng nhập";
      loginLink.href = "login.html";
    }
    if (registerLink) {
      registerLink.textContent = "Đăng ký";
      registerLink.href = "register.html";
      registerLink.removeEventListener("click", handleLogout);
    }
  }
}

// Hàm xử lý đăng xuất
function handleLogout() {
  // Xóa thông tin người dùng trong localStorage
  localStorage.removeItem("currentUser");

  // Cập nhật lại giao diện sau khi đăng xuất
  checkLoginStatus();

  // Chuyển hướng đến trang đăng nhập hoặc trang chủ
  window.location.href = "login.html";
}
