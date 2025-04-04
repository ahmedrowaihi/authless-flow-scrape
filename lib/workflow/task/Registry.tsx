import type { TaskType, WorkflowTask } from "@/lib/types";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";
import { PageToHtmlTask } from "./PageToHtml";
import { FillInputTask } from "./FillInput";
import { ClickElementTask } from "./ClickElement";
import { WaitForElementTask } from "./WaitForElement";
import { DeliverViaWebHookTask } from "./DeliverViaWebHook";
import { ExtractDataWithAiTask } from "./ExtractDataWithAi";
import { ReadPropertyFromJsonTask } from "./ReadPropertyFromJson";
import { AddPropertyToJsonTask } from "./AddPropertyToJson";
import { NavigateUrlTask } from "./NavigateUrl";
import { ScrollToElementTask } from "./ScrollToElement";

type Registry = {
	[key in TaskType]: WorkflowTask & { type: key };
};

export const TaskRegistry: Registry = {
	LAUNCH_BROWSER: LaunchBrowserTask,
	PAGE_TO_HTML: PageToHtmlTask,
	EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
	FILL_INPUT: FillInputTask,
	CLICK_ELEMENT: ClickElementTask,
	WAIT_FOR_ELEMENT: WaitForElementTask,
	DELIVER_VIA_WEBHOOK: DeliverViaWebHookTask,
	EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask,
	READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
	ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
	NAVIGATE_URL: NavigateUrlTask,
	SCROLL_TO_ELEMENT: ScrollToElementTask,
};
