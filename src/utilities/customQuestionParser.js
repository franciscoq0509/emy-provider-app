export const displayQuestionAndAnswer = (questionObject = null) => {
    if (
        questionObject !== null 
        && questionObject !== 0 
        && 'question' in questionObject
        && 'value' in questionObject
        && 'type' in questionObject.question 
    ) {
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
            return null
        };

        if(questionObject.question.type === 'text') {
            return {
                question: 'text',
                answer : 'text'
            };
        }

    } else {
        return null
    };
}