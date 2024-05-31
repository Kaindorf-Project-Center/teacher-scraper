import {ITeacher} from "./models/ITeacher";
import getTeachersOfKaindorf from "./kd-teacher-scraper";

declare module 'kd-teacher-scraper' {
    export default getTeachersOfKaindorf;
}