import {useSelector} from "react-redux";
import {RootState, useDispatch} from "../redux/store";
import {addMessage} from "../redux/slices/chatHistorySlice";
import {useState} from "react";
import {getAIClient} from "../clients";
import { ChatMessage } from '../domain'


export function useFetchAllMessage() {
    const openaiClient = getAIClient();
    const [loading, setLoading] = useState(false);

    const chatHistory = useSelector(
        (state: RootState) => state.chatHistorySlice.messages
    );
    const dispatch = useDispatch();

    const fetchMessages = async (message: string, systemPrompt?: string) => {
        try {
            setLoading(true);

            let messages: ChatMessage[] = [
                ...chatHistory.slice(-5),
                {
                    role: "user",
                    content: message,
                }
            ];

            systemPrompt && messages.unshift({
                role: "system",
                content: systemPrompt,
            })

            const {data} = await openaiClient.createChatCompletion({
                model: "gpt-4",
                messages,
                temperature: 0.7,
                max_tokens: 1000,
            });

            const {choices} = data;
            const newMessage = choices[0]?.message?.content?.trim() || "";

            if (newMessage) {
                dispatch(addMessage({role: "assistant", content: newMessage}));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return {
        chatHistory,
        fetchMessages,
        loading
    }

}
