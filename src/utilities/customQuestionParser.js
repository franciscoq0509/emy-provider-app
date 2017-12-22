export const displayQuestionAndAnswer = (questionObject = null) => {
    console.log(questionObject);
    if (
        questionObject !== null 
        && questionObject !== 0 
        && 'question' in questionObject
        && 'value' in questionObject
        && 'type' in questionObject.question 
    ) {
        console.log('check 1');
        if(questionObject.question.type === 'select' 
            && !'options' in questionObject
            && questionObject.question.question !== null ) {
            return {
                question : questionObject.question.question,
                answer: null
            };
        } else if (
            questionObject.question.type === 'select' 
            && 'options' in questionObject.question 
            && questionObject.question.question !== null) {
                console.log('check 2');
                return {
                    question: questionObject.question.question,
                    answer: (
                            questionObject.value 
                            && questionObject.question.options[questionObject.value]
                        ) 
                        ? 
                        questionObject.question.options[questionObject.value]
                        :
                        null
                };
            
        } else {
            console.log('error 4434');    
            return null
        };

        if(questionObject.question.type === 'text') {
            return {
                question: 'text',
                answer : 'text'
            };
        }

    } else {
        console.log('error 4435');
        return null
    };
}