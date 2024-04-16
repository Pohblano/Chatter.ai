// Libraries
import React from 'react'
import MDEditor from '@uiw/react-md-editor/nohighlight';
// Components
import { ChatMessage, FetchingMessage } from '../Utils/Messages'
// Styling
import './ChatRoom.scss'
import { IconOpenAI } from '../Utils/Icons';


const ChatRoom = ({ ai, chat, response, isLoading }) => {
	const checkAuthor = (type: string) => (type === 'ai') ? 'ai' : 'user'
	return (
		<div className="chatRoom">
			{
				(chat.length === 0) ?
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

						{chat.map((entry, index) =>
							<ChatMessage key={index} checkAuthor={checkAuthor} entry={entry} />
						)}
					</div>
			}
		</div >
	)
}

export default ChatRoom