// Libraries
import React, { useEffect, useState } from 'react'

import MDEditor from '@uiw/react-md-editor/nohighlight';


// Styling
import './ChatRoom.scss'


const ChatRoom = ({ ai, chat }) => {
	const checkAuthor = (type: string) => (type === 'ai') ? 'ai' : 'user'

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
						{chat.map((entry, index) =>

							<div className={`${checkAuthor(entry.author_type)}_entry entry`} key={index}>

								<span className={`${checkAuthor(entry.author_type)}_name`}>
									{entry.author_type}
								</span>

								<div className='entry_content' >
									<div className={`${checkAuthor(entry.author_type)}_content`}>
										{
											(checkAuthor(entry.author_type) === 'ai') ?
												<MDEditor.Markdown source={entry.content} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'unset' }} />
												:
												entry.content
										}
									</div>
								</div>

							</div>
						)}
					</div>
			}
		</div>
	)
}

export default ChatRoom