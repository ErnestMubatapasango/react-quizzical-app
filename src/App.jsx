
function App() {
  
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center bg-app-pattern bg-cover bg-no-repeat w-full h-screen">
       <h2>Quizzical</h2> 
       <p>Answer the questions and test your knowledge!</p>
       <div>
        <label htmlFor="category">Category: </label>
        <select id="category"></select>
       </div>
      </div>      
    </div>
  )
}

export default App
