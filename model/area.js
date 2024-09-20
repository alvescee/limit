export default class area {

    points = [];

    constructor (name, category, points = []) {
        this.name = name;
        this.category = categorys[category];
        this.points = points;
    }

    addPoint (x, y) {
        this.points.push({x: x, y: y});
    }

    removePoint (lat, lng) {
        const point = this.points.filter(p => p.x == lat && p.y == lng);
        const index = this.points.indexOf(point[0]);
        this.points.splice(index, 1)
    }

    getPoints () {
        let allPoints = [];

        this.points.forEach(p => {
            allPoints.push([p.y, p.x])
        })

        return [allPoints];
    }

    getPointsReverse () {
        let allPoints = [];

        this.points.forEach(p => {
            allPoints.push([p.x, p.y])
        })

        return [allPoints];   
    }
}

export const categorys = {
    1: {type: "Residência", color: "#ff8c00"},
    2: {type: "Preservação", color: "#6fff00"},
    3: {type: "Transporte", color: "#005dfd"},
    4: {type: "Comércio", color: "#ff00fb"},
    5: {type: "Indústria", color: "#474747"},
    6: {type: "Agricultura", color: "#471501"},
    7: {type: "Turismo", color: "#fdca00"},
}

// Mock

export var mock = []

function make () {
}

make();