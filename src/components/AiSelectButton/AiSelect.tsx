// Libraries
import React from 'react'
import {Menu, MenuButton, MenuItem, Dropdown} from '@mui/base'
// Styling
import './AiSelect.scss'

export default function AiSelect({handleMenuClick}) {
	return (
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
	)
}