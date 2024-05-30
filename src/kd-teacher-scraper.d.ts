import {ITeacher} from "./models/ITeacher";

declare module 'kd-teacher-scraper' {
    export function getTeachersOfKaindorf(): Promise<ITeacher>;
}