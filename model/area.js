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
    var a1 = new area("Centro", 1);
    a1.addPoint(-22.276122811643024, -42.53291144580142);
    a1.addPoint(-22.27702602903907, -42.533651802357);
    a1.addPoint(-22.276967793918082, -42.53287399281397);
    mock[0] = a1;

    var a2 = new area("Teleférico", 2);
    a2.addPoint(-22.276200674284564, -42.539221117376115);
    a2.addPoint(-22.27913858918164, -42.53550860479309);
    a2.addPoint(-22.276967793918082, -42.53287399281397);
    a2.addPoint(-22.279699589392244, -42.537564395533785);
    a2.addPoint(-22.2770492069499, -42.540396861553674);
    mock[1] = a2;

    var a3 = new area("Conselheiro Paulino", 3);
    a3.addPoint(-22.23140219909813, -42.522694431295804);
    a3.addPoint(-22.23268299147669, -42.52271589090612);
    a3.addPoint(-22.230727803159574, -42.52082756730495);
    mock[2] = a3;

    var a4 = new area("Olaria", 7);
    a4.addPoint(-22.28195712852712, -42.536713435928846);
    a4.addPoint(-22.279216316749473, -42.531476817098564);
    a4.addPoint(-22.292550602217617, -42.52829138499229);
    a4.addPoint(-22.290883955643128, -42.536876502724915);
}

make();