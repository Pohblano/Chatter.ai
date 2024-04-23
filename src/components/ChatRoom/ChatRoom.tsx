// Libraries
import React, { useEffect} from 'react'
// Components
import { ChatMessage, FetchingMessage } from '../Utils/Messages'
// Actions
// Styling
import './ChatRoom.scss'
import { IconOpenAI } from '../Utils/Icons';

// clear messages once 'new conversation button is clicked'

//////TODO
//////////////
	// if its not empty get last entry to conversation list and save to local sotrage
	// if a conversation is clicked on the nav then save that to local storage
	// if new conversation is made, save it to the localstorage

function ChatRoom({ 
	ai, 
	messages, 
	response, 
	isLoading, 
	user, 
	conversations,
	conversation
}) {
	useEffect(() => {
	
		// // Get recent conversation from localstorage
		// const recent = getFromLocalStorage('recent_conversation')
		// if(!recent){
		// 	//Grab last conversation of the array and save it
		// }
		// setRecentConvo(recent)

		// Get conversation from backend
	},[])

	
	const checkAuthor = (type: string) => (type.toLowerCase() === 'ai') ? 'ai' : 'user'
	return (
		<div className="chatRoom">
			{
				(messages.length === 0) ?
					<div className="chatRoomAIBox">
						<div className='h-12 w-12 mb-2'>
							<IconOpenAI className='' />
							</div>
						<p>How can I assist you?</p>
					</div>
					:
					<div className="chat">
						{(isLoading) ?
							<FetchingMessage /> : null}
						{(response.content) ?
							<ChatMessage checkAuthor={checkAuthor} entry={response} /> : null}

						{messages.map((entry, index) =>
							<ChatMessage key={index} checkAuthor={checkAuthor} entry={entry} />
						)}
					</div>
			}
		</div >
	)
}

export default ChatRoom