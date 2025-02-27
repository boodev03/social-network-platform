# Social Media Frontend

## Giới thiệu

Đây là dự án frontend cho ứng dụng mạng xã hội, được xây dựng bằng React, TypeScript và Tailwind CSS. Dự án này sử dụng Vite làm công cụ build và các thành phần UI từ thư viện Shadcn UI.

## Cấu trúc dự án

```
social-media-FE/
├── src/                      # Thư mục chứa mã nguồn
│   ├── components/           # Các thành phần UI
│   │   ├── auth/             # Các thành phần liên quan đến xác thực
│   │   ├── home/             # Các thành phần cho trang chủ
│   │   ├── layout/           # Các thành phần bố cục (Layout)
│   │   ├── profile/          # Các thành phần cho trang cá nhân
│   │   └── ui/               # Các thành phần UI cơ bản từ Shadcn
│   ├── constants/            # Các hằng số
│   │   └── routes.ts         # Định nghĩa các đường dẫn
│   ├── lib/                  # Thư viện và tiện ích
│   │   └── utils.ts          # Các hàm tiện ích
│   ├── App.tsx               # Component chính, quản lý routing
│   ├── index.css             # CSS toàn cục
│   └── main.tsx              # Điểm khởi đầu ứng dụng
├── public/                   # Tài nguyên tĩnh
├── index.html                # File HTML gốc
├── package.json              # Cấu hình npm và dependencies
└── vite.config.ts            # Cấu hình Vite
```

## Cấu trúc routing

Ứng dụng sử dụng React Router để quản lý routing với các đường dẫn chính:

- `/` - Trang chủ (HomePage): Hiển thị feed chính
- `/welcome` - Trang giới thiệu (LandingPage): Trang đầu tiên người dùng thấy khi chưa đăng nhập
- `/auth/sign-in` - Trang đăng nhập
- `/auth/sign-up` - Trang đăng ký
- `/profile` - Trang cá nhân: Hiển thị thông tin người dùng

## Thành phần chính

### Layout

`Layout.tsx` là thành phần bố cục chính, bao gồm:

- Sidebar bên trái với các nút điều hướng
- Dropdown menu cho hồ sơ người dùng
- Vùng nội dung chính ở giữa

### Trang chủ (HomePage)

Hiện tại là một placeholder đơn giản hiển thị "Home". Sẽ được phát triển thành feed chính với các bài đăng.

### Trang cá nhân (ProfilePage)

Hiện tại là một placeholder đơn giản hiển thị "Profile". Sẽ được phát triển để hiển thị thông tin người dùng, bài đăng và hoạt động.

### Thành phần UI

Dự án sử dụng các thành phần từ Shadcn UI, được tùy chỉnh trong thư mục `components/ui/`. Các thành phần này bao gồm:

- Button
- Card
- Dropdown Menu
- Input
- Label
- và các thành phần khác

## Hướng dẫn phát triển

1. **Cài đặt dependencies**:

   ```bash
   npm install
   ```

2. **Chạy môi trường phát triển**:

   ```bash
   npm run dev
   ```

3. **Build cho production**:
   ```bash
   npm run build
   ```

## Quy ước code

- Sử dụng TypeScript cho tất cả các file
- Sử dụng Tailwind CSS cho styling
- Sử dụng các hằng số từ `constants/routes.ts` cho routing
- Tổ chức components theo tính năng (auth, home, profile, v.v.)
- Sử dụng Lucide React cho icons

## Nhiệm vụ hiện tại

- Phát triển trang chủ với feed bài đăng
- Hoàn thiện trang cá nhân với thông tin người dùng
- Tích hợp chức năng đăng nhập/đăng ký
- Thêm chức năng tạo bài đăng mới

---

Dự án được phát triển bởi [Tên team/công ty của bạn].
