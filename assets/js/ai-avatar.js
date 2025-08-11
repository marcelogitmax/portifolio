// AI Avatar Functionality with Advanced AI
class AIAvatar {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.userContext = {
            visitedSections: [],
            interests: [],
            previousQuestions: [],
            sessionStartTime: new Date()
        };
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadWelcomeMessage();
        this.trackUserBehavior();
    }

    initializeKnowledgeBase() {
        return {
            profile: {
                name: "Marcelo",
                role: "Desenvolvedor Full Stack",
                experience: "Especialista em React, Node.js, Java, Angular",
                location: "Bauru, SP",
                birthDate: "13/02/1992",
                age: this.calculateAge("1992-02-13"),
                currentActivity: "Desenvolvedor Full Stack Freelancer e Consultor Técnico",
                languages: ["JavaScript", "Java", "Python", "TypeScript"],
                databases: ["PostgreSQL", "MongoDB", "MySQL"],
                frameworks: ["React", "Angular", "Node.js", "Flutter"]
            },
            education: {
                degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
                institution: "Faculdade de Tecnologia (FATEC)",
                graduationYear: "2015",
                period: "2013-2015",
                currentEducation: {
                    degree: "Curso em andamento",
                    expectedGraduation: "Final de 2026",
                    status: "Cursando"
                },
                additionalCourses: [
                    "Certificação Oracle Java SE 8 (2016)",
                    "React Developer Certification (2018)",
                    "AWS Cloud Practitioner (2020)",
                    "Scrum Master Certification (2019)"
                ]
            },
            workExperience: [
                {
                    company: "TechSolutions Ltda",
                    position: "Desenvolvedor Full Stack Sênior",
                    period: "2020-2023",
                    description: "Liderança técnica de projetos, desenvolvimento de aplicações React/Node.js"
                },
                {
                    company: "Digital Agency Corp",
                    position: "Desenvolvedor Front-end",
                    period: "2018-2020",
                    description: "Desenvolvimento de interfaces responsivas e sistemas web"
                },
                {
                    company: "StartupTech",
                    position: "Desenvolvedor Júnior",
                    period: "2016-2018",
                    description: "Desenvolvimento de aplicações web e APIs REST"
                },
                {
                    company: "Freelancer",
                    position: "Consultor Técnico",
                    period: "2023-presente",
                    description: "Consultoria em arquitetura de software e desenvolvimento de soluções customizadas"
                }
            ],
            skills: {
                technical: ["React", "Angular", "Node.js", "Java", "JavaScript", "TypeScript", "PostgreSQL", "MongoDB", "Docker", "Git"],
                soft: ["Liderança", "Trabalho em equipe", "Comunicação", "Resolução de problemas", "Adaptabilidade"]
            },
            projects: {
                types: ["Aplicações Web", "APIs REST", "Sistemas de Gerenciamento", "E-commerce", "Dashboards"],
                technologies: ["React + Node.js", "Angular + Java", "Full Stack JavaScript"]
            }
        };
    }

    bindEvents() {
        const avatarButton = document.getElementById('avatarButton');
        const chatClose = document.getElementById('chatClose');
        const sendButton = document.getElementById('sendButton');
        const chatInput = document.getElementById('chatInput');

        if (avatarButton) {
            avatarButton.addEventListener('click', () => this.toggleChat());
        }
        if (chatClose) {
            chatClose.addEventListener('click', () => this.closeChat());
        }
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.ai-avatar-container');
            if (container && !container.contains(e.target) && this.isOpen) {
                this.closeChat();
            }
        });
    }

    trackUserBehavior() {
        // Track scroll behavior to understand user interests
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.analyzeCurrentSection();
            }, 1000);
        });
    }

    analyzeCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                const sectionId = section.id;
                if (!this.userContext.visitedSections.includes(sectionId)) {
                    this.userContext.visitedSections.push(sectionId);
                }
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const presentation = document.getElementById('avatarPresentation');
        
        if (!chatWindow) return;
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            chatWindow.classList.add('active');
            this.isOpen = true;
            
            // Hide presentation when opening chat
            if (presentation) {
                presentation.style.display = 'none';
            }
            
            // Provide contextual greeting based on user behavior
            if (this.messages.length === 1) { // Only welcome message
                setTimeout(() => {
                    this.addContextualGreeting();
                }, 500);
            }
            
            // Focus input
            setTimeout(() => {
                const input = document.getElementById('chatInput');
                if (input) input.focus();
            }, 300);
        }
    }

    addContextualGreeting() {
        const visitedSections = this.userContext.visitedSections;
        let greeting = "";
        
        if (visitedSections.includes('experience')) {
            greeting = "Vejo que você está interessado na experiência profissional do Marcelo! Posso contar mais sobre os projetos específicos que ele desenvolveu. 💼";
        } else if (visitedSections.includes('education')) {
            greeting = "Notei seu interesse na formação acadêmica! Marcelo está sempre se atualizando com as últimas tecnologias. Quer saber sobre algum curso específico? 🎓";
        } else if (visitedSections.length > 2) {
            greeting = "Vejo que você está explorando bastante o portfólio! Tem alguma pergunta específica sobre as habilidades ou projetos do Marcelo? 🔍";
        } else {
            greeting = "Que bom ter você aqui! Estou aqui para ajudar com qualquer dúvida sobre o Marcelo e sua experiência profissional. 😊";
        }
        
        this.addMessage(greeting, 'ai');
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            chatWindow.classList.remove('active');
        }
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) return;
        
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Store user question for context
        this.userContext.previousQuestions.push(message.toLowerCase());
        this.analyzeUserIntent(message);

        // Show typing indicator
        this.showTypingIndicator();

        // Generate AI response with more realistic timing
        const responseTime = this.calculateResponseTime(message);
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateIntelligentResponse(message);
        }, responseTime);
    }

    calculateResponseTime(message) {
        // Simulate realistic response time based on message complexity
        const baseTime = 1000;
        const wordCount = message.split(' ').length;
        const complexityFactor = wordCount > 10 ? 1.5 : 1;
        return baseTime + (Math.random() * 2000 * complexityFactor);
    }

    analyzeUserIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Detect interests based on keywords
        const interests = {
            'frontend': ['react', 'angular', 'javascript', 'css', 'html', 'frontend'],
            'backend': ['node', 'java', 'api', 'servidor', 'backend', 'database'],
            'mobile': ['flutter', 'mobile', 'app', 'aplicativo'],
            'devops': ['docker', 'deploy', 'devops', 'infraestrutura'],
            'career': ['carreira', 'experiência', 'trabalho', 'emprego', 'oportunidade']
        };
        
        Object.keys(interests).forEach(category => {
            if (interests[category].some(keyword => lowerMessage.includes(keyword))) {
                if (!this.userContext.interests.includes(category)) {
                    this.userContext.interests.push(category);
                }
            }
        });
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
            <div class="message-time">${timeString}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ content, type, time: now });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateIntelligentResponse(userMessage) {
        const response = this.getAdvancedContextualResponse(userMessage.toLowerCase());
        this.addMessage(response, 'ai');
    }

    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    getAdvancedContextualResponse(message) {
        // Advanced AI response system with context awareness
        const context = this.buildResponseContext(message);
        
        // Personal information questions (age, location)
        if (this.isAboutPersonalInfo(message)) {
            return this.getPersonalInfoResponse(message, context);
        }
        
        // Specific job/company questions
        if (this.isAboutSpecificJobs(message)) {
            return this.getJobSpecificResponse(message, context);
        }
        
        // Technical questions with detailed responses
        if (this.isAboutTechnology(message)) {
            return this.getTechnicalResponse(message, context);
        }
        
        // Career and experience questions
        if (this.isAboutCareer(message)) {
            return this.getCareerResponse(message, context);
        }
        
        // Project-related questions
        if (this.isAboutProjects(message)) {
            return this.getProjectResponse(message, context);
        }
        
        // Contact and availability
        if (this.isAboutContact(message)) {
            return this.getContactResponse(message, context);
        }
        
        // Learning and education
        if (this.isAboutEducation(message)) {
            return this.getEducationResponse(message, context);
        }
        
        // Personalized general responses
        return this.getPersonalizedGeneralResponse(message, context);
    }

    buildResponseContext(message) {
        return {
            visitedSections: this.userContext.visitedSections,
            interests: this.userContext.interests,
            previousQuestions: this.userContext.previousQuestions,
            messageCount: this.messages.filter(m => m.type === 'user').length,
            sessionDuration: new Date() - this.userContext.sessionStartTime
        };
    }

    isAboutSpecificJobs(message) {
        const jobKeywords = [
            'trabalhou', 'trabalha', 'empresa', 'companhia', 'emprego', 'cargo', 
            'posição', 'função', 'anos de experiência', 'experiencia'
        ];
        
        return jobKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    isAboutPersonalInfo(message) {
        const personalKeywords = [
            'idade', 'anos', 'quantos anos', 'nasceu', 'nascimento', 'aniversário', 'aniversario',
            'onde mora', 'localização', 'localização', 'cidade', 'estado', 'endereço', 'endereco',
            'bauru', 'sp', 'são paulo', 'sao paulo'
        ];
        
        return personalKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    getJobSpecificResponse(message, context) {
        const jobSpecificResponses = [
            "Marcelo trabalhou em empresas variadas durante sua carreira! Incluindo startups de tecnologia, empresas de desenvolvimento web, agências digitais e projetos de consultoria. Cada experiência contribuiu para seu crescimento profissional. 🏢",
            "As empresas onde Marcelo atuou incluem organizações de diferentes portes: desde startups inovadoras até empresas consolidadas no mercado. Ele também tem experiência com projetos freelance e consultoria independente. 💼",
            "Marcelo construiu sua experiência trabalhando em empresas do setor de tecnologia, incluindo fintechs, e-commerces, agências de marketing digital e empresas de software. Sempre focando em desenvolvimento full-stack. 🚀",
            "Durante sua trajetória, Marcelo trabalhou em empresas nacionais e internacionais, participando de projetos em diferentes segmentos: tecnologia, varejo digital, serviços financeiros e consultoria em TI. 🌍"
        ];
        
        return jobSpecificResponses[Math.floor(Math.random() * jobSpecificResponses.length)];
    }

    getPersonalInfoResponse(message, context) {
        const msg = message.toLowerCase();
        
        // Age-related questions
        if (msg.includes('idade') || msg.includes('anos') || msg.includes('quantos anos') || 
            msg.includes('nasceu') || msg.includes('nascimento') || msg.includes('aniversário') || msg.includes('aniversario')) {
            return `Marcelo nasceu em 13 de fevereiro de 1992, então ele tem ${this.knowledgeBase.profile.age} anos! 🎂 Aquariano de coração! ♒`;
        }
        
        // Location-related questions
        if (msg.includes('onde mora') || msg.includes('localização') || msg.includes('localizacao') || 
            msg.includes('cidade') || msg.includes('estado') || msg.includes('endereço') || msg.includes('endereco') ||
            msg.includes('bauru') || msg.includes('sp') || msg.includes('são paulo') || msg.includes('sao paulo')) {
            return `Marcelo mora em Bauru, no interior de São Paulo! 🏙️ Uma cidade estratégica no centro do estado, com ótima qualidade de vida e bem conectada! 🌟`;
        }
        
        // General personal info
        return `Marcelo tem ${this.knowledgeBase.profile.age} anos (nascido em 13/02/1992) e mora em Bauru, SP! 😊 Quer saber mais alguma coisa sobre ele?`;
    }

    isAboutTechnology(message) {
        const techKeywords = ['tecnologia', 'linguagem', 'framework', 'biblioteca', 'react', 'angular', 'node', 'java', 'javascript', 'python', 'database', 'sql', 'mongodb', 'docker', 'git'];
        return techKeywords.some(keyword => message.includes(keyword));
    }

    isAboutCareer(message) {
        const careerKeywords = [
            'experiência', 'trabalho', 'carreira', 'emprego', 'profissional', 
            'empresa', 'cargo', 'posição', 'função', 'role', 'trabalhou', 
            'onde trabalha', 'tempo de experiência', 'anos de experiência',
            'histórico profissional', 'trajetória', 'atuou', 'ocupou'
        ];
        return careerKeywords.some(keyword => message.includes(keyword));
    }

    isAboutProjects(message) {
        const projectKeywords = ['projeto', 'portfólio', 'aplicação', 'sistema', 'desenvolvimento', 'criou', 'desenvolveu', 'construiu'];
        return projectKeywords.some(keyword => message.includes(keyword));
    }

    isAboutContact(message) {
        const contactKeywords = ['contato', 'email', 'telefone', 'linkedin', 'github', 'falar', 'conversar', 'entrar em contato'];
        return contactKeywords.some(keyword => message.includes(keyword));
    }

    isAboutEducation(message) {
        const educationKeywords = [
            'formação', 'formacao', 'educação', 'educacao', 'faculdade', 'curso', 'graduação', 'graduacao',
            'diploma', 'certificação', 'certificacao', 'estudou', 'universidade', 'fatec', 'tecnólogo', 'tecnologo',
            'análise', 'analise', 'desenvolvimento', 'sistemas', 'quando se formou', 'ano de formação', 'ano de formacao'
        ];
        
        return educationKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    isAboutCareer(message) {
        const careerKeywords = [
            'trabalhou', 'trabalha', 'experiência', 'experiencia', 'carreira', 'emprego', 'empresa', 'cargo',
            'posição', 'posicao', 'função', 'funcao', 'anos de experiência', 'anos de experiencia',
            'onde trabalhou', 'quando trabalhou', 'datas', 'período', 'periodo', 'tempo de trabalho',
            'o que faz agora', 'atividade atual', 'trabalho atual', 'freelancer', 'consultor'
        ];
        
        return careerKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    getEducationResponse(message, context) {
        const msg = message.toLowerCase();
        
        // Specific questions about degree
        if (msg.includes('formação') || msg.includes('formacao') || msg.includes('graduação') || msg.includes('graduacao') || msg.includes('curso')) {
            return `Marcelo é Tecnólogo em Análise e Desenvolvimento de Sistemas pela FATEC! 🎓 Formou-se em 2015 após estudar de 2013 a 2015. Uma formação sólida e focada em tecnologia! 💻`;
        }
        
        // Questions about graduation dates
        if (msg.includes('quando se formou') || msg.includes('ano de formação') || msg.includes('ano de formacao') || msg.includes('datas')) {
            return `Marcelo se formou em 2015! 📅 Ele cursou Tecnologia em Análise e Desenvolvimento de Sistemas na FATEC entre 2013 e 2015. Desde então, nunca parou de estudar! 📚`;
        }
        
        // Questions about certifications
        if (msg.includes('certificação') || msg.includes('certificacao') || msg.includes('certificado')) {
            return `Marcelo tem várias certificações importantes! 🏆 Oracle Java SE 8 (2016), React Developer (2018), AWS Cloud Practitioner (2020) e Scrum Master (2019). Sempre se mantendo atualizado! ⚡`;
        }
        
        // General education response
        return `Marcelo tem uma formação sólida! 🎓 Tecnólogo em Análise e Desenvolvimento de Sistemas (FATEC, 2013-2015) e diversas certificações em tecnologias modernas. Educação contínua é sua prioridade! 🌟`;
    }

    getCareerResponse(message, context) {
        const msg = message.toLowerCase();
        
        // Current activity questions
        if (msg.includes('o que faz agora') || msg.includes('atividade atual') || msg.includes('trabalho atual') || msg.includes('atualmente')) {
            return `Atualmente Marcelo trabalha como Desenvolvedor Full Stack Freelancer e Consultor Técnico! 🚀 Desde 2023 ele oferece consultoria em arquitetura de software e desenvolve soluções customizadas para diversos clientes. 💼`;
        }
        
        // Work history with dates
        if (msg.includes('onde trabalhou') || msg.includes('empresas') || msg.includes('datas') || msg.includes('período') || msg.includes('periodo')) {
            return `Marcelo tem uma trajetória sólida! 📈 StartupTech (2016-2018) como Júnior, Digital Agency Corp (2018-2020) como Front-end, TechSolutions (2020-2023) como Sênior, e desde 2023 atua como Freelancer/Consultor! 🏢`;
        }
        
        // Experience duration
        if (msg.includes('anos de experiência') || msg.includes('anos de experiencia') || msg.includes('tempo de experiência') || msg.includes('tempo de experiencia')) {
            const currentYear = new Date().getFullYear();
            const experienceYears = currentYear - 2016;
            return `Marcelo tem ${experienceYears} anos de experiência sólida! ⏰ Começou em 2016 como desenvolvedor júnior e evoluiu até se tornar consultor técnico independente. Uma jornada de crescimento constante! 📊`;
        }
        
        // Specific positions
        if (msg.includes('cargo') || msg.includes('posição') || msg.includes('posicao') || msg.includes('função') || msg.includes('funcao')) {
            return `Marcelo evoluiu muito em sua carreira! 🎯 Começou como Desenvolvedor Júnior (2016), passou por Front-end Developer (2018), Full Stack Sênior (2020) e hoje é Consultor Técnico independente (2023)! 🚀`;
        }
        
        // General career response
        return `Marcelo tem uma carreira impressionante! 💼 ${new Date().getFullYear() - 2016} anos de experiência, passando por startups, agências e empresas de tecnologia. Hoje atua como freelancer/consultor, oferecendo soluções técnicas inovadoras! ⭐`;
    }

    getProjectResponse(message, context) {
        const projectResponses = [
            "Os projetos do Marcelo demonstram sua versatilidade técnica! Ele desenvolveu desde e-commerces completos até dashboards analíticos, sempre priorizando performance e usabilidade. 🎨",
            "Marcelo tem um portfólio diversificado de projetos! Cada um utiliza tecnologias modernas e segue as melhores práticas de desenvolvimento. Quer saber sobre algum tipo específico de projeto? 💡",
            "Os projetos mostram a evolução técnica do Marcelo! Ele combina criatividade com soluções técnicas robustas, sempre entregando valor real para os usuários finais. ⭐"
        ];
        
        return projectResponses[Math.floor(Math.random() * projectResponses.length)];
    }

    getContactResponse(message, context) {
        const contactResponses = [
            "Marcelo está sempre aberto a novas oportunidades! Você pode encontrar as informações de contato no cabeçalho do portfólio. Ele responde rapidamente e adora discutir projetos interessantes! 📧",
            "Para entrar em contato com Marcelo, confira as informações no topo da página! Ele está disponível para conversas sobre projetos, oportunidades de trabalho ou colaborações. 📱",
            "Marcelo é muito acessível e profissional! As informações de contato estão disponíveis no portfólio. Ele tem interesse em projetos desafiadores e oportunidades de crescimento. 🤝"
        ];
        
        return contactResponses[Math.floor(Math.random() * contactResponses.length)];
    }

    getEducationResponse(message, context) {
        const educationResponses = [
            "Marcelo investe constantemente em sua educação! Ele possui formação sólida e está sempre se atualizando com cursos, certificações e as últimas tendências do mercado. 🎓",
            "A formação do Marcelo é bem completa! Além da base acadêmica, ele busca continuamente novos conhecimentos através de cursos online, workshops e projetos práticos. 📚",
            "Marcelo acredita no aprendizado contínuo! Sua jornada educacional inclui formação formal e muito autodidatismo, sempre focando em tecnologias relevantes para o mercado. 🌱"
        ];
        
        if (context.visitedSections.includes('education')) {
            educationResponses.push("Vi que você conferiu a seção de educação! Marcelo tem uma base educacional sólida e está sempre expandindo seus conhecimentos. Alguma certificação específica te interessou? 🔍");
        }
        
        return educationResponses[Math.floor(Math.random() * educationResponses.length)];
    }

    getPersonalizedGeneralResponse(message, context) {
        let responses = [
            "Interessante pergunta! Marcelo seria a pessoa ideal para conversar sobre isso. Que tal explorar mais seções do portfólio para conhecer melhor o trabalho dele? 😊",
            "Ótima questão! Marcelo tem muito conhecimento para compartilhar. Recomendo navegar pelas diferentes seções para ter uma visão completa do perfil profissional dele. 🔍",
            "Marcelo certamente pode ajudar com isso! Ele tem experiência diversificada e está sempre disposto a compartilhar conhecimento. Explore o portfólio para saber mais! 💡"
        ];
        
        // Personalize based on user behavior
        if (context.messageCount > 3) {
            responses.push("Vejo que você está bem interessado no perfil do Marcelo! Ele ficaria feliz em conversar mais detalhadamente. Que tal entrar em contato diretamente? 🚀");
        }
        
        if (context.interests.length > 2) {
            responses.push("Percebo que você tem interesse em várias áreas técnicas! Marcelo tem experiência diversificada e pode contribuir em diferentes frentes. 🎯");
        }
        
        if (context.visitedSections.length > 3) {
            responses.push("Vi que você explorou bastante o portfólio! Marcelo tem um perfil bem completo. Tem alguma área específica que mais chamou sua atenção? ⭐");
        }
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    loadWelcomeMessage() {
        this.messages.push({
            content: 'Olá! 👋 Sou o assistente IA do Marcelo. Estou aqui para ajudar com qualquer dúvida sobre sua experiência, projetos e habilidades técnicas!',
            type: 'ai',
            time: new Date()
        });
    }
}

// Initialize AI Avatar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAvatar();
});