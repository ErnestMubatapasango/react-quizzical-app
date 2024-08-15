import React from "react"

  function App() {
    const [categories, setCategories] = React.useState([])

    const [formData, setFormData] = React.useState({
      category: '',
      difficulty: '',
      questionType: '',
    })
    
    const [questions, setQuestions] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)

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

   function handleChange(event){
    event.preventDefault()
      setFormData(prevFormData => {
        return {
          ...prevFormData, [event.target.name]: event.target.value
        }
      })
   }
   
   function handleSubmit(event){
    event.preventDefault()
    setIsSubmitted(true)
   }
    React.useEffect(() => {
      if(isSubmitted){
        async function fetchQuestions(){
          const response =  await fetch(`https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.questionType}`);
          const data = await response.json();
          setQuestions(data.results)
          console.log('Questions: ', data)
          setIsSubmitted(false)
        }
        fetchQuestions()
      }
    }, [isSubmitted, formData.category, formData.difficulty, formData.questionType])

    const questionElements = questions.map((question, index) => {
      return (
        <div key={index}>
          <h2>{question.question}</h2>
          <p>{question.correct_answers} {question.incorrect_answers}</p>
        </div>
      )
    })
  
  return (
    <div className="flex items-center justify-center w-full bg-app-pattern bg-cover bg-no-repeat h-screen">
      { 
        //console.log('Questions', questions)
        questions.length === 0 ?
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 justify-center w-full "
      >
       <h2 className="font-bold text-3xl text-[#4D5B9E]">Quizzical</h2> 
       <p>Answer the questions and test your knowledge!</p>

        <div className="flex items-start flex-col gap-10 pt-8">
          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="category " className="text-[#4D5B9E] font-medium text-xl">Category: </label>
            <select 
              id="category" 
              className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value=''>Any Category</option>
              {categoryElements}
            </select>
          </div>

          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="difficulty " className="text-[#4D5B9E] font-medium text-xl">Difficulty: </label>
            <select 
              id="difficulty" 
              className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>

          <div className="flex gap-10 items-center justify-between w-[45rem]">
            <label htmlFor="questionType " className="text-[#4D5B9E] font-medium text-xl">Type of questions: </label>
            <select 
              id="questionType" 
              className="border-2 p-2 cursor-pointer rounded-md outline-none focus:none shadow-lg w-2/3"
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
            >
              <option value=''>Any Type</option>
              <option value='choice'>Multiple Choice</option>
              <option value='boolean'>True / False</option>
            </select>
          </div>
        </div> 
        <button type="submit" className="bg-[#4d5b93] text-white px-3 py-2 rounded-md shadow-lg mt-8">Start Quiz</button> 
      </form> 
      :
      <div>
        {questionElements}
      </div>
      }
    </div>
  )
}

export default App
