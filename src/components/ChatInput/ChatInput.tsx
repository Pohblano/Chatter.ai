// Libraries
import React, { useEffect, useState } from 'react'
import { TextareaAutosize } from "@mui/base";
// Api
import { chat_api } from '../../Api/ChatApi'
// Styling
import './ChatInput.scss'
import { saveToLocalStorage } from '../../Actions/DashboardActions';


function ChatInput({
	setEntry,
	setResponse,
	setIsLoading,
	setConversation,
	setConversations,
	setMessages,
	user,
	entry,
	messages,
	conversation,
	conversations,
	initialEntry
}) {
	// Handles text input changes
	const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
		// Grabbing input variable
		const { name, value } = e.target;
		// Updating state to prepare for form submission
		setEntry(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	// Submits form upon the press of a key
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	const handleCreateConversation = () => {
		const confirmed = (window.confirm('Start a new conversation?'))
		const data = {user_id: user,}
		
		if(confirmed){
			chat_api.create_conversation(data)
			.then(response => {
				const { recent_conversation, conversations } = response.data
				saveToLocalStorage('recent_conversation', JSON.stringify(recent_conversation))
				setConversation(prevState => ({
					...prevState,
					id: recent_conversation.id,
					ai: recent_conversation.ai_id,
					user_id: recent_conversation.user_phone_number,
					user_phone_number: recent_conversation.user_phone_number,
					created_at: recent_conversation.created_at,
				}))
				setConversations(conversations.reverse())
				setMessages([])
			})
			.catch(err => console.log('There was an error creating a new conversation'))
		}
		
	}


	// Submits form data to backend to be processed
	const handleSubmit = async (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
		e.preventDefault();
		setIsLoading(true)
		if (entry.content) {
			entry.author_type = 'user'
			entry.author_id = user
			entry.conversation_id = conversation.id

			// Updating state for render 
			messages.unshift(entry)
			setMessages(messages)
			setEntry(initialEntry)

			try {
				// Send Message using ollama
				// const response = await chat_api.send_message_ollama(entry)

				// Send Message using ChatGPT
				const response = await chat_api.send_message_chatGPT(entry)


				// Create a new ReadableStream from the response data
				const reader = response.body.getReader();
				// Read data from the stream
				const decoder = new TextDecoder();
				// Stream variables
				let chunk, text = '';
				let charsReceived = 0;

				// Setting up Ai response object
				const obj = {
					id: '',
					author_id: '',
					author_type: 'ai',
					content: text,
					date: '',
					time: ''
				};

				// Read from the stream as chunks of data become available
				let result = await reader.read();
				// Anonymous function to control rate of speed in which stream is being converted to text
				(async function loop(i) {
					setTimeout(async function () {
						setIsLoading(false);
						// Decoding string and setting it into filler text
						const decodedChunk = decoder.decode(result.value, { stream: true });
						text += decodedChunk;

						setResponse(prevState => ({
							...obj,
							content: text,
						}))

						// Returning reader for reiteration
						result = await reader.read();

						// Updating state for render once stream conversion is finished
						if (result.done) {
							obj.content = text
							messages.unshift(obj)
							setMessages(messages)
							setResponse(initialEntry)
							console.log('DONE STREAMING')
						}

						// Control reiteration until stream conversion is done
						if (!result.done) loop(result)
					}, 25)
				})(result)


			} catch (error) {
				console.log("There was an erro while sending user message")
				console.log(error)
			}

		} else e.stopPropagation();
	};

	return (
		<>
			{(!conversation) ?
				<div className='flex justify-center chatter_text font-bold pb-12'>
					<a className="p-3 text-xl shadow text-white hover:chatter_input_hover chatter_bg rounded-lg align-middle text-center" href='#' onClick={() => handleCreateConversation()}>
					Start a conversation
					</a>
				</div>
				:
				<>
					<div className="chatInputWrapper">
						<form className="chatInput" onSubmit={handleSubmit}>
							<a className="chatNewButton hover:chatter_input_hover" href='#' onClick={() => handleCreateConversation()}>
								<i className="fa-solid fa-plus"></i>
							</a>
							<TextareaAutosize className='chatTextarea'
								aria-label="empty textarea"
								maxRows={4}
								name="content"
								placeholder="Message {Ai}..."
								value={entry.content}
								onChange={handleInputChange}
								onKeyPress={handleKeyPress}
							/>
							<button className="chatButton hover:chatter_input_hover" type="submit">
								<i className="fa-solid fa-arrow-up"></i>
							</button>

						</form>
					</div>
				</>

			}
		</>


	)
}

export default ChatInput