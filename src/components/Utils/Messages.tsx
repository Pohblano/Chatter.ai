// Libraries
import React from 'react'
// Customer Components
import AiMarkdown from './AiMarkdown'
import { IconX } from './Icons'


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
	return (
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

// Display error messages
const ErrorMessage = ({type='', msg='', setError}) => {
	// const [open, setOpen] = useState(false)
	return (
		<div className="error_message bg-red-500 text-sm text-white rounded-md shadow-lg mb-3 pt-4 p-2" role="alert">
			<div className="flex p-2 gap-2">
				{msg}
				<div className="ml-auto">
					<button className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none"
					type="button" 
					onClick={() => setError({})}>
						<IconX />
					</button>
				</div>
			</div>
		</div>

	)
}

export {
	ChatMessage,
	FetchingMessage,
	ErrorMessage,
}