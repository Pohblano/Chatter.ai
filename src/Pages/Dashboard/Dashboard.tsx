// Library components
import React, { useEffect, useState, useCallback } from "react";
import {TextareaAutosize } from "@mui/base";

// Components
import MainNav from "../../components/MainNav/MainNav";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import AiSelect from "../../components/AiSelectButton/AiSelect";

// Api
import { ChatApi } from '../../Api/ChatGPTApi'

// Styling
import './Dashboard.scss'




interface Entry {
	id?: string,
	content?: string,
	date?: string,
	time?: string,
	author_type?: string,
	author_id?: string,
}

function Dashboard() {
	const initialData = {
		id: '',
		content: '',
		date: '',
		time: '',
		author_type: '',
		author_id: ''
	}
	const [entry, setEntry] = useState(initialData)
	// const [entryData, setEntryData] = useState<Entry>()
	const [response, setResponse] = useState(initialData)
	const [isLoading, setIsLoading] = useState(false);
	const [chat, setChat] = useState([])
	const [active, setActive] = useState('')


	// Handles AI selection button
	const handleMenuClick = (menuItem: string) => {
		return () => {
			setActive(menuItem)
		};
	};

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

	// Submits form data to backend to be processed
	const handleSubmit = async (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
		e.preventDefault();
		setIsLoading(true)
		if (entry.content) {
			// Setting up user object 
			const date = new Date();
			entry.date = date.toDateString()
			entry.time = date.toTimeString()
			entry.author_type = 'user'
			// Updating state for render 
			chat.unshift(entry)
			setChat(chat)
			setEntry(initialData)

			try {
				// Fetching AI response. Expecting a stream
				const response = await ChatApi.chat(entry)
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
							['content']: text,
						}))

						// Returning reader for reiteration
						result = await reader.read();

						// Updating state for render once stream conversion is finished
						if (result.done) {
							obj.content = text
							chat.unshift(obj)
							setChat(chat)
							setResponse(initialData)
							console.log('DONE STREAMING')

						}

						// Control reiteration until stream conversion is done
						if (!result.done) loop(result)
					}, 25)
				})(result)


			} catch (error) {
				console.log(error)
			}

		} else e.stopPropagation();
	};



	return (
		<div className='dashboardWrapper'>
			<MainNav />
			<div className="chatWrapper">
				<main className="mainChat">
					<div className="chatHeader">
						<AiSelect handleMenuClick={handleMenuClick}/>
					</div>

					<section className="chatBody">
						<ChatRoom ai={active} chat={chat} response={response} isLoading={isLoading} />

						<div className="chatInputWrapper">
							<form className="chatInput" onSubmit={handleSubmit}>
								<button className="chatNewButton" type="submit">
									<i className="fa-solid fa-plus"></i>
								</button>
								<TextareaAutosize className='chatTextarea'
									aria-label="empty textarea"
									maxRows={4}
									name="content"
									placeholder="Message {Ai}..."
									value={entry.content}
									onChange={handleInputChange}
									onKeyPress={handleKeyPress}
								/>
								<button className="chatButton" type="submit">
									<i className="fa-solid fa-arrow-up"></i>
								</button>
							</form>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export default Dashboard;

