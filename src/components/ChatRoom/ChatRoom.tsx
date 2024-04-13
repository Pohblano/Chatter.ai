// Libraries
import React, { Suspense, useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor/nohighlight';

import './ChatRoom.scss'
import AiMarkdown from '../AiMarkdown/AiMarkdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vs, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

////////////////////////////////////////
//find a way to choose between response or entry.content
//response is the stream while entry.content is the history render
const ChatRoom = ({ ai, chat, response, isLoading }) => {
	useEffect(() => {
		console.log(chat)
	}, [])
	console.log(response)
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

						{(response.content) ?
							<ChatMessage checkAuthor={checkAuthor} entry={response} /> : null}

						{chat.map((entry, index) =>
							<ChatMessage key={index} checkAuthor={checkAuthor} entry={entry} />
						)}

						{(isLoading) ?
							<div> Is Loading... </div> : null}
					</div>
			}
		</div >
	)
}

export default ChatRoom


const ChatMessage = ({ checkAuthor, entry }) => {
	return (
		<div className={`${checkAuthor(entry.author_type)}_entry entry`}>

			<span className={`${checkAuthor(entry.author_type)}_name`}>
				{entry.author_type}
			</span>

			<div className='entry_content' >
				<div className={`${checkAuthor(entry.author_type)}_content`}>
					{
						(checkAuthor(entry.author_type) === 'ai') ?
						<AiMarkdown content={entry.content} />
					
							
							:
							entry.content
					}
				</div>
			</div>
		</div>
	)
}




// <div className={`${checkAuthor(entry.author_type)}_entry entry`} key={index}>

// 	<span className={`${checkAuthor(entry.author_type)}_name`}>
// 		{entry.author_type}
// 	</span>

// 	<div className='entry_content' >
// 		<div className={`${checkAuthor(entry.author_type)}_content`}>
// 			{
// 				(checkAuthor(entry.author_type) === 'ai') ?
// 					<AiMarkdown content={entry.content} />
// 					:
// 					entry.content
// 			}
// 		</div>
// 	</div>
// </div>

{/* <MDEditor.Markdown
								source={entry.content}
								style={{ whiteSpace: 'pre-wrap', backgroundColor: 'unset' }}
								components={{
									code(props) {
										const { children, className, inline,  node, ...rest } = props
										const match = /language-(\w+)/.exec(className || '')
										return !inline && match ? (
											<SyntaxHighlighter
												{...rest}
												PreTag="div"
												children={String(children).replace(/\n$/, '')}
												language={match[1]}
												
											/> 
													) : (
											<code {...rest} className={className}>
												{children}
											</code>
										)
									}
								}} />*/}