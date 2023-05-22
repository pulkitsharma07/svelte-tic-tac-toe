<script>
  import { createEventDispatcher } from "svelte";
  import { fade} from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // props
  export let width;
  export let height;
  export let currentMove; // i.e. move to be played next


  // These will be used to communicate with GameLogic.js
  export let i;
  export let j;

  // To communicate with GameLogic.js
  const dispatch = createEventDispatcher();
  // Constants
  const X_COLOR = "orange";
  const O_COLOR = "blue";

  let TEXT_COLOR = "white";
  let mouseHovering = false;
  let cellValue = "";

  // For hover effect
  let scale = tweened(1.0, {
    duration: 400,
    easing: cubicOut
  });

  // To change the class if hovering on the cell
  let modifierClass = "";

  $: {
    // For a filled cell
    if (cellValue != "") {
      if (cellValue == "X") {
        TEXT_COLOR = X_COLOR;
      } else {
        TEXT_COLOR = O_COLOR;
      }
    } else { // For empty cell, for hover effect
      if (currentMove == "X") {
        TEXT_COLOR = X_COLOR;
      } else {
        TEXT_COLOR = O_COLOR;
      }
    }

    // zoom cell when cursor is over it
    if(mouseHovering) {
      modifierClass = "hovering";
      scale.set(1.02);
    } else {
      modifierClass = "";
      scale.set(1);
    }
  }

  let mouseenter = () => {
    mouseHovering = true;
  };
  let mouseleave = () => {
    mouseHovering = false;
  };

  let mousedown = () => {
    if (currentMove == "X") {
      cellValue = "X";
    } else {
      cellValue = "O";
    }

    // Register move event.
    dispatch("handlemove", { i, j, cellValue });
  };

</script>

{#if cellValue == ""}
    <div
      class="cell {modifierClass}"
      style="--width: {width}px; --height: {height}px; --scale: {$scale}"
      on:mouseenter={mouseenter}
      on:mouseleave={mouseleave}
      on:mousedown={mousedown}
      in:fade
    >
    {#if mouseHovering}
      <div
        class="value"
        style="--font-size: {height * 0.75}px; --color: {TEXT_COLOR}"
      >
        {currentMove}
      </div>
    {/if}
    </div>
{:else}
  <div
    class="cell filled"
    style="--width: {width}px; --height: {height}px;"
  >
    <div
      class="value"
      style="--font-size: {height * 0.75}px; --color: {TEXT_COLOR}"
    >
      {cellValue}
    </div>
  </div>
{/if}

<style>
  .cell {
    background-color: gray;
    width: var(--width);
    height: var(--height);
    box-shadow: 0 0 0 1px black;
  }

  .hovering {
    background: radial-gradient(#bbb8b8, gray);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    cursor: pointer;
    transform: scale(var(--scale));
  }

  .filled {
    background: radial-gradient(#bbb8b8, gray);
    box-shadow: 0 0 0 1px black;
    cursor:default;
  }

  .value {
    margin: 0;
    place-items: center;
    font-size: var(--font-size);
    color: var(--color);
  }
</style>
