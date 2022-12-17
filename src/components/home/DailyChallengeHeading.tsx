import {currentDateMillis} from "../../utils/dateUtil";
import React from "react";
import './DailyChallengeHeading.css'

interface DailyChallengeHeadingProps {
  allComplete: boolean
}

function DailyChallengeHeading({allComplete} : DailyChallengeHeadingProps) {
  if (allComplete) {
    return <h3 className={"ChallengeHeading"}>daily challenges for {new Date(parseInt(currentDateMillis)).toLocaleDateString()} completed!</h3>
  }
  return <h3 className={"ChallengeHeading"}>daily challenges for {new Date(parseInt(currentDateMillis)).toLocaleDateString()}</h3>
}

export default DailyChallengeHeading;