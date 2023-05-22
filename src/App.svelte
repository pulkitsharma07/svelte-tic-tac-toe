<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Board from './lib/Board.svelte'
  let xRotation;
  let yRotation;
  let boards = [];
  let id = 0;

    let spawnBoard = () => {
      boards = [{
        id
      }, ...boards];
      id++;
    }

    let handleDelete = (e) => {
      const deletedBoard = e.target.id;
      let newBoards = [];
      boards.forEach((board) => {
        if(board.id != deletedBoard) {
          newBoards.push(board);
        }
      })

      boards = newBoards;
    }
</script>

<main>
  <div class="header">
    <h1>Tic Tac Toe</h1>
    <pre>Svelte Edition</pre>
    <h3> {boards.length} {boards.length === 1 ? "board": "boards"} on screen</h3>
  </div>
  <button on:click={spawnBoard}>New Board</button>
    <br/>
    <br/>
    <br/>
    <br/>

  {#each boards as board (board.id)  }
    <br/>
    <button id="{board.id}" on:click|once={handleDelete} style="color:brown">Delete Board</button>
    <Board/>
    <br/>
    <br/>
  {/each}
</main>

<style>

</style>