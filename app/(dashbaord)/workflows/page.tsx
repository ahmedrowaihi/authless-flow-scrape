import { Suspense } from "react";
import UserWorkflowSkeleton from "./_components/UserWorkflowSkeleton";
import UserWorkflows from "./_components/UserWorkflows";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";

function page() {
	return (
		<div className="flex flex-1 flex-col h-full">
			<div className="flex justify-between">
				<div className="flex flex-col">
					<h1 className="text-3xl font-bold">Workflows</h1>
					<p className="text-muted-foreground">Manage your workflows</p>
				</div>
				<CreateWorkflowDialog />
			</div>
			<div className="h-full py-6">
				<Suspense fallback={<UserWorkflowSkeleton />}>
					<UserWorkflows />
				</Suspense>
			</div>
		</div>
	);
}

export default page;
