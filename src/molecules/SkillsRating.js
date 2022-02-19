import React, {useRef, useState} from "react";
import {SkillsList} from "../atoms/SkillsList";
import {Rating} from "primereact/rating";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {InputTextarea} from "primereact/inputtextarea";

const SKILL_LEVELS = ["Can perform with supervision",
  "Can perform with limited supervision",
  "Can perform without supervision",
  "Can teach others"]
const DEFAULT_LEVEL = "Cannot perform"

export const SkillsRating = ({onRatedSkill}) => {
  const [rating, setRating] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [notes, setNotes] = useState("");
  const toast = useRef(null)

  const getStringSkillLevel = () => {
    if (rating) {
      return SKILL_LEVELS[rating - 1]
    }
    return DEFAULT_LEVEL
  }

  const handleAddSkill = () => {
    if (!onRatedSkill) {
      return
    }

    const ratedSkill = {
      skill: selectedSkill.name,
      level: getStringSkillLevel(),
      notes: notes
    }

    onRatedSkill(ratedSkill)

    setRating(null);
    setSelectedSkill(null);
    setNotes("");

    toast.current.show({
      severity: 'success',
      summary: 'Well done!',
      detail: 'Skill evaluation added!'
    });

  }

  const areOptionsSelected = () => {
    return !(selectedSkill);
  }

  return (
    <div>
      <Toast ref={toast}/>

      <div className="card">
        <div
          className="flex card-container align-items-start  overflow-hidden">
          <div
            className="flex-grow-1 text-white font-bold p-4 border-round mr-3  justify-content-start">

            <label htmlFor="skillsList" className="block">Select a skill:</label>

            <SkillsList onSelectSkill={setSelectedSkill}/>

          </div>

          <div
            className="flex-grow-1 text-white font-bold p-4 border-round mr-3 justify-content-center">
            <label htmlFor="skillLevel">Skill level:</label>
            <Rating stars={4} value={rating}
                    onChange={(e) => setRating(e.value)}
                    tooltip={getStringSkillLevel()}
                    tooltipOptions={{position: 'bottom'}}
            />
          </div>

          <div
            className="flex-grow-1 text-white font-bold p-4 border-round mr-3 text-justify">
            <label htmlFor="notes" className="block">Notes:</label>
            <InputTextarea value={notes}
                           onChange={(e) => setNotes(e.target.value)}
                           aria-describedby="notes-help" className="block"
                           tooltip={"Useful notes about the tech skill and the candidate's performance"}
                           tooltipOptions={{position: 'bottom'}}/>
          </div>

        </div>

        <div
          className="flex card-container align-items-center  overflow-hidden">
          <div
            className="text-white font-bold p-4 border-round mr-3 text-justify">
            <Button disabled={areOptionsSelected()}
                    icon={"pi pi-check"}
                    label={"Add"}
                    onClick={handleAddSkill}/>
          </div>
        </div>
      </div>

    </div>
  );

}