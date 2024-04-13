import React from 'react'

import ReactMarkdown from 'react-markdown'
import MDEditor from '@uiw/react-md-editor/nohighlight'
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark, vs, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGFM from 'remark-gfm'

export default function AiMarkdown({ content }) {
	return (
		<MdPreview 
		editorId={'preview'} 
		modelValue={content}
		language={'en-US'}
		codeTheme={'stackoverflow'}
		style={{
			backgroundColor: 'unset',
		}}/>
	)
}


{/* <ReactMarkdown
			children={content}
			remarkPlugins={[remarkGFM]}
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
			}}
		/> */}

		// <MDEditor.Markdown
		// source={content}
		// style={{ whiteSpace: 'pre-wrap', backgroundColor: 'unset' }}
		// components={{
		// 	code(props) {
		// 		const { children, className, inline,  node, ...rest } = props
		// 		const match = /language-(\w+)/.exec(className || '')
		// 		return !inline && match ? (
		// 			<SyntaxHighlighter
		// 				{...rest}
		// 				PreTag="div"
		// 				children={String(children).replace(/\n$/, '')}
		// 				language={match[1]}
						
		// 			/> 
		// 					) : (
		// 			<code {...rest} className={className}>
		// 				{children}
		// 			</code>
		// 		)
		// 	}
		// }} />

		// <MdPreview 
		// editorId={'preview'} 
		// modelValue={content}
		// previewTheme={'github'}
		// // showCodeRowNumber={true}
		// />