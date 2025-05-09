import { IntentCategory, IntentName } from "./nlpInterface"

export type MCPAction = {
    category: IntentCategory
    intent: IntentName
    params: {[key:string] : any}
}
