export type Role = "system" | "user" | "assistant";

export type ChatIdentifier = string;

function newChatIdentifier(messages: ChatMessage[]): ChatIdentifier {
    return `${new Date().getTime()}-${messages[0].content}`;
}

export interface ChatMessage {
    role: Role;
    content: string;
}

export class ChatHistory {
    public readonly id: ChatIdentifier;
    public readonly title: string;
    constructor(

        public readonly messages: ChatMessage[]) {
            this.id = newChatIdentifier(messages);
            this.title = messages[0].content;
    }

}
