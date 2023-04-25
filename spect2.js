class Group {
    constructor() {
        this.group = [];
    }

    add(value) {
        if (!this.has(value)) {
            this.group.push(value);
        }
    }

    delete(value) {
        if (this.has(value)) {
            const deleteElement = this.group.indexOf(value);
            delete this.group[deleteElement];
        }
    }

    has(value) {
        for (let member of this.group) {
            if (member === value) {
                return true;
            }
        }
        return false;
    }

    static from(arrayGroup) {
        let group = new Group();
        for (let indexEl of arrayGroup) {
            group.add(indexEl);
        }
        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
//  true
console.log(group.has(30));
//  false
group.add(10);
group.delete(10);
console.log(group.has(10));
//  false