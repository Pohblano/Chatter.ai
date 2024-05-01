// Libraries
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import { IconGear, IconList, IconMessage, IconOpenFile, IconQuestionCircle, IconSignOut, IconX } from '../Utils/Icons'
// Api
import { chat_api } from '../../Api/ChatApi'
// Actions
import { deleteFromLocalStorage, getFromLocalStorage, saveToLocalStorage } from '../../Actions/DashboardActions'
// Styling
import './MainNav.scss'


// When clicking on links to the conversation we must set clicked conversation as the recent conversation, save it to locastorage, and retrieve the messages attached to it
function MainNav({
	user,
	conversation,
	conversations,
	setMessages,
	setConversation,
	setConversations }) {


	const [isMenuVisible, setMenuVisible] = useState(false)
	const navigate = useNavigate()

	useEffect(()=> {

	}, [conversations])
	// Changes navigation display
	const handleOpenMenu = () => setMenuVisible(!isMenuVisible)

	// Logs user out
	const handleLogOut = () => {
		deleteFromLocalStorage('jwtToken')
		navigate('/register')
	}
	
	const handleChangeConversation = (conversation_id) =>{
		const data = {
			user_id: user,
			conversation_id: conversation_id
		}
		chat_api.get_conversation(data)
			.then(response => {
				const {conversation, messages} = response.data
				saveToLocalStorage('recent_conversation', JSON.stringify(conversation))
				setConversation( prevState => ({
					...prevState,
					id: conversation.id,
					ai: conversation.ai_id,
					user_id: conversation.user_phone_number,
					user_phone_number: conversation.user_phone_number
				}))
				setMessages(messages.reverse())
			})
	}

	async function handleDeleteConversation(id){
		const data = {
			conversation_id: id,
			user_id: user
		}
		const confirmed = (window.confirm('Are you sure you want to delete this conversation?'))
		console.log(confirmed)
		if(confirmed){
			await chat_api.delete_conversation(data)
			.then( response => {
				const {conversations} = response.data
				if(conversations.length === 0){
					console.log('convos are empty')
					deleteFromLocalStorage('recent_conversation')
					navigate('/')
				}
				setConversations(conversations)
	
			})
		}
		
	}

	const isConversationActive = (id) =>
		(id === conversation.id) ? 'disabled text-white chatter_bg' : 'text-gray-500 hover:chatter_hover'

	return (
		<div>
			{/* Mobile Menu */}
			<nav className="mobile_menu lg:hidden border-b">
				<div className="flex items-center justify-between">
					<button className="navbar-burger flex items-center rounded focus:outline-none" onClick={handleOpenMenu}>
						<svg className="text-white chatter_bg hover:chatter_input_hover block h-10 w-10 p-2 rounded" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
							<title>Mobile menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
						</svg>
					</button>
				</div>
			</nav>

			{/* Regular Nav */}
			<div className={`${isMenuVisible ? 'block' : 'hidden'} lg:block navbar-menu relative z-50`}>
				<div className="navbar-backdrop fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
				<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-white border-r overflow-y-auto">
					<div className="flex items-center px-6 pb-6 mb-6 lg:border-b border-black-50 text-center">
						<a className="font-semibold chatter_text">
							Chatter.ai
						</a>
					</div>
					<div className="links px-4 pb-6">
						<h3 className="mb-2 text-xs uppercase text-gray-500 font-medium text-start">CONVERSATIONS</h3>
						<ul className="links_container mb-8 text-sm font-medium ">

							{conversations.reverse().map((convo, index) =>
								<li id={convo.id} key={index} className='mb-2'>
									<button className={`shadow w-full flex items-center pl-3 py-3 pr-4 ${isConversationActive(convo.id)} rounded`} onClick={() => handleChangeConversation(convo.id)}>
										<span className="inline-block mr-3 h-4 w-4">
											<IconMessage />
										</span>
										<span>Conversation {convo.id}</span>
										<a href="#" className='delete_icon hover:text-blue-500 '><IconX className='text-gray-400 shadow' onClick={() => handleDeleteConversation(convo.id)}/></a>
									</button>
									
								</li>
							)}
						</ul>

						<div className="pt-8 text-sm font-medium">
							<h3 className="mb-2 text-xs uppercase text-gray-500 font-medium text-start">OPTIONS</h3>
	
							<a className="flex items-center pl-3 py-3 pr-2 text-gray-500 hover:chatter_hover rounded" href='#' onClick={handleLogOut}>
								<span className="inline-block mr-4">
									<IconSignOut className='text-gray-600' />
								</span>
								<span>Log Out</span>
							</a>
						</div>
					</div>
				</nav>
			</div>
			<div className="mx-auto lg:ml-80"></div>
		</div>
	)
}
export default MainNav