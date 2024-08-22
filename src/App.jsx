import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

  function App() {
    const [categories, setCategories] = React.useState([])

    const [formData, setFormData] = React.useState({
      category: '',
      difficulty: '',
      questionType: '',
    })
    
    const [questions, setQuestions] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    //const [correctAnswer, setCorrectAnswer] = React.useState(false)
    const [showConfetti, setShowConfetti] = React.useState(false)

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
          const formattedQuestions = data.results.map(question => {
            
            const answers = shuffleArray([
              {
                value: question.correct_answer,
                isHeld: false,
                id: nanoid()
              },
              ...question.incorrect_answers.map(answer => ({
                value: answer,
                isHeld: false,
                id: nanoid()
              }))
            ])
            return {...question, answers, id: nanoid()}
          })
          console.log('Wasasasasa',formattedQuestions[0].id)
          setQuestions(formattedQuestions)

          // console.log('Category: ', formData.category)
          // console.log('Difficulty: ', formData.difficulty)
          // console.log('Question Type: ', formData.questionType)
          // console.log('Questions: ', data)
          setIsSubmitted(false)
        }
        fetchQuestions()
      }
    }, [isSubmitted, formData.category, formData.difficulty, formData.questionType])

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    
    function holdAnswer(questionId, answerId) {
      setQuestions(prevQuestions => {
        return prevQuestions.map(question => {
          return question.id === questionId ? 
              {
                ...question,
                answers: question.answers.map(answer => {
                  return answer.id === answerId ? {...answer, isHeld: !answer.isHeld} :  { ...answer, isHeld: false }
                })
              }
            :
            question
          })        
      })     
    }
    // const allHeld = questions.every(question => {
    //   return question.answers.some(answer => answer.isHeld)        
    // })
    // function checkAnswers(){
    //   //event.preventDefault()
      
    //   setQuestions(prevQuestions => {
    //     return prevQuestions.map(question => {
    //       return {
    //         ...question, answers: question.answers.map((answer) => ({
    //           ...answer,
    //           backgroundColor: answer.value === question.correct_answer ? 'green' : 'red', // Set red for incorrect answers
    //         })),
    //       }
    //     })
    //   })
    // }
    function checkAnswers(event) {
      event.preventDefault(); 
      const allHeld = questions.every(question => {
        return question.answers.some(answer => answer.isHeld)        
      });
      
      const updatedQuestions = questions.map(question => 
        ({
          ...question,
          answers: question.answers.map(answer => {
            return answer.isHeld ? 
              {
                ...answer, 
                isCorrect: answer.value === question.correct_answer,
                backgroundColor: answer.value === question.correct_answer ? 'green' : 'red'
              } 
              : 
              answer;
          })
        })
      );
      setQuestions(updatedQuestions);
      const allCorrect = updatedQuestions.every(question => 
        question.answers.some(answer => answer.isHeld && answer.isCorrect)
      );
      if (allHeld && allCorrect) {
        setShowConfetti(true);
      }
    }
    // function checkAnswers(event) {
    //   event.preventDefault(); 
    //   const allHeld = questions.every(question => {
    //     return question.answers.some(answer => answer.isHeld)        
    //   })
      
    //   const correctAnswer = questions.map(question => 
    //     ({
    //       ...question,
    //       answers: question.answers.map(answer => {
    //         return answer.isHeld ? 
    //           {
    //             ...answer, 
    //             backgroundColor: answer.value === question.correct_answer ? 'green' : 'red'
    //           } 
    //           : 
    //           answer;
    //       })
    //     })
    //   );
    //   setQuestions(correctAnswer)
    //   if (allHeld) {
    //     setShowConfetti(true)
    //   }
      // setQuestions(prevQuestions => {
      //   return prevQuestions.map(question => {
      //     return {
      //       ...question,
      //       answers: question.answers.map(answer => {
      //         // Add the backgroundColor property to each answer based on whether it is correct or not
      //         return {
      //           ...answer,
      //           backgroundColor: answer.value === question.correct_answer ? 'green' : 'red'
      //         };
      //       })
      //     };
      //   });
      // });
    //}
    // function holdAnswer(questionId, answerId) {
    //   setQuestions(prevQuestions => 
    //     prevQuestions.map(question => {
    //       if (question.id === questionId) {
    //         const updatedAnswers = question.answers.map(answer => 
    //           answer.id === answerId 
    //             ? { ...answer, isHeld: !answer.isHeld } 
    //             : { ...answer, isHeld: false }
    //         );
    //         return { ...question, answers: updatedAnswers };
    //       } else {
    //         return question;
    //       }
    //     })
    //   );
    // }
    const questionElements = questions.map((question) => {
     
      return (
        <>
          <div key={question.id}>
            <h2 className="text-base text-[#4D5B9E] font-medium">{decodeHtmlEntities(question.question)}</h2>
            <div  className="flex items-start gap-5 mt-2">
              {
                question.answers.map((answer) => {
                  const styles = {
                     backgroundColor: answer.isHeld ? (answer.backgroundColor || "#D6DBF5") : ""
                  }

                  return (
                    <p onClick={() => holdAnswer(question.id, answer.id)} key={answer.id} style={styles} className="border-[#4D5B9E] text-[#293264] font-medium text-xs px-3 py-1 border rounded-xl">
                      {decodeHtmlEntities(answer.value)}
                    </p>
                  )
                })
              }
            </div>
          </div>
          
        </>
      )
    })
  
    function decodeHtmlEntities(text) {
      const parser = new DOMParser();
      const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
      return decodedString;
    }
  return (
    <div className="flex items-center justify-center w-full bg-app-pattern bg-cover bg-no-repeat h-screen">
      { 
        //console.log('Questions', questions)
        questions.length === 0 ? (
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
              <option value='multiple'>Multiple Choice</option>
              <option value='boolean'>True / False</option>
            </select>
          </div>
        </div> 
        <button type="submit" className="bg-[#4d5b93] text-white px-3 py-2 rounded-md shadow-lg mt-8">Start Quiz</button> 
      </form> )
      :
      (<div className="flex flex-col gap-10">
       { showConfetti && <Confetti/> }
        <div className="flex flex-col gap-2">
          {questionElements}
        </div>
        <button onClick={checkAnswers} className="px-3 py-2 bg-[#4d5b9e] text-white rounded-lg mx-auto">Check Answers</button>
      </div>)
      
      }
    </div>
  )
}

export default App
