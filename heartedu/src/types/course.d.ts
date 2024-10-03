interface Course {
    id: number;
    name: string;
    teacherId: number;
    teacher: string;
}

interface CourseState {
    courses: Course[];
    addCourse: (course: Course) => void;
    editCourse: (courseId: number, updatedCourse: Partial<Course>) => void;
    deleteCourse: (courseId: number) => void;
    assignTeacherToCourse: (courseId: number, teacherId: number) => void;
}
