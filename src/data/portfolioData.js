import { Github, Code2, Database, Layout, Terminal, Mail, Phone, ExternalLink } from 'lucide-react';

export const portfolioData = {
    personal: {
        name: "Nikesh Kumar",
        headline: "B.Tech CSE (Data Science) Student | Aspiring Data Scientist | Software Developer",
        location: "Punjab, India",
        email: "nikeshgupta950@gmail.com",
        phone: "+91 7004704385",
        github: "https://github.com/nikeshg89",
        linkedin: "https://www.linkedin.com/in/menikesh08/",
        resume: "/Nikeshconfirmcv12.pdf", // Link to the provided CV in root directory
        stats: {
            cgpa: "7.67",
            projects: "3+",
            skills: "Python | Power BI | Data Science"
        }
    },
    hero: {
        title: "Hi, I'm Nikesh Kumar",
        subtitle: "B.Tech CSE | Data Science | Software Explorer",
        rotatingText: [
            "B.Tech CSE Data Science Student",
            "Aspiring Data Scientist",
            "Python Developer",
            "Power BI Analyst"
        ]
    },
    about: "I am a B.Tech Computer Science and Engineering (Data Science) student at Lovely Professional University with strong interest in Data Science, AI, and Software Development.\n\nI have experience in Python, C++, Java, Data Analysis, Power BI, and Machine Learning libraries.\n\nI enjoy building real-world projects, solving problems, and learning new technologies.",
    skills: {
        technical: [
            { name: "Python", icon: Terminal, category: "Languages", progress: 90 },
            { name: "C++", icon: Code2, category: "Languages", progress: 85 },
            { name: "C", icon: Code2, category: "Languages", progress: 80 },
            { name: "Java", icon: Code2, category: "Languages", progress: 75 },
            { name: "Pandas", icon: Database, category: "Frameworks", progress: 85 },
            { name: "NumPy", icon: Database, category: "Frameworks", progress: 85 },
            { name: "Matplotlib", icon: Layout, category: "Frameworks", progress: 80 },
            { name: "Scikit-Learn", icon: Database, category: "Frameworks", progress: 70 },
             { name: "Power BI", icon: Layout, category: "Tools", progress: 85 },
              { name: "MySQL", icon: Database, category: "Tools", progress: 80 },
               { name: "Git / GitHub", icon: Github, category: "Tools", progress: 85 },
        ],
        soft: [
            "Problem Solving", "Teamwork", "Communication", "Adaptability"
        ]
    },
    projects: [
        {
            id: 1,
            title: "Citywide Payroll Data Analysis",
            category: "Data Analysis",
            date: "Project 1",
            summary: "Comprehensive data analysis using Power BI.",
            details: "Citywide Payroll Data Analysis implemented using Power BI to visualize and understand payroll trends and insights.",
            tech: ["Power BI"],
            links: {
                github: null,
                live: "https://drive.google.com/file/d/1fRMjKPfUfI36uJINw6wEoDqCrQuadiWq/view?usp=drive_link",
                liveLabel: "View Dashboard"
            }
        },
        {
            id: 2,
            title: "AI Powered Skin Health Chatbot",
            category: "AI/Web",
            date: "Project 2",
            summary: "An intelligent chatbot for skin health assessments.",
            details: "Developed an AI-powered Skin Health Chatbot combining Python, Streamlit, and the Gemini API to provide interactive and intelligent skin health insights.",
            tech: ["Python", "Streamlit", "Gemini API"],
            links: {
                github: "https://github.com/nikeshg89/SkinCare",
                live: null
            }
        },
        {
            id: 3,
            title: "COVID-19 Vaccination Data Analysis",
            category: "Data Analysis",
            date: "Project 3",
            summary: "In-depth analysis of COVID-19 vaccination trends.",
            details: "Analyzed COVID-19 vaccination data utilizing Python, Pandas, NumPy, and Matplotlib for data processing and visualization.",
            tech: ["Python", "Pandas", "NumPy", "Matplotlib"],
            links: {
                github: "https://github.com/nikeshg89/python_nikesh",
                live: null
            }
        }
    ],
    education: [
        {
            school: "Lovely Professional University, Punjab",
            degree: "B.Tech CSE (Data Science)",
            grade: "CGPA: 7.67",
            year: "Current"
        },
        {
            school: "Hellens School Sitamarhi",
            degree: "Intermediate",
            grade: "68.8%",
            year: "Completed"
        },
        {
            school: "St. Joseph School Sitamarhi",
            degree: "Matriculation",
            grade: "77.4%",
            year: "Completed"
        }
    ],
    certifications: [
        { title: "NPTEL Certificate", issuer: "NPTEL", date: "", link: "https://drive.google.com/file/d/1PPeJnX-8XbYxEw3i0BaFAVuoDEtnKUpI/view" },
        { title: "Software Implementation Certificate", issuer: "", date: "", link: "https://drive.google.com/file/d/17i1aK_-XXbFHxJl5HRXTfUHL_qAMq-xg/view" },
        { title: "Data Structure Training Certificate", issuer: "", date: "", link: "https://drive.google.com/file/d/1GKGNPSnFLRcaW06hJ_yjU6S_woJ9qkhe/view" },
        { title: "Udemy Certificate", issuer: "Udemy", date: "", link: "https://drive.google.com/file/d/1hEzrYFE8GRizQXMTZEF3ugMT6pllxvyo/view" }
    ],
    training: [
        {
            title: "Cipher Schools DSA Training",
            company: "Cipher Schools",
            date: "",
            desc: "Comprehensive training covering Java, Data Structures, and Problem Solving.",
            link: null
        }
    ],
    extracurricular: [
        {
            role: "Volunteer",
            org: "Social Work",
            desc: "Active participant in social work initiatives."
        },
        {
            role: "Participant",
            org: "Cyber Security Symposium",
            desc: "Attended and participated in a Cyber Security Symposium."
        }
    ]
};
