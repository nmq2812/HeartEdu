'use client';

import {
    SetStateAction,
    AwaitedReactNode,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
    useState,
} from 'react';
import { Table, Button, Modal, Input, Form, Select, Popconfirm } from 'antd';
import useCourses from '@/store/CourseState';
import useTeachers from '@/store/TeachersState';
import { Content } from 'antd/es/layout/layout';
import { SearchOutlined } from '@ant-design/icons';

const CourseManagement = () => {
    const { courses, addCourse, editCourse, deleteCourse } = useCourses();
    const { teachers } = useTeachers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingCourse, setEditingCourse] = useState<Course>();
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm xử lý tìm kiếm giảng viên
    const onSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredCourse = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showAddModal = () => {
        setEditingCourse(undefined);
        form.resetFields();
        setIsModalOpen(true);
    };

    const showEditModal = (course: Course) => {
        setEditingCourse(course);
        form.setFieldsValue(course);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                if (editingCourse) {
                    // Chỉnh sửa môn học
                    editCourse(editingCourse.id, values);
                } else {
                    // Thêm môn học mới
                    const newCourse = { ...values, id: courses.length + 1 };
                    addCourse(newCourse);
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

    const handleDelete = (courseId: any) => {
        deleteCourse(courseId);
    };

    const columns = [
        {
            title: 'Tên môn học',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giảng viên phụ trách',
            dataIndex: 'teacherId',
            key: 'teacher',
            render: (teacherId: any) => {
                const teacher = teachers.find(
                    (t: { id: any }) => t.id === teacherId
                );
                return teacher ? teacher.name : 'Chưa có';
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text: any, record: Course) => (
                <div>
                    <Button type="link" onClick={() => showEditModal(record)}>
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa môn học này?"
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
            <h2>Quản lý môn học</h2>

            <Button
                type="primary"
                onClick={showAddModal}
                style={{ marginBottom: 16 }}
            >
                Thêm môn học mới
            </Button>

            <Input.Search
                placeholder="Tìm kiếm Môn học"
                enterButton={<Button icon={<SearchOutlined />} />}
                onSearch={onSearch}
                style={{ marginBottom: 16 }}
            />

            <Table columns={columns} dataSource={filteredCourse} rowKey="id" />

            <Modal
                title={editingCourse ? 'Chỉnh sửa môn học' : 'Thêm môn học mới'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="courseForm">
                    <Form.Item
                        name="name"
                        label="Tên môn học"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên môn học!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="teacherId"
                        label="Giảng viên phụ trách"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giảng viên phụ trách!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn giảng viên">
                            {teachers.map(
                                (teacher: {
                                    id: number;
                                    name:
                                        | string
                                        | number
                                        | bigint
                                        | boolean
                                        | ReactElement<
                                              any,
                                              | string
                                              | JSXElementConstructor<any>
                                          >
                                        | Iterable<ReactNode>
                                        | ReactPortal
                                        | Promise<AwaitedReactNode>
                                        | null
                                        | undefined;
                                }) => (
                                    <Select.Option
                                        key={teacher.id}
                                        value={teacher.id}
                                    >
                                        {teacher.name}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default CourseManagement;
