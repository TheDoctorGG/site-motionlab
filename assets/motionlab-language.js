(function () {
  const STORAGE_KEY = "motionlab_language";
  const LANGUAGES = ["en", "pt"];

  const COPY = {
    "nav.home": { en: "Home", pt: "Início" },
    "nav.trampo": { en: "App Brazil", pt: "App Brasil" },
    "nav.about": { en: "About Us", pt: "Sobre nós" },
    "nav.privacy": { en: "Privacy Policy", pt: "Política de Privacidade" },
    "nav.terms": { en: "Terms of Use", pt: "Termos de Uso" },
    "nav.terms.short": { en: "Terms", pt: "Termos" },
    "nav.lgpd": { en: "LGPD & Data Consent", pt: "LGPD e Consentimento de Dados" },

    "footer.description": {
      en: "Motion Lab is building the physical-world data acquisition layer for embodied AI in Latin America.",
      pt: "A Motion Lab está criando a camada de aquisição de dados físicos da América Latina para IA, robótica e modelos multimodais."
    },
    "footer.pages": { en: "PAGES", pt: "PÁGINAS" },
    "footer.legal": { en: "LEGAL", pt: "LEGAL" },
    "footer.contact": { en: "CONTACT", pt: "CONTATO" },
    "footer.bottom": {
      en: "© 2026 Motion Lab. Built in Brazil for the future of physical AI.",
      pt: "© 2026 Motion Lab. Construído no Brasil para o futuro da IA física."
    },
    "footer.beta": { en: "Closed beta", pt: "Beta fechado" },
    "footer.data": { en: "Physical AI data", pt: "Dados para IA física" },

    "cta.talk.motion": { en: "Talk to Motion Lab", pt: "Fale com a Motion Lab" },
    "cta.talk.gabriel": { en: "Talk to Gabriel", pt: "Fale com Gabriel" },
    "cta.email.gabriel": { en: "Email Gabriel", pt: "Enviar e-mail para Gabriel" },
    "cta.trampo": { en: "View Trampo Beta", pt: "Ver Trampo Beta" },
    "cta.trampo.short": { en: "APP Beta", pt: "Ver Trampo Beta" },
    "cta.waitlist": { en: "Join waitlist", pt: "Quero participar" },
    "cta.waitlist.long": { en: "Join the waitlist", pt: "Quero entrar na lista de espera" },
    "cta.partner": { en: "I am an investor or partner", pt: "Sou investidor ou parceiro" },
    "cta.how": { en: "See how it works", pt: "Ver como funciona" },
    "cta.whatsapp": { en: "WhatsApp", pt: "WhatsApp" },
    "cta.whatsapp.talk": { en: "Talk on WhatsApp", pt: "Falar no WhatsApp" },

    "home.title": {
      en: "Motion Lab | Physical-world data for embodied AI",
      pt: "Motion Lab | Dados do mundo físico para IA incorporada"
    },
    "home.hero.badge": { en: "Building in Brazil for physical AI", pt: "Construindo no Brasil para IA física" },
    "home.hero.title": {
      en: 'Physical-world data <br><span class="blue-gradient-text">for embodied AI</span> <br>in Latin America.',
      pt: 'Dados do mundo físico <br><span class="blue-gradient-text">para IA incorporada</span> <br>na América Latina.'
    },
    "home.hero.text": {
      en: "Motion Lab builds mobile data collection infrastructure to generate localized POV datasets for robotics, AI, and multimodal model companies.",
      pt: "A Motion Lab cria infraestrutura móvel de coleta de dados para gerar datasets POV localizados para empresas de robótica, IA e modelos multimodais."
    },
    "home.hud.sao": { en: "Sao Paulo node", pt: "Nó São Paulo" },
    "home.hud.sao.text": { en: "Brazilian physical-world data acquisition.", pt: "Aquisição brasileira de dados do mundo físico." },
    "home.hud.global": { en: "Global delivery", pt: "Entrega global" },
    "home.hud.global.text": { en: "Structured datasets for AI and robotics teams.", pt: "Datasets estruturados para times de IA e robótica." },
    "home.hud.consent": { en: "Consent-first", pt: "Consentimento em primeiro lugar" },
    "home.hud.consent.text": { en: "Collector screening, task approval, and validation.", pt: "Triagem de coletores, aprovação de tarefas e validação." },
    "home.dataset.label": { en: "Data Layer", pt: "Camada de dados" },
    "home.dataset.context": { en: "Brazilian Context", pt: "Contexto brasileiro" },
    "home.dataset.title": { en: "Physical-world datasets we are building", pt: "Datasets do mundo físico que estamos construindo" },
    "home.dataset.text": {
      en: "Localized egocentric data from everyday Brazilian environments, designed for AI, robotics, and multimodal model development.",
      pt: "Dados egocêntricos localizados de ambientes brasileiros cotidianos, criados para desenvolvimento de IA, robótica e modelos multimodais."
    },
    "home.card.washing": { en: "Washing Dishes", pt: "Lavando louça" },
    "home.card.washing.text": {
      en: "Multi-object manipulation including glassware, cutlery, and local ceramic textures under varying suds conditions.",
      pt: "Manipulação de múltiplos objetos, incluindo copos, talheres e cerâmicas locais em diferentes condições de espuma."
    },
    "home.card.folding": { en: "Folding Clothes", pt: "Dobrando roupas" },
    "home.card.folding.text": {
      en: "Deformable object manipulation focusing on edge alignment and textile interaction physics in domestic settings.",
      pt: "Manipulação de objetos deformáveis com foco em alinhamento de bordas e física de interação com tecidos em casas reais."
    },
    "home.card.sweeping": { en: "Sweeping the Floor", pt: "Varrendo o chão" },
    "home.card.sweeping.text": {
      en: "Large-scale workspace interaction and reach-trajectory data across common Brazilian floor materials.",
      pt: "Interação em área ampla e dados de trajetória de alcance em materiais de piso comuns no Brasil."
    },
    "home.card.arranging": { en: "Arranging Objects", pt: "Organizando objetos" },
    "home.card.arranging.text": {
      en: "Spatial reasoning data from sorting, grouping, aligning, and repositioning everyday household objects.",
      pt: "Dados de raciocínio espacial ao separar, agrupar, alinhar e reposicionar objetos domésticos do dia a dia."
    },
    "home.card.conversation": { en: "Conversation Data", pt: "Dados de conversa" },
    "home.card.conversation.text": {
      en: "Multimodal interaction data for speech, gestures, turn-taking, gaze, and real domestic social context.",
      pt: "Dados multimodais de fala, gestos, turnos de conversa, olhar e contexto social doméstico real."
    },
    "home.card.category": { en: "BETA DATA CATEGORY", pt: "CATEGORIA DE DADOS BETA" },
    "home.value.geo": { en: "Geographic Diversity", pt: "Diversidade geográfica" },
    "home.value.geo.text": {
      en: "Built to capture regional variation across Brazilian households, objects, lighting, surfaces, routines, and physical environments.",
      pt: "Construído para capturar variações regionais em lares, objetos, iluminação, superfícies, rotinas e ambientes físicos brasileiros."
    },
    "home.value.precision": { en: "Neural Precision", pt: "Precisão neural" },
    "home.value.precision.text": {
      en: "POV video and structured metadata designed to support higher-quality training, evaluation, and validation workflows for physical AI.",
      pt: "Vídeo POV e metadados estruturados para apoiar fluxos de treinamento, avaliação e validação de maior qualidade para IA física."
    },
    "home.value.ethical": { en: "Ethically Sourced", pt: "Coleta ética" },
    "home.value.ethical.text": {
      en: "Collector participation is designed around consent, quality validation, task approval, and fair compensation for accepted missions.",
      pt: "A participação dos coletores é desenhada com consentimento, validação de qualidade, aprovação de tarefas e recompensa justa por missões aceitas."
    },
    "home.pipeline.title": { en: "Our Systematic Pipeline", pt: "Nosso pipeline sistemático" },
    "home.pipeline.text": {
      en: "From task design to validated physical-world datasets for AI and robotics teams.",
      pt: "Do desenho de tarefas a datasets validados do mundo físico para times de IA e robótica."
    },
    "home.pipeline.task": { en: "Task Definition", pt: "Definição de tarefas" },
    "home.pipeline.task.text": {
      en: "Defining useful real-world interactions based on robotics needs and Latin American environmental context.",
      pt: "Definição de interações reais úteis com base nas necessidades da robótica e no contexto ambiental latino-americano."
    },
    "home.pipeline.record": { en: "BR Network Record", pt: "Registro pela rede BR" },
    "home.pipeline.record.text": {
      en: "Brazilian contributors receive guided missions through Trampo and record POV interactions with everyday objects and spaces.",
      pt: "Contribuidores brasileiros recebem missões guiadas pelo Trampo e registram interações POV com objetos e espaços cotidianos."
    },
    "home.pipeline.audit": { en: "Neural Audit", pt: "Auditoria neural" },
    "home.pipeline.audit.text": {
      en: "Quality checks review instruction adherence, visual clarity, safety, and dataset usefulness before approval.",
      pt: "Checagens de qualidade revisam aderência às instruções, clareza visual, segurança e utilidade do dataset antes da aprovação."
    },
    "home.pipeline.delivery": { en: "Global Delivery", pt: "Entrega global" },
    "home.pipeline.delivery.text": {
      en: "Approved data can be structured, labeled, and delivered to AI, robotics, and multimodal model companies.",
      pt: "Dados aprovados podem ser estruturados, rotulados e entregues a empresas de IA, robótica e modelos multimodais."
    },
    "home.final.eyebrow": { en: "Brazil • Innovation • AI", pt: "Brasil • Inovação • IA" },
    "home.final.title": {
      en: "The Future of Robotics is <br> Trained in Brazil.",
      pt: "O futuro da robótica é <br> treinado no Brasil."
    },

    "about.title": { en: "About Us | Motion Lab", pt: "Sobre nós | Motion Lab" },
    "about.eyebrow": { en: "About Motion Lab", pt: "Sobre a Motion Lab" },
    "about.hero.title": {
      en: "We are building the physical-world data acquisition layer for embodied AI in Latin America.",
      pt: "Estamos construindo a camada de aquisição de dados do mundo físico para IA incorporada na América Latina."
    },
    "about.hero.text": {
      en: "Motion Lab creates mobile infrastructure to collect localized, first-person video data from real Brazilian environments — helping robotics, AI, and multimodal model companies understand the physical world beyond generic datasets.",
      pt: "A Motion Lab cria infraestrutura móvel para coletar dados de vídeo em primeira pessoa, localizados em ambientes brasileiros reais, ajudando empresas de robótica, IA e modelos multimodais a entender o mundo físico além de datasets genéricos."
    },
    "about.thesis.label": { en: "Core Thesis", pt: "Tese central" },
    "about.thesis.title": { en: "Trampo is the acquisition engine.", pt: "O Trampo é o motor de aquisição." },
    "about.thesis.card.title": {
      en: "The core asset is proprietary physical-world data from Latin America.",
      pt: "O ativo central são dados proprietários do mundo físico da América Latina."
    },
    "about.thesis.card.text1": {
      en: "Motion Lab is not positioned as another gig app or SaaS tool. Trampo enables a distributed mobile collection network; Motion Lab builds the data infrastructure behind it.",
      pt: "A Motion Lab não se posiciona como mais um app de bicos ou ferramenta SaaS. O Trampo habilita uma rede distribuída de coleta móvel; a Motion Lab constrói a infraestrutura de dados por trás dela."
    },
    "about.thesis.card.text2": {
      en: "Our goal is to help robotics, AI, and multimodal model companies access localized, consent-based, first-person data from real Brazilian environments.",
      pt: "Nosso objetivo é ajudar empresas de robótica, IA e modelos multimodais a acessar dados em primeira pessoa, localizados e baseados em consentimento, vindos de ambientes brasileiros reais."
    },
    "about.founder.role": { en: "Founder & CEO", pt: "Fundador e CEO" },
    "about.founder.label": { en: "Founder-led infrastructure", pt: "Infraestrutura liderada pelo fundador" },
    "about.founder.title": { en: "A Brazilian data layer for physical AI.", pt: "Uma camada brasileira de dados para IA física." },
    "about.founder.text1": {
      en: "Motion Lab was founded by Gabriel Gil to solve a specific bottleneck in embodied AI: robots and multimodal systems need high-quality, localized data from the real physical world. Most available datasets do not reflect the environments, objects, routines, and constraints of Latin America.",
      pt: "A Motion Lab foi fundada por Gabriel Gil para resolver um gargalo específico em IA incorporada: robôs e sistemas multimodais precisam de dados localizados e de alta qualidade do mundo físico real. A maioria dos datasets disponíveis não reflete os ambientes, objetos, rotinas e restrições da América Latina."
    },
    "about.founder.text2": {
      en: "Our approach combines a mobile collection app, task design, contributor screening, quality validation, and dataset delivery into one acquisition pipeline.",
      pt: "Nossa abordagem combina app móvel de coleta, desenho de tarefas, triagem de contribuidores, validação de qualidade e entrega de datasets em um único pipeline de aquisição."
    },
    "about.metric.pov": { en: "First-person data", pt: "Dados em primeira pessoa" },
    "about.metric.br": { en: "Localized context", pt: "Contexto localizado" },
    "about.metric.b2b": { en: "AI & robotics", pt: "IA e robótica" },
    "about.build.label": { en: "What we build", pt: "O que construímos" },
    "about.build.title": {
      en: "Infrastructure for localized physical-world datasets.",
      pt: "Infraestrutura para datasets localizados do mundo físico."
    },
    "about.build.text": {
      en: "Motion Lab is developing the operational layer required to turn everyday smartphone users into structured, consent-based POV data collectors for AI and robotics companies.",
      pt: "A Motion Lab está desenvolvendo a camada operacional necessária para transformar usuários comuns de smartphone em coletores estruturados de dados POV, com base em consentimento, para empresas de IA e robótica."
    },
    "about.build.mobile": { en: "Mobile acquisition", pt: "Aquisição móvel" },
    "about.build.mobile.text": { en: "Trampo guides selected contributors through structured recording tasks using smartphones.", pt: "O Trampo guia contribuidores selecionados por tarefas estruturadas de gravação usando smartphones." },
    "about.build.quality": { en: "Quality validation", pt: "Validação de qualidade" },
    "about.build.quality.text": { en: "Data is designed to pass through instruction checks, quality rules, and approval workflows before delivery.", pt: "Os dados são desenhados para passar por checagens de instrução, regras de qualidade e fluxos de aprovação antes da entrega." },
    "about.build.ai": { en: "Embodied AI use cases", pt: "Casos de uso em IA incorporada" },
    "about.build.ai.text": { en: "Datasets may support robotics, multimodal models, physical AI, simulation, and real-world behavior understanding.", pt: "Os datasets podem apoiar robótica, modelos multimodais, IA física, simulação e compreensão de comportamento no mundo real." },
    "about.principles.label": { en: "Operating principles", pt: "Princípios operacionais" },
    "about.principles.title": { en: "Built for trust, consent, and useful data.", pt: "Construído para confiança, consentimento e dados úteis." },
    "about.principles.consent.text": { en: "Participants must understand what they are recording and how approved data may be used.", pt: "Participantes devem entender o que estão gravando e como dados aprovados podem ser usados." },
    "about.principles.context": { en: "Brazilian context", pt: "Contexto brasileiro" },
    "about.principles.context.text": { en: "The environments, objects, homes, routines, and motion patterns reflect local reality.", pt: "Ambientes, objetos, casas, rotinas e padrões de movimento refletem a realidade local." },
    "about.principles.task": { en: "Task structure", pt: "Estrutura de tarefas" },
    "about.principles.task.text": { en: "Collection is organized around specific physical tasks, instructions, and acceptance criteria.", pt: "A coleta é organizada em torno de tarefas físicas específicas, instruções e critérios de aceitação." },
    "about.principles.delivery": { en: "B2B delivery", pt: "Entrega B2B" },
    "about.principles.delivery.text": { en: "The goal is to create useful datasets for companies building robotics and AI systems.", pt: "O objetivo é criar datasets úteis para empresas que constroem sistemas de robótica e IA." },
    "about.contact.label": { en: "For AI companies, robotics teams, and investors", pt: "Para empresas de IA, times de robótica e investidores" },
    "about.contact.title": { en: "Let’s talk about physical-world data from Brazil.", pt: "Vamos conversar sobre dados do mundo físico vindos do Brasil." },
    "about.contact.text": {
      en: "If you are building embodied AI, robotics systems, multimodal models, or data infrastructure, reach out directly to discuss partnerships, pilots, or Motion Lab’s roadmap.",
      pt: "Se você está construindo IA incorporada, sistemas robóticos, modelos multimodais ou infraestrutura de dados, entre em contato para discutir parcerias, pilotos ou o roadmap da Motion Lab."
    },
    "about.market.title": { en: "Brazil is an underrepresented physical-world data market.", pt: "O Brasil é um mercado sub-representado de dados do mundo físico." },
    "about.market.text": { en: "Motion Lab is building the infrastructure to make it accessible, structured, and useful for the next generation of AI systems.", pt: "A Motion Lab está construindo a infraestrutura para tornar esse mercado acessível, estruturado e útil para a próxima geração de sistemas de IA." },
    "about.market.link": { en: "See Trampo Beta", pt: "Ver Trampo Beta" },

    "trampo.title": { en: "Motion Lab | Trampo - Earn up to R$100/h recording simple tasks", pt: "Motion Lab | Trampo - Ganhe até R$100/h gravando tarefas simples" },
    "trampo.hero.badge": { en: "Closed beta • limited spots", pt: "Beta fechado • vagas limitadas" },
    "trampo.hero.title": {
      en: 'Earn up to <span class="text-emerald-600"> R$100/h </span> recording simple tasks to <br><span class="text-primary italic">train robots.</span>',
      pt: 'Ganhe até <span class="text-emerald-600"> R$100/h </span> gravando tarefas simples para <br><span class="text-primary italic">treinar robôs.</span>'
    },
    "trampo.hero.text": {
      en: "Trampo is a closed beta app from Motion Lab. Selected people may receive rewards of up to R$100 for approved missions by recording simple everyday tasks with a phone.",
      pt: "O Trampo é um app em beta fechado da Motion Lab. Pessoas selecionadas poderão receber recompensas de até R$100 por missões aprovadas, gravando tarefas simples do dia a dia com o celular."
    },
    "trampo.phone.earnings": { en: "Total Earnings", pt: "Ganhos totais" },
    "trampo.phone.grocery": { en: "Grocery Scan", pt: "Registro de compras" },
    "trampo.phone.time": { en: "2 mins remaining", pt: "2 min restantes" },
    "trampo.phone.commute": { en: "Commute POV", pt: "POV no trajeto" },
    "trampo.phone.available": { en: "Available now", pt: "Disponível agora" },
    "trampo.strip.label": { en: "Data for physical AI, robotics, and multimodal models", pt: "Dados para IA física, robótica e modelos multimodais" },
    "trampo.strip.robotics": { en: "Humanoid Robots", pt: "Robôs humanoides" },
    "trampo.strip.multimodal": { en: "Multimodal AI", pt: "IA multimodal" },
    "trampo.strip.brazil": { en: "Brazil Data", pt: "Dados Brasil" },
    "trampo.strip.pov": { en: "POV Datasets", pt: "Datasets POV" },
    "trampo.strip.labs": { en: "Robotics Labs", pt: "Labs de robótica" },
    "trampo.strip.companies": { en: "AI Companies", pt: "Empresas de IA" },
    "trampo.strip.latam": { en: "LatAm Context", pt: "Contexto LatAm" },
    "trampo.how.badge": { en: "Closed beta", pt: "Beta fechado" },
    "trampo.how.title": { en: "How it works", pt: "Como funciona" },
    "trampo.how.text": {
      en: "Join the Trampo waitlist. When your region opens, selected people may receive missions in the app and earn rewards for approved tasks.",
      pt: "Entre na lista de espera do Trampo. Quando sua região for liberada, pessoas selecionadas poderão receber missões no app e ganhar recompensas por tarefas aprovadas."
    },
    "trampo.step.waitlist": { en: "Join the waitlist", pt: "Entre na lista de espera" },
    "trampo.step.waitlist.text": { en: "Complete your pre-registration to join the closed beta waitlist.", pt: "Preencha seu pré-cadastro para entrar na lista de espera do beta fechado." },
    "trampo.enter.waitlist": { en: "Join the waitlist", pt: "Entrar na lista de espera" },
    "trampo.step.region": { en: "Wait for your region", pt: "Aguarde sua região" },
    "trampo.step.region.text": { en: "Access will open by region, mission availability, and quality criteria.", pt: "A liberação será feita por região, disponibilidade de missões e critérios de qualidade." },
    "trampo.step.missions": { en: "Receive missions", pt: "Receba missões" },
    "trampo.step.missions.text": { en: "Selected people may receive simple tasks to record with their phone.", pt: "Pessoas selecionadas poderão receber tarefas simples para gravar com o celular." },
    "trampo.step.record": { en: "Record tasks", pt: "Grave tarefas" },
    "trampo.step.record.text": { en: "Record everyday activities in first person following the mission instructions.", pt: "Grave atividades do dia a dia em primeira pessoa seguindo as instruções da missão." },
    "trampo.step.earn": { en: "Earn if approved", pt: "Ganhe se aprovado" },
    "trampo.step.earn.text": { en: "Rewards depend on selection, available missions, and quality approval.", pt: "Recompensas dependem de seleção, disponibilidade de missões e aprovação de qualidade." },
    "trampo.note.waitlist": { en: "Joining the waitlist does not guarantee immediate participation.", pt: "Entrada na lista de espera não garante participação imediata." },
    "trampo.waitlist.cta.note": {
      en: "Joining the waitlist does not guarantee immediate participation. Rewards depend on selection, mission availability, and quality approval.",
      pt: "Entrar na lista de espera não garante participação imediata. Recompensas dependem de seleção, missão disponível e aprovação de qualidade."
    },
    "trampo.data.title": {
      en: 'Why record <br class="hidden md:block">simple tasks?',
      pt: 'Por que gravar <br class="hidden md:block">tarefas simples?'
    },
    "trampo.data.text": {
      en: "Robots and AI models need to learn from real-world data. Trampo helps collect first-person videos of common tasks in Brazil, creating a localized foundation for training AI, robotics, and multimodal systems.",
      pt: "Robôs e modelos de IA precisam aprender com dados do mundo real. O Trampo ajuda a coletar vídeos em primeira pessoa de tarefas comuns no Brasil, criando uma base localizada para treinar sistemas de IA, robótica e modelos multimodais."
    },
    "trampo.data.real": { en: "Real-world data", pt: "Dados do mundo real" },
    "trampo.data.real.text": { en: "Capture of real routines, real environments, real objects, and natural everyday movements.", pt: "Captura de rotinas reais, ambientes reais, objetos reais e movimentos naturais do dia a dia." },
    "trampo.data.context": { en: "Brazilian context", pt: "Contexto brasileiro" },
    "trampo.data.context.text": { en: "Localized data from Latin America, with homes, objects, habits, and routines that global models still know too little about.", pt: "Dados localizados da América Latina, com casas, objetos, hábitos e rotinas que modelos globais ainda conhecem pouco." },
    "trampo.data.quality": { en: "Quality validation", pt: "Validação de qualidade" },
    "trampo.data.quality.text": { en: "Missions must follow instructions and pass quality criteria before any reward.", pt: "Missões precisam seguir instruções e passar por critérios de qualidade antes de qualquer recompensa." },
    "trampo.data.ai": { en: "AI and robotics", pt: "IA e robótica" },
    "trampo.data.ai.text": { en: "The data may support development of multimodal models, robots, and physical AI systems.", pt: "Os dados poderão apoiar o desenvolvimento de modelos multimodais, robôs e sistemas de IA física." },
    "trampo.form.badge": { en: "Collector waitlist", pt: "Lista de espera para coletores" },
    "trampo.form.title": { en: "Join the Trampo beta waitlist.", pt: "Entre na lista de espera do beta Trampo." },
    "trampo.form.text": {
      en: "Tell us where you are and what you can record. This pre-registration helps Motion Lab plan beta regions and missions.",
      pt: "Conte para a gente onde você está e o que consegue gravar. Esse pré-cadastro ajuda a Motion Lab a planejar regiões e missões do beta."
    },
    "trampo.form.name": { en: "Full name", pt: "Nome completo" },
    "trampo.form.email.help": { en: "Optional, but it must be correct if filled in.", pt: "Opcional, mas precisa estar correto se preenchido." },
    "trampo.form.cep.help": { en: "Enter your ZIP/postal code to fill city and state automatically.", pt: "Digite seu CEP para preencher cidade e estado automaticamente." },
    "trampo.form.city": { en: "City", pt: "Cidade" },
    "trampo.form.state": { en: "State", pt: "Estado" },
    "trampo.form.birth": { en: "Date of birth", pt: "Data de nascimento" },
    "trampo.form.birth.help": { en: "You must be 18 or older to participate.", pt: "Necessário ter 18 anos ou mais para participar." },
    "trampo.form.phone.os": { en: "Your phone is", pt: "Seu celular é" },
    "trampo.form.select": { en: "Select", pt: "Selecione" },
    "trampo.form.phone.model": { en: "Phone model", pt: "Modelo do celular" },
    "trampo.form.tasks": { en: "Which tasks could you record?", pt: "Quais tarefas você conseguiria gravar?" },
    "trampo.task.conversation": { en: "Record a conversation", pt: "Gravar conversa" },
    "trampo.task.dishes": { en: "Wash dishes", pt: "Lavar louça" },
    "trampo.task.clothes": { en: "Fold clothes", pt: "Dobrar roupa" },
    "trampo.task.objects": { en: "Organize objects", pt: "Organizar objetos" },
    "trampo.task.sweep": { en: "Sweep the floor", pt: "Varrer o chão" },
    "trampo.task.table": { en: "Clean a table/surface", pt: "Limpar mesa/superfície" },
    "trampo.form.chest": { en: "Would you be willing to record using a chest mount for your phone?", pt: "Você estaria disposto(a) a gravar usando suporte de peito para celular?" },
    "trampo.form.chest.help": { en: "This helps us understand whether you could record POV tasks hands-free.", pt: "Isso ajuda a entender se você conseguiria gravar tarefas em POV com as mãos livres." },
    "trampo.form.yes": { en: "Yes", pt: "Sim" },
    "trampo.form.no": { en: "No", pt: "Não" },
    "trampo.form.maybe": { en: "Maybe / I need to understand more", pt: "Talvez / preciso entender melhor" },
    "trampo.form.contact": { en: "I agree to receive communications from Motion Lab about the closed beta of Trampo.", pt: "Aceito receber comunicações da Motion Lab sobre o beta fechado do Trampo." },
    "trampo.form.approval": { en: "I understand that rewards depend on selection, mission availability, and quality approval.", pt: "Entendo que recompensas dependem de seleção, disponibilidade de missões e aprovação de qualidade." },
    "trampo.form.ai": { en: "I understand that future missions may involve video recording for AI, robotics, and multimodal model development, with consent.", pt: "Entendo que futuras missões poderão envolver gravação de vídeos para desenvolvimento de IA, robótica e modelos multimodais, mediante consentimento." },
    "trampo.form.waitlist": { en: "I agree to join a regional waitlist and understand this does not guarantee immediate participation.", pt: "Aceito entrar em uma lista de espera por região e entendo que isso não garante participação imediata." },
    "trampo.form.declare": { en: "By finishing, you declare that the information provided is true and that you have read the applicable terms.", pt: "Ao finalizar, você declara que as informações fornecidas são verdadeiras e que leu os termos aplicáveis." },
    "trampo.form.saved": { en: "By clicking continue, your name and WhatsApp will already be saved so we can contact you about the closed beta.", pt: "Ao clicar em continuar, seu nome e WhatsApp já serão salvos para contato sobre o beta fechado." },
    "trampo.form.back": { en: "Back", pt: "Voltar" },
    "trampo.form.continue": { en: "Continue", pt: "Continuar" },
    "trampo.form.submit": { en: "Submit registration", pt: "Finalizar cadastro" },
    "trampo.form.saving": { en: "Saving...", pt: "Salvando..." },
    "trampo.final.collectors": { en: "For collectors", pt: "Para coletores" },
    "trampo.final.collectors.title": { en: "Join Trampo’s closed beta.", pt: "Entre no beta fechado do Trampo." },
    "trampo.final.collectors.text": {
      en: "Sign up for the waitlist to receive news about missions, opened regions, and beta invites. Participation is subject to selection, availability, and quality approval.",
      pt: "Cadastre-se na lista de espera para receber novidades sobre missões, regiões liberadas e convites do beta. Participação sujeita à seleção, disponibilidade e aprovação de qualidade."
    },
    "trampo.final.collectors.note": {
      en: "Joining the waitlist does not guarantee immediate participation. Rewards depend on approved missions.",
      pt: "Entrada na lista de espera não garante participação imediata. Recompensas dependem de missões aprovadas."
    },
    "trampo.final.b2b": { en: "For B2B", pt: "Para B2B" },
    "trampo.final.b2b.title": { en: "Investor, partner, or AI company?", pt: "Investidor, parceiro ou empresa de IA?" },
    "trampo.final.b2b.text": {
      en: "Motion Lab is building Latin America’s physical-world data acquisition layer for AI, robotics, and multimodal models.",
      pt: "A Motion Lab está criando a camada de aquisição de dados físicos da América Latina para IA, robótica e modelos multimodais."
    },
    "trampo.final.b2b.note": {
      en: "For B2B conversations, investors, and AI/robotics companies, direct contact is faster during this early beta.",
      pt: "Para conversas B2B, investidores e empresas de IA/robótica, o contato direto é mais rápido neste beta inicial."
    },

    "legal.privacy.title": { en: "Privacy Policy", pt: "Política de Privacidade" },
    "legal.terms.title": { en: "Terms of Use", pt: "Termos de Uso" },
    "legal.lgpd.title": { en: "Data Consent", pt: "LGPD e Consentimento de Dados" },
    "legal.consent.badge": { en: "Data Consent", pt: "Consentimento de Dados" },
    "legal.updated": { en: "Last updated: May 2026", pt: "Última atualização: maio de 2026" }
  };

  const LEGAL_CONTENT = {
    legalPrivacy: {
      en: [
        ["1. Who we are", ["Motion Lab develops Trampo, a closed beta app and waitlist experience for people who may be selected to record simple everyday tasks with a phone. These recordings may help create first-person physical-world datasets for AI, robotics, and multimodal model development."]],
        ["2. Data we may collect", ["We may collect information you voluntarily provide, including name, email, WhatsApp, city, state, ZIP or postal code, phone model, device type, date of birth, task preferences, availability, consent flags, and waitlist responses.", "In future Trampo missions, we may collect first-person videos, task metadata, recording quality information, mission status, device-related information, and other details needed to validate task execution."]],
        ["3. Why we collect data", ["We use data to manage the waitlist, evaluate beta eligibility, contact selected participants, plan regions and missions, prevent misuse, improve the product, validate task quality, and develop physical-world datasets for AI, robotics, multimodal models, and related data infrastructure."]],
        ["4. Video data and consent", ["Participation in recording missions will require specific consent. Participants must follow recording instructions, avoid capturing sensitive third-party information without authorization, and understand how approved recordings may be used for development, training, evaluation, validation, and improvement of AI and robotics systems."]],
        ["5. Sharing and no sale of contact lists", ["Motion Lab may work with service providers, infrastructure vendors, reviewers, partners, or customers involved in data storage, validation, security, AI, robotics, or dataset development. When appropriate, we may use processed, structured, aggregated, or de-identified data.", "We do not sell personal contact information as a contact list."]],
        ["6. Data security", ["We use reasonable technical and organizational efforts to protect data against unauthorized access, loss, misuse, or alteration. No internet or storage system is completely risk-free, but we aim to handle data responsibly."]],
        ["7. Your privacy choices", ["You may request access, correction, updates, deletion, or withdrawal of consent where applicable. Some data may need to be retained for legal, security, fraud-prevention, or operational reasons, or may not be removable once aggregated or de-identified."]],
        ["8. Contact", ['For privacy questions or requests, contact Motion Lab at <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']]
      ],
      pt: [
        ["1. Quem somos", ["A Motion Lab desenvolve o Trampo, um app em beta fechado criado para permitir que pessoas selecionadas gravem tarefas simples do dia a dia com o celular, gerando dados em primeira pessoa para desenvolvimento de IA, robótica e modelos multimodais."]],
        ["2. Quais dados podemos coletar", ["Podemos coletar informações fornecidas voluntariamente por você, como nome, e-mail, WhatsApp, cidade, estado, CEP, modelo do celular, tipo de dispositivo, data de nascimento, preferências de tarefas, disponibilidade, respostas de pré-cadastro e consentimentos.", "Em fases futuras do app, missões aprovadas poderão envolver gravação de vídeos em primeira pessoa, metadados da tarefa, informações técnicas, status da missão e dados necessários para validar a execução da tarefa."]],
        ["3. Como usamos os dados", ["Usamos os dados para gerenciar a lista de espera, avaliar elegibilidade para o beta, comunicar convites, organizar regiões e missões, prevenir uso indevido, melhorar o produto, validar qualidade e desenvolver datasets do mundo físico para IA, robótica, modelos multimodais e infraestrutura de dados."]],
        ["4. Dados de vídeo e consentimento", ["A participação em missões de gravação exigirá consentimento específico. Você deverá seguir instruções de gravação, evitar capturar dados sensíveis de terceiros sem autorização e entender como gravações aprovadas poderão ser usadas para desenvolvimento, treinamento, avaliação, validação e melhoria de sistemas de IA e robótica."]],
        ["5. Compartilhamento e não venda de listas de contato", ["A Motion Lab poderá trabalhar com fornecedores, infraestrutura, revisores, parceiros ou clientes envolvidos em armazenamento, validação, segurança, IA, robótica ou desenvolvimento de datasets. Quando apropriado, poderemos usar dados processados, estruturados, agregados ou desidentificados.", "Não vendemos informações pessoais de contato como lista de contatos."]],
        ["6. Segurança dos dados", ["Adotamos esforços técnicos e organizacionais razoáveis para proteger dados contra acesso não autorizado, perda, uso indevido ou alteração. Nenhum sistema de internet ou armazenamento é totalmente livre de risco, mas buscamos tratar dados com responsabilidade."]],
        ["7. Suas escolhas de privacidade", ["Você pode solicitar acesso, correção, atualização, exclusão ou revogação de consentimento quando aplicável. Alguns dados podem precisar ser mantidos por razões legais, de segurança, prevenção de fraude ou operação, ou podem não ser removíveis após agregação ou desidentificação."]],
        ["8. Contato", ['Para dúvidas ou solicitações sobre privacidade, entre em contato pelo e-mail <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']]
      ]
    },
    legalTerms: {
      en: [
        ["1. Acceptance of these terms", ["By accessing the Motion Lab website, joining the Trampo waitlist, or expressing interest in the closed beta, you agree to these Terms of Use and other applicable policies."]],
        ["2. About Motion Lab and Trampo", ["Motion Lab develops infrastructure for physical-world data acquisition for AI, robotics, and multimodal model development. Trampo is a closed beta app that may allow selected people to record simple everyday tasks with a phone."]],
        ["3. Closed beta and waitlist", ["Joining the waitlist does not guarantee immediate participation, approval, an app invitation, available missions, or payment. Motion Lab may select participants based on region, device, availability, technical criteria, expected quality, operational needs, and consent requirements."]],
        ["4. Rewards and mission approval", ["Any rewards depend on mission availability, eligibility, following instructions, quality validation, task approval, and other criteria defined by Motion Lab. Amounts described as “up to R$100/h” are possible values for selected approved missions and are not guaranteed earnings."]],
        ["5. User responsibilities", ["You must provide truthful information, follow recording instructions, respect applicable laws, and avoid capturing illegal, unsafe, sensitive, private third-party, or unauthorized content. You must not attempt to manipulate validation systems, create improper duplicate entries, or provide false data."]],
        ["6. Content and data use", ["Future missions may request permission to use videos, metadata, and related information for development, training, evaluation, validation, and improvement of AI systems, robotics, multimodal models, physical-world datasets, and data infrastructure. Additional mission-specific consent may be required."]],
        ["7. Changes to the service", ["Motion Lab may update, pause, limit, or discontinue website features, beta access, missions, reward rules, selection criteria, regions, or the app itself, especially during the testing period."]],
        ["8. No guarantees", ["The website, waitlist, and beta are provided at an early stage. Motion Lab does not guarantee continuous availability, error-free operation, selection, mission approval, income, or specific results."]],
        ["9. Contact", ['For questions about these Terms of Use, contact Motion Lab at <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']]
      ],
      pt: [
        ["1. Aceitação dos termos", ["Ao acessar o site da Motion Lab, entrar na lista de espera do Trampo ou demonstrar interesse em participar do beta fechado, você concorda com estes Termos de Uso e com as demais políticas aplicáveis."]],
        ["2. Sobre a Motion Lab e o Trampo", ["A Motion Lab desenvolve infraestrutura para aquisição de dados físicos do mundo real voltados ao desenvolvimento de IA, robótica e modelos multimodais. O Trampo é um app em beta fechado que poderá permitir que pessoas selecionadas gravem tarefas simples do dia a dia com o celular."]],
        ["3. Beta fechado e lista de espera", ["A entrada na lista de espera não garante participação imediata, aprovação, convite para uso do app, disponibilidade de missões ou pagamento. A Motion Lab poderá selecionar participantes com base em região, dispositivo, disponibilidade, critérios técnicos, qualidade esperada, necessidades operacionais e requisitos de consentimento."]],
        ["4. Recompensas e aprovação de missões", ["Eventuais recompensas dependerão da disponibilidade de missões, elegibilidade, cumprimento das instruções, validação de qualidade, aprovação da tarefa e demais critérios definidos pela Motion Lab. Valores divulgados como “até R$100/h” representam possibilidades em missões selecionadas e aprovadas, não pagamento garantido."]],
        ["5. Responsabilidades do usuário", ["Você deve fornecer informações verdadeiras, seguir instruções de gravação, respeitar leis aplicáveis e evitar capturar conteúdo ilegal, inseguro, sensível, privado de terceiros ou não autorizado. Você não deve tentar manipular sistemas de validação, criar cadastros duplicados indevidos ou fornecer dados falsos."]],
        ["6. Uso de conteúdo e dados", ["Missões futuras poderão solicitar autorização para uso de vídeos, metadados e informações relacionadas para desenvolvimento, treinamento, avaliação, validação e melhoria de sistemas de IA, robótica, modelos multimodais, datasets do mundo físico e infraestrutura de dados. Consentimentos adicionais específicos por missão poderão ser exigidos."]],
        ["7. Alterações no serviço", ["A Motion Lab poderá atualizar, pausar, limitar ou encerrar funcionalidades do site, acesso ao beta, missões, regras de recompensa, critérios de seleção, regiões atendidas ou o próprio app, especialmente durante o período de testes."]],
        ["8. Ausência de garantias", ["O site, a lista de espera e o beta são fornecidos em estágio inicial. A Motion Lab não garante disponibilidade contínua, ausência de erros, seleção, aprovação de missões, geração de renda ou resultados específicos."]],
        ["9. Contato", ['Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']]
      ]
    },
    legalLgpd: {
      en: [
        ["1. Purpose of this document", ["This Data Consent page explains how Motion Lab may request and manage consent for waitlist processing, contact, and future Trampo data collection missions."]],
        ["2. Voluntary participation", ["Joining the waitlist and participating in future Trampo missions is voluntary. You may decide whether to provide information, receive communications, participate in the beta, or accept recording missions when available."]],
        ["3. Waitlist and contact consent", ["By joining the waitlist, you may authorize Motion Lab to store and process your contact details, profile responses, city, state, ZIP or postal code, phone information, task preferences, and consent flags to manage beta access and contact you about Trampo."]],
        ["4. Future AI and robotics missions", ["Future approved missions may involve first-person video recordings of everyday tasks, related task metadata, timing, quality information, device information, and other details needed to validate the mission. These missions may support AI, robotics, multimodal models, and physical-world dataset development."]],
        ["5. Additional consent steps", ["Approved missions may include additional specific consent screens, instructions, or confirmations before recording starts. Participation, rewards, and data use may depend on selection, mission availability, quality approval, and consent."]],
        ["6. Care during recordings", ["Participants must avoid capturing personal documents, passwords, sensitive screens, financial information, children, unauthorized third parties, identifiable faces without consent, private conversations, intimate content, or any material that violates rights or laws."]],
        ["7. Data protection rights", ["Under Brazilian data protection principles, you may request confirmation of processing, access, correction, deletion, anonymization, blocking, portability, information about sharing, or withdrawal of consent where applicable. Some requests may be limited by legal, security, operational, fraud-prevention, or technical reasons."]],
        ["8. How to make a request", ['To request access, correction, deletion, or consent withdrawal, contact Motion Lab at <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']],
        ["9. Declaration of understanding", ["By joining the waitlist or accepting a future mission, you acknowledge that Trampo is in closed beta, participation depends on selection, rewards depend on approved missions, and approved data may be used for AI and robotics development according to the consent provided."]]
      ],
      pt: [
        ["1. Objetivo deste documento", ["Este documento explica como a Motion Lab poderá solicitar e gerenciar consentimento para processamento da lista de espera, contato e futuras missões de coleta de dados no Trampo."]],
        ["2. Participação voluntária", ["A participação na lista de espera e em futuras missões do Trampo é voluntária. Você poderá decidir se deseja fornecer dados, receber comunicações, participar do beta ou aceitar missões de gravação quando disponíveis."]],
        ["3. Consentimento para lista de espera e contato", ["Ao entrar na lista de espera, você poderá autorizar a Motion Lab a armazenar e tratar seus dados de contato, respostas de perfil, cidade, estado, CEP, informações do celular, preferências de tarefas e consentimentos para gerenciar o acesso ao beta e entrar em contato sobre o Trampo."]],
        ["4. Futuras missões de IA e robótica", ["Missões futuras aprovadas poderão envolver gravações de vídeos em primeira pessoa de tarefas do dia a dia, metadados da tarefa, tempo de execução, informações de qualidade, dados do dispositivo e outros detalhes necessários para validar a missão. Essas missões poderão apoiar o desenvolvimento de IA, robótica, modelos multimodais e datasets do mundo físico."]],
        ["5. Etapas adicionais de consentimento", ["Missões aprovadas poderão incluir telas, instruções ou confirmações adicionais de consentimento específico antes do início da gravação. Participação, recompensas e uso dos dados podem depender de seleção, disponibilidade de missões, aprovação de qualidade e consentimento."]],
        ["6. Cuidados durante gravações", ["Participantes devem evitar capturar documentos pessoais, senhas, telas sensíveis, informações financeiras, crianças, terceiros sem autorização, rostos identificáveis sem consentimento, conversas privadas, conteúdo íntimo ou qualquer material que viole direitos ou leis."]],
        ["7. Direitos de proteção de dados", ["Nos termos dos princípios brasileiros de proteção de dados, você pode solicitar confirmação de tratamento, acesso, correção, exclusão, anonimização, bloqueio, portabilidade, informação sobre compartilhamento ou revogação de consentimento quando aplicável. Algumas solicitações podem ser limitadas por razões legais, de segurança, operação, prevenção de fraude ou técnicas."]],
        ["8. Como fazer uma solicitação", ['Para solicitar acesso, correção, exclusão ou revogação de consentimento, entre em contato pelo e-mail <a class="text-primary font-bold" href="mailto:contato@motionlab.com.br">contato@motionlab.com.br</a>.']],
        ["9. Declaração de entendimento", ["Ao entrar na lista de espera ou aceitar uma missão futura, você declara entender que o Trampo está em beta fechado, que a participação depende de seleção, que recompensas dependem de missões aprovadas e que dados aprovados poderão ser usados para desenvolvimento de IA e robótica conforme o consentimento fornecido."]]
      ]
    }
  };

  const HTML_BINDINGS = {
    b2bHome: [
      ["section:first-of-type h1", "home.hero.title"],
      ["section:last-of-type h2", "home.final.title"]
    ],
    trampo: [
      ["section:first-of-type h1", "trampo.hero.title"],
      ["main section:nth-of-type(4) h2", "trampo.data.title"]
    ]
  };

  const PLACEHOLDERS = {
    "voce@email.com": { en: "you@email.com", pt: "voce@email.com" },
    "Preenchida pelo CEP": { en: "Filled from postal code", pt: "Preenchida pelo CEP" },
    "Ex: SC": { en: "Ex: SC", pt: "Ex: SC" },
    "DD/MM/AAAA": { en: "DD/MM/YYYY", pt: "DD/MM/AAAA" },
    "Ex: iPhone 13, Galaxy S22...": { en: "Ex: iPhone 13, Galaxy S22...", pt: "Ex: iPhone 13, Galaxy S22..." }
  };

  const TEXT_ALIASES = {
    "Pages": "footer.pages",
    "Páginas": "footer.pages",
    "Legal": "footer.legal",
    "Contact": "footer.contact",
    "Contato": "footer.contact",
    "LGPD": "nav.lgpd",
    "Entrar na lista de espera": "cta.waitlist.long",
    "Sou parceiro/investidor": "cta.partner",
    "Falar conosco": "cta.contact"
  };

  COPY["cta.contact"] = { en: "Contact us", pt: "Falar conosco" };

  const FORM_DYNAMIC_TEXT = {
    "Continuar": "trampo.form.continue",
    "Continue": "trampo.form.continue",
    "Voltar": "trampo.form.back",
    "Back": "trampo.form.back",
    "Finalizar cadastro": "trampo.form.submit",
    "Submit registration": "trampo.form.submit",
    "Salvando...": "trampo.form.saving",
    "Saving...": "trampo.form.saving"
  };

  const ACTION_LABEL_TEXT = {
    "Talk to Motion Lab": "cta.talk.motion",
    "Fale com a Motion Lab": "cta.talk.motion",
    "Talk to Gabriel": "cta.talk.gabriel",
    "Fale com Gabriel": "cta.talk.gabriel",
    "Email Gabriel": "cta.email.gabriel",
    "Enviar e-mail para Gabriel": "cta.email.gabriel",
    "View Trampo Beta": "cta.trampo",
    "Ver Trampo Beta": "cta.trampo",
    "Quero participar": "cta.waitlist",
    "Join waitlist": "cta.waitlist",
    "Quero entrar na lista de espera": "cta.waitlist.long",
    "Join the waitlist": "cta.waitlist.long",
    "Entrar na lista de espera": "trampo.enter.waitlist",
    "Sou investidor ou parceiro": "cta.partner",
    "I am an investor or partner": "cta.partner",
    "Ver como funciona": "cta.how",
    "See how it works": "cta.how",
    "Falar no WhatsApp": "cta.whatsapp.talk",
    "Talk on WhatsApp": "cta.whatsapp.talk"
  };

  const textToKey = new Map();

  Object.entries(TEXT_ALIASES).forEach(([text, key]) => {
    textToKey.set(normalize(text), key);
  });

  Object.entries(COPY).forEach(([key, value]) => {
    LANGUAGES.forEach((language) => {
      if (value[language]) textToKey.set(normalize(value[language]), key);
    });
  });

  function normalize(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizedPath() {
    return window.location.pathname.replace(/\/index\.html$/, "/");
  }

  function pageKind() {
    const path = normalizedPath();

    if (path === "/") return "b2bHome";
    if (path === "/about-us/") return "b2bAbout";
    if (path === "/trampoapp/") return "trampo";
    if (path === "/privacy-policy/") return "legalPrivacy";
    if (path === "/terms/") return "legalTerms";
    if (path === "/lgpd-consent/") return "legalLgpd";

    return "b2bHome";
  }

  function pageType() {
    const kind = pageKind();
    if (kind === "b2bHome" || kind === "b2bAbout") return "b2b";
    if (kind === "trampo") return "trampo";
    return "legal";
  }

  function defaultLanguage() {
    return pageType() === "b2b" ? "en" : "pt";
  }

  function readStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return LANGUAGES.includes(stored) ? stored : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // Ignore storage availability issues.
    }
  }

  function resolveLanguage() {
    const requested = new URLSearchParams(window.location.search).get("lang");

    if (requested === "en" || requested === "pt") {
      writeStoredLanguage(requested);
      return requested;
    }

    return readStoredLanguage() || defaultLanguage();
  }

  function translation(key, language) {
    return COPY[key] ? COPY[key][language] : "";
  }

  function setDataKey(element, key, mode) {
    if (!element || !key) return;
    element.setAttribute(mode === "html" ? "data-i18n-html" : "data-i18n", key);
  }

  function markByText() {
    const candidates = document.querySelectorAll("a, button, h1, h2, h3, h4, h5, h6, p, span, label, option, div.motion-logo-item, div.motion-logo-strip-label, strong");

    candidates.forEach((element) => {
      if (element.id === "collectorNextBtn" || element.id === "cepHelpText") return;
      if (element.hasAttribute("data-i18n") || element.hasAttribute("data-i18n-html")) return;
      if (element.childElementCount > 0 && !element.classList.contains("motion-logo-item")) return;

      const key = textToKey.get(normalize(element.textContent));
      if (key) setDataKey(element, key);
    });
  }

  function markHtmlBindings() {
    const kind = pageKind();
    const bindings = [...(HTML_BINDINGS[kind] || [])];

    bindings.forEach(([selector, key]) => {
      document.querySelectorAll(selector).forEach((element) => setDataKey(element, key, "html"));
    });
  }

  function markLegalHeadings() {
    const kind = pageKind();
    const heading = document.querySelector("main > section > h1");
    const badge = document.querySelector("main > section > span");
    const updated = document.querySelector("main > section > p");

    if (kind === "legalPrivacy") setDataKey(heading, "legal.privacy.title");
    if (kind === "legalTerms") setDataKey(heading, "legal.terms.title");
    if (kind === "legalLgpd") setDataKey(heading, "legal.lgpd.title");

    if (kind === "legalPrivacy") setDataKey(badge, "legal.privacy.title");
    if (kind === "legalTerms") setDataKey(badge, "legal.terms.title");
    if (kind === "legalLgpd") setDataKey(badge, "legal.consent.badge");
    if (kind.startsWith("legal")) setDataKey(updated, "legal.updated");
  }

  function markPlaceholders() {
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
      const key = normalize(element.getAttribute("placeholder"));
      if (PLACEHOLDERS[key]) element.setAttribute("data-i18n-placeholder", key);
    });
  }

  function markStaticElements() {
    markHtmlBindings();
    markLegalHeadings();
    markByText();
    markPlaceholders();
  }

  function ctaLabel(language, location) {
    const type = pageType();

    if (type === "b2b") {
      if (location === "top") return language === "pt" ? translation("cta.trampo", language) : translation("cta.trampo.short", language);
      return translation("cta.trampo", language);
    }

    return translation("cta.waitlist", language);
  }

  function ctaHref() {
    const type = pageType();

    if (type === "b2b") return "/trampoapp/";
    if (type === "trampo") return "#collector-form";

    return "/trampoapp/#collector-form";
  }

  function updateCtas(language) {
    const topCandidates = document.querySelectorAll("[data-motion-cta='top'], .motion-mobile-cta");
    const sidebarCandidates = document.querySelectorAll("[data-motion-cta='sidebar'], .motion-sidebar-cta");

    topCandidates.forEach((element) => {
      const label = ctaLabel(language, "top");
      const href = ctaHref();
      if (element.textContent !== label) element.textContent = label;
      if (element.getAttribute("href") !== href) element.setAttribute("href", href);
      element.setAttribute("data-motion-cta", "top");
    });

    sidebarCandidates.forEach((element) => {
      const label = ctaLabel(language, "sidebar");
      const href = ctaHref();
      if (element.textContent !== label) element.textContent = label;
      if (element.getAttribute("href") !== href) element.setAttribute("href", href);
      element.setAttribute("data-motion-cta", "sidebar");
    });
  }

  function updateCommonLinks(language) {
    const labels = {
      "/": "nav.home",
      "/trampoapp": "nav.trampo",
      "/trampoapp/": "nav.trampo",
      "/about-us": "nav.about",
      "/about-us/": "nav.about",
      "/privacy-policy": "nav.privacy",
      "/privacy-policy/": "nav.privacy",
      "/terms": "nav.terms",
      "/terms/": "nav.terms",
      "/lgpd-consent": "nav.lgpd",
      "/lgpd-consent/": "nav.lgpd"
    };

    document.querySelectorAll("nav a, footer a, .motion-sidebar-nav a").forEach((link) => {
      if (link.classList.contains("motion-logo-link") || link.querySelector("img")) return;

      const href = link.getAttribute("href");
      const key = labels[href];
      const value = key ? translation(key, language) : "";
      if (value && !link.hasAttribute("data-motion-cta") && link.textContent !== value) link.textContent = value;
    });

    document.querySelectorAll(".motion-sidebar-contact").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("mailto:")) {
        const value = language === "pt" ? "Enviar e-mail" : "Email";
        if (link.textContent !== value) link.textContent = value;
      }
      if (href.startsWith("https://wa.me/")) {
        const value = language === "pt" ? "Falar no WhatsApp" : "WhatsApp";
        if (link.textContent !== value) link.textContent = value;
      }
    });

    document.querySelectorAll("[data-motion-sidebar-description]").forEach((element) => {
      const value = language === "pt"
        ? "Camada de aquisição de dados físicos para IA física na América Latina."
        : "Physical-world data acquisition layer for embodied AI in Latin America.";
      if (element.textContent !== value) element.textContent = value;
    });
  }

  function updateFormControls(language) {
    if (pageKind() !== "trampo") return;

    ["collectorNextBtn", "collectorBackBtn"].forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const key = FORM_DYNAMIC_TEXT[normalize(element.textContent)];
      const value = key ? translation(key, language) : "";

      if (value && element.textContent !== value) element.textContent = value;
    });
  }

  function labelText(element) {
    return normalize([...element.childNodes].map((node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent;
      if (node.nodeType !== Node.ELEMENT_NODE) return "";
      if (node.classList.contains("material-symbols-outlined")) return "";
      return node.textContent;
    }).join(" "));
  }

  function setActionLabel(element, key, language) {
    const value = translation(key, language);
    if (!value) return;

    element.setAttribute("data-motion-action-key", key);

    const icons = [...element.children].filter((child) => child.classList.contains("material-symbols-outlined"));

    if (!icons.length) {
      if (element.textContent !== value) element.textContent = value;
      return;
    }

    const firstMeaningfulNode = [...element.childNodes].find((node) => {
      if (node.nodeType === Node.TEXT_NODE) return normalize(node.textContent);
      return node.nodeType === Node.ELEMENT_NODE;
    });
    const iconFirst = firstMeaningfulNode && firstMeaningfulNode.nodeType === Node.ELEMENT_NODE && firstMeaningfulNode.classList.contains("material-symbols-outlined");

    [...element.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && normalize(node.textContent)) node.remove();
    });

    let label = element.querySelector("[data-motion-action-label]") || [...element.children].find((child) => {
      return !child.classList.contains("material-symbols-outlined");
    });

    if (!label) {
      label = document.createElement("span");

      if (iconFirst) icons[icons.length - 1].insertAdjacentElement("afterend", label);
      else element.insertBefore(label, icons[0]);
    }

    label.setAttribute("data-motion-action-label", "");

    if (label.textContent !== value) label.textContent = value;
  }

  function updateActionLabels(language) {
    document.querySelectorAll("a, button").forEach((element) => {
      if (element.classList.contains("motion-logo-link") || element.querySelector("img")) return;
      if (element.hasAttribute("data-motion-cta")) return;

      const existingKey = element.getAttribute("data-motion-action-key");
      const key = existingKey || ACTION_LABEL_TEXT[labelText(element)];

      if (key) setActionLabel(element, key, language);
    });
  }

  function renderLegalContent(language) {
    const kind = pageKind();
    const pageContent = LEGAL_CONTENT[kind];
    const container = document.querySelector("main > section > .space-y-8");

    if (!pageContent || !container) return;

    const sections = pageContent[language] || pageContent.pt;
    const html = sections.map(([title, paragraphs]) => {
      const paragraphHtml = paragraphs.map((paragraph, index) => {
        return `<p${index > 0 ? ' class="mt-3"' : ""}>${paragraph}</p>`;
      }).join("");

      return `
        <section>
          <h2 class="font-headline text-2xl font-bold text-zinc-900 mb-3">${title}</h2>
          ${paragraphHtml}
        </section>
      `;
    }).join("");

    if (container.getAttribute("data-rendered-language") === language) return;

    container.innerHTML = html;
    container.setAttribute("data-rendered-language", language);
  }

  function applyDataTranslations(language) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translation(element.getAttribute("data-i18n"), language);
      if (value && element.textContent !== value) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = translation(element.getAttribute("data-i18n-html"), language);
      if (value && element.innerHTML !== value) element.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const values = PLACEHOLDERS[element.getAttribute("data-i18n-placeholder")];
      if (values && values[language] && element.getAttribute("placeholder") !== values[language]) {
        element.setAttribute("placeholder", values[language]);
      }
    });
  }

  function updateTitle(language) {
    const titles = {
      b2bHome: "home.title",
      b2bAbout: "about.title",
      trampo: "trampo.title",
      legalPrivacy: "legal.privacy.title",
      legalTerms: "legal.terms.title",
      legalLgpd: "legal.lgpd.title"
    };
    const key = titles[pageKind()];
    const value = translation(key, language);

    if (value) document.title = value.includes("|") ? value : `${value} | Motion Lab`;
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }

  function createSwitcher(id, extraClass) {
    if (document.getElementById(id)) return null;

    const switcher = document.createElement("div");
    switcher.id = id;
    switcher.className = `motion-language-switcher ${extraClass || ""}`.trim();
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language");
    switcher.innerHTML = `
      <button type="button" data-motion-lang="en">
        <svg class="motion-language-flag" viewBox="0 0 24 16" aria-hidden="true" focusable="false">
          <clipPath id="${id}-flag-us-clip"><rect width="24" height="16" rx="2"></rect></clipPath>
          <g clip-path="url(#${id}-flag-us-clip)">
            <rect width="24" height="16" fill="#ffffff"></rect>
            <path d="M0 0h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24V16H0z" fill="#b22234"></path>
            <rect width="10.5" height="8.62" fill="#3c3b6e"></rect>
            <g fill="#ffffff">
              <circle cx="1.3" cy="1.1" r=".35"></circle><circle cx="3.1" cy="1.1" r=".35"></circle><circle cx="4.9" cy="1.1" r=".35"></circle><circle cx="6.7" cy="1.1" r=".35"></circle><circle cx="8.5" cy="1.1" r=".35"></circle>
              <circle cx="2.2" cy="2.4" r=".35"></circle><circle cx="4" cy="2.4" r=".35"></circle><circle cx="5.8" cy="2.4" r=".35"></circle><circle cx="7.6" cy="2.4" r=".35"></circle><circle cx="9.4" cy="2.4" r=".35"></circle>
              <circle cx="1.3" cy="3.7" r=".35"></circle><circle cx="3.1" cy="3.7" r=".35"></circle><circle cx="4.9" cy="3.7" r=".35"></circle><circle cx="6.7" cy="3.7" r=".35"></circle><circle cx="8.5" cy="3.7" r=".35"></circle>
              <circle cx="2.2" cy="5" r=".35"></circle><circle cx="4" cy="5" r=".35"></circle><circle cx="5.8" cy="5" r=".35"></circle><circle cx="7.6" cy="5" r=".35"></circle><circle cx="9.4" cy="5" r=".35"></circle>
              <circle cx="1.3" cy="6.3" r=".35"></circle><circle cx="3.1" cy="6.3" r=".35"></circle><circle cx="4.9" cy="6.3" r=".35"></circle><circle cx="6.7" cy="6.3" r=".35"></circle><circle cx="8.5" cy="6.3" r=".35"></circle>
            </g>
          </g>
        </svg>
        <span>EN</span>
      </button>
      <span class="motion-language-separator" aria-hidden="true">|</span>
      <button type="button" data-motion-lang="pt">
        <svg class="motion-language-flag" viewBox="0 0 24 16" aria-hidden="true" focusable="false">
          <rect width="24" height="16" rx="2" fill="#009b3a"></rect>
          <path d="M12 2.1 22 8l-10 5.9L2 8z" fill="#ffdf00"></path>
          <circle cx="12" cy="8" r="3.4" fill="#002776"></circle>
          <path d="M8.7 7.2c2.4-.4 4.6.1 6.7 1.6" fill="none" stroke="#ffffff" stroke-width=".75"></path>
        </svg>
        <span>PT-BR</span>
      </button>
    `;

    switcher.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.getAttribute("data-motion-lang");
        writeStoredLanguage(language);
        applyLanguage(language);
      });
    });

    return switcher;
  }

  function injectStyles() {
    if (document.getElementById("motionlab-language-styles")) return;

    const style = document.createElement("style");
    style.id = "motionlab-language-styles";
    style.textContent = `
      .motion-language-switcher {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        width: fit-content;
        padding: 3px;
        border: 1px solid rgba(15, 23, 42, 0.12);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
        backdrop-filter: blur(14px);
      }

      .motion-language-switcher button {
        align-items: center;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #64748b;
        cursor: pointer;
        display: inline-flex;
        gap: 6px;
        font: inherit;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.08em;
        line-height: 1;
        padding: 8px 10px;
        text-transform: uppercase;
      }

      .motion-language-flag {
        display: block;
        width: 18px;
        height: 12px;
        flex: 0 0 auto;
        border-radius: 2px;
        box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.10);
      }

      .motion-language-switcher button span {
        color: inherit;
      }

      .motion-language-separator {
        color: #cbd5e1;
        font-size: 11px;
        font-weight: 800;
      }

      .motion-language-switcher button.is-active {
        background: #0050cb;
        color: #ffffff;
        box-shadow: 0 8px 18px rgba(0, 80, 203, 0.18);
      }

      .motion-language-nav,
      .language-switcher-desktop-nav {
        margin-left: 0;
        margin-right: 14px;
      }

      .motion-language-content,
      .language-switcher-mobile-content {
        margin-bottom: 18px;
      }

      @media (max-width: 768px) {
        .motion-language-nav,
        .language-switcher-desktop-nav {
          display: none !important;
        }

        .motion-language-content,
        .language-switcher-mobile-content {
          margin-bottom: 16px;
        }

        .language-switcher-trampo-mobile {
          margin-bottom: 24px !important;
          padding: 5px !important;
          border-radius: 16px !important;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.10);
        }

        .language-switcher-trampo-mobile button {
          min-width: 66px;
          padding: 11px 14px;
          font-size: 12px;
          border-radius: 12px;
        }
      }

      @media (min-width: 769px) {
        .motion-language-content--mobile,
        .language-switcher-mobile-content {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function placeDesktopSwitcher() {
    const nav = document.querySelector("nav.fixed.top-0") || document.querySelector("nav");
    const row = nav && (nav.querySelector(".motion-main-row") || nav.querySelector(".flex.justify-between.items-center"));
    if (!row || document.getElementById("motion-language-nav")) return;

    const switcher = createSwitcher("motion-language-nav", "motion-language-nav language-switcher-desktop-nav");
    const actions = nav.querySelector(".motion-header-actions");
    const cta = nav.querySelector("[data-motion-cta='top'], .motion-mobile-cta");

    if (switcher && actions) {
      if (cta && cta.parentElement === actions) actions.insertBefore(switcher, cta);
      else actions.appendChild(switcher);
    } else if (switcher && cta && cta.parentElement) {
      cta.parentElement.insertBefore(switcher, cta);
    } else if (switcher) {
      row.appendChild(switcher);
    }
  }

  function placeContentSwitcher() {
    if (document.getElementById("motion-language-content")) return;

    const kind = pageKind();
    let target = null;
    let mode = "mobile";
    let extraClass = "";

    if (kind === "b2bHome") {
      target = document.querySelector("main section:first-of-type .space-y-8 > .inline-flex");
    } else if (kind === "b2bAbout") {
      target = document.querySelector("main section:first-of-type .mb-8");
    } else if (kind === "trampo") {
      target = document.querySelector("main section:first-of-type .z-10 > span");
      mode = "mobile";
      extraClass = " language-switcher-trampo-mobile";
    } else {
      target = document.querySelector("main > section > span");
      mode = "mobile";
    }

    if (!target || !target.parentElement) return;

    const switcher = createSwitcher("motion-language-content", `motion-language-content motion-language-content--${mode === "mobile" ? "mobile" : "always"}${mode === "mobile" ? " language-switcher-mobile-content" : ""}${extraClass}`);
    if (switcher) target.parentElement.insertBefore(switcher, target);
  }

  function updateSwitchers(language) {
    document.querySelectorAll(".motion-language-switcher button").forEach((button) => {
      const isActive = button.getAttribute("data-motion-lang") === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyLanguage(language) {
    markStaticElements();
    renderLegalContent(language);
    applyDataTranslations(language);
    updateCtas(language);
    updateCommonLinks(language);
    updateFormControls(language);
    updateActionLabels(language);
    updateTitle(language);
    updateSwitchers(language);
  }

  function init() {
    injectStyles();
    placeDesktopSwitcher();
    placeContentSwitcher();
    applyLanguage(resolveLanguage());

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;

      window.requestAnimationFrame(() => {
        scheduled = false;
        placeDesktopSwitcher();
        placeContentSwitcher();
        applyLanguage(resolveLanguage());
      });
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    window.addEventListener("motionlab:menu-ready", () => applyLanguage(resolveLanguage()));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
