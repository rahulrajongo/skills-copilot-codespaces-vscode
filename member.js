function skillsMember() {
    var skills = document.getElementById('skills');
    var member = document.getElementById('member');
    var memberSkills = document.getElementById('memberSkills');
    var memberSkillsTitle = document.getElementById('memberSkillsTitle');

    memberSkillsTitle.innerHTML = member.innerHTML;
    memberSkills.style.display = 'block';
    skills.style.display = 'none';
}