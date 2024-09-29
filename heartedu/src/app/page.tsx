'use server';
import UtilityNav from '../components/navigation/UtilityNav';
import SidebarNav from '@/components/navigation/SideBar';
import React from 'react';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';

export default async function Home() {
    return (
        <Layout className="site-layout">
            {/* Header */}
            <Header className="bg-blue-600 text-white text-3xl font-bold px-4">
                Hệ thống quản lý giáo dục
            </Header>

            {/* Content được xử lý server-side */}
            <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                }}
            >
                <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
                <p>Chào mừng bạn đến với hệ thống quản lý giáo dục.</p>
                <p>
                    Quản lý học sinh, giáo viên và các khóa học một cách hiệu
                    quả.
                </p>
            </Content>

            {/* Footer */}
            <Footer style={{ textAlign: 'center' }}>
                &copy; 2024 Hệ thống quản lý giáo dục. Mọi quyền được bảo lưu.
            </Footer>
        </Layout>
    );
}
