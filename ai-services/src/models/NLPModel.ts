import natural from 'natural'
import { KeywordRule, TrainData } from '../interfaces/nlpInterface'

class NLPModel {
    private static instance: NLPModel
    private classifier: null | natural.LogisticRegressionClassifier = null
    private trainData: TrainData[] = []
    private keywordRules: KeywordRule[] = [] 

    constructor() {
    }

    static getInstance(): NLPModel {
        if(!NLPModel.instance) {
            NLPModel.instance = new NLPModel()
        }

        return NLPModel.instance
    }

    getTrainData(): TrainData[] {
        return this.trainData
    }

    setTrainData(data: TrainData[]) {
        this.trainData = data
    }

    getKeyWordRules(): KeywordRule[] {
        return this.keywordRules
    }

    setKeyWordRules(keywordRules: KeywordRule[]) {
        this.keywordRules = keywordRules
    }

    getClassifier(): natural.LogisticRegressionClassifier {
        if(this.classifier === null) {
            this.classifier = new natural.LogisticRegressionClassifier()
        }

        return this.classifier
    }

    setClassifier(classifier: natural.LogisticRegressionClassifier) {
        this.classifier = classifier
    }
}

export default NLPModel