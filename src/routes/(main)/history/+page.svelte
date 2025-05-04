<script>
	export let data;
	$: history = data?.history || [];
  </script>
  
  <div>
	{#if history.length > 0}
	  <h2>주유 이력</h2>
	  <ul>
		{#each history as item}
		  <li>
			{item.date.toDate().toLocaleDateString()} - 
			{item.oil_type} ({item.amount}L)
		  </li>
		{/each}
	  </ul>
	{:else}
	  <p>이력이 없습니다.</p>
	{/if}
  </div>
  