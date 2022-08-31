<script>
	let urlValue = "";
	let message = { type: "", message: "", link: "" };
	const handleSubmit = async () => {
		const f = await fetch("/api/create/", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ url: urlValue })
		});
		try {
			const result = await f.json();
			message = {
				type: "success",
				message: `Share your `,
				link: `/redirect/${result.url}`
			};
		} catch {
			message = { type: "error", message: "couldn't create new short link", link: "" };
		}
	};
</script>

<svelte:head>
	<style>
		body {
			background-color: #18181b;
		}
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
	</style>
</svelte:head>
<div class="container">
	<h1>Svelte shorter</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value={urlValue} type="url" />
		<button>Create short</button>
		{#if message.message !== ""}
			<p>
				{message.message}
				<a href={message.link} target="_blank">link</a>
			</p>{/if}
	</form>
</div>

<style>
	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		padding: 2rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		width: 100%;
	}
	h1 {
		font-size: 6rem;
		color: white;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
			"Open Sans", "Helvetica Neue", sans-serif;
	}

	a {
		color: #9333ea;
		text-decoration: none;
	}

	p {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
			"Open Sans", "Helvetica Neue", sans-serif;
		color: white;
		text-align: center;
		font-size: 2rem;
	}
	input {
		max-width: 450px;
		width: 100%;
		padding: 10px;
		font-size: 20px;
		outline: 0;
		border: 0;
		border-bottom: 4px solid transparent;
		border-right: 4px solid transparent;
		border-radius: 15px;
	}
	input:focus,
	input:hover {
		border-bottom: 4px solid #1e3a8a;
		border-right: 4px solid #1e3a8a;
	}

	button {
		background-color: #2563eb;
		color: white;
		padding: 16px;
		font-size: 1.25rem;
		border-radius: 5px;
		border: 0;
		outline: 0;
	}

	button:hover,
	button:active {
		background-color: #1e3a8a;
	}
</style>
