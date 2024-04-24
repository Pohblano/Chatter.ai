// Libraries
import React, { useEffect} from 'react'
// Components
import { ChatMessage, FetchingMessage } from '../Utils/Messages'
// Actions
// Styling
import './ChatRoom.scss'
import { IconOpenAI } from '../Utils/Icons';

// clear messages once 'new conversation button is clicked'



function ChatRoom({ 
	ai, 
	messages, 
	response, 
	isLoading, 
	user, 
	conversations,
	conversation
}) {

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