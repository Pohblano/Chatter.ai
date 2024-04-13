import React from 'react'
import AiMarkdown from './AiMarkdown'

// Basic Message format
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

// Loading ai Response Format
const FetchingMessage = () => {
	return(
		<div className="entry ai_entry">
		<span className="ai_name">ai</span>
		<div className="entry_content ">
			<div className="ai_content dot-content">
				<div className="dot-flashing"></div>
			</div>
		</div>
	</div>
	)
}

export {
	ChatMessage,
	FetchingMessage
}