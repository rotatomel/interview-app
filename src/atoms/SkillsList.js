import React, {useState} from "react";
import {AutoComplete} from 'primereact/autocomplete';
import SkillsService from "../service/SkillsService";

export const SkillsList = ({onSelectSkill}) => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [filteredSkills, setFilteredSkills] = useState([])
  const skillsService = new SkillsService()

  const handleSkillSelect = (skill) => {
    if (typeof skill === "string") {
      skill = {name: skill}
    }
    setSelectedSkill(skill);

    if (onSelectSkill) {
      onSelectSkill(skill);
    }
  }

  const filterSkills = (event) => {
    const query = event.query

    setFilteredSkills(skillsService.searchTechSkills(query))
  }

  return (
    <AutoComplete value={selectedSkill} suggestions={filteredSkills} completeMethod={filterSkills}
                  onChange={(e) => handleSkillSelect(e.value)} dropdown field="name"
                  style={{width: "100%"}}/>
  );
}
