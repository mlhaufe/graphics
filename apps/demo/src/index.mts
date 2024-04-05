import { Canvas, Circle, Ellipse, Polygon, Rectangle, RightTriangle, Shape, zip } from '@mlhaufe/graphics'

Object.assign(document.body.style, {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px'
})

function drawSimpleShapes() {
    const canvas = new Canvas({ container: document.body, width: 300, height: 300 })

    const pic1 = new Ellipse(100, 50),
        pic2 = new Polygon([50, 50], [100, 100], [50, 100])

    canvas.present({ position: [0, 0], shape: pic1, fillStyle: 'red' })
    canvas.present({ position: [0, 0], shape: pic2, fillStyle: 'blue' })
}

function drawSierpinskiTriangles() {
    const canvas = new Canvas({ container: document.body, width: 300, height: 300 }),
        minSize = 8

    const fillTri = (x: number, y: number, size: number) => {
        canvas.present({
            position: [x, y],
            shape: new Polygon([x, y], [x + size, y], [x, y - size]),
            fillStyle: 'red'
        })
    }

    const sierpTri = (x: number, y: number, size: number) => {
        if (size <= minSize) {
            fillTri(x, y, size)
        } else {
            const size2 = size / 2
            sierpTri(x, y, size2)
            sierpTri(x, y - size2, size2)
            sierpTri(x + size2, y, size2)
        }
    }

    sierpTri(-75, 75, 2 ** 7)
}

function drawColoredShapes() {
    type ColoredShapes = [color: string, Shape][]

    const canvas = new Canvas({ container: document.body, width: 300, height: 300 }),
        shs: ColoredShapes = [
            ['red', new Rectangle(150, 100)],
            ['blue', new Ellipse(50, 75)],
            ['yellow', new RightTriangle(150, 100)],
            ['magenta', new Polygon([-125, 125], [-75, 100], [-55, 10], [-85, -50], [-150, 0])]
        ]

    shs.forEach(([fillStyle, shape]) => {
        canvas.present({ position: [0, 0], shape, fillStyle })
    })
}

function drawConCircles() {
    const canvas = new Canvas({ container: document.body, width: 300, height: 300 }),
        conCircles = Array.from({ length: 9 }, (_, i) => new Circle(15 + i * 15)).reverse(),
        coloredCircles = zip(['white', 'blue', 'green', 'cyan', 'red', 'magenta', 'yellow', 'black'],
            conCircles
        )

    coloredCircles.forEach(([fillStyle, shape]) => {
        canvas.present({ position: [0, 0], shape, fillStyle })
    })
}

drawSimpleShapes()
drawSierpinskiTriangles()
drawColoredShapes()
drawConCircles()