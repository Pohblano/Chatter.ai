// Library components
import React, { useEffect, useState } from "react";

// Components
import MainNav from "../../components/MainNav/MainNav";
import ChatRoom from "../../components/ChatRoom/ChatRoom";
import ChatInput from "../../components/ChatInput/ChatInput";
import AiSelect from "../../components/Utils/AiSelectButton/AiSelectButton";
// Api
import { chat_api } from '../../Api/ChatApi'
// Actions
import { getFromLocalStorage, parseJwtToken, saveToLocalStorage } from "../../Actions/DashboardActions";
// Styling
import './Dashboard.scss'

//Messages
interface Entry {
	id?: String,
	content?: String,
	date?: String,
	time?: String,
	author_type?: String,
	author_id?: String,
	conversation_id?: String
}

interface Conversation {
	id?: Number,
	date?: String,
	time?: String,
	ai_id?: String,
	ai?: String,
	user_id?: String,
	user_phone_number?: String
}

function Dashboard() {
	const initialEntry = {
		id: '',
		content: '',
		date: '',
		time: '',
		author_type: '',
		author_id: ''
	}
	const initialConversation = {
		date: '',
		time: '',
		ai_id: '',
		ai: '',
		user_id: '',
		user_phone_number: ''
	}

	const [user_id, setUser] = useState<String>('')
	// Single message object
	const [entry, setEntry] = useState(initialEntry)
	// AI response object
	const [response, setResponse] = useState<Entry>(initialEntry)
	// List of user conversation
	const [conversations, setConversations] = useState([])
	// Current conversation
	const [conversation, setConversation] = useState<Conversation>(initialConversation)
	// List of messages in conversation
	const [messages, setMessages] = useState([])

	const [isLoading, setIsLoading] = useState<Boolean>(false);

	const [active, setActive] = useState<String>('')

	useEffect(() => {
		const recent = JSON.parse(getFromLocalStorage('recent_conversation'))
		const token = getFromLocalStorage('jwtToken');
		const { user } = parseJwtToken(token) // User phone number (string)
		const data = {
			user_id: user,
			conversation_id: (recent) ? recent.id : ''
		}
		setUser(user)
		// Retrieves user conversations and is returned an array of conversation and the most recent conversation if one is not available in localStorage
		chat_api.get_conversational_data(data)
			.then((response) => {
				const { recent_conversation, conversations, messages } = response.data
				if (recent_conversation) {
					saveToLocalStorage('recent_conversation', JSON.stringify(recent_conversation))
					setConversation(prevState => ({
						...prevState,
						id: recent_conversation.id,
						ai: recent_conversation.ai_id,
						user_id: recent_conversation.user_phone_number,
						user_phone_number: recent_conversation.user_phone_number,
					}))

				} else setConversation(recent)

				setMessages(
					(messages.length>0)?messages.reverse():[]
				)
				setConversations(conversations)
				

			}).catch(err => {
				console.log('There was an error retrieving conversations', err)
			})
	}, [])

	// Handles AI selection button
	const handleMenuClick = (menuItem: string) => {
		return () => {
			setActive(menuItem)
		};
	};

	return (
		<div className='dashboardWrapper'>
			{/* Main Navigation */}
			<MainNav
				user_id={user_id}
				conversation={conversation}
				conversations={conversations}
				setMessages={setMessages}
				setConversation={setConversation}
				setConversations={setConversations} />

			{/* Chat Room */}
			<div className="chatWrapper">
				<main className="mainChat">
					<div className="chatHeader">
						<AiSelect handleMenuClick={handleMenuClick} />
					</div>

					<section className="chatBody">
						<ChatRoom
							user={user_id}
							ai={active}
							messages={messages}
							response={response}
							isLoading={isLoading}
							conversations={conversations}
							conversation={conversation} />

						<ChatInput
							setEntry={setEntry}
							setResponse={setResponse}
							setIsLoading={setIsLoading}
							setConversation={setConversation}
							setConversations={setConversations}
							setMessages={setMessages}
							entry={entry}
							user={user_id}
							messages={messages}
							conversation={conversation}
							conversations={conversations}
							initialEntry={initialEntry} />
					</section>
				</main>
			</div>
		</div>
	);
}

export default Dashboard;

