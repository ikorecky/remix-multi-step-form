import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type {
  OnboardingWizardSession,
  Plan,
} from "~/sessions/wizard-session.server";
import { getMaybeWizardSession } from "~/sessions/wizard-session.server";
import { commitWizardSession } from "~/sessions/wizard-session.server";
import type { OnboardingWizardHandle } from "../wizard.step";
import classNames from "classnames";
import { useEffect, useState } from "react";
import arcade from "~/images/icon-arcade.svg";
import advanced from "~/images/icon-advanced.svg";
import pro from "~/images/icon-pro.svg";

export const handle: OnboardingWizardHandle = {
  key: "onboarding",
  title: "Select Your Plan",
  stepNumber: 2,
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

  const { subscription, period, planCost, nextStep } = Object.fromEntries(
    formData
  ) as Plan & {
    nextStep: string;
  };
  console.log(subscription, period, planCost, nextStep);
  return redirect(`/wizard/step/${nextStep}`, {
    headers: {
      "Set-Cookie": await commitWizardSession(request, {
        subscription,
        period,
        planCost,
      }),
    },
  });
}

export default function WizardStep2Screen() {
  const data = useLoaderData<typeof loader>();
  const [subscription, setSubscription] = useState({
    arcade: data?.subscription === "arcade" || data?.subscription === "on",
    advance: data?.subscription === "advance",
    pro: data?.subscription === "pro",
  });

  const selectArcade = () => {
    setSubscription({
      arcade: true,
      advance: false,
      pro: false,
    });
  };
  const selectAdvance = () => {
    setSubscription({
      arcade: false,
      advance: true,
      pro: false,
    });
  };
  const selectPro = () => {
    setSubscription({
      arcade: false,
      advance: false,
      pro: true,
    });
  };

  // Styles when you click subscription cards
  const ArcadeStyle = {
    borderColor: subscription.arcade
      ? "hsl(243, 100%, 62%)"
      : "hsl(231, 11%, 63%, 50%)",
    background: subscription.arcade ? "hsl(206, 94%, 87%)" : "white",
  };
  const AdvanceStyle = {
    borderColor: subscription.advance
      ? "hsl(243, 100%, 62%)"
      : "hsl(231, 11%, 63%, 50%)",
    background: subscription.advance ? "hsl(206, 94%, 87%)" : "white",
  };
  const ProStyle = {
    borderColor: subscription.pro
      ? "hsl(243, 100%, 62%)"
      : "hsl(231, 11%, 63%, 50%)",
    background: subscription.pro ? "hsl(206, 94%, 87%)" : "white",
  };

  const [cost, setCost] = useState({
    arcade: data?.period === "yr" ? 90 : 9,
    advance: data?.period === "yr" ? 120 : 120,
    pro: data?.period === "yr" ? 150 : 15,
  });
  const [istoggled, setIsToggle] = useState(false);
  const [period, setPeriod] = useState(data?.period || "mo");

  const onToggle = () => {
    setPeriod(period === "mo" ? "yr" : "mo");
    setIsToggle(!istoggled);

    setCost({
      arcade: period === "mo" ? cost.arcade * 10 : cost.arcade / 10,
      advance: period === "mo" ? cost.advance * 10 : cost.advance / 10,
      pro: period === "mo" ? cost.pro * 10 : cost.pro / 10,
    });
  };
  // gets value or amount of selected card/subscription card(price)
  const [selectedCost, setSelectedCost] = useState(0);

  useEffect(() => {
    if (!subscription.arcade && !subscription.pro) {
      setSelectedCost(cost.advance);
    } else if (!subscription.advance && !subscription.pro) {
      setSelectedCost(cost.arcade);
    } else if (!subscription.arcade && !subscription.advance) {
      setSelectedCost(cost.pro);
    } else {
      setSelectedCost(0);
    }
  }, [
    subscription.advance,
    subscription.arcade,
    subscription.pro,
    cost.advance,
    cost.arcade,
    cost.pro,
  ]);
  return (
    <Form id="step-2" method="post">
      <div className="bg-White  flex flex-col items-center w-[21.438rem] h-auto pb-8 px-[1.625rem] pt-9 rounded-lg lg:w-[39.875rem]  lg:pt-12 lg:px-12">
        <div className="flex flex-col gap-5 pb-7 lg:w-full lg:px-12">
          <h1 className="text-2xl font-bold text-Marineblue">{handle.title}</h1>
          <h2 className=" text-Coolgray">
            You have the option of monthly or yearly bill.
          </h2>
        </div>

        <div
          role="group"
          aria-labelledby="subscription-radio-group"
          className="flex flex-col w-full gap-3 lg:px-12 lg:grid lg:grid-cols-3 lg:gap-8"
        >
          <label
            className="flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer"
            style={ArcadeStyle}
            onClick={selectArcade}
            htmlFor="arcade"
          >
            <input
              className="sr-only"
              type="radio"
              id="arcade"
              value="arcade"
              name="subscription"
              defaultChecked={data?.subscription === "arcade"}
            />
            <div className="flex items-center ">
              <img src={arcade} alt="arcade icon" />
            </div>
            <div className="flex flex-col items-start ">
              <label className="font-medium cursor-pointer text-Marineblue">
                Arcade
              </label>
              <p className=" text-Coolgray">
                ${cost.arcade}/{period}
              </p>
              {period === "yr" ? (
                <p className="text-xs font-medium text-Marineblue">
                  2 months free
                </p>
              ) : null}
            </div>
          </label>

          <label
            htmlFor="advance"
            className="  flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer"
            style={AdvanceStyle}
            onClick={selectAdvance}
          >
            <input
              className="sr-only"
              type="radio"
              id="advance"
              value="advance"
              name="subscription"
              defaultChecked={data?.subscription === "advance"}
            />
            <div className="flex items-center h-full ">
              <img src={advanced} alt="advance icon" />
            </div>
            <div className="flex flex-col items-start ">
              <label className="font-medium cursor-pointer text-Marineblue">
                Advanced
              </label>
              <p className=" text-Coolgray">
                ${cost.advance}/{period}
              </p>
              {period === "yr" ? (
                <p className="text-xs font-medium text-Marineblue">
                  2 months free
                </p>
              ) : null}
            </div>
          </label>
          <label
            htmlFor="pro"
            className="  flex flex-row gap-3 items-start pl-3 py-[1.125rem] rounded-md border-[0.063rem] border-opacity-50  border-Coolgray lg:flex-col lg:gap-[2.625rem] cursor-pointer"
            style={ProStyle}
            onClick={selectPro}
          >
            <input
              className="sr-only"
              type="radio"
              id="pro"
              value="pro"
              name="subscription"
              defaultChecked={data?.subscription === "pro"}
            />
            <div className="flex items-center h-full ">
              <img src={pro} alt="pro icon" />
            </div>
            <div className="flex flex-col items-start ">
              <label className="font-medium cursor-pointer text-Marineblue">
                Pro
              </label>
              <p className=" text-Coolgray">
                ${cost.pro}/{period}
              </p>
              {period === "yr" ? (
                <p className="text-xs font-medium text-Marineblue">
                  2 months free
                </p>
              ) : null}
            </div>
          </label>
          <div className="flex flex-row items-center justify-center h-12 gap-6 rounded-md bg-Magnolia lg:col-span-3">
            <div
              className={classNames("font-bold text-Coolgray", {
                " text-Marineblue": period === "mo",
              })}
            >
              Monthly
            </div>

            <label
              htmlFor="period"
              className="relative h-5 rounded-full cursor-pointer w-9 bg-Marineblue"
            >
              <input
                type="checkbox"
                id="period"
                name="period"
                value="mo"
                className="sr-only"
                defaultChecked={data?.period === "mo"}
                onClick={onToggle}
              />
              <input
                type="hidden"
                name="period"
                value={period}
                defaultChecked={data?.period === "yr"}
              />
              <span
                className={classNames(
                  " bg-White h-3 w-3 rounded-full absolute top-1 left-1 peer-checked:bg-Purplishblue duration-300",
                  {
                    "translate-x-4": period === "yr",
                  }
                )}
              ></span>
            </label>
            <div
              className={classNames("font-bold text-Coolgray", {
                "text-Marineblue": period === "yr",
              })}
            >
              Yearly
            </div>
          </div>
          <input type="hidden" name="planCost" value={selectedCost} />
          <input type="hidden" name="nextStep" value="3" />
        </div>
      </div>
    </Form>
  );
}
