"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
function extractTitleAndName(nameElement) {
    const contents = nameElement.innerHTML.split(/(?=[\S])<!-- -->/);
    let prefix = "";
    if (contents[1] === " ")
        prefix = contents[0];
    return [prefix, contents[prefix === "" ? 1 : 2], contents[prefix === "" ? 2 : 3]];
}
async function getTeachersOfKaindorf() {
    return await fetch("https://www.htl-kaindorf.at/schule/team")
        .then((res) => res.text())
        .then((html) => new jsdom_1.JSDOM(html))
        .then((dom) => {
        const teachers = [];
        const root = dom.window.document.body.getElementsByTagName("section")[0];
        const divs = root.children;
        const teacherDivs = Array.from(divs[divs.length - 1].children);
        // Get data for regular teachers
        for (const teacherDiv of teacherDivs) {
            const children = teacherDiv.getElementsByTagName("div");
            const imgUrl = decodeURIComponent(children[0].getElementsByTagName("img")[0].getAttribute("srcset").split("url=")[1].split("&w=")[0]);
            const mail = children[1].getElementsByTagName("a")[0].getAttribute("href").split(":")[1];
            const shorthand = children[1].getElementsByTagName("div")[0].innerHTML.split(">")[1].split("<")[0].toUpperCase();
            const names = extractTitleAndName(children[1].getElementsByTagName("a")[0]);
            teachers.push({
                imageUrl: imgUrl,
                prefix: names[0],
                name: names[1],
                postfix: names[2],
                shorthand: shorthand,
                email: mail
            });
        }
        // Get data for department head and headmaster
        for (let i = 2; i < divs.length - 4; i += 2) {
            while (i === 3 || i === 4)
                i++;
            const imgUrl = decodeURIComponent(divs[i].getElementsByTagName("div")[0].getElementsByTagName("img")[0].getAttribute("srcset").split("url=")[1].split("&w=")[0]);
            const mail = divs[i + 1].getElementsByTagName("a")[0].getAttribute("href").split(":")[1];
            const shorthand = divs[i + 1].getElementsByTagName("span")[0].innerHTML.split(">")[1].split("<")[0].toUpperCase();
            const names = extractTitleAndName(divs[i + 1].getElementsByTagName("div")[1]);
            teachers.push({
                imageUrl: imgUrl,
                prefix: names[0],
                name: names[1],
                postfix: names[2],
                shorthand: shorthand,
                email: mail
            });
        }
        return teachers;
    });
}
exports.default = getTeachersOfKaindorf;
