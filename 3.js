//function definitions
const findClosestIntersection = intersections => {
    let min = 10000000000;

    intersections.forEach(inter => {
        if(inter.distance < min && inter.distance > 1){
            min = inter.distance;
        }
    })

    return min;
}

const layWire = (id, wire, grid) => {
    let centerPos = {x: 5000, y: 5000};
    let currentPos = {...centerPos};
    let intersections = [];

    wire.forEach(move => {
        if(move.distance > 0) {
            for(let distanceLeft = move.distance; distanceLeft > 0; distanceLeft--) {
                currentPos[move.direction] += 1;

                (grid[currentPos.x][currentPos.y] !== id && grid[currentPos.x][currentPos.y])
                ? intersections.push({distance: calculateDistance(currentPos, centerPos), location: currentPos}) 
                : grid[currentPos.x][currentPos.y] = id;
            }
        } else {
            for(let distanceLeft = move.distance; distanceLeft < 0; distanceLeft++) {
                currentPos[move.direction] -= 1;

                (grid[currentPos.x][currentPos.y] !== id && grid[currentPos.x][currentPos.y])
                ? intersections.push({distance: calculateDistance(currentPos, centerPos), location: currentPos}) 
                : grid[currentPos.x][currentPos.y] = id;
            }
        }
    });
    console.log(intersections);
    return intersections;
}

calculateDistance = (pos1, pos2) => {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

//main
let grid = new Array(10000);
for(let i = 0; i < 10000; i++) {
    grid[i] = new Array(10000);
}

const wire1 = [{ direction: 'x', distance: 75 },{ direction: 'y', distance: 30 },{ direction: 'x', distance: 83 },{ direction: 'y', distance: 83 },{ direction: 'x', distance: 12 },{ direction: 'y', distance: 49 },{ direction: 'x', distance: 71 },{ direction: 'y', distance: 7 },{ direction: 'x', distance: 72 }]
const wire2 = [{ direction: 'y', distance: 62 },{ direction: 'x', distance: 66 },{ direction: 'y', distance: 55 },{ direction: 'x', distance: 34 },{ direction: 'y', distance: 71 },{ direction: 'x', distance: 55 },{ direction: 'y', distance: 58 },{ direction: 'x', distance: 83 }]
let intersections = [];

intersections.concat(layWire(1, wire1, grid));
console.log(intersections);
intersections.concat(layWire(2, wire2, grid));
console.log(intersections);
console.log(findClosestIntersection(intersections));



