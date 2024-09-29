'use client';
import { Menu, Dropdown, Avatar, Badge } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import Link from 'next/link';

const UtilityNav = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link href="/profile">Tài khoản của tôi</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>
                <Link href="/settings">Cài đặt</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />}>
                <a href="/logout">Đăng xuất</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Badge count={5}>
                <BellOutlined className="text-2xl cursor-pointer" />
            </Badge>

            {/* User dropdown */}
            <Dropdown overlay={menu} trigger={['click']}>
                <div className="cursor-pointer flex items-center">
                    <Avatar icon={<UserOutlined />} />
                    <span className="ml-2">Người dùng</span>
                    <DownOutlined className="ml-1" />
                </div>
            </Dropdown>
        </div>
    );
};

export default UtilityNav;
