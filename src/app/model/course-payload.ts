export class FileUplodVM {
    name: string | undefined;
    type: string | undefined;
    base64String: string | undefined;
}

export class ModulePayload {
    description: string | undefined;
    lessons: string[] | undefined;
}

export class CoursePayload {
    id: string | undefined;
    description: string | undefined;
    category: string | undefined;
    tutor_id: string;
    title: string | undefined;
    goals: string[] | undefined;
    modules: ModulePayload[] | undefined;
    avatar: FileUplodVM | undefined;

    constructor(){
        this.tutor_id = '';
    }
}