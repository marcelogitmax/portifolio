function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name

    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const location = document.getElementById('profile.location')
    location.innerText = profileData.location

    const phone = document.getElementById('profile.phone')
    phone.innerText = profileData.phone
    phone.href = `tel:${profileData.phone}`

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`
}

function updateSoftSkills(profileData) {
    console.log('Updating soft skills:', profileData.skills.softSkills); // Debug
    const softSkills = document.getElementById('profile.skills.softSkills')
    if (softSkills && profileData.skills && profileData.skills.softSkills) {
        softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li class="soft-skill"><span>${skill}</span></li>`).join('')
    } else {
        console.error('Soft skills element or data not found');
    }
}

function updateHardSkills(profileData) {
    console.log('Updating hard skills:', profileData.skills.hardSkills); // Debug
    const hardSkills = document.getElementById('profile.skills.hardSkills')
    if (hardSkills && profileData.skills && profileData.skills.hardSkills) {
        hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => 
            `<li class="skill-item">
                <img src="${skill.logo}" alt="${skill.name}" title="${skill.name}" class="skill-icon">
                <span class="skill-name">${skill.name}</span>
            </li>`
        ).join('')
    } else {
        console.error('Hard skills element or data not found');
    }
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages')
    languages.innerHTML = profileData.languages.map(language => `<li>${language}</li>`).join('')
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio')
    portfolio.innerHTML = profileData.portfolio.map(project => {
        return `
            <li>
                <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
            </li>
        `
    }).join('')
}

function updateEducation(profileData) {
    const educationList = document.getElementById('profile.education')
    if (!profileData.education) return; // Handle cases where education might be missing
    educationList.innerHTML = profileData.education.map(edu => {
        return `
            <li>
                <h3 class="title">${edu.course}</h3>
                <p class="period">${edu.period}</p>
                <p>${edu.institution}</p>
            </li>
        `
    }).join('')
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience')
    professionalExperience.innerHTML = profileData.professionalExperience.map(experience => {
        return `
            <li>
                <h3 class="title">${experience.name}</h3>
                <p class="period">${experience.period}</p>
                <p>${experience.description}</p>
            </li>
        `
    }).join('')
}

(async () => {
    try {
        console.log('Loading profile data...'); // Debug
        const profileData = await fetchProfileData()
        console.log('Profile data received:', profileData); // Debug
        
        updateProfileInfo(profileData)
        updateSoftSkills(profileData)
        updateHardSkills(profileData)
        updateLanguages(profileData)
        updatePortfolio(profileData)
        updateProfessionalExperience(profileData)
        updateEducation(profileData)
        
        console.log('All updates completed'); // Debug
    } catch (error) {
        console.error('Error in main execution:', error);
    }
})()
