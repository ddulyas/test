<script lang="ts" context="module">
  export type Photo = {
    albumId?: number,
    id?: number,
    title?: string,
    url?: string,
    thumbnailUrl?: string
  };
</script>

<script lang="ts">

import {resizeHeight, resizeWidth} from './transition'


let photos: Photo[] = []
let error: boolean = false
let filteredPhotos: Photo[] = []
let windowWidth: number = window.innerWidth
let isMobile: boolean = windowWidth <= 768
let inputValue: string = ''
let filterActive: boolean = false

$: isMobile = windowWidth <= 768

$: currentTransition = isMobile ? resizeHeight : resizeWidth



const getPhotos = (url: string): void => {
  fetch(url)
    .then(res => res.json())    
    .then(res => {
      photos = res
      filteredPhotos = res.slice(0, 7)
    })
    .catch(err => error = true)
}

const onClickShowMore = (currentLength: number): void => {
  filteredPhotos = photos.slice(0, currentLength + 7)
}

const onClickFilter = (): void => {
  filterActive = !filterActive
}


getPhotos('https://jsonplaceholder.typicode.com/photos')




</script>

<svelte:window bind:innerWidth={windowWidth}/>

<div class="wrapper">
  {#if error}
    <span class="error">
      Data Fetch Error
    </span>
  {:else}
    {#if filteredPhotos.length}
      <input 
        bind:value={inputValue} 
        type="text" 
        placeholder="Filter By Title"
        class="search"> 
      <button 
        on:click={onClickFilter}
        class:disabled={!inputValue}
        class="filter-btn">
        {filterActive ? 'Disable' : 'Enable'} Filter
      </button>
      <div
      class="cards">
        {#each filteredPhotos as photo (photo.id)}
          {#if photo?.title && (!filterActive || photo.title.includes(inputValue))}
            <div 
              class:mobile={isMobile}
              class:include-value={inputValue && photo.title.includes(inputValue)}
              transition:currentTransition
              class="card">
              {photo.title}
            </div>
          {/if}
        {/each}
      </div>
      <button 
      on:click={() => onClickShowMore(filteredPhotos.length)}
      class="show-more">
        Show More
      </button>
    {:else}
      Loading...
    {/if}
  {/if}
</div>


<style>

.wrapper {
  padding: 5px;
}

.error {
  color: red;
}

.cards {
  display: flex;

  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-block-start: 5px;
}

.filter-btn {
  transition: .3s;
  cursor: pointer;
  background: #FFF;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
}

.filter-btn.disabled {
  pointer-events: none;
  opacity: .7;
}

.card {
  width: 200px;
  height: 100px;
  border: 1px solid gray;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: .3s background;
}

.card.mobile {
  width: 100%;
}

.card.include-value {
  background: green;
}

.search {
  margin-block-end: 5px;
}

.show-more {
 margin-block-start: 5px;
 width: 200px;
 height: 50px;
 transition: .3s;
 cursor: pointer;
 background: #FFF;
 border: 1px solid black;
 border-radius: 5px;
}

.show-more:hover {
  background: rgb(230, 230, 230);
}
</style>