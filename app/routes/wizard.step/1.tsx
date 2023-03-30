import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type {
  OnboardingWizardSession,
  PersonalInfo,
} from "~/sessions/wizard-session.server";
import { getMaybeWizardSession } from "~/sessions/wizard-session.server";
import { commitWizardSession } from "~/sessions/wizard-session.server";
import type { OnboardingWizardHandle } from "../wizard.step";

export const handle: OnboardingWizardHandle = {
  key: "onboarding",
  title: "Personal Info",
  stepNumber: 1,
};

export function meta() {
  return {
    title: `Step ${handle.stepNumber} | ${handle.title}`,
  };
}

export async function loader({ request }: LoaderArgs) {
  const onboardingWizardSession =
    await getMaybeWizardSession<OnboardingWizardSession>(request);

  return json(onboardingWizardSession);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const { name, email, phone, nextStep } = Object.fromEntries(
    formData
  ) as PersonalInfo & {
    nextStep: string;
  };

  return redirect(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, { name, email, phone }),
    },
  });
}

export default function WizardStep1Screen() {
  const data = useLoaderData<typeof loader>();
  return (
    <Form id="step-1" method="post">
      <fieldset className="bg-White flex flex-col items-center w-80 h-max pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className="flex flex-col gap-3 pb-7">
          <h1 className="text-2xl font-bold text-Marineblue">{handle.title}</h1>
          <h2 className="text-Coolgray">
            Please provide your name, email address, and phone number.
          </h2>
        </div>
        <div className="flex flex-col gap-[1.125rem] w-full lg:px-12 ">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Stephen King"
              defaultValue={data?.name}
              name="name"
              required
              className="px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. stephenking@lorem.com"
              defaultValue={data?.email}
              name="email"
              required
              className="px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-xs font-medium text-Marineblue after:content-['*'] after:ml-1 after:text-Strawberryred">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g +1 234 567 890"
              name="phone"
              defaultValue={data?.phone}
              required
              className="px-4 py-2 font-medium border rounded border-Coolgray focus:outline-Strawberryred focus:bg-White text-Marineblue"
            />
          </div>
        </div>
      </fieldset>
      <input type="hidden" name="nextStep" value="2" />
    </Form>
  );
}
