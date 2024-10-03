'use client';

import { useState } from 'react';
import { Table, Button, Modal, Input, Form, Popconfirm, Select } from 'antd';
import useTeachers from '@/store/TeachersState';
import useCourses from '@/store/CourseState';
import { Content } from 'antd/es/layout/layout';

const TeacherManagement = () => {
    const { teachers, addTeacher, editTeacher, deleteTeacher } = useTeachers();
    const { courses } = useCourses(); // Lấy danh sách môn học
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher>();
    const [form] = Form.useForm();

    const showAddModal = () => {
        setEditingTeacher(undefined);
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        form.setFieldsValue(teacher);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                if (editingTeacher) {
                    editTeacher(editingTeacher.id, {
                        ...editingTeacher,
                        ...values,
                    });
                } else {
                    const newTeacher = { ...values, id: teachers.length + 1 };
                    addTeacher(newTeacher);
                }
                setIsModalOpen(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        deleteTeacher(id);
    };

    const columns = [
        {
            title: 'Tên giáo viên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Môn dạy',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: any, record: Teacher) => (
                <div>
                    <Button type="link" onClick={() => showEditModal(record)}>
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button type="link" danger>
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Content style={{ padding: '24px' }}>
            <h2>Quản lý giáo viên</h2>

            <Button
                type="primary"
                onClick={showAddModal}
                style={{ marginBottom: 16 }}
            >
                Thêm giáo viên mới
            </Button>

            <Table columns={columns} dataSource={teachers} rowKey="id" />

            <Modal
                title={
                    editingTeacher
                        ? 'Chỉnh sửa giáo viên'
                        : 'Thêm giáo viên mới'
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="teacherForm">
                    <Form.Item
                        name="name"
                        label="Tên giáo viên"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên giáo viên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subject"
                        label="Môn dạy"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn môn học!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn môn học">
                            {courses.map((course: Course) => (
                                <Select.Option
                                    key={course.id}
                                    value={course.name}
                                >
                                    {course.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default TeacherManagement;
