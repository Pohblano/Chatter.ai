// Libraries
import React from 'react'
// Components
import { ChatMessage, FetchingMessage } from '../Utils/Messages'
// Actions

// Styling
import './ChatRoom.scss'
import { Brain} from '../Utils/Icons';

function ChatRoom({
	messages,
	response,
	isLoading,
}) {

	const checkAuthor = (type: string) => (type.toLowerCase() === 'ai') ? 'ai' : 'user'
	return (
		<div className="chatRoom">
			{
				(!messages.length) ?
					<div className="chatRoomAIBox">
						<div className='mb-1 text-gray-700'>
							{/* <IconOpenAI className='' /> */}
							<Brain className='w-12 h-12'/>
						</div>
						<p>Chat with A.I.</p>
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