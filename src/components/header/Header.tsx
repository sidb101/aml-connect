import type { PropsWithChildren } from "react";
import React from "react";
import { testIds } from "../../tests/test-utils";

type HeaderT = {
	headerTitle?: string;
};

function Header({ headerTitle = "", children }: PropsWithChildren<HeaderT>) {
	return (
		<>
			<div className={`main-heading-text`} data-testid={testIds.contentHeading}>
				{headerTitle}
			</div>
			<div>{children}</div>
		</>
	);
}

export default Header;
