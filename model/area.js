export default class area {

    points = [];

    constructor (id, name, tax, category) {
        this.id = id;
        this.name = name;
        this.tax = tax;
        this.category = categorys[category];
    }

    addPoint (x, y) {
        this.points.push({x: x, y: y});
    }

    removePoint (p) {
        this.points.splice(p, 1);
    }
}

const categorys = {
    1: {type: "Residência", color: "#ffffff"},
    2: {type: "Preservação", color: "#ffffff"},
    3: {type: "Transporte", color: "#ffffff"},
    4: {type: "Comércio", color: "#ffffff"},
    5: {type: "Indústria", color: "#ffffff"},
    6: {type: "Agricultura", color: "#ffffff"},
    7: {type: "Turismo", color: "#ffffff"},
}