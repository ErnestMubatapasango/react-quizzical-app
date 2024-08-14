import React from "react"

  function App() {
    const [categories, setCategories] = React.useState([])

    const [formData, setFormData] = React.useState({
      category: '',
      difficulty: '',
      question: '',
    })
  
  React.useEffect(() => {
    async function fetchCategory (){
      const response =  await fetch("https://opentdb.com/api_category.php")
      const data = await response.json() 
      console.log('data: ',data)
      setCategories(data.trivia_categories)
    }
    fetchCategory()
  }, [])
  
   const categoryElements = categories.map(category => {
    return (
      <option key={category.id} value={category.id} >{category.name}</option>    
    )
   })

   function handleChange(e){
      setFormData(prevFormData => {
        
      })
   }
  
  return (
    <div className="flex items-center justify-center w-full">
      <form className="flex flex-col items-center gap-5 justify-center bg-app-pattern bg-cover bg-no-repeat w-full h-screen">
       <h2 className="font-bold text-3xl text-[#4D5B9E]">Quizzical</h2> 
       <p>Answer the questions and test your knowledge!</p>

        <div className="flex items-start flex-col gap-10 pt-8">
          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="category " className="text-[#4D5B9E] font-medium text-xl">Category: </label>
            <select id="category" className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3">
              <option value=''>Any Category</option>
              {categoryElements}
            </select>
          </div>

          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="difficulty " className="text-[#4D5B9E] font-medium text-xl">Difficulty: </label>
            <select id="difficulty" className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3">
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>

          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="questionType " className="text-[#4D5B9E] font-medium text-xl">Type of questions: </label>
            <select id="questionType" className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3">
              <option value=''>Any Type</option>
              <option value='choice'>Multiple Choice</option>
              <option value='boolean'>True / False</option>
            </select>
          </div>
        </div> 
        <button type="submit" className="bg-[#4d5b93] text-white px-3 py-2 rounded-md shadow-lg mt-8">Start Quiz</button> 
      </form>    
    </div>
  )
}

export default App
