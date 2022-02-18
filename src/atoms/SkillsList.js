import React, {useState} from "react";
import {ListBox} from "primereact/listbox";
import SkillsService from "../service/SkillsService";

export const SkillsList = ({onSelectSkill}) => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const skillsService = new SkillsService()

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);

    if (onSelectSkill) {
      onSelectSkill(skill);
    }
  }

  return (
      <ListBox value={selectedSkill} options={skillsService.getTechSkills()}
               onChange={(e) => handleSkillSelect(e.value)}
               listStyle={{maxHeight: '20rem', "textAlign": 'left'}}
               filter optionLabel="name"
      />
  );
}