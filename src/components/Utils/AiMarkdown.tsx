// Libraries
import React from 'react'
import { MdPreview, MdCatalog } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';


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



