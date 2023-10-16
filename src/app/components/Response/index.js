export async function Response({ prompt }) {
    const response = async function getPrompt() {
      if(prompt.length !== 0) {
        const data = await fetch(`/response?prompt=${prompt}`)
        const response = await data.json()
        console.log(response.data)
        return response.data
      }
    }

    return (
        <div>
          <h1>Response</h1>
          <div>{response()}</div>
        </div>
    )
}