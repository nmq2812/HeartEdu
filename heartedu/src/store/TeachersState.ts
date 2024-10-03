import { create } from 'zustand';

const useTeachers = create<TeacherState>((set) => ({
    teachers: [
        { id: 1, name: 'Nguyễn Văn A', subject: 'Toán' },
        { id: 2, name: 'Trần Thị B', subject: 'Văn' },
    ],

    addTeacher: (teacher: Teacher) =>
        set((state) => ({ teachers: [...state.teachers, teacher] })),

    editTeacher: (id, updatedTeacher) =>
        set((state) => ({
            teachers: state.teachers.map((teacher) =>
                teacher.id === id ? updatedTeacher : teacher
            ),
        })),

    deleteTeacher: (id) =>
        set((state) => ({
            teachers: state.teachers.filter((teacher) => teacher.id !== id),
        })),
}));

export default useTeachers;
