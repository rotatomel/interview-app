import './App.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {InputTextarea} from "primereact/inputtextarea";
import {Card} from "primereact/card";
import React, {useRef, useState} from 'react';
import {Divider} from "primereact/divider";
import {SkillsRating} from "./molecules/SkillsRating";
import {LanguageLevel} from "./atoms/LanguageLevel";
import {Button} from "primereact/button";
import {ToggleButton} from "primereact/togglebutton";
import {Toast} from "primereact/toast";
import {getTextReport} from "./utils/ReportBuilder";
import {ListBox} from "primereact/listbox";

const App = () => {

  const [skillsRatings, setSkillsRatings] = useState(new Map())
  const [ratedSkillsList, setRatedSkillsList] = useState([])
  const [languageLevel, setLanguageLevel] = useState(null)
  const [summary, setSummary] = useState("")
  const [hireDecision, setHireDecision] = useState(false)

  const toast = useRef(null)

  const buildTextReport = () => {

    const reportProps = {
      hireDecision,
      skillsRatings,
      summary,
      languageLevel
    }

    return getTextReport(reportProps)
  }

  const handleGenerateReport = () => {
    const textReport = buildTextReport()

    navigator.clipboard.writeText(textReport)

    toast.current.show({
      severity: 'success',
      summary: 'Report done!',
      detail: 'Report copied to clipboard.'
    });
  }

  const addedSkillsTemplate = (option) => {
    return (
      `${option.skill}: ${option.level} (${option.notes})`
    )
  }

  const removeRatedSkill = (skillRating) => {
    skillsRatings.delete(skillRating.skill);
    setSkillsRatings(skillsRatings)
    setRatedSkillsList(Array.from(skillsRatings.values()))
  }

  return (
    <div className="App">
      <Toast ref={toast}/>

      <Card header={"Step 1"}>
        <h2>Tech Skills</h2>
        <SkillsRating onRatedSkill={(ratedSkill) => {
          skillsRatings.set(ratedSkill.skill, ratedSkill)
          setSkillsRatings(skillsRatings)
          setRatedSkillsList(Array.from(skillsRatings.values()))
        }}/>

        <div
          className="flex card-container align-items-center  overflow-hidden text-justify">

          <ListBox options={ratedSkillsList} itemTemplate={addedSkillsTemplate} style={{width: '85%'}}
                   onChange={(e) => removeRatedSkill(e.value)}
                   tooltip="Click to remove"/>

        </div>
      </Card>

      <Divider/>

      <Card header={"Step 2"}>
        <h2>English Skills</h2>
        <LanguageLevel onSelectLevel={(level) => setLanguageLevel(level)}/>
      </Card>

      <Divider/>

      <Card header={"Step 3"}>
        <h2>Summary</h2>

        <div className="card">
          <div
            className="flex flex-wrap align-items-center justify-content-center ">
            <div
              className=" text-white font-bold  border-round " style={{
              width: '50rem', height: '20rem'
            }}>
              <InputTextarea value={summary}
                             onChange={(e) => setSummary(e.target.value)}
                             style={{width: '100%', height: '100%'}}/>

            </div>


          </div>

          <div
            className="flex flex-wrap align-items-center justify-content-center ">
            <label>Hire? </label>
            <ToggleButton checked={hireDecision}
                          onChange={(e) => setHireDecision(e.value)}
                          onLabel="Make the offer!"
                          offLabel="Not this time..."
                          onIcon="pi pi-check" offIcon="pi pi-times"/>
          </div>
        </div>
      </Card>

      <Divider/>

      <Card header={"Final step"}>
        <h2>Build report</h2>
        <Button label={"Get report"} onClick={handleGenerateReport}
                icon={"pi pi-copy"}/>
      </Card>
    </div>
  );
}

export default App;
