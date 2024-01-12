import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  title: string = " "
  questions: any
  questionsSelected:any
  respostas: string[] = []
  respostaSelectd: string = " "
  questionIndex: number = 0
  questionMaxIndex:number = 0
  finished:boolean = false


  constructor(){ }

  ngOnInit(): void {
      if(quizz_questions){
        this.finished = false
        this.title = quizz_questions.title

        this.questions = quizz_questions.questions
        this.questionsSelected = this.questions[this.questionIndex]

        this.questionIndex = 0
        this.questionMaxIndex = this.questions.length

        console.log(this.questionIndex)
        console.log(this.questionMaxIndex)
      }
  }
    
  
  playerChoose(value:string){
      this.respostas.push(value)
     this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionsSelected = this.questions[this.questionIndex]
    }
    else{
      const finalResposta:string = await this.checkResult(this.respostas)
      this.finished = true
      this.respostaSelectd = quizz_questions.results[finalResposta as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(respostas:string[]){
    const result = respostas.reduce((previous, current, i, array) => {
      if(
        array.filter(item => item === previous).length >
        array.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }


}
