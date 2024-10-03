import { create } from 'zustand';

const useCourses = create<CourseState>((set) => ({
    courses: [
        {
            id: 1,
            name: 'Toán',
            teacherId: 0,
            teacher: 'Chưa có giảng viên phụ trách môn học này',
        },
        {
            id: 2,
            name: 'Văn',
            teacherId: 0,
            teacher: 'Chưa có giảng viên phụ trách môn học này',
        },
        {
            id: 3,
            name: 'Lý',
            teacherId: 0,
            teacher: 'Chưa có giảng viên phụ trách môn học này',
        },
    ],
    addCourse: (course) =>
        set((state) => ({ courses: [...state.courses, course] })),
    editCourse: (courseId, updatedCourse) =>
        set((state) => ({
            courses: state.courses.map((course) =>
                course.id === courseId
                    ? { ...course, ...updatedCourse }
                    : course
            ),
        })),
    deleteCourse: (courseId) =>
        set((state) => ({
            courses: state.courses.filter((course) => course.id !== courseId),
        })),
    assignTeacherToCourse: (courseId, teacherId) =>
        set((state) => ({
            courses: state.courses.map((course) =>
                course.id === courseId ? { ...course, teacherId } : course
            ),
        })),
}));

export default useCourses;
