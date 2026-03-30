import { Github, Mail, Phone, ExternalLink } from 'lucide-react';

export const portfolioData = {
    personal: {
        name: "Nikesh Kumar",
        headline: "B.Tech CSE (Data Science) Student | Aspiring Data Scientist | Software Developer",
        location: "Punjab, India",
        email: "nikeshgupta950@gmail.com",
        phone: "+91 7004704385",
        github: "https://github.com/nikeshg89",
        linkedin: "https://www.linkedin.com/in/menikesh08/",
        resume: "/nikeshconfirmcv13.pdf", // Link to the provided CV in root directory
        stats: {
            cgpa: "7.67",
            projects: "3+",
            skills: "Python | Power BI | Data Science"
        }
    },
    hero: {
        title: "Hi, I'm Nikesh Kumar",
        subtitle: "Computer Science Engineer | Data Science Specialist | AI & Software Developer",
        rotatingText: [
            "B.Tech CSE Data Science Student",
            "Data Scientist",
            "Python Developer",
            "BI Analyst"
        ]
    },
    about: "I am a B.Tech Computer Science and Engineering (Data Science) student at Lovely Professional University, passionate about building intelligent systems and modern software solutions.\n\nMy interests lie in Artificial Intelligence, Data Science, and Software Development, where I enjoy creating real world projects using Python, Java, C++, Machine Learning, and Power BI.\n\nI am driven by curiosity, innovation, and continuous learning, with the goal of becoming a highly skilled Software Developer and Data Scientist capable of solving real world problems through technology.",
    skills: {
        categories: [
            {
                name: "Programming Languages",
                color: "from-[#22c55e] to-[#eab308]",
                glow: "rgba(34,197,94,0.4)",
                skills: [
                    { name: "Python", icon: "python", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
                    { name: "C++", icon: "cpp", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
                    { name: "C", icon: "c", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
                    { name: "HTML", icon: "html", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
                    { name: "CSS", icon: "css", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
                ]
            },
            {
                name: "Frameworks / Libraries",
                color: "from-[#06b6d4] to-[#06b6d4]",
                glow: "rgba(6,182,212,0.4)",
                skills: [
                    { name: "Pandas", icon: "pandas", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
                    { name: "NumPy", icon: "numpy", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
                    { name: "Matplotlib", icon: "matplotlib", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
                    { name: "Scikit-Learn", icon: "sklearn", isImage: true, url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
                    { name: "Streamlit", icon: "streamlit", isImage: true, url: "https://streamlit.io/images/brand/streamlit-mark-color.svg" },
                ]
            },
            {
                name: "Data Science / AI",
                color: "from-[#38bdf8] to-[#0ea5e9]",
                glow: "rgba(56,189,248,0.4)",
                skills: [
                    { name: "Machine Learning", icon: "BrainCircuit" },
                    { name: "Data Analysis", icon: "LineChart" },
                    { name: "Power BI", icon: "powerbi", isImage: true, url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
                    { name: "Statistics", icon: "Sigma" },
                    { name: "Excel", icon: "excel", isImage: true, url: "https://img.icons8.com/color/48/000000/ms-excel.png" },
                ]
            },
            {
                name: "Tools / Technologies",
                color: "from-[#0ea5e9] to-[#c026d3]",
                glow: "rgba(14,165,233,0.4)",
                skills: [
                    { name: "Git", icon: "git", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
                    { name: "GitHub", icon: "Github" }, 
                    { name: "MySQL", icon: "mysql", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
                    { name: "VS Code", icon: "vscode", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
                    { name: "Jupyter", icon: "jupyter", isImage: true, url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" },
                ]
            },
            {
                name: "Soft Skills",
                color: "from-[#38bdf8] to-[#22c55e]",
                glow: "rgba(56,189,248,0.4)",
                skills: [
                    { name: "Problem Solving", icon: "Lightbulb" },
                    { name: "Teamwork", icon: "Users" },
                    { name: "Communication", icon: "MessageSquare" },
                    { name: "Adaptability", icon: "Shuffle" },
                    { name: "Quick Learning", icon: "Zap" },
                ]
            },
        ]
    },
    projects: [
        {
            id: 1,
            title: "Citywide Payroll Dashboard",
            category: "Dashboards",
            date: "Project 1",
            image: "/project_payroll.png",
            summary: "Comprehensive Power BI dashboard analyzing citywide payroll trends, salary distribution, and department insights.",
            details: "Citywide Payroll Data Analysis implemented using Power BI to visualize and understand payroll trends and insights across departments. Includes KPI cards, interactive filters, and trend charts.",
            tech: ["Power BI", "Excel", "Data Analysis"],
            links: {
                github: null,
                live: "https://drive.google.com/file/d/1fRMjKPfUfI36uJINw6wEoDqCrQuadiWq/view?usp=drive_link",
                liveLabel: "View Dashboard"
            }
        },
        {
            id: 2,
            title: "AI Skin Health Chatbot",
            category: "AI/Web",
            date: "Project 2",
            image: "/project_chatbot.png",
            summary: "An intelligent AI-powered chatbot for real-time skin health assessment using Gemini API and Streamlit.",
            details: "Developed an AI-powered Skin Health Chatbot combining Python, Streamlit, and the Gemini API to provide interactive and intelligent skin health insights and personalized recommendations.",
            tech: ["Python", "Streamlit", "Gemini API"],
            links: {
                github: "https://github.com/nikeshg89/SkinCare",
                live: null
            }
        },
        {
            id: 3,
            title: "COVID-19 Data Analysis",
            category: "Data Analysis",
            date: "Project 3",
            image: "/project_covid.png",
            summary: "In-depth analysis of global COVID-19 vaccination trends using Python data science libraries.",
            details: "Analyzed COVID-19 vaccination data utilizing Python, Pandas, NumPy, and Matplotlib for data processing and interactive visualizations showing country-wise vaccination trends.",
            tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
            links: {
                github: "https://github.com/nikeshg89/python_nikesh",
                live: null
            }
        },
        {
            id: 4,
            title: "Student Result Dashboard",
            category: "Dashboards",
            date: "Project 4",
            image: "/project_student.png",
            summary: "A comprehensive Power BI dashboard for analyzing student academic performance, grade distribution, and rankings.",
            details: "Built an interactive student result analytics dashboard in Power BI with subject-wise performance tracking, grade distribution pie charts, and student ranking cards for educational institutions.",
            tech: ["Power BI", "Excel"],
            links: {
                github: null,
                live: null
            }
        },
        {
            id: 5,
            title: "ML Prediction Model",
            category: "ML",
            date: "Project 5",
            image: "/project_ml.png",
            summary: "A machine learning classification model with full evaluation metrics: ROC curve, confusion matrix, and feature importance.",
            details: "Designed and trained a machine learning prediction model using Python and Scikit-Learn. Includes full model evaluation with confusion matrix, ROC curve, accuracy metrics, and feature importance visualization.",
            tech: ["Python", "Scikit-Learn", "Pandas"],
            links: {
                github: null,
                live: null
            }
        }
    ],
    education: [
        {
            school: "Lovely Professional University, Punjab",
            degree: "B.Tech CSE (Data Science)",
            grade: "CGPA: 7.67",
            year: "2023 - Present",
            status: "current",
            number: "01",
            color: "from-[#06b6d4] to-[#06b6d4]",
            glow: "rgba(6,182,212,0.5)",
            image: "https://www.lpu.in/lpu-assets/images/why-lpu/hero.jpg"
        },
        {
            school: "Hellens School Sitamarhi",
            degree: "Intermediate",
            grade: "68.8%",
            year: "2021 - 2022",
            status: "completed",
            number: "02",
            color: "from-[#38bdf8] to-[#0ea5e9]",
            glow: "rgba(56,189,248,0.5)",
            image: "/hellens.png"
        },
        {
            school: "St. Joseph School Sitamarhi",
            degree: "Matriculation",
            grade: "77.4%",
            year: "2019 - 2020",
            status: "completed",
            number: "03",
            color: "from-[#22c55e] to-[#eab308]",
            glow: "rgba(34,197,94,0.5)",
            image: "/stjoseph.png"
        }
    ],
    certifications: [
        {
            title: "What is Data Science?",
            issuer: "IBM (Coursera)",
            desc: "Earned in 2024 by Nikesh Kumar. Completed IBM Data Science certification covering data science methodology, tools, and practical applications.",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
            link: "https://drive.google.com/file/d/16KWaUWFhTz-YyKOsQ1NbeLMctZmsSLkn/view?usp=drive_link",
            year: "2024"
        },
        {
            title: "NPTEL Certificate",
            issuer: "NPTEL",
            desc: "Completed an NPTEL certified course covering core Computer Science concepts.",
            image: "/cert_nptel.png",
            link: "https://drive.google.com/file/d/1PPeJnX-8XbYxEw3i0BaFAVuoDEtnKUpI/view"
        },
        {
            title: "Software Implementation Certificate",
            issuer: "Training Program",
            desc: "Completed Software Implementation training covering real-world software development practices.",
            image: "/cert_software.png",
            link: "https://drive.google.com/file/d/17i1aK_-XXbFHxJl5HRXTfUHL_qAMq-xg/view"
        },
        {
            title: "Data Structure Training Certificate",
            issuer: "Cipher Schools",
            desc: "Completed training in Java, Data Structures, Algorithms, and Problem Solving.",
            image: "/cert_dsa.png",
            link: "https://drive.google.com/file/d/1GKGNPSnFLRcaW06hJ_yjU6S_woJ9qkhe/view?usp=drive_link"
        },
        {
            title: "Udemy Certificate",
            issuer: "Udemy",
            desc: "Completed a Udemy online course covering key programming and technology skills.",
            image: "/cert_udemy.png",
            link: "https://drive.google.com/file/d/1hEzrYFE8GRizQXMTZEF3ugMT6pllxvyo/view"
        }
    ],
    training: [
        {
            title: "Data Structures & Algorithms Training",
            company: "Cipher Schools",
            duration: "6 Weeks",
            number: "01",
            color: "from-[#06b6d4] to-[#38bdf8]",
            glow: "rgba(6,182,212,0.5)",
            icon: "Code2",
            desc: "Completed training in Java, Data Structures, Algorithms, and Problem Solving. Solved coding problems and learned core programming concepts.",
            skills: ["Java", "Data Structures", "Algorithms", "Problem Solving"],
            link: "https://drive.google.com/file/d/1GKGNPSnFLRcaW06hJ_yjU6S_woJ9qkhe/view?usp=drive_link"
        }
    ],
    extracurricular: [
        {
            role: "Volunteer Work",
            org: "Social Service",
            icon: "Heart",
            color: "from-[#38bdf8] to-[#0ea5e9]",
            glow: "rgba(56,189,248,0.5)",
            desc: "Actively participated in social work activities and community initiatives, helping organize events and support social causes."
        },
        {
            role: "Cyber Security Symposium",
            org: "Participant",
            icon: "Shield",
            color: "from-[#06b6d4] to-[#06b6d4]",
            glow: "rgba(6,182,212,0.5)",
            desc: "Participated in Cyber Security Symposium and learned about modern security technologies and cyber safety concepts."
        },
        {
            role: "Technical Events Participation",
            org: "College Events",
            icon: "Trophy",
            color: "from-[#22c55e] to-[#eab308]",
            glow: "rgba(34,197,94,0.5)",
            desc: "Participated in technical events, coding activities, and workshops to improve programming and problem solving skills."
        }
    ]
};
