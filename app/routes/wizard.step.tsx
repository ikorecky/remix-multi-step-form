import { Link, Outlet, useNavigate } from "@remix-run/react";
import type { WizardHandle } from "~/hooks/use-outlet-handle";
import { useOutletHandle } from "~/hooks/use-outlet-handle";
import classNames from "classnames";

export type OnboardingWizardHandle = WizardHandle<"onboarding"> & {
  title: string;
  stepNumber: number;
};

export default function WizardStepsLayoutScreen() {
  const { stepNumber } =
    useOutletHandle<OnboardingWizardHandle>("onboarding")[0];

  return (
    <div className="flex flex-col items-center h-screen bg-Magnolia lg:justify-around">
      <div className="h-screen w-full lg:fixed  lg:rounded-lg lg:bg-White lg:w-[58.563rem] lg:max-h-[37.5rem] lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="h-screen lg:absolute lg:top-4 lg:bg-White lg:flex lg:flex-row lg:justify-center lg:items-center lg:w-[56.75rem] lg:max-h-[35.563rem]">
          <div className="relative -top-3 text-White flex flex-row justify-center pt-10 gap-4  bg-mobileBg bg-cover bg-no-repeat h-[12rem] font-ubuntu lg:bg-desktopBg lg:min-h-[35.438rem] lg:min-w-[17.063rem] lg:flex-col lg:justify-start lg:top-0 lg:pt-10 lg:pl-8">
            <div className="lg:flex lg:items-center lg:gap-4">
              <p
                className={classNames(
                  "duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
                  {
                    " bg-Lightblue border-none text-Marineblue":
                      stepNumber === 1,
                  }
                )}
              >
                1
              </p>
              <div className="flex-col items-start justify-start hidden lg:flex">
                <p className="text-xs font-normal text-Pastelblue">STEP 1</p>
                <p className="text-sm font-medium">YOUR INFO</p>
              </div>
            </div>
            <div className=" lg:flex lg:items-center lg:gap-4 active:bg-Pastelblue">
              <p
                className={classNames(
                  " duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
                  {
                    " bg-Lightblue border-none text-Marineblue":
                      stepNumber === 2,
                  }
                )}
              >
                2
              </p>
              <div className="flex-col items-start justify-start hidden lg:flex">
                <p className="text-xs font-normal text-Pastelblue">STEP 2</p>
                <p className="text-sm font-medium">SELECT PLAN</p>
              </div>
            </div>
            <div className=" lg:flex lg:items-center lg:gap-4">
              <p
                className={classNames(
                  " duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
                  {
                    " bg-Lightblue border-none text-Marineblue":
                      stepNumber === 3,
                  }
                )}
              >
                3
              </p>
              <div className="flex-col items-start justify-start hidden lg:flex">
                <p className="text-xs font-normal text-Pastelblue">STEP 3</p>
                <p className="text-sm font-medium">ADD-ONS</p>
              </div>
            </div>
            <div className=" lg:flex lg:items-center lg:gap-4">
              <p
                className={classNames(
                  "duration-300 w-8 h-8 flex items-center justify-center rounded-full border-solid border-White border",
                  {
                    " bg-Lightblue border-none text-Marineblue":
                      stepNumber === 4 || stepNumber === 5,
                  }
                )}
              >
                4
              </p>
              <div className="flex-col items-start justify-start hidden lg:flex">
                <p className="text-xs font-normal text-Pastelblue">STEP 4</p>
                <p className="text-sm font-medium">SUMMARY</p>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center w-full text-base -top-28 font-ubuntu lg:top-0 lg:h-full">
            <Outlet />
            <Footer stepNumber={stepNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer(props: { stepNumber: number }) {
  const { stepNumber } = props;
  return (
    <>
      {stepNumber !== 5 ? (
        <footer
          className={classNames(
            "fixed bottom-0 bg-White p-4 w-full flex justify-center cursor-pointer lg:absolute  lg:bg-none lg:w-full"
          )}
        >
          <div
            className={classNames(
              "w-[21.438rem] lg:w-full",
              {
                " flex justify-end": stepNumber === 1,
              },
              {
                "flex items-center justify-between  lg:px-20": stepNumber !== 1,
              }
            )}
          >
            {stepNumber !== 1 ? <BackButton /> : null}
            <NextButton stepNumber={stepNumber} />
          </div>
        </footer>
      ) : null}
    </>
  );
}

function BackButton() {
  const navigate = useNavigate();
  return (
    <Link
      to=""
      onClick={(e) => {
        navigate(-1);
        e.preventDefault();
      }}
      className="text-sm font-medium text-Lightgray hover:text-Coolgray"
    >
      Go Back
    </Link>
  );
}

function NextButton(props: { stepNumber: number }) {
  return (
    <button
      form={`step-${props.stepNumber}`}
      className={classNames(
        "text-xs lg:text-sm font-medium bg-Marineblue text-Lightblue py-2 px-4 flex items-center justify-center  rounded duration-300  ",
        { "lg:mr-24": props.stepNumber === 1 },
        { "hover:bg-Purplishblue": props.stepNumber === 4 }
      )}
      type="submit"
    >
      {props.stepNumber === 4 ? "Confirm" : "Next Step"}
    </button>
  );
}
