// Library components
import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, TextareaAutosize } from "@mui/base";
// Components
import MainNav from "../MainNav/MainNav";
import ChatRoom from "../ChatRoom/ChatRoom";
// Styling
import './Dashboard.scss'

import {ChatApi} from '../../Api/ChatGPTApi'


interface Entry {
	content: string,
	date: string,
	time: string,
	author_type: string
}

function Dashboard() {

	const [entry, setEntry] = useState<Entry>()
	const [response, setResponse] = useState({})
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
		const date = new Date();
		const data = {
			content: value,
			date: date.toDateString(),
			time: date.toTimeString(),
			author_type: 'user',
		}
		setEntry(data)
	}

	// Submits form data to backend to be processed
	const handleSubmit = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
		e.preventDefault();
		if (entry.content) {
			console.log(entry)
			ChatApi.chat(entry)
				.then(res => console.log(res))
			// postData('http://127.0.0.1:5000/api/chatGPT', entry)
			// 	.then(res => {
			// 		console.log(res)
			// 	})
			// 	.catch(err => console.log(err))

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
									name="message"
									onChange={handleInputChange}
									placeholder="Message {Ai}..." />
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


async function postData(url: string, data: object) {
	try {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		// headers.append('Origin', 'http://localhost:5000');
		headers.append('Access-Control-Allow-Origin', '*')
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify(data),
			headers: headers
		});
		if (response.ok) {
			const data = await response.json();
			console.log(data)
			return data.response;
		} else {
			throw new Error('Error: Something went wrong with the API call');
		}

	} catch (error) {
		console.error(error);
		return 'Error: Something went wrong with the API call';
	}
}