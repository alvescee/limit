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
    var a1 = new area(1, "Centro", 22.5, 1);
    a1.addPoint(-22.276122811643024, -42.53291144580142);
    a1.addPoint(-22.27702602903907, -42.533651802357);
    a1.addPoint(-22.276967793918082, -42.53287399281397);
    mock[0] = a1;

    var a2 = new area(2, "Teleférico", 32.8, 2);
    a2.addPoint(-22.276200674284564, -42.539221117376115);
    a2.addPoint(-22.27913858918164, -42.53550860479309);
    a2.addPoint(-22.276967793918082, -42.53287399281397);
    a2.addPoint(-22.279699589392244, -42.537564395533785);
    a2.addPoint(-22.2770492069499, -42.540396861553674);
    mock[1] = a2;

    var a3 = new area(3, "Conselheiro Paulino", 12, 3);
    a3.addPoint(-22.23140219909813, -42.522694431295804);
    a3.addPoint(-22.23268299147669, -42.52271589090612);
    a3.addPoint(-22.230727803159574, -42.52082756730495);
    mock[2] = a3;

    var a4 = new area(3, "Olaria", 3.76, 3);
    a3.addPoint(-22.23140219909813, -42.522694431295804);
    a3.addPoint(-22.23268299147669, -42.52271589090612);
    a3.addPoint(-22.230727803159574, -42.52082756730495);
    mock[3] = a4;

    var a4 = new area(3, "Olaria", 3.76, 3);
    a3.addPoint(-22.23140219909813, -42.522694431295804);
    a3.addPoint(-22.23268299147669, -42.52271589090612);
    a3.addPoint(-22.230727803159574, -42.52082756730495);
    mock[4] = a4;

    mock[5] = a4;
    mock[6] = a4;
    mock[7] = a4
    mock[8] = a3;
}

make();