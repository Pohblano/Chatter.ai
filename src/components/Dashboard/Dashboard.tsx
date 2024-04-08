// Library components
import React, { useEffect, useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, TextareaAutosize } from "@mui/base";
// Components
import MainNav from "../MainNav/MainNav";
import ChatRoom from "../ChatRoom/ChatRoom";
// Styling
import './Dashboard.scss'

import { ChatApi } from '../../Api/ChatGPTApi'


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
	const [entryData, setEntryData] = useState<Entry>()
	// const [response, setResponse] = useState('')
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
		const { name, value } = e.target;
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
			const date = new Date();
			entry.date = date.toDateString()
			entry.time = date.toTimeString()
			entry.author_type = 'user'
			chat.unshift(entry)
			setChat(chat)
			setEntry(initialData)
			
			try {
				const response = await ChatApi.chat(entry)
				chat.unshift(JSON.parse(response))
				setChat(chat)
				setIsLoading(false);
				console.log(chat)
				// setEntry(initialData)
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

						<Dropdown>
							<MenuButton>
								AI Chat
								<svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="text-token-text-tertiary"><path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
							</MenuButton>
							<Menu>
								<MenuItem onClick={handleMenuClick('Bard AI')}>Bard AI</MenuItem>
								<MenuItem onClick={handleMenuClick('ChatGPT')}>ChatGPT
								</MenuItem>
								<MenuItem onClick={handleMenuClick('Jasper AI')}>Jasper AI</MenuItem>
							</Menu>
						</Dropdown>


					</div>

					<section className="chatBody">
						<ChatRoom ai={active} chat={chat} />
						<div className="chatInputWrapper">
							<form className="chatInput" onSubmit={handleSubmit}>
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

