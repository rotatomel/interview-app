import React, {useState} from "react";
import {Slider} from "primereact/slider";

const ENG_LEVELS = ["Not evaluated", "Basic", "Intermediate",
  "Upper intermediate", "Advanced", "Native speaker"]

export const LanguageLevel = ({onSelectLevel}) => {

  const [langLevel, setLangLevel] = useState(0);

  const handleSelect = (level) => {
    setLangLevel(level)

    if (onSelectLevel) {
      onSelectLevel(ENG_LEVELS[level])
    }
  }

  return (
      <div className="card">
        <div
            className="flex card-container align-items-center  overflow-hidden">
          <div
              className="flex-grow-1 text-white font-bold p-4 border-round   justify-content-center">

            <label>{ENG_LEVELS[langLevel]}</label>
            <Slider value={langLevel}
                    onChange={(e) => handleSelect(e.value)}
                    max={5}
                    min={0}
            />
          </div>

        </div>
      </div>
  )

}