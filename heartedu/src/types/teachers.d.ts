interface Teacher {
    id: number;
    name: string;
    subject: string;
}

interface TeacherState {
    teachers: Teacher[];
    addTeacher: (teacher: Teacher) => void;
    editTeacher: (id: number, updatedTeacher: Teacher) => void;
    deleteTeacher: (id: number) => void;
}
