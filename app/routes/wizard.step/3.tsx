import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type {
  AddonsGamingCheckboxGroup,
  OnboardingWizardSession,
} from "~/sessions/wizard-session.server";
import { getMaybeWizardSession } from "~/sessions/wizard-session.server";
import { commitWizardSession } from "~/sessions/wizard-session.server";
import type { OnboardingWizardHandle } from "../wizard.step";
import classNames from "classnames";

export const handle: OnboardingWizardHandle = {
  key: "onboarding",
  title: "Pick add-ons",
  stepNumber: 3,
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

  const { addon1, addon2, addon3, nextStep } = Object.fromEntries(
    formData
  ) as AddonsGamingCheckboxGroup & {
    nextStep: string;
  };

  return redirect(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        addon1,
        addon2,
        addon3,
      }),
    },
  });
}

export default function WizardStep3Screen() {
  const data = useLoaderData<typeof loader>();
  const addonsCost = {
    addon1: data?.period === "yr" ? 10 : 1,
    addon2: data?.period === "yr" ? 20 : 2,
    addon3: data?.period === "yr" ? 20 : 2,
  };
  return (
    <Form id="step-3" method="post">
      <div className="bg-White  flex flex-col  items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className="flex flex-col gap-5 pb-7 lg:w-full lg:px-12">
          <h1 className="text-2xl font-bold text-Marineblue">{handle.title}</h1>
          <h2 className="text-Coolgray">
            Addons help enhance gaming experience
          </h2>
        </div>
        <div
          role="group"
          aria-labelledby="addons-checkbox-group"
          className="flex flex-col gap-3"
        >
          <label
            htmlFor="multiplayerGames"
            className={classNames(
              " p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
              {
                "bg-Lightblue border-Purplishblue":
                  data?.addon1 === "multiplayerGames",
              }
            )}
          >
            <div className="flex flex-row items-center justify-start">
              <div className="flex flex-row items-center justify-start w-full gap-4 ">
                <input
                  type="checkbox"
                  name="addon1"
                  value="multiplayerGames"
                  id="multiplayerGames"
                  defaultChecked={data?.addon1 === "multiplayerGames"}
                  className="w-5 h-5 rounded-sm "
                />
                <div className="flex flex-col items-start ">
                  <p className="text-sm font-bold text-Marineblue">
                    Online Services
                  </p>
                  <p className="text-xs text-Coolgray w-[9.688rem]">
                    Access to multiplayer games
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium text-Purplishblue">
                +${addonsCost?.addon1}/{data?.period}
              </div>
            </div>
          </label>
          <label
            htmlFor="storage"
            className={classNames(
              " flex flex-row  items-start justify-center p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
              { "bg-Lightblue border-Purplishblue": data?.addon2 === "storage" }
            )}
          >
            <div className="flex flex-row items-center justify-start w-full gap-4 ">
              <input
                type="checkbox"
                value="storage"
                name="addon2"
                id="storage"
                defaultChecked={data?.addon2 === "storage"}
                className="w-5 h-5 rounded-sm "
              />
              <div className="flex flex-col items-start">
                <p className="text-sm font-bold text-Marineblue">
                  Larger storage
                </p>
                <p className="text-Coolgray w-[9.688rem] text-xs">
                  Extra 1tb of cloud space
                </p>
              </div>
            </div>
            <div className="flex items-center h-full text-Purplishblue">
              +${addonsCost?.addon2}/{data?.period}
            </div>
          </label>
          <label
            htmlFor="customize"
            className={classNames(
              " flex flex-row  items-start justify-center p-[0.938rem] rounded-md border-[0.063rem] border-Coolgray lg:w-[28rem] cursor-pointer",
              {
                "bg-Lightblue border-Purplishblue":
                  data?.addon3 === "customize",
              }
            )}
          >
            <div className="flex flex-row items-center justify-start w-full gap-4 ">
              <input
                type="checkbox"
                name="addon3"
                value="customize"
                id="customize"
                defaultChecked={data?.addon3 === "customize"}
                className="w-5 h-5 rounded-sm "
              />
              <div className="flex flex-col items-start ">
                <p className="text-sm font-bold text-Marineblue">
                  Customizable profile
                </p>
                <p className=" text-Coolgray w-[10.688rem] text-xs">
                  Custom theme in your profile
                </p>
              </div>
            </div>
            <div className="flex items-center h-full text-Purplishblue">
              +${addonsCost?.addon3}/{data?.period}
            </div>
          </label>
        </div>
      </div>

      <input type="hidden" name="nextStep" value="4" />
    </Form>
  );
}
