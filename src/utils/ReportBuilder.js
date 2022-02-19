export const getTextReport = (reportProps) => {

  const {hireDecision, skillsRatings, summary, languageLevel} = reportProps

  const hireText = hireDecision ? '**YES**' : '**Not at this time**'
  let techSkillsText = ''

  skillsRatings.forEach((value, key) => {
    techSkillsText = techSkillsText
      + `${key}: ${value.level} (${value.notes})\n`
  })

  return `Summary:\n\nHire: ${hireText} \n${summary} \n\nEnglish level: ${languageLevel}\n\nTechSkills:\n${techSkillsText}`;
}