import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { OnboardingWizardSession } from "~/sessions/wizard-session.server";
import { getMaybeWizardSession } from "~/sessions/wizard-session.server";
import { commitWizardSession } from "~/sessions/wizard-session.server";
import type { OnboardingWizardHandle } from "../wizard.step";
import classNames from "classnames";

export const handle: OnboardingWizardHandle = {
  key: "onboarding",
  title: "Finishing up",
  stepNumber: 4,
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

  const { totalCost, nextStep } = Object.fromEntries(formData) as {
    totalCost: string;
    nextStep: string;
  };

  return redirect(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, { totalCost }),
    },
  });
}

export default function WizardStep4Screen() {
  const data = useLoaderData<typeof loader>();
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function transformToWord(str: string) {
    return str === "yr" ? "Yearly" : "Monthly";
  }
  const addonsCost = {
    addon1: data?.period === "mo" ? 1 : 10,
    addon2: data?.period === "mo" ? 2 : 20,
    addon3: data?.period === "mo" ? 2 : 20,
  };
  const totalCost =
    (data?.addon1 === "multiplayerGames" ? addonsCost.addon1 : 0) +
    (data?.addon2 === "storage" ? addonsCost.addon2 : 0) +
    (data?.addon3 === "customize" ? addonsCost.addon3 : 0) +
    Number(data?.planCost);
  return (
    <Form id="step-4" method="post">
      <div className="bg-White flex flex-col items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className="flex flex-col gap-5 pb-7 lg:w-full lg:px-12">
          <h1 className="text-2xl font-bold text-Marineblue">Finishing up</h1>
          <h2 className="text-Coolgray">
            Double check everything looks OK before confirming
          </h2>
        </div>

        <div className=" flex flex-row  items-start justify-center w-[18.25rem] p-[0.938rem] rounded-md bg-Magnolia lg:w-[28rem] lg:px-6">
          <div className="flex flex-row items-center justify-start w-full gap-4 ">
            <div className="flex flex-col items-start ">
              <p className="font-bold text-Marineblue">
                {capitalizeFirstLetter(data?.subscription || "")}(
                {transformToWord(data?.period || "")})
              </p>
              <Link
                to="/wizard/step/2"
                className="underline duration-300 text-Coolgray hover:text-Purplishblue"
              >
                change
              </Link>
            </div>
          </div>
          <div className="flex items-center h-full font-bold text-Marineblue">
            +${data?.planCost}/{data?.period}
          </div>
        </div>
        <div className=" flex flex-row  items-start justify-center w-[18.25rem] p-[0.938rem] rounded-md bg-Magnolia lg:w-[28rem]">
          <div className=" flex flex-col gap-5 lg:w-[28rem] ">
            <div
              className={classNames(
                " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
                { hidden: !(data?.addon1 === "multiplayerGames") }
              )}
            >
              <div className="flex flex-row items-center justify-start w-full gap-4 text-Coolgray">
                Online service
              </div>
              <div className="flex items-center h-full text-Marineblue">
                +${addonsCost.addon1}/{data?.period}
              </div>
            </div>
            <div
              className={classNames(
                " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
                { hidden: !(data?.addon2 === "storage") }
              )}
            >
              <div className="flex flex-row items-center justify-start w-full gap-4 text-Coolgray">
                Larger storage
              </div>
              <div className="flex items-center h-full text-Marineblue">
                +${addonsCost.addon2}/{data?.period}
              </div>
            </div>
            <div
              className={classNames(
                " flex w-[16.375rem] lg:w-[28rem] lg:px-6",
                { hidden: !(data?.addon3 === "customize") }
              )}
            >
              <div className="flex flex-row items-center justify-start w-full gap-4 text-Coolgray">
                Customizable Profile
              </div>
              <div className="flex items-center h-full text-Marineblue">
                +${addonsCost.addon3}/{data?.period}
              </div>
            </div>
          </div>
        </div>
        <div className="py-7 flex w-[16.375rem] lg:py-8 lg:w-[28rem] lg:px-6">
          <div className="flex flex-row items-center justify-start w-full gap-4 text-Coolgray">
            Total({transformToWord(data?.period || "")})
          </div>
          <div className="flex items-center h-full text-Marineblue">
            +${totalCost}/{data?.period}
          </div>
        </div>
      </div>
      <input type="hidden" name="totalCost" value={totalCost} />

      <input type="hidden" name="nextStep" value="5" />
    </Form>
  );
}
