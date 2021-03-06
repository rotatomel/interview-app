const TECH_SKILLS = [
  {name: "Java core"},
  {name: "Java Collections"},
  {name: "Kotlin"},
  {name: "GCP"},
  {name: "AWS"},
  {name: "Azure"},
  {name: "Architecture"},
  {name: "Microservices"},
  {name: "TDD"},
  {name: "Scrum"},
  {name: "Git"},
  {name: "REST API"},
  {name: "React"},
  {name: "Frontend"},
  {name: "Docker"},
  {name: "Kubernetes"},
  {name: "Unit tests"},
  {name: "SQL"},
  {name: "No SQL"},
  {name: "Spring"},
  {name: "JavaScript"},
  {name: "ORM"},
]

export default class SkillsService {
  getTechSkills() {
    return TECH_SKILLS.sort((a, b) => {
      return a.name >= b.name ? 1 : -1
    });
  }

  searchTechSkills(query) {
    let filteredItems = []
    const skills = this.getTechSkills()

    for (let i = 0; i < skills.length; i++) {
      let item = skills[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filteredItems.push(item);
      }
    }

    return filteredItems
  }
}