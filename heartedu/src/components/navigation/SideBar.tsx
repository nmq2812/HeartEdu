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
import { useAuthStore } from '@/utils/SigninState';
import { MOBILE_WIDTH } from '@/app/globalConst';

const { Sider } = Layout;

const SidebarNav = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { setLogout, setLogin, isLoggedIn, accountLevel } = useAuthStore();
    const username = 'quan';

    const [windowWidth, setWindowWidth] = useState(0);

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

    if (windowWidth < MOBILE_WIDTH)
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link href="/">Home</Link>
                    </Menu.Item>
                    {isLoggedIn && accountLevel > 0 && (
                        <Menu.Item key="2" icon={<BookOutlined />}>
                            <Link href="/courses">Quản lý khóa học</Link>
                        </Menu.Item>
                    )}
                    {isLoggedIn && accountLevel > 1 && (
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link href="/students">Quản lý học sinh</Link>
                        </Menu.Item>
                    )}
                    {isLoggedIn && accountLevel > 1 && (
                        <Menu.Item key="4" icon={<LoginOutlined />}>
                            <Link href="/courses">Quản lý môn học</Link>
                        </Menu.Item>
                    )}
                    {!isLoggedIn && (
                        <Menu.Item key="5" icon={<LogoutOutlined />}>
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
    else return;
};

export default SidebarNav;
