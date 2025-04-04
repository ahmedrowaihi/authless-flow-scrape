import prisma from "@/lib/prisma";
import Editor from "../../_components/Editor";

async function WorkflowEditorPage({
	params,
}: {
	params: { workflowId: string };
}) {
	const { workflowId } = params;

	const workflow = await prisma.workflow.findUnique({
		where: {
			id: workflowId,
		},
	});
	if (!workflow) {
		return <div>Workflow not found</div>;
	}

	return <Editor workflow={workflow} />;
}

export default WorkflowEditorPage;
