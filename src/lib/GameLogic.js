class GameLogic {
    constructor() {
        this.state = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    handleGameMove(i, j, move) {
        console.log(i, j, move);
        this.state[i][j] = move;
        console.table(this.state);
    }
}

export default GameLogic;