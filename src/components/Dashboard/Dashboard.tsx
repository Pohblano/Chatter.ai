// Library components
import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem, TextareaAutosize } from "@mui/base";
// Styling
import './Dashboard.scss'

function Dashboard() {

	const handleMenuClick = (menuItem: string) => {
		return () => {
			console.log(`Clicked on ${menuItem}`);
		};
	};

	return (
		<div className='dashboardWrapper'>
			<nav className="mainNav">
				<div className="navHeader">
					{/* // Include a log 
				<img src=""/>  */}

				</div>
			</nav>

			<div className="chatWrapper">
				<main className="mainChat">
					<div className="chatHeader">
						
							<Dropdown>
								<MenuButton>
									AI Chat
									<svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="text-token-text-tertiary"><path d="M11.3346 7.83203L8.00131 11.1654L4.66797 7.83203" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
								</MenuButton>
								<Menu >
									<MenuItem onClick={handleMenuClick('Bard AI')}>Bard AI</MenuItem>
									<MenuItem onClick={handleMenuClick('ChatGPT')}>ChatGPT
									</MenuItem>
									<MenuItem onClick={handleMenuClick('Jasper AI')}>Jasper AI</MenuItem>
								</Menu>
							</Dropdown>
							
						
					</div>

					<section className="chatAI">
						<div className="chatRoom">

						</div>
						<form className="chatInput" >
							<TextareaAutosize className='chatTextarea' aria-label="empty textarea" maxRows={4} placeholder="Message {Ai}..." />
							<button className="chatButton">
								<i className="fa-solid fa-arrow-up"></i>
							</button>
						</form>
					</section>
				</main>

			</div>

		</div>
	);
}

export default Dashboard;
