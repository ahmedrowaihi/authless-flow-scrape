"use server";

import { symmetricEncrypt } from "@/lib/credential";
import prisma from "@/lib/prisma";
import {
	createCredentialSchema,
	type createCredentialSchemaType,
} from "@/schema/credential";
import { revalidatePath } from "next/cache";

export async function getUserCredentials() {
	return await prisma.credential.findMany({
		where: {},
		orderBy: {
			name: "asc",
		},
	});
}

export async function createCredential(form: createCredentialSchemaType) {
	const { success, data } = createCredentialSchema.safeParse(form);

	if (!success) {
		throw new Error("Invalid form data");
	}

	const encryptedValue = symmetricEncrypt(data.value);

	const result = await prisma.credential.create({
		data: {
			name: data.name,
			value: encryptedValue,
		},
	});

	if (!result) {
		throw new Error("Failed to create credential");
	}
	revalidatePath("/credentials");
}

export async function deleteCredential(id: string) {
	await prisma.credential.delete({
		where: {
			id,
		},
	});

	revalidatePath("/credentials");
}
