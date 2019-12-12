let piecePosition = [0, 0]
let observer = null

function emitChange() {
    observer(piecePosition)
}

export function observe(o) {
    if (observer) {
        throw new Error('Multiple observers not implemented.')
    }
    observer = o
    emitChange()
}

export function movePiece(toX, toY) {
    piecePosition = [toX, toY]
    emitChange()
}