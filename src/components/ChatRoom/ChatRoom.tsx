// Libraries
import React from 'react'

// Styling
import './ChatRoom.scss'


const ChatRoom = ({ai, chat}) => {
	return (
		<div className="chatRoom">
			{
				(chat.length === 0) ?
					<div className="chatRoomAIBox">
						<div>(image of AI)</div>
						<p>How can I help you today?</p>
					</div> 
					:
					<div className="chat">
						{chat.map((entry, index) => {
							<div className="entry">
								<p className={(entry.user === 'bot')? 'ai':'user'}>
									Messages go here
								</p>
							</div>
						})}
					</div>
			
			}

		</div>
	)
}

export default ChatRoom