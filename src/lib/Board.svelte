<script>
    import Cell from './Cell.svelte'
    import GameLogic from './GameLogic';
    import { fade } from "svelte/transition";

    let size = 300;
    let num_rows = 3;
    let num_columns = 3;
    let currentMove = "X";

    let yRotation = 0
    let xRotation = 0
    const game = new GameLogic();

    let mousemove = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const middleX = window.innerWidth / 2;
        const middleY = window.innerHeight / 2;

        yRotation = ((x - middleX) / middleX) * 50;
        xRotation = -1 * ((y - middleY) / middleY) * 10;
    }


    let cellConfig = {
        width: (size * 1.0) / num_columns,
        height: (size * 1.0) / num_rows
    }

    // Stores all rows
    let rows = [];
    let cells = [];

    let id = 0;
    let row = 0;

    let cellSpawner = setInterval(() => {
        let cell = {
            ...cellConfig,
            id: 0,
            i: 0,
            j: 0,
            currentMove: "",
        };

        cell.id=id++;
        cell.i=rows.length;
        cell.j=cells.length;


        // Prepare row
        cells = [...cells, cell]

        // Row prepared, add to row
        if (cells.length == num_columns) {
            rows = [...rows, cells];
            cells = [];
        }

        // All required rows generated
        if (rows.length == num_rows) {
            clearInterval(cellSpawner);
        }
    }, 50)

    let handleMove = (event) => {
        // Player just put an X
        if(event.detail.cellValue == "X") {
            // Next O
            currentMove = "O";
        } else {
            currentMove = "X";
        }

        game.handleGameMove(event.detail.i, event.detail.j, event.detail.cellValue);
    }
</script>

<h3> Turn for {currentMove}</h3>
<div style="--size: {size}px; --yrotation: {yRotation}deg; --xrotation: {xRotation}deg" class='board' transition:fade on:mousemove={mousemove}>
    {#each rows as row}
        <div class='row'>
            {#each row as cell (cell.id) }
                <Cell {...cell} {currentMove} on:handlemove={handleMove} bind:this={cell.ref}></Cell>
            {/each}
        </div>
    {/each}
</div>

<style>
    .board {
        background: radial-gradient(white, grey);
        border-style: double;
        border-color: rgb(40, 115, 115);
        width: var(--size);
        height: var(--size);
        transform:
            perspective(5000px)
            rotateY(var(--yrotation))
            rotateX(var(--xrotation));
    }
    .row {
        display: flex;
    }
</style>