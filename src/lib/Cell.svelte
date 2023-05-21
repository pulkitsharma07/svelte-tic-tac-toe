<script>
  import { onMount, createEventDispatcher } from 'svelte';
    import { fade} from 'svelte/transition';

    // props
    export let width;
    export let height;
    export let currentMove;

    export let id;
    export let i;
    export let j;

    const dispatch = createEventDispatcher();

    const DEFAULT_COLOR = "grey"; 
    const HOVER_COLOR = "#B8B8B8"; 
    let FILLED_COLOR = "black"; 

    const X_COLOR = "orange"; 
    const O_COLOR = "blue"; 

    $: {
        // Change color only if cell is empty
        if(cellValue == "") {
            if(currentMove == "X") {
                FILLED_COLOR = X_COLOR;
            } else {
                FILLED_COLOR = O_COLOR;
            }
        }
    }

    let cellValue = "";
    let mouseHovering = false;

    let color = DEFAULT_COLOR; 

    let mouseenter = () => {
        color = HOVER_COLOR
        mouseHovering = true;
    }
    let mouseleave = () => {
        color = DEFAULT_COLOR
        mouseHovering = false;
    }

    let mousedown = () => {
        if(currentMove == "X") {
            cellValue =  "X";
        } else {
            cellValue = "O";
        }

        dispatch("handlemove", {i, j, cellValue});
    }
    let mouseup = () => {
        color = HOVER_COLOR
    }
</script>

{#if cellValue == "" }
<div class="cell" style="--width: {width}px; --height: {height}px; --color: {color}" in:fade on:mouseenter={mouseenter} on:mouseleave={mouseleave} on:mousedown={mousedown} on:mouseup={mouseup}>
    {#if mouseHovering}
        <div class="value" style="--font-size: {height * 0.75}px; --color: {FILLED_COLOR}">
            {currentMove}
        </div>
    {/if}
</div>
{:else}
<div class="cell" style="--width: {width}px; --height: {height}px; --color: {DEFAULT_COLOR}">
    <div class="value" style="--font-size: {height * 0.75}px; --color: {FILLED_COLOR}">
        {cellValue}
    </div>
</div>
{/if}

<style>
    .cell {
        background-color:var(--color);
        width: var(--width);
        height: var(--height);
        box-shadow: 0 0 0 1px black;
    }
    .value {
        margin: 0;
        place-items: center;
        font-size: var(--font-size);
        color: var(--color)
    }
</style>