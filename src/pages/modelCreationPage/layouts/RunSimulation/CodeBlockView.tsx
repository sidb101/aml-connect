import "./CodeBlockView.scss";
import type { OutputFileDataT } from "../../../../redux/slices/ResultSlice";
import React from "react";
import { atomOneLight, CopyBlock } from "react-code-blocks";

export type CodeBlockT = {
	codeFile: OutputFileDataT;
	codeLanguage: string;
};

const CodeBlockView = ({ codeFile, codeLanguage }: CodeBlockT) => {
	return (
		<div className={`CodeBlockView_container`}>
			<div className={`CodeBlockView_codeBlockContainer`}>
				<CopyBlock
					text={codeFile.dataUrl}
					language={codeLanguage}
					showLineNumbers={true}
					wrapLongLines={false}
					theme={atomOneLight}
					codeBlock={true}
				/>
			</div>
		</div>
	);
};

export default CodeBlockView;
