import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { OnboardingWizardSession } from "~/sessions/wizard-session.server";
import { destroyWizardSession } from "~/sessions/wizard-session.server";
import { getWizardSession } from "~/sessions/wizard-session.server";
import { assertReferer } from "~/utils/assert-referer.server";
import type { OnboardingWizardHandle } from "../wizard.step";
import tick from "~/images/icon-thank-you.svg";
import { motion } from "framer-motion";

export const handle: OnboardingWizardHandle = {
  key: "onboarding",
  title: "Thank You",
  stepNumber: 5,
};

export function meta() {
  return {
    title: `Step ${handle.stepNumber} | ${handle.title}`,
  };
}

export async function loader({ request }: LoaderArgs) {
  assertReferer(request, { redirectTo: "/wizard" });

  const onboardingWizardSession =
    await getWizardSession<OnboardingWizardSession>(request);

  return json(onboardingWizardSession);
}

export async function action({ request }: ActionArgs) {
  return destroyWizardSession(request);
}

export default function WizardStep3Screen() {
  // const data = useLoaderData<typeof loader>();
  return (
    <Form id="step-5" method="post">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-White flex flex-col items-center justify-center w-[21.438rem] h-full pb-8 px-[1.625rem] pt-9 rounded-lg font-ubuntu lg:w-[39.875rem] lg:h-[35.438rem] lg:pt-12 lg:px-12"
        >
          <img src={tick} alt="check mark" className="pb-5" />
          <h1 className="pb-4 text-2xl font-bold text-Marineblue">
            {handle.title}
          </h1>
          <p className="text-center lg:w-[27rem] text-Coolgray">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. if you ever need support, please feel free to email us
            at support@loremgaming.com
          </p>
        </motion.div>
      </>
    </Form>
  );
}
