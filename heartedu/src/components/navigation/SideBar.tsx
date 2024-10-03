'use client';

import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import {
    UserOutlined,
    BookOutlined,
    LoginOutlined,
    LogoutOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import useRouter
import { useAuthStore } from '@/store/SigninState';

const { Sider } = Layout;

const SidebarNav = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { setLogout, setLogin, isLoggedIn, accountLevel } = useAuthStore();
    const username = 'quan';
    const [windowWidth, setWindowWidth] = useState(0);
    const pathName = usePathname(); // Sử dụng useRouter để lấy thông tin về URL hiện tại

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Hàm cập nhật kích thước cửa sổ
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            // Gọi hàm khi component mount
            handleResize();

            // Thêm event listener để theo dõi khi cửa sổ thay đổi kích thước
            window.addEventListener('resize', handleResize);

            // Cleanup khi component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Tạo selectedKey dựa trên đường dẫn hiện tại
    const selectedKey = () => {
        switch (pathName) {
            case '/':
                return '1';
            case '/courses':
                return '2';
            case '/teachers':
                return '3';
            case '/students':
                return '4';
            default:
                return '0';
        }
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            style={{ minHeight: '100vh' }}
        >
            <div
                className="logo flex justify-center text-center"
                style={{
                    height: '32px',
                    margin: '16px',
                    color: 'white',
                    cursor: 'pointer',
                }}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <MenuUnfoldOutlined /> : <h3>HeartEdu</h3>}
            </div>
            {/* Cập nhật selectedKeys để khớp với URL */}
            <Menu theme="dark" mode="inline" selectedKeys={[selectedKey()]}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link href="/">Home</Link>
                </Menu.Item>
                {isLoggedIn && accountLevel > 0 && (
                    <Menu.Item key="2" icon={<BookOutlined />}>
                        <Link href="/courses">Quản lý khóa học</Link>
                    </Menu.Item>
                )}
                {isLoggedIn && accountLevel > 0 && (
                    <Menu.Item key="3" icon={<BookOutlined />}>
                        <Link href="/teachers">Quản lý giảng viên</Link>
                    </Menu.Item>
                )}
                {isLoggedIn && accountLevel > 1 && (
                    <Menu.Item key="4" icon={<UserOutlined />}>
                        <Link href="/students">Quản lý học sinh</Link>
                    </Menu.Item>
                )}

                {!isLoggedIn && (
                    <Menu.Item key="5" icon={<LoginOutlined />}>
                        <Link href="/" onClick={() => setLogin(username)}>
                            Đăng nhập
                        </Link>
                    </Menu.Item>
                )}
                {isLoggedIn && (
                    <Menu.Item key="6" icon={<LogoutOutlined />}>
                        <Link href="/" onClick={() => setLogout()}>
                            Đăng xuất
                        </Link>
                    </Menu.Item>
                )}
            </Menu>
        </Sider>
    );
};

export default SidebarNav;
