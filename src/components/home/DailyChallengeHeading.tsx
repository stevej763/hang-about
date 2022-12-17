import {currentDateLongString} from "../../utils/dateUtil";
import React from "react";
import './DailyChallengeHeading.css'

interface DailyChallengeHeadingProps {
  allComplete: boolean
}

function DailyChallengeHeading({allComplete} : DailyChallengeHeadingProps) {
  if (allComplete) {
    return <h3 className={"ChallengeHeading"}>Daily challenges for {currentDateLongString()} completed!</h3>
  }
  return <h3 className={"ChallengeHeading"}>Daily challenges for {currentDateLongString()}</h3>
}

export default DailyChallengeHeading;