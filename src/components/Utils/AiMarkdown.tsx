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
		codeTheme={'github'}
		noMermaid={true}
		style={{
			backgroundColor: 'unset',
		}}/>
	)
}



