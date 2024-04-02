// Library components
import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, TextareaAutosize } from "@mui/base";
// Components
import MainNav from "../MainNav/MainNav";
import ChatRoom from "../ChatRoom/ChatRoom";
// Styling
import './Dashboard.scss'


function Dashboard() {
	const data = {
		content: '',
		timestamp: '',
		user: ''
	}
	const [entry, setEntry] = useState(data)
	const [response, setResponse] = useState(data)
	const [chat, setChat] = useState([])
	const [active, setActive] = useState('')

	// Handles AI selection button
	const handleMenuClick = (menuItem: string) => {
		return () => {
			setActive(menuItem)
			console.log(`Clicked on ${menuItem}`);
		};
	};

	// Handles text input changes
	const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
		const { name, value } = e.target;
		setEntry((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	// Submits form data to backend to be processed
	const handleSubmit = (e: { preventDefault: () => void; currentTarget: any; }) => {
		e.preventDefault();
		const form = e.currentTarget;
		console.log(form)
		console.log(entry)
		// if () {

		// } else e.stopPropagation();
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
							<Menu >
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
								<TextareaAutosize className='chatTextarea' aria-label="empty textarea" maxRows={4}
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

